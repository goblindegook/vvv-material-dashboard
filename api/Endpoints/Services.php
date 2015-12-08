<?php

namespace goblindegook\VVV\API\Endpoints;

use \goblindegook\VVV\API\Models\Service;

/**
 * Implements the /services API endpoint.
 */
class Services extends Base {

  private $_services;

  private $_ssh;

  /**
   * Endpoint constructor.
   * @param \Slim\Slim $app    Application.
   * @param array      $config Service configuration.
   */
  public function __construct($app, $config) {
    parent::__construct($app);
    $this->_services = $config;
  }

  /**
   * OPTIONS /services(/:name(/:status))
   * @param  string $name   Service name.
   * @param  string $status Service status.
   */
  public function options($name = '', $status = '') {
    $methods = ['GET'];

    if (!empty($name) && !empty($status)) {
      $methods[] = 'PUT';
    }

    $this->app->response()->header('Access-Control-Allow-Methods', implode(',', $methods));
  }

  /**
   * GET /services(/:name)
   * @param  string $name Service handle.
   * @return array        Service status.
   */
  public function get($name = '') {
    $response = [];

    try {
      if (!empty($name)) {
        $this->_validateName($name);
      }

      $this->_connect();

      foreach ($this->_services as $key => $config) {
        if (empty($name) || $name === $key) {
          $service        = new Service($config, $this->_ssh);
          $response[$key] = $this->_response($service, $service->getStatus());
        }
      }

    } catch (\Exception $e) {
      $this->_error($e);
    }

    echo json_encode($response);
  }

  /**
   * PUT /services/:name/:status
   * @param string $name Service handle.
   * @param string $status Service status to set (either 'on' or 'off').
   * @return array         New service status.
   */
  public function put($name = '', $status = '') {
    $response = [];

    try {
      $this->_validateName($name);
      $this->_validateStatus($status);

      $this->_connect();

      $service         = new Service($this->_services[$name], $this->_ssh);
      $response[$name] = $this->_response($service, $service->setStatus($status));

    } catch (\Exception $e) {
      $this->_error($e);
    }

    echo json_encode($response);
  }

  /**
   * Validate service name.
   * @param string $name Requested service name.
   */
  private function _validateName($name) {
    if (empty($this->_services[$name])) {
      throw new \Exception('unknown service', 404);
    }
  }

  /**
   * Validate service status.
   * @param string $status Requested service status.
   */
  private function _validateStatus($status) {
    if (!in_array($status, ['on', 'off'])) {
      throw new \Exception('status must be "on" or "off"', 400);
    }
  }

  /**
   * Initiate an SSH connection to the VVV host.
   */
  private function _connect() {
    $this->_ssh = new \phpseclib\Net\SSH2('vvv');
    if (!$this->_ssh->login('vagrant', 'vagrant')) {
      throw new \Exception('unable to connect', 502);
    }
  }

  /**
   * Format endpoint responses.
   * @param  Service $service Service object.
   * @param  string  $output  Output from the issued command.
   * @return array            Service response.
   */
  private function _response($service, $output) {
    return [
      'name'    => $service->getName(),
      'enabled' => $service->isEnabled(),
      'locked'  => $service->isLocked(),
      'message' => trim($output),
    ];
  }

}
