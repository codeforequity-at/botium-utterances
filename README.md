# Common Utterances Library for Chatbot Developers

A technology-independent collection of sample utterances every chatbot should support, available for various languages.

The library is composed of a bunch of simple plain text files:
* First line contains a "reference code" for the utterances
* Following lines contain sample utterances

## Why this library ?

Chatbot developers should not waste time with mapping common user intents (as "more" and "help") and affirmative or negative responses ("yes" or "no") to utterances. Chances are good that such basic intents are used the same in all chatbot projects. So having access to a library of utterances all chatbots should be able to handle is a huge time saver.

Moreover, lots of people like to "challenge" a chatbot by just throwing in a "tell me a joke" or "how is the weather in london" - while it makes perfectly sense for a chatbot not to tell jokes or find out about the weather, a chatbot should a least have a good answer for those users. You can see such "small talk intents" as test cases which every chatbot should be able to handle.

This project has been initiated to solve the pain of chatbot developers to repeatedly compose sample utterances for basic user intents. It provides a starting point for chatbot developers to look up and listen to common user intents in their chatbot. It is meant to be improved continuously with feedback from chatbot developers all over the world.

**If you find this library useful we ask to contribute by extending the existing utterances files or by adding other useful utterances files, to make continuous improvements for everyone!**


## Common utterances

The "shared" collection contains common utterances for various use cases:

* yes, no
* start, stop, previous, next, resume
* cancel
* later
* repeat
* start over
* more
* help

# Sample code for parsing the utterances-files

## Node.js

	const fs = require('fs');
	const _  = require('lodash');

	const scriptData = fs.readFileSync('botium-utterances/shared/YES.en.utterances.txt').toString();
	const lines = _.map(scriptData.split('\n'), (line) => line.trim());
	const yesIntent = { name: lines[0], utterances: lines.slice(1) };

# Sample code for using the utterances-files in a chatbot

## Botkit

	const controller = createBotkitController();
	
	controller.hears(yesIntent.utterances, 'message_received', function(bot, message) {
	    bot.reply(message, 'OK, will do');
	});	

