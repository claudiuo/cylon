var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: 'COM4' }
  },

  devices: {
    led: { driver: 'led', pin: 13 },
    button: { driver: 'button', pin: 2 }
  },

  work: function(my) {
//    my.button.on('push', function() {
    every((5).seconds(), function() {
      console.log("Hello world!");
      my.led.toggle()
    });
  }
}).start();