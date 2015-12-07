<?php

namespace goblindegook\VVV\API;

class Services extends Base {

  private $_services;

  private $_ssh;

  /**
   * Endpoint constructor.
   * @param \Slim\Slim $app           Application.
   * @param array      $serviceConfig Service configuration.
   */
  public function __construct($app, $serviceConfig) {
    parent::__construct($app);
    $this->_services = $serviceConfig;
  }

  /**
   * OPTIONS /services(/:handle(/:status))
   * @param  string $handle [description]
   * @param  string $status [description]
   */
  public function options($handle = '', $status = '') {
    $methods = ['GET'];

    if (!empty($handle) && !empty($status)) {
      $methods[] = 'PUT';
    }

    $this->app->response()->header('Access-Control-Allow-Methods', implode(',', $methods));
  }

  /**
   * GET /services(/:handle)
   * @param  string $handle Service handle.
   * @return array          Service status.
   */
  public function get($handle = '') {
    $response = [];

    try {
      $this->_connect();

      foreach (array_keys($this->_services) as $service) {
        if (empty($handle) || $handle === $service) {
          $response[$service] = $this->_getServiceStatus($service);
        }
      }

    } catch (\Exception $e) {
      $this->app->response->setStatus($e->getCode());
      $response = $e->getMessage();
    }

    echo json_encode($response);
  }

  /**
   * PUT /services/:service/:status
   * @param string $handle Service handle.
   * @param string $status Service status to set (either 'on' or 'off').
   * @return array         New service status.
   */
  public function put($handle = '', $status = '') {
    $response = [];

    try {
      $this->_connect();

      $response[$handle] = $this->_setServiceStatus($handle, $status);

    } catch (\Exception $e) {
      $this->app->response->setStatus($e->getCode());
      $response = $e->getMessage();
    }

    echo json_encode($response);
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
   * Get the status for a single service.
   * @param  string $handle Service handle.
   * @return array          Service status.
   */
  private function _getServiceStatus($handle) {

    if (empty($this->_services[$handle])) {
      throw new \Exception('not found', 404);
    }

    // TODO: Check return code.

    $output  = $this->_ssh->exec($this->_services[$handle]['status']);
    $enabled = (bool) preg_match($this->_services[$handle]['pattern'], $output);

    return $this->_response($handle, $enabled, $output);
  }

  /**
   * Set the status for a single service.
   * @param  string $handle Service handle.
   * @param  string $status Service status.
   * @return array          Service status.
   */
  private function _setServiceStatus($handle, $status) {

    $status = strtolower($status);

    if (!in_array($status, ['on', 'off'])) {
      throw new \Exception('status must be "on" or "off"', 400);
    }

    if (empty($this->_services[$handle])) {
      throw new \Exception('not found', 404);
    }

    // TODO: Check return code.

    $enabled = $status === 'on';
    $command = $enabled ? 'start' : 'stop';
    $output  = $this->_ssh->exec($this->_services[$handle][$command]);

    return $this->_response($handle, $enabled, $output);
  }

  /**
   * Format endpoint responses.
   * @param  string $handle  Service handle.
   * @param  bool   $enabled Whether the service is enabled.
   * @param  string $output  Output from the issued command.
   * @return array           Service response.
   */
  private function _response($handle, $enabled, $output) {
    $service     = $this->_services[$handle];
    $unavailable = (bool) preg_match('/unrecognized/', $output);
    $locked      = $unavailable || empty($service['start']) || empty($service['stop']);

    return [
      'name'    => $service['name'],
      'enabled' => $enabled,
      'message' => trim($output),
      'locked'  => $locked,
    ];
  }

}
