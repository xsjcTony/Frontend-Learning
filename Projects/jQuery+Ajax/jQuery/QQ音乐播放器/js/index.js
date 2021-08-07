$(function () {
  // variables
  let $contentList = $(".content-list"),
    $musicPlay = $(".music-play"),
    player = new Player($("audio")),
    progressTime,
    progressVolume,
    lyric;

  // custom scroll bar
  $contentList.mCustomScrollbar({
    theme: "minimal-dark"
  });

  // load song data
  getPlayerList();

  // initialize progress bar
  initProgressBar();

  // initialize buttons' events
  initButtonEvents();

  // functions
  function getPlayerList() {
    $.ajax({
      url: "source/musiclist.json",
      dataType: "json",
      success: function (data) {
        player.musicList = data;
        // traverse for each music
        let musicList = $(".content-list ul");
        $.each(data, function (index, element) {
          let music = createMusicItem(index, element);
          musicList.append(music);
        });
        initMusicInfo(data[0]);
        initMusicLyric(data[0]);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  function initMusicInfo(music) {
    $(".song-info-pic>img").attr("src", music.cover);
    $(".song-info-name>a").text(music.name);
    $(".song-info-singer>a").text(music.singer);
    $(".song-info-album>a").text(music.album);
    $(".music-progress-name").text(music.name + " - " + music.singer);
    $(".music-progress-time").text("00:00 / " + music.time);
    $(".mask-bg").css({
      backgroundImage: `url("${music.cover}")`
    });
  }

  function initMusicLyric(music) {
    // clear previous lyrics
    $(".song-lyric").html("");

    lyric = new Lyric(music.link_lrc);
    lyric.loadLyric(function () {
      $.each(lyric.lyrics, function (index, element) {
        let item = $(`<li>${element}</li>`);
        $(".song-lyric").append(item);
      });
    });
  }

  function createMusicItem(index, element) {
    let $item = $("<li class=\"list-music\">\n" +
      "          <div class=\"list-check\"><i></i></div>\n" +
      "          <div class=\"list-number\">" + (index + 1) + "</div>\n" +
      "          <div class=\"list-name\">" + element.name + "\n" +
      "            <div class=\"list-menu\">\n" +
      "              <a href=\"javascript:\" title=\"播放\" class='list-menu-play'></a>\n" +
      "              <a href=\"javascript:\" title=\"添加\"></a>\n" +
      "              <a href=\"javascript:\" title=\"下载\"></a>\n" +
      "              <a href=\"javascript:\" title=\"分享\"></a>\n" +
      "            </div></div>\n" +
      "          <div class=\"list-singer\">" + element.singer + "</div>\n" +
      "          <div class=\"list-time\">\n" +
      "            <span>" + element.time + "</span>\n" +
      "            <a href=\"javascript:\" title=\"删除\" class='list-menu-delete'></a>\n" +
      "          </div>\n" +
      "        </li>");

    $item.get(0).index = index;
    $item.get(0).music = element;
    return $item;
  }

  function initButtonEvents() {
    // monitor song hover
    $contentList.delegate(".list-music", "mouseenter", function () {
      $(this).find(".list-menu").stop().show();
      $(this).find(".list-time>a").stop().show();
      $(this).find(".list-time>span").stop().hide();
    });
    $contentList.delegate(".list-music", "mouseleave", function () {
      $(this).find(".list-menu").stop().hide();
      $(this).find(".list-time>a").stop().hide();
      $(this).find(".list-time>span").stop().show();
    });

    // monitor checkbox onclick
    $contentList.delegate(".list-check", "click", function () {
      $(this).toggleClass("list-checked");
    });

    // monitor list menu play button onclick
    $contentList.delegate(".list-menu-play", "click", function () {
      let $musicItem = $(this).parents(".list-music");
      // toggle button icon
      $(this).toggleClass("list-menu-play2");
      // restore all other play button to play icon
      $musicItem.siblings(".list-music").find(".list-menu-play").removeClass("list-menu-play2");
      // un-highlight all other musics' text
      $musicItem.siblings(".list-music").find("div").css({
        color: "rgba(255, 255, 255, 0.5)"
      });
      // all wave to number
      $musicItem.siblings(".list-music").find(".list-number").removeClass("list-number2");
      // change the play button in the footer
      if($(this).hasClass("list-menu-play2")) {
        // playing
        $musicPlay.addClass("music-play2");
        // highlight text
        $musicItem.find("div").css({
          color: "#ffffff"
        });
        // number to wave
        $musicItem.find(".list-number").addClass("list-number2");
      }
      else {
        // paused
        $musicPlay.removeClass("music-play2");
        // un-highlight text
        $musicItem.find("div").css({
          color: "rgba(255, 255, 255, 0.5)"
        });
        // wave to number
        $musicItem.find(".list-number").removeClass("list-number2");
      }

      // change music info
      initMusicInfo($musicItem.get(0).music);

      // change music lyric
      initMusicLyric($musicItem.get(0).music);

      // play music
      player.playMusic($musicItem.get(0).index, $musicItem.get(0).music);
    });

    // monitor play / pause button onclick
    $musicPlay.click(function () {
      // check whether any music has been played
      if(player.currentIndex === -1) {
        // music not played yet
        $(".list-music").eq(0).find(".list-menu-play").trigger("click");
      }
      else {
        // music has been played
        $(".list-music").eq(player.currentIndex).find(".list-menu-play").trigger("click");
      }
    });

    // monitor previous music button onclick
    $(".music-previous").click(function () {
      $(".list-music").eq(player.previousIndex()).find(".list-menu-play").trigger("click");
    });

    // monitor next music button onclick
    $(".music-next").click(function () {
      $(".list-music").eq(player.nextIndex()).find(".list-menu-play").trigger("click");
    });

    // monitor delete music button onclick
    $contentList.delegate(".list-menu-delete", "click", function () {
      // check if playing
      if($(this).parents(".list-music").get(0).index === player.currentIndex) {
        $(".music-next").trigger("click");
      }

      // remove music
      player.changeMusic($(this).parents(".list-music").get(0).index);
      $(this).parents(".list-music").remove();

      // reorder music number
      $(".list-music").each(function (index, element) {
        element.index = index;
        $(element).find(".list-number").text(index + 1);
      });
    });

    // monitor music play progress
    player.musicTimeUpdate(function (currentTime, duration, timeStr) {
      // time update
      $(".music-progress-time").text(timeStr);
      progressTime.setProgress(currentTime / duration * 100);
      // lyric update
      let index = lyric.currentIndex(currentTime);
      console.log(index);
      let item = $(".song-lyric li").eq(index);
      item.addClass("current");
      item.siblings().removeClass("current");

      if(index <= 5) {
        $(".song-lyric").css({
          marginTop: 0
        });
        return;
      }
      $(".song-lyric").css({
        marginTop: ((-index + 5) * 30)
      });
    });

    // monitor volume button onclick
    $(".music-volume-icon").click(function () {
      $(this).toggleClass("music-volume-icon2");
      if($(this).hasClass("music-volume-icon2")) {
        // muted
        player.musicVolumeSetTo(0);
        $(".music-volume-line").css({
          width: "0"
        });
      }
      else {
        // note muted
        player.musicVolumeSetTo(0.5);
        $(".music-volume-line").css({
          width: "50%"
        });
      }
    });
  }

  function initProgressBar() {
    let $progressBarTime = $(".music-progress-bar");
    let $progressLineTime = $(".music-progress-line");
    let $progressDotTime = $(".music-progress-dot");
    progressTime = new Progress($progressBarTime, $progressLineTime, $progressDotTime);
    progressTime.progressClick(function (ratio) {
      player.musicJumpTo(ratio);
    });
    progressTime.progressMove(function (ratio) {
      player.musicJumpTo(ratio);
    });
    // volume
    let $progressBarVolume = $(".music-volume-bar");
    let $progressLineVolume = $(".music-volume-line");
    let $progressDotVolume = $(".music-volume-dot");
    progressVolume = new Progress($progressBarVolume, $progressLineVolume, $progressDotVolume);
    progressVolume.progressClick(function (ratio) {
      player.musicVolumeSetTo(ratio);
    });
    progressVolume.progressMove(function (ratio) {
      player.musicVolumeSetTo(ratio);
    });
  }
});

