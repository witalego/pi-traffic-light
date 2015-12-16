var Gpio = require('onoff').Gpio;

function Switch(pin) {
    var me = this;

    me.pin = new Gpio(pin, 'out');

    me.on = function() {
        me.pin.writeSync(1);
    };

    me.off = function() {
        me.pin.writeSync(0);
    };
    
    me.set = function(state) {
        if (state) {
            me.on();
        } else {
            me.off();
        }
    }
}

module.exports = Switch;