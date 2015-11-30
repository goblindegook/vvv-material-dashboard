<?php

namespace goblindegook\VVV\API;

class Status extends Base {

  private $_services = [
    'xdebug' => 'Xdebug',
  ];

  /**
   * GET /status(/:service)
   * @param  string $service [description]
   * @return array           [description]
   */
  public function get($service = '') {
    $response = [];

    try {
      foreach (array_keys($this->_services) as $handle) {
        if (empty($service) || $service === $handle) {
          $response[$handle] = $this->_getServiceStatus($handle);
        }
      }
    } catch (\Exception $e) {
      $app->response->setStatus($e->getCode());
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

  }

  /**
   * [_getServiceStatus description]
   * @param  [type] $service [description]
   * @return [type]          [description]
   */
  private function _getServiceStatus($service) {
    $output  = '';
    $enabled = false;
    $code    = -1;

    switch ($service) {
      case 'xdebug':
        exec('/usr/sbin/php5query -s fpm -m xdebug 2>&1', $output, $code);
        $enabled = $code === 0;
        break;

      default:
        throw new \Exception('not found', 404);
    }

    return [
      'name'    => $this->_services[$service],
      'enabled' => $enabled,
      'message' => implode("\n", $output),
    ];
  }

}
