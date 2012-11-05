About this
----------
It's just me mucking around with [Node.js](http://nodejs.org/) and [Socket.io](http://socket.io/). Get real...

License
-------
I don't really care, [MIT](http://opensource.org/licenses/MIT) or something.

Installing
----------
I used [Ubuntu](http://www.ubuntu.com/) for this. I already had Apache pointing at /var/www.

#### Download the project

    $ cd /var/www
    $ git clone git://github.com/asgrim/websockets-sandbox.git

#### Install node.js (if you haven't already)

    $ sudo apt-get install python-software-properties
    $ sudo add-apt-repository ppa:chris-lea/node.js
    $ sudo apt-get update
    $ sudo apt-get install nodejs npm
    
#### Install socket.io requirement

    $ cd websockets-sandbox
    $ npm install socket.io
    
#### Run it

    $ node app.js
    
#### Hit it
Open as many tabs as you wish with different user IDs...

* [http://localhost/websockets-sandbox/?1](http://localhost/websockets-sandbox/?1)
* [http://localhost/websockets-sandbox/?2](http://localhost/websockets-sandbox/?2)
* [http://localhost/websockets-sandbox/?3](http://localhost/websockets-sandbox/?3) etc.
