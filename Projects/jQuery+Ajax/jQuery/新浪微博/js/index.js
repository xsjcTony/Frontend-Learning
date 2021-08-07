$(function () {
  // monitor textarea content change
  /*$("body").delegate(".comment","propertychange input", function () {
    console.log($(this).val());
  });*/
  $(".comment").on("input", function () {
    if($(this).val() > 0) {
      $(".send").prop("disabled", false);
    }
    else {
      $(".send").prop("disabled", true);
    }
  })

  // monitor send button onclick
  $(".send").click(function () {
    // get user input
    let text = $(".comment").val();
    let weibo = createElement(text);
   $(".messageList").prepend(weibo);
  });

  // monitor thumb-up button onclick
  $("body").delegate("#thumb_up", "click", function () {
    $(this).text(parseInt($(this).text()) + 1);
  });

  // monitor thumb-down button onclick
  $("body").delegate("#thumb_down", "click", function () {
    $(this).text(parseInt($(this).text()) + 1);
  });

  // monitor delete button onclick
  $("body").delegate("#delete", "click", function () {
    $(this).parents(".info").remove();
  });
});

function createElement(text) {
  return $("<div class=\"info\">\n" +
    "      <p class=\"info-text\">" + text + "</p>\n" +
    "      <p class=\"info-operation\">\n" +
    "        <span class=\"info-time\">" + dateFormat("yyyy-MM-dd hh:mm:ss", new Date()) + "</span>\n" +
    "        <span class=\"info-handle\">\n" +
    "          <a href=\"javascript:\" id='thumb_up'>0</a>\n" +
    "          <a href=\"javascript:\" id='thumb_down'>0</a>\n" +
    "          <a href=\"javascript:\" id='delete'>删除</a>\n" +
    "        </span>\n" +
    "      </p>\n" +
    "    </div>");
}

function dateFormat(format, date) {
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
