var slider_volume = 0.6;
$(".timeline-slider").roundSlider({
    handleShape: "dot",
    width: 13,
    value: 0,
    editableTooltip: false,
    showTooltip: false,
    radius: "100",
    lineCap: "square",
    sliderType: "min-range",
    handleSize: "+13",
    drag: function (args) {
      if(window.audio){
        $('#playbtn i').removeClass('bi bi-pause-fill').addClass('bi bi-play-fill');
        window.audio.pause();
        window.timer1_paused = true;
      }
    },
    change: function (args) {
      if(window.audio){
        $('#playbtn i').removeClass('bi bi-play-fill').addClass('bi bi-pause-fill');
        window.audio.currentTime = args.value;
        window.audio.play();
        window.timer1_paused = false;
      }
    }
});
$(".timeline-slider2").roundSlider({
    handleShape: "dot",
    width: 13,
    value: 60,
    max: 100,
    editableTooltip: false,
    showTooltip: false,
    radius: "72",
    lineCap: "square",
    sliderType: "min-range",
    handleSize: "+6",

    drag: function (args) {
      window.slider_volume =  args.value / 100
      window.window.audio.volume = slider_volume;
    },
    change: function (args) {
      window.slider_volume =  args.value / 100
      window.window.audio.volume = slider_volume;
    }
});

/* Code RoundPlayer by @DiabloSat */
var play = $('#playbtn');
var audio = new Audio();
var now_track = 0;
window.audio.volume = window.slider_volume;
audio.currentTime = 0;
/*  */
function player(track){
  if (!window.audio.paused) {
    window.audio.pause();
    $('#playbtn i').removeClass('bi bi-pause-fill').addClass('bi bi-play-fill');
  }
  var playlist = JSON.parse(window.localStorage.getItem('playlist'));
  window.now_track = track;
  
  window.audio = new Audio(playlist[track].path);
  window.audio.volume = window.slider_volume;
  $('.player-block p').text(playlist[window.now_track].name);
}
$('#playbtn').on('click', function(){
  if (window.audio.paused) {
      $('#playbtn i').removeClass('bi bi-play-fill').addClass('bi bi-pause-fill');
      window.audio.play();
  }else{
    $('#playbtn i').removeClass('bi bi-pause-fill').addClass('bi bi-play-fill');
      window.audio.pause();
  }
  $(".timeline-slider").roundSlider({max: window.audio.duration});
});
var timer1_paused = false;
function setTime(){
  if(timer1_paused == false){
    $(".timeline-slider").roundSlider('setValue', window.audio.currentTime);
    if(Math.round(window.audio.currentTime) == Math.round(window.audio.duration)){
      $(".timeline-slider").roundSlider({min: 1});
      //$('#playbtn i').removeClass('bi bi-pause-fill').addClass('bi bi-play-fill');
      let playlist = JSON.parse(window.localStorage.getItem('playlist'));
      window.audio.pause();
      window.audio = new Audio(playlist[window.now_track + 1].path);
      window.audio.currentTime = 0;
      window.now_track = window.now_track + 1;
      window.audio.play();
      window.audio.volume = window.slider_volume;
      setTimeout(() => $(".timeline-slider").roundSlider({max: window.audio.duration}), 1000);
      $('.player-block p').text(playlist[window.now_track].name);
    }
  }

}
let timer1 = setInterval(setTime, 100);
$('#leftbtn').on('click', function(){
  if(window.now_track !== 0){
    $(".timeline-slider").roundSlider({min: 1});
    //$('#playbtn i').removeClass('bi bi-pause-fill').addClass('bi bi-play-fill');
    let playlist = JSON.parse(window.localStorage.getItem('playlist'));
    window.audio.pause();
    window.audio = new Audio(playlist[window.now_track - 1].path);
    window.audio.currentTime = 0;
    window.now_track = window.now_track - 1;
    window.audio.play();
    window.audio.volume = window.slider_volume;
    setTimeout(() => $(".timeline-slider").roundSlider({max: window.audio.duration}), 1000);
    $('.player-block p').text(playlist[window.now_track].name);
    if (!window.audio.paused) {
      $('#playbtn i').removeClass('bi bi-play-fill').addClass('bi bi-pause-fill');
    }
  }
});
$('#rightbtn').on('click', function(){
  let playlist = JSON.parse(window.localStorage.getItem('playlist'));
  if((window.now_track + 1) !== Object.keys(playlist).length){
    $(".timeline-slider").roundSlider({min: 1});
    //$('#playbtn i').removeClass('bi bi-pause-fill').addClass('bi bi-play-fill');
    window.audio.pause();
    window.audio = new Audio(playlist[window.now_track + 1].path);
    window.audio.currentTime = 0;
    window.now_track = window.now_track + 1;
    window.audio.play();
    window.audio.volume = window.slider_volume;
    setTimeout(() => $(".timeline-slider").roundSlider({max: window.audio.duration}), 1000);
    $('.player-block p').text(playlist[window.now_track].name);
    if (!window.audio.paused) {
      $('#playbtn i').removeClass('bi bi-play-fill').addClass('bi bi-pause-fill');
    }
  }
});