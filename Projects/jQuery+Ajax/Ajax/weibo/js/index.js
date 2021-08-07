$(function () {
  // monitor textarea content change
  /*$("body").delegate(".comment","propertychange input", function () {
    console.log($(this).val());
  });*/
  $(".comment").on("input", function () {
    if($(this).val().length > 0) {
      $(".send").prop("disabled", false);
    } else {
      $(".send").prop("disabled", true);
    }
  });

  // get page number
  getMessagePage($.getCookie("page"));

  // get messages from database
  getMessageList($.getCookie("page"));

  // monitor send button onclick
  $(".send").click(function () {
    // get user input
    let text = $(".comment").val();
    if(text !== "") {
      $.ajax({
        type: "get",
        url: "weibo.php",
        data: "act=add&content=" + text,
        success: function (msg) {
          // {error: 0, id: 1, time: 1628341285, acc: 0, ref: 0}
          // {error:0, id: 新添加内容的ID, time: 添加时间, acc: 顶次数, ref: 踩次数}
          // Uncaught SyntaxError: Unexpected token e in JSON at position 1
          let obj = eval("(" + msg + ")");
          obj.content = text;
          let weibo = createElement(obj);
          weibo.get(0).obj = obj;
          $(".messageList").prepend(weibo);
          $(".comment").val("");
          // get page number
          getMessagePage(1);
          // delete last post if number of posts on page is more than 5
          getMessageList(1);
        },
        error: function (xhr) {
          console.log(xhr.status);
        }
      });
    }
  });

  // monitor thumb-up button onclick
  $("body").delegate("#thumb_up", "click", function () {
    $(this).text(parseInt($(this).text()) + 1);
    $.ajax({
      type: "get",
      url: "weibo.php",
      data: "act=acc&id=" + $(this).parents(".info").get(0).obj.id,
      success: function (msg) {},
      error: function (xhr) {
        console.log(xhr.status);
      }
    });
  });

  // monitor thumb-down button onclick
  $("body").delegate("#thumb_down", "click", function () {
    $(this).text(parseInt($(this).text()) + 1);
    $.ajax({
      type: "get",
      url: "weibo.php",
      data: "act=ref&id=" + $(this).parents(".info").get(0).obj.id,
      success: function (msg) {},
      error: function (xhr) {
        console.log(xhr.status);
      }
    });
  });

  // monitor delete button onclick
  $("body").delegate("#delete", "click", function () {
    $(this).parents(".info").remove();
    $.ajax({
      type: "get",
      url: "weibo.php",
      data: "act=del&id=" + $(this).parents(".info").get(0).obj.id,
      success: function (msg) {
        getMessageList($(".current").text());
        if($(".info").length === 0 && $.getCookie("page") > 1) {
          let pageNumber = $.getCookie("page");
          $.addCookie("page", --pageNumber + "");
          getMessagePage(pageNumber);
          getMessageList(pageNumber);
        }
      },
      error: function (xhr) {
        console.log(xhr.status);
      }
    });
  });

  // monitor pagination onclick
  $("body").delegate(".pagination>a", "click", function () {
    getMessageList($(this).text());
    $(this).siblings().removeClass("current");
    $(this).addClass("current");
    $.addCookie("page", $(this).text())
  });
});

function createElement(obj) {
  return $("<div class=\"info\">\n" +
    "      <p class=\"info-text\">" + obj.content + "</p>\n" +
    "      <p class=\"info-operation\">\n" +
    "        <span class=\"info-time\">" + dateFormat("yyyy-MM-dd hh:mm:ss", obj.time) + "</span>\n" +
    "        <span class=\"info-handle\">\n" +
    "          <a href=\"javascript:\" id='thumb_up'>" + obj.acc + "</a>\n" +
    "          <a href=\"javascript:\" id='thumb_down'>" + obj.ref + "</a>\n" +
    "          <a href=\"javascript:\" id='delete'>删除</a>\n" +
    "        </span>\n" +
    "      </p>\n" +
    "    </div>");
}

function dateFormat(format, time) {
  let date = new Date(time * 1000);
  // deal with year
  // get yyyy
  let yearStr = format.match(/y+/); // find one or more "y"
  if(yearStr) {
    // replace yyyy by current year
    format = format.replace(yearStr[0], (date.getFullYear() + "").substr(4 - yearStr[0].length));
  }

  // deal with other time
  let obj = {
    "M+": date.getMonth() + 1, // month need to be added by 1
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  // traverse to get all time
  for(let key in obj) {
    let formatStr = format.match(new RegExp(key));
    format = format.replace(formatStr[0], (formatStr[0].length === 1) ? obj[key] : ("00" + obj[key]).substr((obj[key] + "").length));
  }

  return format;
}

function getMessageList(pageNumber) {
  pageNumber = pageNumber || 1;
  $.ajax({
    type: "get",
    url: "weibo.php",
    data: "act=get&page=" + pageNumber,
    success: function (msg) {
      let obj = eval(`(${msg})`);
      $(".messageList").html("");
      $.each(obj, function (index, element) {
        let weibo = createElement(element);
        weibo.get(0).obj = element;
        $(".messageList").append(weibo);
      });
    },
    error: function (xhr) {
      console.log(xhr.status);
    }
  });
}

function getMessagePage(current) {
  current = current || 1;
  $.ajax({
    type: "get",
    url: "weibo.php",
    data: "act=get_page_count",
    success: function (msg) {
      let obj = eval(`(${msg})`);
      $(".pagination").html("");
      for(let i = 0; i < obj.count; i++) {
        let a = $(`<a href="javascript:">${i + 1}</a>`);
        // first page
        if(i === current - 1) {
          a.addClass("current");
        }
        $(".pagination").append(a);
      }
    },
    error: function (xhr) {
      console.log(xhr.status);
    }
  });
}