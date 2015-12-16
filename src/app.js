var TrafficLight = require('./trafficLight');
var UdpController = require('./udpController');

var settings = {
    trafficLight: {
        redPin: 17,
        yellowPin: 27,
        greenPin: 22
    },
    udp: {
        port: 2806,
        updateIntervalTimeout: 20 * 1000 // 20s
    },
    tcp: {
        port: 2806,
        host: 'localhost',
        reconnectTimeout: 4 * 1000 // 4s
    }
};

var controller = new UdpController(new TrafficLight(settings.trafficLight), settings.udp);
controller.setup();