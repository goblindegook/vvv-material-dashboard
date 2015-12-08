<?php

namespace goblindegook\VVV\API\Models;

class Site {

  private $_key   = '';
  private $_hosts = [];
  private $_cms   = '';
  private $_debug = false;

  /**
   * Constructor.
   * @param string $key   Site key.
   * @param array  $hosts Site hosts.
   */
  public function __construct($key, $hosts = []) {
    $this->_key   = $key;
    $this->_hosts = $hosts;
  }

  /**
   * Checks the vvv-hosts file for host names.
   * @param string $file Path to vvv-hosts.
   */
  public function parseHosts($file) {
    foreach (file($file) as $host) {
      $host = trim($host);
      if (!strstr($host, '#') && 'vvv.dev' !== $host) {
        $this->_hosts[] = $host;
      }
    }
  }

  /**
   * Checks wp-config.php for an active WP_DEBUG flag.
   * @param string $file Path to wp-config.php.
   */
  public function parseConfiguration($file) {
    $this->_cms = '';
    $this->_debug = false;

    if (empty($this->_hosts)) {
      return;
    }

    $this->_cms = 'wordpress';

    foreach (file($file) as $line) {
      if (preg_match('/define\(\s*[\'\"]WP_DEBUG[\'\"],\s*true\s*\);/i', $line)) {
        $this->_debug = true;
        return;
      }
    }
  }

  /**
   * Get site data.
   * @param  string $key Key name (optional).
   * @return mixed       Key value (all data if no key is provided).
   */
  public function get($key = null) {
    $data = [
      'key'   => $this->_key,
      'hosts' => $this->_hosts,
      'cms'   => $this->_cms,
      'debug' => $this->_debug,
    ];

    if ($key === null) {
      return $data;
    }

    return $data[$key];
  }

}
