<?php
namespace goblindegook\VVV\API\Models;

class Service
{

    private $config    = [];
    private $isEnabled = false;
    private $isLocked  = false;
    private $ssh;

    /**
     * Model constructor.
     * @param array               $config Service configuration.
     * @param \phpseclib\Net\SSH2 $ssh    SSH connection handler.
     */
    public function __construct($config, $ssh)
    {
        $this->config = $config;
        $this->ssh    = $ssh;
    }

    /**
     * Get service name.
     * @return string Service name.
     */
    public function getName()
    {
        return $this->config['name'];
    }

    /**
     * [isEnabled description]
     * @return boolean [description]
     */
    public function isEnabled()
    {
        return $this->isEnabled;
    }

    /**
     * [isLocked description]
     * @return boolean [description]
     */
    public function isLocked()
    {
        return $this->isLocked;
    }

    /**
     * Get the service status.
     * @return array Service status.
     */
    public function getStatus()
    {
        // TODO: Check return code.

        $output = $this->ssh->exec($this->config['status']);

        $unrecognized    = (bool)preg_match('/unrecognized/', $output);
        $this->isEnabled = (bool)preg_match($this->config['pattern'], $output);
        $this->isLocked  = $unrecognized || empty($this->config['start']) || empty($this->config['stop']);

        return $output;
    }

    /**
     * Set the status for a single service.
     * @param  string $status Service status.
     * @return array          Service status.
     */
    public function setStatus($status)
    {
        // TODO: Check return code.

        $enable  = strtolower($status) === 'on';
        $command = $enable ? 'start' : 'stop';
        $output  = $this->ssh->exec($this->config[$command]);

        $this->isEnabled = $enable;

        return $output;
    }
}
