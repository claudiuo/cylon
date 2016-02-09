var Cylon = require('cylon');

Cylon.robot({
  name: 'digispark-cybot',
  
   // connections: {
   //   digispark: { adaptor: 'digispark' },
   //   loopback: { adaptor: 'loopback' }
   // },
  
  connectPinger: function() {
    this.connection("loopback", { adaptor: "loopback" });

    this.device("pinger", {connection: "loopback", driver: "ping"});

    this.startDevice(this.devices.pinger, function() {
      console.log("Get ready to ping...");
    });
  },

  digisparkDevice: function() {
    this.connection("digispark", { adaptor: "digispark" });

    this.startConnection(this.connections.digispark, function() {});

    this.device("red", {connection: "digispark", driver: "led", pin: 0});
    this.device("green", {connection: "digispark", driver: "led", pin: 1});
    this.device("blue", {connection: "digispark", driver: "led", pin: 2});
    
    var self = this;
    this.startDevice(this.devices.red, function() {
      // console.log("Get ready to red...");
      // console.log(self.devices.red.name);
    });
    this.startDevice(this.devices.green, function() {});
    this.startDevice(this.devices.blue, function() {});
  },

  work: function(my) {
    my.digisparkDevice();

    console.log(my.red);

    if(my.red != null && my.red != undefined) {
	    every((1).second(), function() {
  	    my.red.toggle();
    	});
	    every((2).second(), function() {
  	    my.green.toggle();
    	});
	    every((3).second(), function() {
  	    my.blue.toggle();
    	});
      // my.red.brightness(0);
    }

    // my.connectPinger();

    // every((1).second(), function() {
    //   console.log(my.pinger.ping());
    // });
  }
}).start();