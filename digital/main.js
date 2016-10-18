// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/* clock & counter */
jQuery.fn.reverse = [].reverse;

$(function() {

    var
        $clockDigits = $('#clock .digit'),
        $counterDigits = $('#counter .digit'),
        tick = function() {

            var 
                now = moment(),
                to = moment([2080, 11, 8, 0, 0, 0, 0]),
                diff = moment.duration(to - now),
                clock = now.format('HHmmss'),
                counter = {
                    years: diff.years().toString().split(''),
                    months: diff.months().toString().split(''),
                    days: diff.days().toString().split(''),
                    hours: diff.hours().toString().split(''),
                    minutes: diff.minutes().toString().split(''),
                    seconds: diff.seconds().toString().split('')
                },
                $digits = null;
    
            $clockDigits.each(function(i) {
                $(this).attr('data-digit', clock.charAt(i));
            });

            for (var v in counter) {

                $digits = $counterDigits.filter(function() {
                    return $(this).parent().hasClass(v);
                });

                $digits.reverse().each(function() {
                    $(this).attr('data-digit', counter[v].pop() || null);
                });

            }

            window.requestAnimationFrame(tick);
    
        };
 
    tick();

});
