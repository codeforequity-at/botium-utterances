# Botium Utterances Library for Chatbot Developers

A technology-independent collection of sample utterances every chatbot should support, available for various languages.

The library is composed of a bunch of simple plain text files:
* First line contains a "reference code" for the utterances
* Following lines contain sample utterances

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

