<?php

namespace goblindegook\VVV\API;

class Sites extends Base {

  /**
   * GET /sites
   */
  public function get() {
    $sites   = $this->_getSitesInPath('..');
    $results = [];

    foreach ($sites as $key => $site) {
      $site['key'] = $key;
      $results[]   = $site;
    }

    echo json_encode($results);
  }

  /**
   * Get VVV site details from a directory.
   * @param  string $path  Directory path.
   * @param  int    $depth Scan depth (defaults to 2 levels)
   * @return array         List of VVV sites found.
   */
  private function _getSitesInPath($root, $depth = 2) {

    $sites = [
      // Default sites:
      'wordpress-default'       => ['hosts' => ['local.wordpress.dev']],
      'wordpress-trunk'         => ['hosts' => ['local.wordpress-trunk.dev']],
      'wordpress-develop/src'   => ['hosts' => ['src.wordpress-develop.dev']],
      'wordpress-develop/build' => ['hosts' => ['build.wordpress-develop.dev']],
    ];

    $files = new \RecursiveIteratorIterator(
      new \RecursiveDirectoryIterator($root, \RecursiveDirectoryIterator::SKIP_DOTS)
    );

    $files->setMaxDepth($depth);

    foreach ($files as $path => $file) {

      // Site hosts:
      if ($file->getFileName() === 'vvv-hosts' && !is_dir('vvv-hosts')) {
        $key = str_replace(['../', '/vvv-hosts'], [], $path);

        if ($key !== 'vvv-hosts') {
          $lines                = file($path);
          $sites[$key]['hosts'] = [];
          $sites[$key]['debug'] = false;
          $sites[$key]['wp']    = false;

          foreach ($lines as $host) {
            if (!strstr($host, '#') && 'vvv.dev' !== trim($host)) {
              $sites[$key]['hosts'][] = trim($host);
            }
          }
        }
      }

      // Site configuration:
      if ($file->getFileName() === 'wp-config.php') {
        $key = str_replace(['../', '/wp-config.php', '/htdocs'], [], $path);

        if (!empty($sites[$key]['hosts'])) {
          $sites[$key]['debug'] = $this->_isDebugEnabled($path);
          $sites[$key]['wp']    = true;
        }
      }
    }

    return $sites;
  }


  /**
   * Checks wp-config.php for an active WP_DEBUG flag.
   * @param  string  $config Path to wp-config.php.
   * @return boolean         True if WP_DEBUG is set on the file.
   */
  private function _isDebugEnabled($config) {
    $lines = file($config);

    foreach ($lines as $line) {
      if (preg_match('/define\(\s*[\'\"]WP_DEBUG[\'\"],\s*true\s*\);/i', $line)) {
        return true;
      }
    }

    return false;
  }

}
