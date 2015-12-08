<?php

namespace goblindegook\VVV\API\Models;

class Service {

  private $_config    = [];
  private $_isEnabled = false;
  private $_isLocked  = false;
  private $_ssh;

  /**
   * Model constructor.
   * @param array               $config Service configuration.
   * @param \phpseclib\Net\SSH2 $ssh    SSH connection handler.
   */
  public function __construct($config, $ssh) {
    $this->_config = $config;
    $this->_ssh    = $ssh;
  }

  /**
   * Get service name.
   * @return string Service name.
   */
  public function getName() {
    return $this->_config['name'];
  }

  /**
   * [isEnabled description]
   * @return boolean [description]
   */
  public function isEnabled() {
    return $this->_isEnabled;
  }

  /**
   * [isLocked description]
   * @return boolean [description]
   */
  public function isLocked() {
    return $this->_isLocked;
  }

  /**
   * Get the service status.
   * @param  string $handle Service handle.
   * @return array          Service status.
   */
  public function getStatus() {

    // TODO: Check return code.

    $output = $this->_ssh->exec($this->_config['status']);

    $unrecognized     = (bool) preg_match('/unrecognized/', $output);
    $this->_isEnabled = (bool) preg_match($this->_config['pattern'], $output);
    $this->_isLocked  = $unrecognized || empty($this->_config['start']) || empty($this->_config['stop']);

    return $output;
  }

  /**
   * Set the status for a single service.
   * @param  string $status Service status.
   * @return array          Service status.
   */
  public function setStatus($status) {

    // TODO: Check return code.

    $enable  = strtolower($status) === 'on';
    $command = $enable ? 'start' : 'stop';
    $output  = $this->_ssh->exec($this->_config[$command]);

    $this->_isEnabled = $enable;

    return $output;
  }

}
