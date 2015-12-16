var Enum = require('enum');

function ProtocolType() {
    return new Enum([
        'None',
        'Udp',
        'Tcp'
    ]);
}

module.exports = ProtocolType;