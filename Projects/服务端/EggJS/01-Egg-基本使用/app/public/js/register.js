$(function () {
    // 用户名校验
    $('#userName').blur(function () {
        let username = this.value;
        if (username) {
            $.post("/api/user/exists", function (result) {
                if (result.code !== 200) {
                    $('#userNameTip').css({display: 'block'});
                }else{
                    $('#userNameTip').css({display: 'none'});
                }
            });
        }
    });
    // 密码校验
    $('#password').blur(function () {
        let pwdRegex = /^[A-Za-z0-9]{6,20}$/;
        if (!pwdRegex.test(this.value)) {
            $('#passwordTip').css({display: 'block'});
        }else{
            $('#passwordTip').css({display: 'none'});
        }
    });
    // 密码校验
    $('#repPwd').blur(function () {
        if ($('#password').val() !== this.value) {
            $('#repetitionTip').css({display: 'block'});
        }else{
            $('#repetitionTip').css({display: 'none'});
        }
    });
    // 提交前校验
    $("input[type='submit']").click(function (event) {
        if(!$('#userName').val() || !$('#password') || !$('#repPwd')){
            alert('请录入完整信息');
            event.preventDefault();
        }
    });
});