'use strict';

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');

client.on('message', function (topic, payload) {
  // MQTT only receives and sends message payload as string
  // or buffer, so we need to parse the JSON string sent by
  // Cylon, this way we can access it as a regular JS object.
  var data, sender;

  if (!!payload && (payload.length > 0)) {
    data = JSON.parse(payload);
    sender = data.sender;
  }

  if (sender !== 'self') {
    console.log('Topic name ==>', topic);
    console.log('Payload ==>', data);
  }
});

// Payload needs to be a JSON string
var payload = JSON.stringify({
  sender: 'self'
});

//client.subscribe('/cybot/api/robots/cybot');
//client.publish('/cybot/api/robots/cybot', payload);

client.subscribe('/cybot/api/robots/cybot/devices');
client.publish('/cybot/api/robots/cybot/devices', payload);

//client.subscribe('/cybot/api/robots/cybot/events');
//client.publish('/cybot/api/robots/cybot/events', payload);

client.subscribe('/cybot/api/robots/cybot/commands');
client.publish('/cybot/api/robots/cybot/commands', payload);

//client.subscribe('/cybot/listen/api/robots/cybot/commands');
//client.publish('/cybot/emit/api/robots/cybot/commands', payload);

// In order to be able to pass params to the commands
// we need to convert them to json, since MQTT only
// accepts strings and buffers as the payload.
// Cylon.js will convert the `args` array passed
// in the payload and pass the params to the
// command, method or function as regular params,
// in the same way `function.apply()` would do.
// var params = {
//   data: 100
// };

// payload = JSON.stringify(params);

client.subscribe('/cybot/api/robots/cybot/event1');
client.subscribe('/cybot/api/robots/cybot/cmd1');

setInterval(function() {
  client.publish(
    '/cybot/api/robots/cybot/cmd1',
    JSON.stringify({data: 0.5}));
}, 3000);

setInterval(function() {
  client.publish(
    '/cybot/api/robots/cybot/cmd2',
    JSON.stringify({data: 0.5}));
}, 2000);

setInterval(function() {
  client.publish(
    '/cybot/api/robots/cybot/cmd3',
    JSON.stringify({data: 0.5}));
}, 5000);

// new example code assuming the device is an LED
// client.subscribe('/cybot/listen/api/robots/cybot/devices/ping/toggle');
 
// setInterval(function() {
//   client.publish(
//     '/cybot/emit/api/robots/cybot/devices/ping/toggle',
//     JSON.stringify({ param1: 'uno' }));
// }, 10000);

//client.end();
