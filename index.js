"use strict";
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
var SKILL_STATES = {
    SPORT: "_STARTMODE",
    HELP: "_HELPMODE" // The user is asking for help.
};

var exercises = [
    "kniebeuge",
    "liegestütze",
    "sit ups",
    "rumpfbeugen"
]

var greetings = [
    "Hallo ich helfe dir fit zu bleiben. Dazu mach %s %s.",
    "Ich helfe dir fit zu werden. Dazu führe %s %s aus.",
    "Führe %s %s aus. Das hält dich fit",
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
      
        var greetingsNumber = Math.floor((Math.random() * greetings.length) + 1);
        var exerciseNumber = Math.floor((Math.random() * exercises.length) + 1);
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

