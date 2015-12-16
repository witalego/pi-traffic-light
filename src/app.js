var TrafficLight = require('./trafficLight');
var UdpController = require('./udpController');

var controller = new UdpController(new TrafficLight(17, 27, 22));
controller.setup();