class BaseModel {
  constructor ({ code, msg, data }) {
    this.code = code
    this.msg = msg
    this.data = data
  }
}

export class SuccessModel extends BaseModel {
  constructor ({ code = 200, msg, data }) {
    super({ code, msg, data })
  }
}

export class ErrorModel extends BaseModel {
  constructor ({ code = -1, msg, data }) {
    super({ code, msg, data })
  }
}
