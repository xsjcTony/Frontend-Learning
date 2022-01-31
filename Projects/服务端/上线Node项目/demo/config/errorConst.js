const errorConst = {
  userRegDataError (data) {
    return {
      code: 1001,
      msg: '注册信息不正确',
      data
    }
  },
  userRegDataExists (data) {
    return {
      code: 1002,
      msg: '用户已存在',
      data
    }
  },
  userRegError (data) {
    return {
      code: 1003,
      msg: '注册失败',
      data
    }
  },
  userLoginError (data) {
    return {
      code: 1004,
      msg: '登录失败',
      data
    }
  }
}

export default errorConst
