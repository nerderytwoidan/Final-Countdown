/**
 * ----------------------------------------
 * Countdown
 *
 * Makes and instance of a countdown and updates the info on the page.
 * ----------------------------------------
 */
var Countdown = Countdown || {};

Countdown = {

    eventDate: '',
    daysToEvent: 0,

    init: function(eventDate) {
        Countdown.eventDate = eventDate;
        Countdown.counter();
    },

    timer: function () {
        var today = new Date();
        var eventDate = new Date(Countdown.eventDate);

        var msBetweenDates = eventDate.getTime() - today.getTime();
        Countdown.daysToEvent = Math.floor(msBetweenDates / 1000 / 60 / 60 / 24);

        if (Countdown.daysToEvent <= 0) {
            clearInterval(Countdown.counter);
            return;
        }

        Countdown.updateText(document.getElementById('js-timeleft'), Countdown.daysToEvent);
    },

    counter: function () {
        return setInterval(Countdown.timer, 1000)
    },

    updateText: function (ele, text) {
        ele.innerHTML = text;
    }

};


/**
 * ----------------------------------------
 * Storage
 *
 * Creates a unified and safe-to-use interface for localstorage.
 * ----------------------------------------
 */
var Storage = Storage || {};

Storage = {
    isSupported: function() {
        try {
            localStorage.setItem('localStorageTest', 'test');
            localStorage.removeItem('localStorageTest');
            return true;
        } catch(e) {
            return false;
        }
    },

    testStorage: function () {
        if (Storage.isSupported) {
            var ele = document.getElementById('js-localstorage');
            ele.innerHTML = 'Is supported, bro!';
        }
    }
};
