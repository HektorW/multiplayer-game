# Issues
* When movement has a velocity that's updated even without input
  - Does the client send it's updated positions to the server?
  - Do the client handle any type of collisions?
    + world based collisions (walls, jumps)
    + projectile collisions
* Synching timestamps
  - server initializing timesteps on start/on client connect
  - delay when synching timesteps?
    + does it matter?
* keeping state on server
  - which values to save?
    + performance issues?
  - calculating an old game state?
* out of order acknowladgments from server?
  - cant happen with tcp, but with udp
  - how would it be handled?
    + acknowladge everything until latest server ackknowladgment
* what types of data do we send?
  - movement, input, positions
    + differences between own client and other clients
  - other type of events (collisions, explosions, shooting, particles)
    + sent as instant events?
    + bundled in normal gamestate/loop
    + send explosion start at timestamp?




# Project structure
## Client
* libs
  - require
  - socket.io
* rendering
  - canvas
    + simple

## Server
* Node
* libs
  - socket.io

## Shared resources
* movement
* collisions?


# Techniques
* delaying input
  - delaying client side
  - delaying server side



# Other
* mobile support
* inputs
  - keyboard
  - keyboard/mouse
  - gamepad
  - touch
