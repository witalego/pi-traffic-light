var os = require('os')
var dgram = require('dgram');

function UdpController(trafficLight) {
    var me = this;

    var timeoutObject = null;

    var Port = 2806;
    var UpdateIntervalTimeout = 20000;

    me.setup = function() {
        var s = dgram.createSocket("udp4");

        s.on('error', function(err) {
            console.error('[UdpController] Server error:\n' + err.stack);
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
                    UpdateIntervalTimeout);
                }
            }
        });

        s.on('listening', function() {
            var address = s.address();
            console.log('[UdpController] Server listening ' + address.address + ':' + address.port);
        });

        s.bind(Port);

        trafficLight.showInconclusive();
    };
}

module.exports = UdpController;