<?php
namespace goblindegook\VVV\API\Endpoints;

/**
 * Base abstract API request handler.
 */
abstract class Base
{
    protected $app;

    /**
     * Constructor.
     * @param \Slim\Slim $app Application.
     */
    public function __construct($app)
    {
        $this->app = $app;
    }

    /**
     * Error.
     * @param \Exception $exception Exception.
     */
    protected function error($exception)
    {
        $code    = $exception->getCode();
        $message = $exception->getMessage();

        $this->app->response->setStatus($code ? $code : 500);

        echo json_encode(['error' => $message]);
        die;
    }
}
