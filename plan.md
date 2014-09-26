# Planning
* Basic setup of project
  - setting up client and server connection
  - rendering primitives
  - local input
  - movements

* Delaying techniques
  - delaying from server
  - delaying from client

* Basic state synchronization between a client and server
  - timestamps
  - sending input/positions/movements
  - authorative server

* Client prediction
  - predicting movements in client
  - sending validations from server

* Server reconciliation
  - server acknowladging clients movement
  - client validates acknowladgments

* Multiple clients
  - interpolating other clients movement

* Shooting / collisions
  - some sort of shooting / collision handling

* Server collision checking in the past
  - keeping state
  - backtracking on timestamp