var Countdown = Countdown || {};

Countdown = {

    eventDate: '',
    daysToEvent: 0,

    init: function(eventDate) {
        // Countdown.eventDate = eventDate;

        var today = new Date();
        var eventDate = new Date(eventDate);

        console.log(today);
        console.log(eventDate);

        var msBetweenDates = eventDate.getTime() - today.getTime();
        this.daysToEvent = Math.floor(msBetweenDates / 1000 / 60 / 60 / 24);

        console.log(this.daysToEvent);
        Countdown.counter();
    },

    timer: function () {
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

var Storage = Storage || {};

Storage = {
    isLocalStorageSupported: function() {
        try {
            localStorage.setItem('localStorageTest', 'test');
            localStorage.removeItem('localStorageTest');
            return true;
        } catch(e) {
            return false;
        }
    }
};
