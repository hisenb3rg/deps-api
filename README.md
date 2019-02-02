# Dependencies API

[![Known Vulnerabilities](https://snyk.io/test/github/jurglic/deps-api/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jurglic/deps-api?targetFile=package.json)


This is (unfinished) proof of concept (or spike) for API that resolves npm
package dependencies and returns them in a tree structure. It is not production
code, it doesn't include tests, appropriate error handling, etc..

### Architecture

Basic idea is to have an async web API which accepts the requests, and one or
many workers that process them. Communication between web and worker processes
is done via redis queue. Redis also serves as a cache for resolved
dependencies on multiple levels.

### Dependencies

It uses Docker to manage application infrastructure. You will need a working
Docker environment to use it locally.

#### Main application dependencies:
* NodeJS with some npm packages
* Redis

### Running

To run the application (web process, worker process, redis), simply run
`docker-compose up`. Be patient first time as the app image will need to be
built. After server is up, you can try it out, e.g. by opening
`http://localhost:3000/deps/request/2.88.0` in your browser. Response should be
returned at once. However if you refresh it, direct dependencies should be
returned (initially: async via polling).
