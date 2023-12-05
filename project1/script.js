var clockEl = document.getElementsByClassName('clock')[0];

function clock() {
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  d = new Date(),
  h = d.getHours(),
  m = d.getMinutes(),
  s = d.getSeconds(),
  date = d.getDate(),
  month = d.getMonth() + 1,
  year = d.getFullYear(),
   
  hDeg = h * 30 + m * (360 / 720),
  mDeg = m * 6 + s * (360 / 3600),
  sDeg = s * 6,
  
  hEl = document.querySelector('.hour-hand'),
  mEl = document.querySelector('.minute-hand'),
  sEl = document.querySelector('.second-hand'),
  dateEl = document.querySelector('.date'),
  dayEl = document.querySelector('.day');

  var day = weekday[d.getDay()];

  if (month < 9) {
    month = "0" + month;
  }

  hEl.style.transform = "rotate(" + hDeg + "deg)";
  mEl.style.transform = "rotate(" + mDeg + "deg)";
  sEl.style.transform = "rotate(" + sDeg + "deg)";
  dateEl.innerHTML = date + "/" + month + "/" + year;
  dayEl.innerHTML = day;
}

setInterval(clock, 100);

var hiddenDiv = document.querySelector('.hidden-div');

function Countdown(elem, seconds) {
  var that = {};

  that.elem = elem;
  that.seconds = seconds;
  that.totalTime = seconds * 100;
  that.usedTime = 0;
  that.startTime = +new Date();
  that.timer = null;

  that.count = function() {
    that.usedTime = Math.floor((+new Date() - that.startTime) / 10);

    var tt = that.totalTime - that.usedTime;
    if (tt <= 0) {
      that.elem.innerHTML = '00:00:00';
      clearInterval(that.timer);
      showHiddenDiv();
    } else {
      var mi = Math.floor(tt / (60 * 100));
      var ss = Math.floor((tt - mi * 60 * 100) / 100);
      var ms = tt - Math.floor(tt / 100) * 100;

      that.elem.innerHTML = that.fillZero(mi) + ":" + that.fillZero(ss) + ":" + that.fillZero(ms);
    }
  };
  
  that.init = function() {
    if (that.timer) {
      clearInterval(that.timer);
      that.elem.innerHTML = '00:00:00';
      that.totalTime = seconds * 100;
      that.usedTime = 0;
      that.startTime = +new Date();
      that.timer = null;
    }
  };

  that.start = function() {
    if (!that.timer) {
      that.timer = setInterval(that.count, 1);
    }
  };

  that.stop = function() {
    console.log('usedTime = ' + countdown.usedTime);
    if (that.timer) clearInterval(that.timer);
  };

  that.fillZero = function(num) {
    return num < 10 ? '0' + num : num;
  };

  return that;
}

function showHiddenDiv() {
  hiddenDiv.style.display = 'block';
}

var span = document.getElementById('time');
var countdown = new Countdown(span, 720);

document.addEventListener('DOMContentLoaded', function() {
  countdown.start();
});

var moveElement = document.querySelector('.move');
var popElement = document.querySelector('.pop');

moveElement.addEventListener('click', function() {
  popElement.style.display = 'block'; // popElement를 보이도록 변경
});

var move2Element = document.querySelector('.move2');
var pop2Element = document.querySelector('.pop2');

move2Element.addEventListener('click', function() {
  pop2Element.style.display = 'block'; // popElement를 보이도록 변경
});

var move3Element = document.querySelector('.move3');
move3Element.addEventListener('click', function() {
  popElement.style.display = 'block'; 
  pop2Element.style.display = 'none'; 

});


var move4Element = document.querySelector('.move4');
move4Element.addEventListener('click', function() {
  popElement.style.display = 'none'; 

});