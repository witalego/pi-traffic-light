var net = require('net');

function TcpController(trafficLight, settings) {
    var me = this;

    var timeoutObject = null;

    me.setup = function() {
        var connect = function(socket) {
            socket.connect(
                settings.port,
                settings.host,
                function() {
                    console.log('[TcpController] Connected to server!');
                });
        };


        var s = new net.Socket();

        connect(s);

        s.on('error', function(e) {
            console.error('[UdpController] Server error:\n' + e.stack);

            if (e.code == 'ECONNREFUSED') {
                console.log('[TcpController] Is the server running at ' + settings.port + '?');

                s.setTimeout(
                    settings.reconnectTimeout,
                    function() {
                        connect(s);
                    });

                console.log('[TcpController] Timeout for ' + settings.reconnectTimeout + ' seconds before trying port:' + settings.port + ' again');
            }
        });

        s.on('data', function(data) {
            console.log('[TcpController] Data ' + data.toString());
        });

        s.on('end', function() {
            console.log('[TcpController] Disconnected from server');
        });

        client.on('close', function() {
            console.log('[TcpController] Connection closed');
        });

        trafficLight.showInconclusive();
    };
}

module.exports = TcpController;