"use strict";
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
var SKILL_STATES = {
    SPORT: "_STARTMODE",
    HELP: "_HELPMODE" // The user is asking for help.
};

var exercises = [
    "kniebeuge",
    "liegestütze",
    "Sit Ups",
    "rumpfbeugen",
]

var greetings = [
    "Hallo ich helfe dir fit zu bleiben. Dazu mach %s %s.",
    "Ich helfe dir fit zu werden. Dazu führe %s %s aus.",
    "Führe %s %s aus. Das hält dich fit",
    "Hallo, Kreise 20 sekunden mit dem linken arm und dann ",
    "Hallo, Kreise 20 sekunden mit dem rechten arm und dann ",
    "Hallo, Kreise 20 sekunden mit dem becken und dann ",
    "Hallo, Kreise 20 sekunden mit dem rechten fuß und dann ",
    "Hallo, Kreise 20 sekunden mit dem linken fuß und dann ",
    "Hallo, Stehe 20 sekunden mit dem linken bein und dann ",
    "Hallo, Stehe 20 sekunden mit dem bein bein und dann ",
]

var Alexa = require("alexa-sdk");
var util = require('util');

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
    alexa.registerHandlers(newSessionHandlers, sportHandler);
    
    alexa.execute();
};

var sportHandler = Alexa.CreateStateHandler(SKILL_STATES.SPORT, {
    "exercise": function () {
      
        var greetingsNumber = Math.floor((Math.random() * greetings.length));
        var exerciseNumber = Math.floor((Math.random() * exercises.length));
        var repetition = Math.floor((Math.random() * 10) + 1);
       
        var speechout = util.format(greetings[greetingsNumber], repetition, exercises[exerciseNumber]); 
        console.log(speechout);
        this.emit(':tell', speechout);
    }   
});

const newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = SKILL_STATES.SPORT;
        this.emitWithState("exercise");
    },
    "AMAZON.HelpIntent": function () {
        this.emit(":tell", "");
    },
    "Unhandled": function () {
        this.handler.state = SKILL_STATES.SPORT;
        this.emitWithState("exercise");
    },

};

