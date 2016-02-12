# Changelog

## [unreleased] -- February 13, 2016

* Removed reliance on component mixins as they will become deprecated.
* `redux-simple-router` dependency renamed to `react-router-redux`.

## [1.1.2] -- January 17, 2016

* Replace `redux-router` with the "official" `redux-simple-router`.
* Additional ESLint rules for React.

## [1.1.1] -- December 5, 2015

* Cosmetic improvements with support for smaller screens and window sizes.
* Start and stop the Cron service.
* Start and stop the Redis service, if available. ([Have you given VVV + Redis a look?](https://github.com/goblindegook/VVV-Redis))

## [1.1.0] -- December 1, 2015

* REST API: Renamed `/status` endpoints to `/services`.
* REST API: Add preflight check support to `/services`.
* Start and stop services (MySQL and Memcached) from the dashboard.
* Enable or disable Xdebug from the dashboard.

## 1.0.0 -- November 30, 2015

* The crummy initial release.
* Limited REST API to fetch information about your VVV machine.
* Searchable list of currently configured sites.
* Links to common tools in the sidebar.
* Xdebug status polling.

[unreleased]: https://github.com/goblindegook/vvv-material-dashboard/compare/1.1.2...HEAD
[1.1.2]: https://github.com/goblindegook/vvv-material-dashboard/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/goblindegook/vvv-material-dashboard/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/goblindegook/vvv-material-dashboard/compare/1.0.0...1.1.0
