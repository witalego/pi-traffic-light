var TrafficLight = require('./trafficLight');
var ProtocolType = require('./protocolType');
var UdpController = require('./udpController');
var TcpController = require('./tcpController');


var settings = {
    protocol: 'Udp',
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
        reconnectTimeout: 20 * 1000 // 20s
    }
};

var protocolType = new ProtocolType();
var trafficLight = new TrafficLight(settings.trafficLight);

if (protocolType.Udp.is(settings.protocol)) {
    var controller = new UdpController(trafficLight, settings.udp);
    controller.setup();
}

if (protocolType.Tcp.is(settings.protocol)) {
    var controller = new TcpController(trafficLight, settings.tcp);
    controller.setup();
}