<?php

namespace goblindegook\VVV;

require __DIR__ . '/vendor/autoload.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$addHeaders = function () use ($app) {
  $app->response()->header('Cache-Control', 'no-cache, must-revalidate');
  $app->response()->header('Expires', gmdate('D, d M Y H:i:s \G\M\T'));
  $app->response()->header('Content-Type', 'application/json');
  $app->response()->header('Access-Control-Allow-Origin', '*');
};

$app->get('/', function () {
  include 'index.html';
  die();
});

$sites    = new API\Sites($app);
$services = new API\Services($app);

$app->get('/api/v1/sites',                        $addHeaders, [$sites, 'get']);
$app->get('/api/v1/services(/:handle)',           $addHeaders, [$services, 'get']);
$app->put('/api/v1/services/:handle/:status',     $addHeaders, [$services, 'set']);
$app->options('/api/v1/services/:handle/:status', $addHeaders, [$services, 'options']);

$app->run();
