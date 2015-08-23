'use strict';

var Cylon = require('cylon');
var toggleIndex = false;

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
 		this.red.turnOff();
 		this.blue.turnOff();
 		this.green.turnOff();
  },

  command1: function(data) {
    console.log("command1"+"-"+data);
    // this.emit('event1','stuff');
    if(!!data) {
    	if(this.red.currentBrightness() > 0) {
    		this.red.brightness(0);
    	} else {
		  	this.red.brightness(data.toScale(0, 255));
    	}
    }
  },

  command2: function(data) {
    console.log("command2"+"-"+data);
    // this.emit('event2','stuff');
    if(!!data) {
    	if(this.green.currentBrightness() > 0) {
    		this.green.brightness(0);
    	} else {
		  	this.green.brightness(data.toScale(0, 255));
		  }
    }
  },

  command3: function(data) {
    console.log("command3"+"-"+data);
    // this.emit('event3','stuff');
    if(!!data) {
    	if(this.blue.currentBrightness() > 0) {
    		this.blue.brightness(0);
    	} else {
		  	this.blue.brightness(data.toScale(0, 255));
		  }
    }
  }

});

// ensure you install the API plugin first:
// $ npm install cylon-api-mqtt
Cylon.api('mqtt',{
  broker: 'mqtt://test.mosquitto.org',
  prefix: 'cybot', // Optional 
});

// var digisparkAvailable = true;
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
