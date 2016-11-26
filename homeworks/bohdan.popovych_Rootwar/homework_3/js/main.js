(function() {
    'use strict'

    var timeout = window.setTimeout;

    //******************task1*********************//

    window.setTimeout = function(delay, callback) {
        var self = this,
            args = Array.prototype.slice.call(arguments, 2);
        return timeout(callback instanceof Function ? function() {
            callback.apply(self, args);
        } : callback, delay);
    }

    setTimeout(1000, function() {
        console.log('Hello world, I\'m new setTimeout ');
    });

    //*****************task2**********************//

    window.setInterval = function(callback, interval) {
        var self = this,
            args = Array.prototype.slice.call(arguments, 2)
        return window.setTimeout(interval, function() {
            callback();
            setInterval(callback, interval)
        });
    };

    setInterval(function() {
        console.log('Hello world, I\'m new setInterval');
    }, 2000);

    //*****************task3********************//

    function fncToDelay(param) {
        console.log('Delayed run : ' + param);
    }

    function freeze(delay, fnc) {
        var timeout;

        return function() {
            var args = arguments;

            if (!timeout) {
                timeout = setTimeout(delay, function() {
                    fnc.apply(this, args);
                });

            } else {
                return false;
            }
        }
    }

    var frozenFunc = freeze(5000, fncToDelay);

    frozenFunc('5');

    //*******************task4*****************//

    function createPipe(originalFnc, array) {
        return function(string) {
            var result = array.reduce(function(string, item) {
                return item(string);
            }, string);

            originalFnc(result);
        }
    }

    function originalFnc(string) {
        var result = string.split(' ');
        result = result.map(function(item) {
            return item.charAt(0).toUpperCase() + item.slice(1);
        })
        result = result.join(' ')
        console.log(result);
    }

    function filterDigits(string) {
        var result = string.replace(/[0-9]/g, '');
        return result;
    }

    function filterSpecial(string) {
        var result = string.replace(/[^A-Za-z\s]/g, '');
        return result;
    }

    function filterWhiteSpaces(string) {
        var result = string.replace(/\s{2,}/g, ' ');
        return result;
    }

    var pipe = createPipe(originalFnc, [filterDigits, filterSpecial, filterWhiteSpaces]);

    pipe('on345l90y    te**x((((t     h$&er@@@e');

})();
