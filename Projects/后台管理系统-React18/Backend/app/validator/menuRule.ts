export default {
  menuRule: {
    type: 'string',
    trim: true,
    format: /^(?!\s*$).+/,
    message: 'Menu name cannot be empty',
    required: true
  },
  menuDescription: {
    type: 'string',
    trim: true,
    format: /^(?!\s*$).+/,
    message: 'Menu description cannot be empty',
    required: true
  },
  level: {
    type: 'enum',
    values: [1, 2],
    message: 'Menu level must be either 1 or 2',
    required: true
  },
  menuKey: {
    type: 'string',
    format: /^(?!\s*$).+/,
    message: 'Menu key cannot be empty',
    required: true
  },
  menuIcon: {
    type: 'string',
    format: /^(?!\s*$).+/,
    message: 'Menu icon cannot be empty',
    required: false
  },
  parentId: {
    type: 'number',
    message: `Parent's id must be a number`,
    required: true
  }
}
