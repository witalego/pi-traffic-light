var TrafficLight = require('./../trafficLight');
var TcpController = require('./../tcpController');

var controller = new TcpController(
    new TrafficLight({
        redPin: 17,
        yellowPin: 27,
        greenPin: 22
    }), {
        host: '10.11.12.2',
        port: 13000,
        reconnectTimeout: 5000
    });
controller.setup();