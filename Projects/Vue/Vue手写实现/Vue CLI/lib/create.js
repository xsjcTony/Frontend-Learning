import axios from 'axios'
import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
import downloadGitRepo from 'download-git-repo'
import constants from './const.cjs'
import { promisify } from 'util'
import path from 'path'
import ncp from 'ncp'
import fsPromise from 'fs/promises'
import shell from 'shelljs'
import boxen from 'boxen'
import updateNotifier from 'update-notifier'


const downloadGitRepoPromise = promisify(downloadGitRepo)
const ncpPromise = promisify(ncp)
const shellExecPromise = promisify(shell.exec)


const spinner = ora({
  color: 'cyan'
})


const getTemplateNames = async () => {
  try {
    return (await axios.get('https://api.github.com/orgs/it666-com/repos')).data
  } catch (err) {
    spinner.stopAndPersist({ text: `${ chalk.bgRed('ERROR') } ${ chalk.red('Failed to download template names:') } ${ chalk.yellow(err.response.status) }` })
    console.log()
    process.exit(1)
  }
}


const getTemplateTags = async (templateName) => {
  try {
    return (await axios.get(`https://api.github.com/repos/it666-com/${ templateName }/tags`)).data
  } catch (err) {
    spinner.stopAndPersist({ text: `${ chalk.bgRed('ERROR') } ${ chalk.red('Failed to download template tags:') } ${ chalk.yellow(err.response.status) }` })
    console.log()
    process.exit(1)
  }
}


const waitLoading = (message, successMessage, fn) => async (...args) => {
  console.log()
  spinner.start(`${ chalk.hex('#ffc0cb')(message) }`)
  const data = await fn(...args)
  spinner.stopAndPersist({ text: `${ chalk.green.inverse(' DONE ') } ${ chalk.green(successMessage) }` })
  console.log()
  return data
}


const downloadTemplate = async (templateName, templateTag) => {
  const url = `github:it666-com/${ templateName }${ templateTag ? `#${ templateTag }` : '' }`
  const path = process.platform === 'win32' ?
    `${ constants.templateDownloadDirPath }\\${ templateName }${ templateTag ? `#${ templateTag }` : '' }` :
    `${ constants.templateDownloadDirPath }/${ templateName }${ templateTag ? `#${ templateTag }` : '' }`

  try {
    await downloadGitRepoPromise(url, path)
  } catch (err) {
    spinner.stopAndPersist({ text: `${ chalk.red.inverse(' ERROR ') } ${ chalk.red('Failed to download template:') } ${ chalk.yellow(err.statusCode) }` })
    console.log()
    process.exit(1)
  }

  return path
}


const copyTemplate = async (source, target) => {
  try {
    const res = await fsPromise.stat(target)
    if (res.isDirectory() || res.isFile()) {
      spinner.stopAndPersist({ text: `${ chalk.red.inverse(' ERROR ') } ${ chalk.red('Project already exists') }` })
      console.log()
      process.exit(1)
    }
  } catch (err) {}

  try {
    await ncpPromise(source, target)
  } catch (err) {
    spinner.stopAndPersist({ text: `${ chalk.red.inverse(' ERROR ') } ${ chalk.red('Failed to copy template') }` })
    console.log()
    process.exit(1)
  }
}


const installDependencies = async (projectName) => {
  try {
    shell.cd(projectName)
    await shellExecPromise('npm install', { silent: true })
  } catch (err) {
    spinner.stopAndPersist({ text: `${ chalk.red.inverse(' ERROR ') } ${ chalk.red('Failed to install project dependencies') }` })
    console.error(err)
    console.log()
    process.exit(1)
  }
}


const checkUpdate = () => {
  const notifier = updateNotifier({
    pkg: constants.pkg,
    updateCheckInterval: 0
  })

  if (notifier.update) {
    const messages = []

    messages.push(`${ chalk.yellow.inverse(' WARN ') } ${ chalk.yellow('Aue-CLI is not the latest version.') })`)
    messages.push(`Current version: ${ chalk.magenta(`v${ notifier.update.current }`) }`)
    messages.push(`Latest version: ${ chalk.green(`v${ notifier.update.latest }`) }`)
    messages.push(`Update to latest version: ${ chalk.cyan(`npm i -g ${ constants.pkg.name }`) }`)

    console.log(boxen(messages.join('\n'), {
      padding: {
        top: 1,
        right: 5,
        bottom: 1,
        left: 5
      },

      margin: {
        top: 1,
        right: 5,
        bottom: 1,
        left: 5
      },

      textAlignment: 'center',
      borderColor: '#ffc0cb',
      borderStyle: 'round'
    }))
  }
}


export default async (projectName) => {
  checkUpdate()
  console.log(`\n✨  Creating project in ${ chalk.yellow(path.resolve(projectName)) }.`)

  // download template names
  const templateNames = (await waitLoading('Downloading template names', 'Successfully downloaded template names', getTemplateNames)()).map(template => template.name)

  const { selectedTemplateName } = await inquirer
    .prompt({
      name: 'selectedTemplateName',
      type: 'list',
      choices: templateNames,
      message: 'Please select a template for the project:'
    })

  // download template tags
  const templateTags = (await waitLoading('Downloading template tags', 'Successfully downloaded template tags', getTemplateTags)(selectedTemplateName)).map(tag => tag.name)

  const { selectedTemplateTag } = await inquirer
    .prompt({
      name: 'selectedTemplateTag',
      type: 'list',
      choices: templateTags,
      message: 'Please select the version of template:'
    })

  // download template from GitHub
  console.log('✨  Initializing git repository...')
  const templatePath = await waitLoading('Downloading template', 'Successfully downloaded template', downloadTemplate)(selectedTemplateName, selectedTemplateTag)

  // copy template to project directory
  await waitLoading('Copying template to project directory', 'Successfully copied template', copyTemplate)(templatePath, path.resolve(projectName))

  // install project dependencies
  console.log('✨  Installing additional dependencies...')
  await waitLoading('Installing project dependencies', 'Successfully installed project dependencies', installDependencies)(projectName)

  // output help information upon project created successfully
  console.log(`\n✨  Successfully created project ${ chalk.yellow(projectName) }.`)
  console.log(`✨  Get started with the following commands:\n`)
  console.log(`$ ${ chalk.hex('#ffc0cb')(`cd ${ projectName }`) }`)
  console.log(`$ ${ chalk.hex('#ffc0cb')('npm run serve') }`)
}
