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

  let username = ''
  let password = ''
  let gender = $('#gender').val()

  // 用户名校验
  $('#userName').blur(function () {
    username = this.value
    /*
    if (username) {
      $.post('/api/user/exists', (result) => {
        if (result.code !== 200) {
          $('#userNameTip').css({ display: 'block' })
        } else {
          $('#userNameTip').css({ display: 'none' })
        }
      })
    }
    */
  })
  // 密码校验
  $('#password').blur(function () {
    password = this.value

    const pwdRegex = /^[A-Za-z0-9]{6,20}$/
    if (!pwdRegex.test(password)) {
      $('#passwordTip').css({ display: 'block' })
    } else {
      $('#passwordTip').css({ display: 'none' })
    }
  })
  // 密码校验
  $('#repPwd').blur(function () {
    if ($('#password').val() !== password) {
      $('#repetitionTip').css({ display: 'block' })
    } else {
      $('#repetitionTip').css({ display: 'none' })
    }
  })
  // 性别
  $('#gender').change(function () {
    gender = this.value
  })
  // 提交前校验
  $('input[type=\'submit\']').click((event) => {
    if (!$('#userName').val() || !$('#password') || !$('#repPwd')) {
      alert('请录入完整信息')
    } else {
      $.post('/api/user/register', {
        username,
        password,
        gender
      })
    }
    event.preventDefault()
  })
})
