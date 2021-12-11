import { program } from 'commander'
import chalk from 'chalk'


export default (methodName, infoStr) => {
  program.Command.prototype[methodName] = function (...args) {
    this.outputHelp()
    console.log()
    console.log(`  ${ chalk.red(infoStr(...args)) }`)
    console.log()
    process.exit(1)
  }
}
