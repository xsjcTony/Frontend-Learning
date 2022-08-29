export default {
  privilegeName: {
    type: 'string',
    trim: true,
    format: /^(?!\s*$).+/,
    message: 'Privilege name cannot be empty',
    required: true
  },
  privilegeDescription: {
    type: 'string',
    trim: true,
    format: /^(?!\s*$).+/,
    message: 'Privilege description cannot be empty',
    required: true
  },
  level: {
    type: 'enum',
    values: [1, 2],
    message: 'Privilege level must be either 1 or 2',
    required: true
  },
  privilegeUrl: {
    type: 'string',
    format: /^\/\S*$/,
    message: 'Privilege URL cannot be empty',
    required: false
  },
  parentId: {
    type: 'number',
    message: `Parent's id must be a number`,
    required: true
  },
  requestMethod: {
    type: 'enum',
    values: ['get', 'post', 'put', 'delete'],
    message: 'Request method must be one of get, post, put or delete',
    required: false
  }
}
