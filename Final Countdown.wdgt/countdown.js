var gDoneButton;
var gInfoButton;
var daysOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

var monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

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
    counter: null,

    init: function(eventDate) {
        Countdown.eventDate = eventDate;
        Countdown.setCounter();
    },

    timer: function () {
        var today = new Date();
        var eventDate = new Date(Countdown.eventDate);

        var msBetweenDates = eventDate.getTime() - today.getTime();
        Countdown.daysToEvent = Math.floor(msBetweenDates / 1000 / 60 / 60 / 24) + 1;

        if (Countdown.daysToEvent == 0) {
            document.getElementById('js-daylabel').style.display = 'none';
            clearInterval(Countdown.counter);
            Countdown.updateText(document.getElementById('js-timeleft'), 'Today');
            return;
        } else {
            document.getElementById('js-daylabel').style.display = 'inline';

            if (Validate.isValidDate(Countdown.eventDate) && Validate.isInt(Countdown.daysToEvent)) {
                Countdown.updateText(document.getElementById('js-timeleft'), Countdown.daysToEvent, 10);
            } else {
                Countdown.updateText(document.getElementById('js-timeleft'), '??');
                Countdown.updateText(document.getElementById('js-eventtitle'), 'Not a valid date!');
            }
        }
    },

    setCounter: function () {
        clearInterval(Countdown.counter);
        Countdown.counter = setInterval(Countdown.timer, 1000);
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
        var titleValue;
        var dateValue;
        var formattedDate = '';

        if (window.widget) {
            widget.prepareForTransition("ToFront");
        }

        back.style.display = "none";
        front.style.display = "block";

        titleValue = document.getElementById('js-titlevalue').value;
        dateValue = document.getElementById('js-datevalue').value;

        if (window.widget) {
            setTimeout ('widget.performTransition();', 0);

            // save inputted title and date
            widget.setPreferenceForKey(titleValue, 'title');
            widget.setPreferenceForKey(dateValue, 'date');
        }

        // update title and date texts on front
        var d = new Date(dateValue);
        if (Validate.isValidDate(d)) {
            formattedDate = daysOfWeek[d.getDay()] + ', ' + monthsOfYear[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
            Countdown.updateText(document.getElementById('js-datedisplay'), formattedDate);
        }
        Countdown.updateText(document.getElementById('js-eventtitle'), titleValue);
        Countdown.eventDate = dateValue;
        Countdown.init(dateValue);
    }
};

/* ----------------------------------------
 * Validator
 *
 * Holds methods to validate certain types
 * of inputs.
 * ---------------------------------------- */
var Validate = Validate || {};

Validate = {
    isInt: function (value) { 
        return !isNaN(parseInt(value,10)) && (parseFloat(value,10) == parseInt(value,10)); 
    },

    isValidDate: function (dateString) {
        var d = new Date(dateString);
        return d instanceof Date && isFinite(d);
    }
};








