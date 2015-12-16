var Switch = require('./switch');
var LightMode = require('./lightMode');

function TrafficLight(settings) {
    var me = this;

    var InitStepDelay = 500;

    var red = new Switch(settings.redPin);
    var yellow = new Switch(settings.yellowPin);
    var green = new Switch(settings.greenPin);

    var lightMode = new LightMode();

    me.setMode = function(mode) {
        enumValue = lightMode.get(mode);
        if (enumValue != null) {
            red.set(enumValue.has(lightMode.Red));
            yellow.set(enumValue.has(lightMode.Yellow));
            green.set(enumValue.has(lightMode.Green));
        } else {
            console.warn('[TrafficLight] Unsupported value: ' + mode);
        }
    };

    me.setup = function() {
        
        var lights = [
            lightMode.Red,
            lightMode.Yellow,
            lightMode.Green,
            lightMode.None,
            lightMode.All,
            lightMode.None
        ];

        var forFunction = function(i) {
            setTimeout(function(n) {
                if (n < lights.length) {
                    me.setMode(lights[n]);
                    forFunction(n+1);
                }
            },
            InitStepDelay,
            i); 
        };

        forFunction(0);
    };

    me.showInconclusive = function() {
        me.setMode(lightMode.Yellow);
    };

    me.showError = function() {
        me.setMode(lightMode.RedGreen);
    };

    me.on = function() {
        me.setMode(lightMode.All);
    };

    me.off = function() {
        me.setMode(lightMode.None);
    };
}

module.exports = TrafficLight;