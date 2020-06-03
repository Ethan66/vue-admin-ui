/**
 * Build npm lib
 */
const shell = require('shelljs')
const signale = require('signale')
const { Signale } = signale
const tasks = [
  'build:entry',
  'build:components',
  'build:style',
  'build:ts'
]

tasks.forEach(task => {
  signale.start(task)

  const interactive = new Signale({ interactive: true })
  interactive.pending(task)
  shell.exec(`npm run ${task} --silent`)
  interactive.success(task)
})
