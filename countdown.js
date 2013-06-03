var gDoneButton;
var gInfoButton;

/* ----------------------------------------
 * Loaders
 *
 * Loads objects on body load.
 * ---------------------------------------- */
var Loader = function () {
    gDoneButton = new AppleGlassButton(document.getElementById("js-saveevent"), "Done", Prefs.flipToFront);
    gInfoButton = new AppleInfoButton(document.getElementById("js-infobutton"), document.getElementById("front"), "white", "white", Prefs.flipToBack);
}


/* ----------------------------------------
 * Countdown
 *
 * Makes and instance of a countdown and updates the info on the page.
 * ---------------------------------------- */
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

        if (Countdown.daysToEvent === NaN) {
            Countdown.updateText(document.getElementById('js-timeleft'), '??');
            Countdown.updateText(document.getElementById('js-eventtitle'), 'Not a valid date!');
        } else {
            Countdown.updateText(document.getElementById('js-timeleft'), Countdown.daysToEvent);
        }
    },

    counter: function () {
        return setInterval(Countdown.timer, 1000)
    },

    updateText: function (ele, text) {
        ele.innerHTML = text;
    }

};


/* ----------------------------------------
 * Preferences
 *
 * Handles the preference related methods.
 * ---------------------------------------- */
var Prefs = Prefs || {};

Prefs = {
    isSupported: function() {
        try {
            widget.setPreferenceForKey("widgetLoaded", "true");
            return true;
        } catch(e) {
            return false;
        }
    },

    flipToBack: function () {
        var front = document.getElementById('front');
        var back  = document.getElementById('back');

        if (window.widget)
            widget.prepareForTransition("ToBack");

        front.style.display = "none";
        back.style.display = "block";

        if (window.widget) {
            setTimeout ('widget.performTransition();', 0);
        }
    },

    flipToFront: function () {
        var front = document.getElementById("front");
        var back = document.getElementById("back");

        if (window.widget) {
            widget.prepareForTransition("ToFront");
        }

        back.style.display = "none";
        front.style.display = "block";

        if (window.widget) {
            setTimeout ('widget.performTransition();', 0);

            // save inputted title and date
            var titleValue = document.getElementById('js-titlevalue').value;
            var dateValue = document.getElementById('js-datevalue').value;
            widget.setPreferenceForKey(titleValue, 'title');
            widget.setPreferenceForKey(dateValue, 'date');
        }

        // update title and date texts on front
        Countdown.updateText(document.getElementById('js-eventtitle'), titleValue);
        Countdown.init(dateValue);
    }
};








