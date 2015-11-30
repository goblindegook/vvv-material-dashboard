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

$sites  = new \goblindegook\VVV\API\Sites($app);
$status = new \goblindegook\VVV\API\Status($app);

$app->get('/api/v1/sites',                   $addHeaders, [$sites, 'get']);
$app->get('/api/v1/status(/:service)',       $addHeaders, [$status, 'get']);
$app->put('/api/v1/status/:service/:status', $addHeaders, [$status, 'set']);

$app->run();
