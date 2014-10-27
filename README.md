# Game of Life

This is a WIP full featured implementation of Conway's Game of Life which
demonstrates writing a Rails application using Facebook's [Flux][1] and
[React][2], as well as using [webpack][3] for our module bundler.

[1]: http://facebook.github.io/react/blog/2014/05/06/flux.html
[2]: http://facebook.github.io/react/index.html
[3]: http://webpack.github.io/

## Running It Locally:
 - You will need Ruby 2.1.1 and Rails 4 installed. Install the required gems:
 > bundle install
 - Build the JS assets with webpack:
 > webpack -wc
 - Start the Rails server:
 > rails s
