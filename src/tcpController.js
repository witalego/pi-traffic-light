var net = require('net');

function TcpController(trafficLight, settings) {
    var me = this;

    var timeoutObject = null;
    var s = new net.Socket();

    me.setup = function() {
        var connect = function(socket) {
            socket.connect(
                settings.port,
                settings.host,
                function() {
                    console.log('[TcpController] Connected to server!');
                    clearTimeout(timeoutObject);
                });
        };


        connect(s);

        s.on('error', function(e) {
            console.error('[UdpController] Server error: %s', e.code);
            trafficLight.showInconclusive();

            switch (e.code){
                case 'ECONNREFUSED':
                    console.log('[TcpController] Is the server running at ' + settings.port + '?');
                    console.warn('[TcpController] Timeout %ds', settings.reconnectTimeout);

                    clearTimeout(timeoutObject);
                    timeoutObject = setTimeout(
                        function() {
                            connect(s);
                        },
                        settings.reconnectTimeout);
                    break;

                case 'ETIMEDOUT':
                default:
                    console.log('[TcpController] Reconnecting');
                    connect(s);
            }
        });

        s.on('data', function(data) {
            if (data && data.length == 3) {
                if (data[0] == 0x28 && data[1] == 0x06) {
                    console.log('[TcpController] Received %s', data[2]);
                    trafficLight.setMode(data[2]);
                }
            }
            else {
                console.log('[TcpController] Unknown data');
            }
        });

        s.on('end', function() {
            console.log('[TcpController] Disconnected from server');
        });

        s.on('close', function() {
            console.log('[TcpController] Connection closed');
        });

        trafficLight.showInconclusive();
    };
}

module.exports = TcpController;