<?php

namespace goblindegook\VVV\API;

class Status extends Base {

  private $_services = [
    'mysql' => [
      'name'    => 'MySQL',
      'status'  => 'sudo service mysql status',
      'start'   => 'sudo service mysql start',
      'stop'    => 'sudo service mysql stop',
      'pattern' => '/start\/running/',
    ],
    'nginx' => [
      'name'    => 'Nginx',
      'status'  => 'sudo service nginx status',
      'start'   => 'sudo service nginx start',
      'stop'    => 'sudo service nginx restart',
      'pattern' => '/is running/',
    ],
    'memcached' => [
      'name'    => 'Memcached',
      'status'  => 'sudo service memcached status',
      'start'   => 'sudo service memcached start',
      'stop'    => 'sudo service memcached stop',
      'pattern' => '/is running/',
    ],
    'php5-fpm' => [
      'name'    => 'PHP-FPM',
      'status'  => 'sudo service php5-fpm status',
      'start'   => 'sudo service php5-fpm start',
      'stop'    => 'sudo service php5-fpm restart',
      'pattern' => '/start\/running/',
    ],
    'xdebug' => [
      'name'    => 'Xdebug',
      'status'  => '/usr/sbin/php5query -s fpm -m xdebug',
      'start'   => 'xdebug_on',
      'stop'    => 'xdebug_off',
      'pattern' => '/Enabled for fpm/',
    ],
  ];

  private $_ssh;

  /**
   * GET /status(/:service)
   * @param  string $service [description]
   * @return array           [description]
   */
  public function get($service = '') {
    $response = [];

    try {
      $this->_connect();

      foreach (array_keys($this->_services) as $handle) {
        if (empty($service) || $service === $handle) {
          $response[$handle] = $this->_getServiceStatus($handle);
        }
      }

    } catch (\Exception $e) {
      $this->app->response->setStatus($e->getCode());
      $response = $e->getMessage();
    }

    echo json_encode($response);
  }

  /**
   * PUT /status/:service/:status
   * @param string $service [description]
   * @param string $status  [description]
   */
  public function set($service = '', $status = '') {
    $response = [];

    try {
      $this->_connect();

      // TODO: Set service status

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

    $service = $this->_services[$handle];
    $output  = $this->_ssh->exec($service['status']);
    $enabled = (bool) preg_match($service['pattern'], $output);

    return [
      'name'    => $service['name'],
      'enabled' => $enabled,
      'message' => trim($output),
    ];
  }

  /**
   * Set the status for a single service.
   * @param  string $handle Service handle.
   * @param  string $status Service status.
   * @return array          Service status.
   */
  private function _setServiceStatus($handle, $status) {

    if (empty($this->_services[$handle])) {
      throw new \Exception('not found', 404);
    }

    $service = $this->_services[$handle];
    $enabled = strtolower($status) !== 'off';
    $output  = $this->_ssh->exec($enabled ? $service['start'] : $service['stop']);

    return [
      'name'    => $service['name'],
      'enabled' => $enabled,
      'message' => trim($output),
    ];
  }

}
