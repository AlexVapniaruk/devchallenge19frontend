import './style.css'
import names from './input/names.json' assert { type: "json" };
import events from './input/events.json' assert { type: "json" };
import { validateNameKey, sortObjectKeys } from './app/helpers';
import { map, mapWrap, putEventOnMap } from './app/map';
import { extremeCoordinatesOfUkraine } from './app/static';
import { mapEventsToDays } from './app/event';
import { 
  filterLastDaysAndKeys, 
  sortDaysEventsByAffectedType, 
  getDaysTill,
  dayWidth 
} from './app/day';
import { 
  drawTimeline, 
  sliderHintUpdate, 
  setupTimelineLine , 
  timelineLine,  
} from './app/timeline';
import { statistics, putStatisticRow } from './app/statistic';

const calcPixelToCordinates = () => {
  return {
    pixelSizeLat: extremeCoordinatesOfUkraine.latLength/mapHeight,
    pixelSizeLon: extremeCoordinatesOfUkraine.lonLength/mapWidth
  }
}

const updateStatisticsAndMap = (eventsByType) => {
  statistics.innerHTML = '';
  map.innerHTML = '';
  
  afftectedTypesKeys.forEach(type => {
    let affected_number = 0;
    eventsByType[type].forEach(event => {
      if(event.affected_number && event.affected_number[0]) {
        affected_number += Number(event.affected_number[0]);
      }
      putEventOnMap(event.latPxl, event.lonPxl, map);
    });
    
    putStatisticRow(names[nameKey][typeKey][type], affected_number);
  });
}

const changeDay = (dayKey) => {
  const eventsTillDay = getDaysTill(daysSortedByDate, dayKey, timelineDaysCount);
  sliderHintUpdate(dayKey, timelineKeys[dayKey]);
  timelineLine.value = dayKey;
  const eventsSorted = sortDaysEventsByAffectedType(eventsTillDay, afftectedTypesKeys, pixelSizeLat, pixelSizeLon);
  updateStatisticsAndMap(eventsSorted);
}

const defaultLang = 'en';
const typeKey = 'affected_type';
const timelineDaysCount = 100;
const userLang = navigator.language || navigator.userLanguage || defaultLang; 
const mapWidth = 686.5; 
const mapHeight = 457;

const namesKeys = Object.keys(names);
const nameKey = validateNameKey(userLang.slice(0,2), namesKeys) || defaultLang;
const afftectedTypesKeys = Object.keys(names[namesKeys[0]].affected_type);
window.timelinePlaying = false;

setupTimelineLine(timelineDaysCount, changeDay);

const { pixelSizeLat, pixelSizeLon } = calcPixelToCordinates(extremeCoordinatesOfUkraine);
const days = mapEventsToDays(events, pixelSizeLat, pixelSizeLon);
const daysSortedByDate = sortObjectKeys(days);
const { days: timelineDays, keys: timelineKeys } = filterLastDaysAndKeys(daysSortedByDate, timelineDaysCount);

drawTimeline(timelineDays, timelineKeys, userLang, changeDay)
changeDay(99);

