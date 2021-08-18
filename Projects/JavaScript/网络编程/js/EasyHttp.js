class EasyHttp {
  static get(url, params) {
    return new Promise((resolve, reject) => {
      if(params instanceof Object) {
        let res = [];
        for(let key in params) {
          res.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        }
        url = `${url}?${res.join("&")}`;
      }
      fetch(url, {
        method: "get"
      }).then(res => resolve(res.json()))
        .catch(error => reject(error));
    })
  }
  static post(url, params) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "post",
        body: JSON.stringify(params)
      }).then(res => resolve(res.json()))
        .catch(error => reject(error));
    })
  }
}