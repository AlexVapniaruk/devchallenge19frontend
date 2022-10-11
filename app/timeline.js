import { convertDateToHuman } from "./helpers";
import { dayWidth } from './day';

function rangeChangeHandler(e, changeDayHandler) {
    if(window.timelinePlaying) {
      return;
    }
    const dayKey = e.target.value;
    changeDayHandler(dayKey);
}

export const timeline = document.querySelector('.timeline__days');
export const timelineHint = document.querySelector('.timeline__hint');
export const timelineHintText = document.querySelector('.timeline__hint-text');
export const timelineWrap = document.querySelector('.timeline');
export const timelineLine = document.querySelector('.timeline__line');
export const playButton = document.querySelector('.map__buttons-play');
export const pauseButton = document.querySelector('.map__buttons-pause');
let timelineInterval;


export const setupTimelineLine = (timelineDaysCount, changeDayHandler) => {
    timelineLine.style.width = (timelineDaysCount * dayWidth) + 'px'; 
    timelineLine.addEventListener('input', function (e) {
        rangeChangeHandler(e, changeDayHandler)
    });
    timelineLine.value = 0;
    playButton.addEventListener('click', function() {
        playTimeline(changeDayHandler)
    });
    pauseButton.addEventListener('click', pauseTimeline);
    timelineWrap.onmouseleave = function () { 
        sliderHintUpdate(timelineLine.value, timelineKeys[timelineLine.value]) 
    };
    document.body.onkeyup = function(e) {
        if (e.key == " " ||
            e.code == "Space" ||      
            e.keyCode == 32      
        ) {
            if(pauseButton.style.display !== 'none') {
                pauseTimeline();
            } else {
                playTimeline(changeDayHandler);
            }
        }
    }
}

const createDayElemenet = (key, date, height, changeDayHandler) => {
    const dayElementWrap = document.createElement('div');
    dayElementWrap.className = 'timeline__day-wrap';
    dayElementWrap.onmouseover = function() { 
      if(window.timelinePlaying) return; 
      sliderHintUpdate(key, date) 
    };
    dayElementWrap.onclick = function () { 
      if(window.timelinePlaying) return;
      changeDayHandler(key)
    };
    dayElementWrap.dataset.dayKey = key;
    const dayElement = document.createElement('div');
    dayElement.className = 'timeline__day';
    dayElement.style.height = height + 'px';
    dayElementWrap.append(dayElement);

    return dayElementWrap;
}

export const drawTimeline = (days, keys, lang, changeDayHandler) => {
    days.forEach((day, index) => {
        let affectedNumberByDay = 0;
        day.forEach(event => {
          if(event.affected_number && event.affected_number[0]) {
            affectedNumberByDay += Number(event.affected_number[0]);
          }
        });
      
        const dayElement = createDayElemenet(index, keys[index], affectedNumberByDay/2, changeDayHandler);
        timeline.append(dayElement);
    });

    timelineWrap.onmouseleave = function () { sliderHintUpdate(timelineLine.value, keys[timelineLine.value], lang) }
}

export const sliderHintUpdate = (dayKey, date, lang) => {
    const magicEqualizer = dayKey/16;
    const hintShoulder = -39;
    timelineHint.style.marginLeft = (hintShoulder + ((dayKey * dayWidth) - magicEqualizer)) + 'px';
    timelineHintText.innerHTML = convertDateToHuman(date, lang);
}

export const playTimeline = (changeDayHandler) => {
    playButton.style.display = 'none';
    window.timelinePlaying = true;
    timelineLine.disabled = true;
    let dayKey = Number(timelineLine.value);
    if(dayKey === 99) {
      dayKey = 0;
      changeDayHandler(dayKey);
    }
  
    timelineInterval = setInterval(function () {
        changeDayHandler(dayKey);
        dayKey++;
        if(dayKey === 100) {
            pauseTimeline()
        }
    }, 500)
    pauseButton.style.display = 'block';
}

export const pauseTimeline = () => {
    pauseButton.style.display = 'none';
    clearInterval(timelineInterval);
    window.timelinePlaying = false;
    timelineLine.disabled = false;
    playButton.style.display = 'block';
}
  