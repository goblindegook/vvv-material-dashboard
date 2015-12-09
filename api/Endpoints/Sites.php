<?php
namespace goblindegook\VVV\API\Endpoints;

use \goblindegook\VVV\API\Models\Site;

/**
 * Implements the /sites API endpoint.
 */
class Sites extends Base
{

    /**
     * GET /sites
     */
    public function get()
    {
        $results = [];

        foreach ($this->getSitesInPath('..') as $site) {
            $results[] = $site->get();
        }

        echo json_encode($results);
    }

    /**
     * Get VVV site details from a directory.
     * @param  string $path  Directory path.
     * @param  int    $depth Scan depth (defaults to 2 levels)
     * @return array         List of VVV sites found.
     */
    private function getSitesInPath($root, $depth = 2)
    {

        // Default sites:
        $sites = [
            'wordpress-default'       => new Site('wordpress-default', ['local.wordpress.dev']),
            'wordpress-trunk'         => new Site('wordpress-trunk', ['local.wordpress-trunk.dev']),
            'wordpress-develop/src'   => new Site('wordpress-develop/src', ['src.wordpress-develop.dev']),
            'wordpress-develop/build' => new Site('wordpress-develop/build', ['build.wordpress-develop.dev']),
        ];

        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($root, \RecursiveDirectoryIterator::SKIP_DOTS)
        );

        $files->setMaxDepth($depth);

        foreach ($files as $path => $file) {
            // Site hosts:
            if ($file->getFileName() === 'vvv-hosts' && !is_dir($path)) {
                $key = str_replace(['../', '/vvv-hosts'], [], $path);

                if ($key !== 'vvv-hosts') {
                    $sites[$key] = new Site($key);
                    $sites[$key]->parseHosts($path);
                }
            }

            // Site configuration:
            if ($file->getFileName() === 'wp-config.php') {
                $key = str_replace(['../', '/wp-config.php', '/htdocs'], [], $path);
                if (isset($sites[$key])) {
                    $sites[$key]->parseConfiguration($path);
                }
            }
        }

        return $sites;
    }
}
