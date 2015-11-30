<?php

namespace goblindegook\VVV\API;

/**
 * Base abstract API request handler.
 */
abstract class Base {

  protected $app;

  /**
   * [__construct description]
   * @param [type] $app [description]
   */
  public function __construct($app) {
    $this->app = $app;
  }

}
