export default {
  roleName: {
    type: 'string',
    trim: true,
    format: /^(?!\s*$).+/,
    message: 'Role name cannot be empty',
    required: true
  },
  roleDescription: {
    type: 'string',
    trim: true,
    format: /^(?!\s*$).+/,
    message: 'Role description cannot be empty',
    required: true
  }
}
