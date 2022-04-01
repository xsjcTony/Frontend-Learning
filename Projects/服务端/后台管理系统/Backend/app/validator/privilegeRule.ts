export default {
  privilegeName: {
    type: 'string',
    trim: true,
    format: /^(?!\s*$).+/,
    message: 'Privilege name cannot be empty'
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
    values: [1, 2, 3],
    message: 'Privilege level must be one of 1, 2 or 3',
    required: true
  },
  type: {
    type: 'enum',
    values: ['menu', 'route', 'request'],
    message: 'Privilege type must be one of menu, route or request',
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
    message: 'Parent\'s id must be a number',
    required: false
  },
  requestMethod: {
    type: 'enum',
    values: ['all', 'get', 'post', 'put', 'delete'],
    message: 'Request method must be one of get, post, put, delete or all',
    required: false
  }
}
