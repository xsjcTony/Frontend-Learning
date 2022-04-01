export default {
  username: {
    type: 'string',
    trim: true,
    // 只能是数字或字母
    format: /^[A-Za-z0-9]{6,20}$/,
    message: 'Username must be any of a-z, A-Z or 0-9, and between 6 and 20 (both inclusive) characters long.'
  },
  email: {
    type: 'string',
    trim: true,
    format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: 'Email address is invalid.',
    required: false
  },
  password: {
    type: 'string',
    trim: true,
    // 必须是数字字母符号组合
    format: /^((?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,.#%'+*\-:;^_`].*))[,.#%'+*\-:;^_`0-9A-Za-z]{8,20}$/,
    message: 'Password must include characters, numbers, symbols, and between 8 and 20 (both inclusive) characters long.'
  }
}
