// TODO: challenge generate 5 content file in its folder ...
// need folder name such as `c1` ...
const fs = require('fs')

const args = process.argv

if (args.length < 3) {
  return console.warn('## no folder name assigned!')
}

const folder = args[2]

console.log(`=== generate content for folder: ${folder}`)

const dir = `./challenges/${folder}`

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
  console.log(`>>> folder: ${folder} created!`)
}

const option = { encoding: 'utf8', flag: 'r' }

// read base file
const tmplBaseFile = './challenges/cx_base.txt'
const baseFileContent = fs.readFileSync(tmplBaseFile, option)
// write the base file
const targetBaseFile = `./challenges/${folder}/${folder}_base.txt`
fs.writeFileSync(targetBaseFile, baseFileContent)

const tmplSubtitleMD = './challenges/cx_subtitle.md'
const subtitleContent = fs.readFileSync(tmplSubtitleMD, option)
// write the subtitle
const targetSubtitle = `./challenges/${folder}/${folder}_subtitle.md`
fs.writeFileSync(targetSubtitle, subtitleContent)

// read test json
const tmplTestJSON = './challenges/cx_test.json'
const testFileContent = fs.readFileSync(tmplTestJSON, option)

// write test json
const targetTestJSON = `./challenges/${folder}/${folder}_test.json`
fs.writeFileSync(targetTestJSON, testFileContent)

// write empty start & final file
const targetStartFile = `./challenges/${folder}/${folder}_start.txt`
const targetFinalFile = `./challenges/${folder}/${folder}_final.txt`
fs.writeFileSync(targetStartFile, `// start code for challenge ${folder}`)
fs.writeFileSync(targetFinalFile, `// final code for challenge ${folder}`)

// challenges.json
const challengesJSON = './data/challenges.json'
const challengesContent = fs.readFileSync(challengesJSON, option)
const challenges = JSON.parse(challengesContent)
const challengeId = parseInt(folder.substring(1))
const today = new Date()
const yearMonthDay = `${today.getFullYear()}/${
  today.getMonth() + 1
}/${today.getDate()}`
const challengesWithNew = challenges.map((clg) => {
  if (clg.id === challengeId) {
    return {
      ...clg,
      baseCode: `challenges/${folder}/${folder}_base.txt`,
      finalCode: `challenges/${folder}/${folder}_final.txt`,
      startCode: `challenges/${folder}/${folder}_start.txt`,
      testCode: `challenges/${folder}/${folder}_test.json`,
      videoSubtitle: `challenges/${folder}/${folder}_subtitle.md`,
      createDate: yearMonthDay,
    }
  } else {
    return clg
  }
})

const prettyJSON = JSON.stringify(challengesWithNew, null, 2)
fs.writeFileSync(challengesJSON, prettyJSON)

console.log(`========== challenges updated! ======`)
