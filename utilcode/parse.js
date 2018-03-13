const fs = require('fs')

const dir = process.argv[2]
console.log('directory: ' + dir)

const language = process.argv[3]
console.log('language: ' + language)

const filenames = fs.readdirSync(dir)

const intentsById = {}

filenames.forEach((filename) => {
  if (filename.match('usersays')) return
  
  const intent = require('./intents/' + filename)
  intent.filename = filename
  
  intentsById[intent.id] = intent
})

const rootIntents = []

Object.keys(intentsById).forEach(function(intentId) {
  const intent = intentsById[intentId]
  
  const inputfilename = intent.filename.replace('.json', '') + '_usersays_' + language + '.json'
  if (fs.existsSync('./intents/' + inputfilename)) {
    intent.inputfilename = inputfilename
    intent.input = require('./intents/' + inputfilename)
  } else {
    delete intentsById[intentId]
    return
  }

  if (intent.parentId) {
    const parent = intentsById[intent.parentId]
    if (!parent.children) parent.children = []
    parent.children.push(intent)
  }
  else
    rootIntents.push(intent)
});

const callStacks = []

rootIntents.forEach((intent) => follow(intent))

function follow(intent, currentStack = []) {

  const utterances = []
  intent.input.forEach((input) => {
    utterances.push(input.data.reduce((accumulator, currentValue) => accumulator + '' + currentValue.text, ''))
  })
  
  fs.writeFileSync(intent.name + '.en.utterances.txt', [ intent.name, ...utterances ].join('\r\n'))
    
  const cp = currentStack.slice(0)
  cp.push({ sender: 'me', msg: intent.name })
  cp.push({ sender: 'bot', msg: '!INCOMPREHENSION' })
    
  if (intent.children) {
    intent.children.forEach((child) => {
      follow(child, cp)
    })
  } else {
    
    const file = cp.filter((m) => m.sender === 'me').map((m) => m.msg).join('_') + '_' + language + '.convo.txt'
    const name = cp.filter((m) => m.sender === 'me').map((m) => m.msg).join('/')

    const content = []
    content.push(name)
    content.push('')

    cp.forEach((c) => {
      content.push('#' + c.sender)
      content.push(c.msg)
      content.push('')
    })
    
    fs.writeFileSync(file, content.join('\r\n'))
  }
}












