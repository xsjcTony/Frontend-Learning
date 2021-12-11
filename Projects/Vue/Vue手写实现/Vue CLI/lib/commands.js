import createAction from './create.js'
import addAction from './add.js'

export default {
  create: {
    command: 'create <app-name>',
    alias: 'c',
    options: [
      {
        option: '-g, --git [message]',
        optionDescription: 'Force git initialization with initial commit message'
      }
    ],

    description: 'create a new project powered by vue-cli-service',
    action: createAction
  },

  add: {
    command: 'add <plugin> [pluginOptions]',
    alias: 'a',
    description: 'install a plugin and invoke its generator in an already created project',
    options: [],
    action: addAction
  }
}
