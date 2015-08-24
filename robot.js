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

    commands.command1 = this.command1;
    commands.command2 = this.command2;
    commands.command3 = this.command3;
    commands.turnAllOff = this.turnAllOff;

    return commands;
  },

  connections: {
    digispark: { adaptor: 'digispark' },
    loopback: { adaptor: 'loopback' }
  },

  devices: {
    red: { driver: "led", pin: 0, connection: 'digispark' },
    green: { driver: "led", pin: 1, connection: 'digispark' },
    blue: { driver: "led", pin: 2, connection: 'digispark' },
    ping: { driver: 'ping', connection: 'loopback' }
  },

  work: function(my) {
    // for this example we will use API calls to command the robot
    after((1).seconds(), this.turnAllOff);
  },

	turnAllOff: function() {
		this.ledOff(this.red);
		this.ledOff(this.blue);
		this.ledOff(this.green);
	},

  command1: function(data) {
    console.log("command1"+"-"+data);
    // this.emit('event1','stuff');
    this.ledWork(data, this.red);
  },

  ledWork: function(data, led) {
    if(!!data) {
    	if(led.currentBrightness() > 0) {
    		led.brightness(0);
    	} else {
		  	led.brightness(data.toScale(0, 255));
    	}
    }
  },

  ledOff: function(led) {
  	// turn led off;
		led.turnOff();
  	// if led using PWM, also need to set the brightness to 0
		led.brightness(0);
  },

  command2: function(data) {
    console.log("command2"+"-"+data);
    // this.emit('event2','stuff');
    this.ledWork(data, this.green);
  },

  command3: function(data) {
    console.log("command3"+"-"+data);
    // this.emit('event3','stuff');
    this.ledWork(data, this.blue);
  }

});

// ensure you install the API plugin first:
// $ npm install cylon-api-mqtt
Cylon.api('mqtt',{
  broker: 'mqtt://test.mosquitto.org',
  prefix: 'cybot', // Optional 
});

Cylon.start();
