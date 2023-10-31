const path = document.getElementById('motion-path');
const image = document.getElementById('animated-image');
const circles = document.querySelectorAll(".cls-1");
const cls2Elements = document.querySelectorAll(".cls-2");
const circleInterval = 73846 / 120; // 속도

function updateWormPosition(index) {
    if (index < circles.length) {
        const circle = circles[index];
        const imageWidth = parseFloat(image.getAttribute('width'));
        const imageHeight = parseFloat(image.getAttribute('height'));

        const circleX = parseFloat(circle.getAttribute('cx'));
        const circleY = parseFloat(circle.getAttribute('cy'));

        // 웜 이미지의 중심 위치를 원의 중심 위치에 일치시킵니다
        image.setAttribute('x', circleX - imageWidth / 4);
        image.setAttribute('y', circleY - imageHeight / 8);

        circles[index].style.opacity = "1";

        // cls-2 요소를 나타나게 하고 위치를 조정합니다
        cls2Elements.forEach((cls2Element, cls2Index) => {
            if (cls2Index === index) { // 현재 원에 해당하는 cls-2 요소만 나타나도록 수정
                const cls2X = parseFloat(circle.getAttribute('cx'));
                const cls2Y = parseFloat(circle.getAttribute('cy'));

                cls2Element.style.opacity = "1";
                cls2Element.setAttribute('cx', cls2X);
                cls2Element.setAttribute('cy', cls2Y);
                cls2Element.style.display = "block"; // cls-2 요소를 항상 나타나도록 수정
            }
        });

        setTimeout(function () {
            updateWormPosition(index + 1);
        }, circleInterval);
    }
}

cls2Elements.forEach((cls2Element) => {
    cls2Element.style.display = "none"; // 초기에 숨겨져 있어야 함
});

updateWormPosition(0);




//카운트다운
const countdownTimeInMilliseconds = 3600000;

function startCountdown() {
  const timeElement = document.getElementById("time");
  const currentTime = Date.now();
  const endTime = currentTime + countdownTimeInMilliseconds;

  function updateCountdown() {
    const currentTime = Date.now();
    const remainingTime = endTime - currentTime;

    if (remainingTime < 0) {
      clearInterval(countdownInterval);
      timeElement.textContent = "00:00:00";
    } else {
      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      timeElement.textContent = formattedTime;
    }
  }

  // 1시간
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

startCountdown();




const numberElements = Array.from(document.querySelectorAll('.count > div')).reverse(); // 역순으로 순환
let currentIndex = 0;
const timeInterval = 3600000; // 1시간 = 3600000 밀리초

function showNextNumber() {
  numberElements[currentIndex].style.display = 'none';
  currentIndex = (currentIndex + 1) % numberElements.length;
  numberElements[currentIndex].style.display = 'block';
  setTimeout(showNextNumber, timeInterval);
}

numberElements[currentIndex].style.display = 'block';
setTimeout(showNextNumber, timeInterval);








/*

//카운트다운
const countdownTimeInMilliseconds = 3600000;

function startCountdown() {
  const timeElement = document.getElementById("time");
  const currentTime = Date.now();
  const endTime = currentTime + countdownTimeInMilliseconds;

  function updateCountdown() {
    const currentTime = Date.now();
    const remainingTime = endTime - currentTime;

    if (remainingTime < 0) {
      clearInterval(countdownInterval);
      timeElement.textContent = "00:00:00";
    } else {
      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      timeElement.textContent = formattedTime;
    }
  }

  // 최초 업데이트 후 1초마다 업데이트
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

startCountdown();




const numberElements = Array.from(document.querySelectorAll('.count > div')).reverse(); // 역순으로 순환
let currentIndex = 0;
const timeInterval = 3600000; // 1시간 = 3600000 밀리초

function showNextNumber() {
  numberElements[currentIndex].style.display = 'none';
  currentIndex = (currentIndex + 1) % numberElements.length;
  numberElements[currentIndex].style.display = 'block';
  setTimeout(showNextNumber, timeInterval);
}

numberElements[currentIndex].style.display = 'block';
setTimeout(showNextNumber, timeInterval);

*/