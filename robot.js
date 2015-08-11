'use strict';

var Cylon = require('cylon');
var toggleIndex = false;
// var digisparkAvailable = true;

Cylon.robot({
  name: 'cybot',

  // These are the events that will be registered in the API
  events: ['event1', 'event2', 'event3'],
  
  // These are the commands that will be available in the API
  // Commands method needs to return an object with the aliases
  // to the robot methods.
  commands: function() {
    var commands = {};

    commands.cmd1 = this.command1;
    commands.cmd2 = this.command2;
    commands.cmd3 = this.command3;

    return commands;
  },

  connections: {
    digispark: { adaptor: "digispark" },
    loopback: { adaptor: 'loopback' }
  },

  devices: {
    red: { driver: "led", pin: 0, connection: 'digispark' },
    green: { driver: "led", pin: 1, connection: 'digispark' },
    blue: { driver: "led", pin: 2, connection: 'digispark' },
    ping: { driver: 'ping', connection: 'loopback' }
  },

  work: function() {
    // for this example we will use API calls to command the robot
  },

  command1: function(sender, args) {
    console.log("command1");
    console.log("p0 "+sender);
    console.log("p1 "+args);
    this.emit('event1','stuff');

    this.red.toggle();
  },

  command2: function() {
    console.log("command2");
    this.emit('event2');
  },

  command3: function(data) {
    console.log(data);
    toggleIndex = !toggleIndex;
    console.log("command3-"+toggleIndex);
    this.emit('event3');
    if (toggleIndex) {
      this.emit('event1');
    } else {
      this.emit('event2');
    }
  }  
});

// ensure you install the API plugin first:
// $ npm install cylon-api-mqtt
Cylon.api('mqtt',{
  broker: 'mqtt://test.mosquitto.org',
  prefix: 'cybot', // Optional 
});

// (function () {
//   if(digisparkAvailable) {
//     Cylon.robot.connections = {
//       digispark: { adaptor: "digispark" },
//       loopback: { adaptor: 'loopback' }
//     };
//     Cylon.robot.devices = {
//       red: { driver: "led", pin: 0, connection: 'digispark' },
//       green: { driver: "led", pin: 1, connection: 'digispark' },
//       blue: { driver: "led", pin: 2, connection: 'digispark' },
//       ping: { driver: 'ping', connection: 'loopback' }
//     };
//   }
// })();

Cylon.start();
