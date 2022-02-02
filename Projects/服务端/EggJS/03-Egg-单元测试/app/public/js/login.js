$(() => {
  function getCookie (key) {
    const res = document.cookie.split(';')
    for (let i = 0; i < res.length; i++) {
      const temp = res[i].split('=')
      if (temp[0].trim() === key) {
        return temp[1]
      }
    }
  }

  const csrfToken = getCookie('csrfToken')

  function csrfSafeMethod (method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))
  }

  $.ajaxSetup({
    beforeSend (xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader('x-csrf-token', csrfToken)
      }
    }
  })

  // 提交前校验
  $('input[type=\'submit\']').click(function (event) {
    if (!$('#username').val() || !$('#password')) {
      alert('请录入完整信息')
    } else {
      $.post('/api/user/login', {
        username: $('#username').val(),
        password: $('#password').val()
      })
    }
    event.preventDefault()
  })
})
