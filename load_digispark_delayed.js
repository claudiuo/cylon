var Cylon = require('cylon');

Cylon.robot({
  name: 'digispark-cybot',
  
//   connections: {
//     digispark: { adaptor: 'digispark' },
//     loopback: { adaptor: 'loopback' }
//   },
  
  connectPinger: function() {
    this.connection("loopback", { adaptor: "loopback" });

    this.device("pinger", {connection: "loopback", driver: "ping"});

    this.startDevice(this.devices.pinger, function() {
      console.log("Get ready to ping...");
    });
  },

  digisparkDevice: function() {
    this.connection("digispark", { adaptor: "digispark" });

    this.device("red", {connection: "digispark", driver: "led", pin: 0});
    this.device("green", {connection: "digispark", driver: "led", pin: 1});
    this.device("blue", {connection: "digispark", driver: "led", pin: 2});
    
    this.startDevice(this.devices.red, function() {
      console.log("Get ready to red...");
    });
    this.startDevice(this.devices.green, function() {
      console.log("Get ready to green...");
    });
    this.startDevice(this.devices.blue, function() {
      console.log("Get ready to blue...");
    });
  },

  work: function(my) {
    my.digisparkDevice();

    console.log("red is " + my.red.led);

    if(my.red.led != null && my.red.led != undefined) {
        my.red.brightness(0);
    }

    my.connectPinger();

    // every((1).second(), function() {
    //   console.log(my.pinger.ping());
    // });
    setInterval(function() {
      console.log(my.pinger.ping());
    }, 1000);
  }
}).start();