(function() {
    // let timerId = null;
    function linearAnimation(ele, obj, fn) {
        clearInterval(ele.timerId);
        ele.timerId = setInterval(function () {
            let flag = true;
            for(let key in obj){
                let target = obj[key];
                // 1.拿到元素当前的位置
                let style = getComputedStyle(ele);
                let begin = parseFloat(style[key]) || 0;
                // 2.定义变量记录步长
                let step = (begin - target) > 0 ? -13 : 13;
                // 3.计算新的位置
                begin += step;
                console.log(Math.abs(target - begin), Math.abs(step));
                if(Math.abs(target - begin) > Math.abs(step)){
                    flag = false;
                }else{
                    begin = target;
                }
                // 4.重新设置元素的位置
                ele.style[key] = begin + "px";
            }
            if(flag){
                clearInterval(ele.timerId);
                fn && fn();
            }
        }, 100);
    }
    function easeAnimation(ele, obj, fn) {
        clearInterval(ele.timerId);
        ele.timerId = setInterval(function () {
            let flag = true;
            for(let key in obj){
                let target = obj[key];
                // 1.拿到元素当前的位置
                let style = getComputedStyle(ele);
                let begin = parseInt(style[key]) || 0;
                // 2.定义变量记录步长
                // 公式: (结束位置 - 开始位置) * 缓动系数(0 ~1)
                let step = (target - begin) * 0.3;
                // 3.计算新的位置
                begin += step;
                if(Math.abs(Math.floor(step)) > 1){
                   flag = false;
                }else{
                    begin = target;
                }
                // 4.重新设置元素的位置
                ele.style[key] = begin + "px";
            }
            if(flag){
                clearInterval(ele.timerId);
                fn && fn();
            }
        }, 100);
    }

    // 将函数绑定到window对象上, 这样全局就可以使用了
    window.linearAnimation = linearAnimation;
    window.easeAnimation = easeAnimation;
})();