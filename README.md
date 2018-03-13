# Common Utterances Library for Chatbot Developers

A technology-independent collection of sample utterances and conversations every chatbot should support, available for various languages.

The library is composed of a bunch of simple plain text files, the syntax description can be found [here in the Botium Wiki](https://github.com/codeforequity-at/botium-core/wiki/Botium-Scripting)

## Why this library ?

Chatbot developers should not waste time with mapping common user intents (as "more" and "help") and affirmative or negative responses ("yes" or "no") to utterances. Chances are good that such basic intents are used the same in all chatbot projects. So having access to a library of utterances all chatbots should be able to handle is a huge time saver.

Moreover, lots of people like to "challenge" a chatbot by just throwing in a "tell me a joke" or "how is the weather in london" - while it makes perfectly sense for a chatbot not to tell jokes or find out about the weather, a chatbot should a least have a good answer for those users. You can see such "small talk intents" as test cases which every chatbot should be able to handle.

This project has been initiated to solve the pain of chatbot developers to repeatedly compose sample utterances for basic user intents. It provides a starting point for chatbot developers to look up and listen to common user intents in their chatbot. It is meant to be improved continuously with feedback from chatbot developers all over the world.

**If you find this library useful we ask to contribute by extending the existing or adding new utterances or convo files - if this project helped you in buildling a better chatbot, please help others to build better chatbots too!**

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

## Common conversations

The "convo" collection contains conversation scenarios for various use cases:

* The typical "tell me joke" scenario
* Smalltalk questions such as "who are you"
* Support questions as "let me talk to a human" or "how can i contact you"

The conversations are in a file format supported by [Botium - The Selenium for Chatbots](https://github.com/codeforequity-at/botium-core) - so you can run them against your chatbot with a few configuration steps (in most cases).

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

