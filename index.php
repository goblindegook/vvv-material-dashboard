<?php
namespace goblindegook\VVV;

require __DIR__ . '/vendor/autoload.php';

\Slim\Slim::registerAutoloader();

$serviceConfig = json_decode(file_get_contents(__DIR__ . '/config/services.json'), true);

$app      = new \Slim\Slim();
$sites    = new API\Endpoints\Sites($app);
$services = new API\Endpoints\Services($app, $serviceConfig);

/**
 * Response header middleware.
 */
$addHeaders = function () use ($app) {
    $app->response()->header('Cache-Control', 'no-cache, must-revalidate');
    $app->response()->header('Expires', gmdate('D, d M Y H:i:s \G\M\T'));
    $app->response()->header('Content-Type', 'application/json');
    $app->response()->header('Access-Control-Allow-Origin', '*');
};

$app->get('/*', function () {
    include 'index.html';
    die();
});

// Sites
$app->get('/api/v1/sites', $addHeaders, [$sites, 'get']);

// Services
$app->options('/api/v1/services(/:handle)', $addHeaders, [$services, 'options']);
$app->options('/api/v1/services/:handle/:status', $addHeaders, [$services, 'options']);
$app->get('/api/v1/services(/:handle)', $addHeaders, [$services, 'get']);
$app->put('/api/v1/services/:handle/:status', $addHeaders, [$services, 'put']);

$app->run();
