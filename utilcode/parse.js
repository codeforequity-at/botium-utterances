const fs = require('fs')
const path = require('path')

const dir = process.argv[2]
console.log('directory: ' + dir)

const language = process.argv[3]
console.log('language: ' + language)

const filenames = fs.readdirSync(dir)

const intentsById = {}

filenames.forEach((filename) => {
  if (filename.match('usersays')) return
  
  const intent = require(path.resolve(dir, filename))
  intent.filename = filename
  
  intentsById[intent.id] = intent
})

const rootIntents = []

Object.keys(intentsById).forEach(function(intentId) {
  const intent = intentsById[intentId]
  
  const inputfilename = intent.filename.replace('.json', '') + '_usersays_' + language + '.json'
  if (fs.existsSync(path.resolve(dir, inputfilename))) {
    intent.inputfilename = inputfilename
    intent.input = require(path.resolve(dir, inputfilename))
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

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9\. -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

function follow(intent, currentStack = []) {

  const utterances = []
  intent.input.forEach((input) => {
    utterances.push(input.data.reduce((accumulator, currentValue) => accumulator + '' + currentValue.text, ''))
  })
  
  fs.writeFileSync(intent.filename.replace('.json', '') + '.en.utterances.txt', [ intent.name, ...utterances ].join('\r\n'))
    
  const cp = currentStack.slice(0)
  cp.push({ sender: 'me', msg: intent.name })
  cp.push({ sender: 'bot', msg: '!INCOMPREHENSION' })
    
  if (intent.children) {
    intent.children.forEach((child) => {
      follow(child, cp)
    })
  } else {
    
    const file = string_to_slug(cp.filter((m) => m.sender === 'me').map((m) => m.msg).join('_')) + '.' + language + '.convo.txt'
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












