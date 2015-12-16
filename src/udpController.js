var os = require('os')
var dgram = require('dgram');

function UdpController(trafficLight, settings) {
    var me = this;

    var timeoutObject = null;

    me.setup = function() {
        var s = dgram.createSocket("udp4");

        s.on('error', function(e) {
            console.error('[UdpController] Server error:\n' + e.stack);
            s.close();
        });

        s.on('message', function(msg, rinfo) {
            if (msg && msg.length == 3) {
                if (msg[0] == 0x28 && msg[1] == 0x06) {
                    clearTimeout(timeoutObject);

                    console.log('[UdpController] Received %d from %s:%d', msg[2], rinfo.address, rinfo.port);

                    trafficLight.setMode(msg[2]);

                    timeoutObject = setTimeout(function() {
                        console.warn('[UdpController] Timeout');
                        trafficLight.showInconclusive();
                    },
                    settings.updateIntervalTimeout);
                }
            }
        });

        s.on('listening', function() {
            var address = s.address();
            console.log('[UdpController] Server listening ' + address.address + ':' + address.port);
        });

        s.bind(settings.port);

        trafficLight.showInconclusive();
    };
}

module.exports = UdpController;