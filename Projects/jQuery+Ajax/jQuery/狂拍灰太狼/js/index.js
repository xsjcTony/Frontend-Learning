$(function () {
  // game rules
  $(".rule").click(function () {
    $(".rule-detailed").stop().fadeIn(100);
  });
  $(".close").click(function () {
    $(".rule-detailed").stop().fadeOut(100);
  });
  // game start
  $(".start").click(function () {
    $(this).stop().fadeOut(100);
    progressHandler();
    startWolfAnimation();
  });
  // game restart
  $(".restart").click(function () {
    $(".mask").stop().fadeOut(100);
    $(".score").text(0);
    progressHandler();
    startWolfAnimation();
  });
});

let wolfTimer;

function progressHandler() {
  $(".progress").css({
    width: 180
  });
  let timer = setInterval(function () {
    let progressWidth = $(".progress").width();
    progressWidth -= 1;
    $(".progress").css({
      width: progressWidth
    });
    // game over
    if(progressWidth <= 0) {
      clearInterval(timer);
      $(".mask").stop().fadeIn(100);
      stopWolfAnimation();
    }
  }, 100);
}

function startWolfAnimation() {
  // data
  let wolf_dad = ['images/h0.png', 'images/h1.png', 'images/h2.png', 'images/h3.png', 'images/h4.png', 'images/h5.png', 'images/h6.png', 'images/h7.png', 'images/h8.png', 'images/h9.png'];
  let wolf_son = ['images/x0.png', 'images/x1.png', 'images/x2.png', 'images/x3.png', 'images/x4.png', 'images/x5.png', 'images/x6.png', 'images/x7.png', 'images/x8.png', 'images/x9.png'];
  let positions = [
    { left: "100px", top: "115px" },
    { left: "20px", top: "160px" },
    { left: "190px", top: "142px" },
    { left: "105px", top: "193px" },
    { left: "19px", top: "221px" },
    { left: "202px", top: "212px" },
    { left: "120px", top: "275px" },
    { left: "30px", top: "295px" },
    { left: "209px", top: "297px" }
  ];

  // wolf image
  let wolfImage = $("<img src='' class='wolf-image' alt>");
  let positionIndex = Math.round(Math.random() * 8);
  wolfImage.css({
    position: "absolute",
    left: positions[positionIndex].left,
    top: positions[positionIndex].top
  });
  let wolfType = Math.round(Math.random()) === 0 ? wolf_dad : wolf_son;
  window.wolfIndex = 0;
  window.wolfIndexEnd = 5;
  wolfTimer = setInterval(function () {
    if(window.wolfIndex > window.wolfIndexEnd) {
      wolfImage.remove();
      clearInterval(wolfTimer);
      startWolfAnimation();
    }
    wolfImage.attr("src", wolfType[window.wolfIndex]);
    window.wolfIndex++;
  }, 200);
  $(".container").append(wolfImage);

  gameRules(wolfImage);
}

function stopWolfAnimation() {
  $(".wolf-image").remove();
  clearInterval(wolfTimer);
}

function gameRules(wolfImage) {
  wolfImage.one("click", function () {
    window.wolfIndex = 6;
    window.wolfIndexEnd = 9;
    if($(this).attr("src").includes("h")) {
      $(".score").text(parseInt($(".score").text()) + 10);
    }
    else {
      $(".score").text(parseInt($(".score").text()) - 10);
    }
  });
}