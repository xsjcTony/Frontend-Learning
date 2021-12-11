#! /usr/bin/env node

import chalk from 'chalk'
import { program } from 'commander'
import constants from '../lib/const.cjs'
import commands from '../lib/commands.js'
import enhanceErrorMessages from '../lib/util/enhanceErrorMessage.js'


// usage & version
program
  .version(`@aue/cli v${ constants.version }`)
  .name('aue')
  .usage('<command> [options]')


// commands
Reflect.ownKeys(commands).forEach((key) => {
  const command = commands[key]

  let cmd = program
    .command(command.command)
    .alias(command.alias)
    .description(command.description)

  command.options.forEach((option) => {
    cmd = cmd.option(option.option, option.optionDescription)
  })

  cmd.action(command.action)
})


// output help information on unknown commands
program
  .arguments('<command>')
  .action((command) => {
    program.outputHelp()
    console.log(`  ${ chalk.red(`Unknown command ${ chalk.yellow(command) }.`) }`)
    console.log()
  })


// extra useful information on --help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${ chalk.hex('#ffc0cb')('aue <command> --help') } for detailed usage of given command.`)
  console.log()
})


// enhance common error messages
enhanceErrorMessages('missingArgument', argName => `Missing required argument ${ chalk.yellow(`<${ argName }>`) }.`)
enhanceErrorMessages('unknownOption', optionName => `Unknown option ${ chalk.yellow(optionName) }.`)
enhanceErrorMessages('optionMissingArgument', (option, flag) => `Missing required argument for option ${ chalk.yellow(option.flags) }${ flag ? `, got ${ chalk.yellow(flag) }` : `` }`)


// no arguments
if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(1)
}


// parse arguments
program.parse(process.argv)
