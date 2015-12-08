<?php
namespace goblindegook\VVV\API\Models;

class Site
{

    private $key   = '';
    private $hosts = [];
    private $cms   = '';
    private $debug = false;

    /**
     * Constructor.
     * @param string $key   Site key.
     * @param array  $hosts Site hosts.
     */
    public function __construct($key, $hosts = [])
    {
        $this->key   = $key;
        $this->hosts = $hosts;
    }

    /**
     * Checks the vvv-hosts file for host names.
     * @param string $file Path to vvv-hosts.
     */
    public function parseHosts($file)
    {
        foreach (file($file) as $host) {
            $host = trim($host);
            if (!strstr($host, '#') && 'vvv.dev' !== $host) {
                $this->hosts[] = $host;
            }
        }
    }

    /**
     * Checks wp-config.php for an active WP_DEBUG flag.
     * @param string $file Path to wp-config.php.
     */
    public function parseConfiguration($file)
    {
        $this->cms   = '';
        $this->debug = false;

        if (empty($this->hosts)) {
            return;
        }

        $this->cms = 'wordpress';

        foreach (file($file) as $line) {
            if (preg_match('/define\(\s*[\'\"]WP_DEBUG[\'\"],\s*true\s*\);/i', $line)) {
                $this->debug = true;
                return;
            }
        }
    }

    /**
     * Get site data.
     * @return array Site data.
     */
    public function get()
    {
        return [
            'key'   => $this->key,
            'hosts' => $this->hosts,
            'cms'   => $this->cms,
            'debug' => $this->debug,
        ];
    }
}
