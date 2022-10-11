export const dayWidth = 10;

import { sortEventsByAffectedType } from "./event";

export const filterLastDaysAndKeys = (events, daysCount) => {
  const eventKeys = Object.keys(events).slice(-daysCount);
  const newEvents = [];
  eventKeys.forEach(key => {
    newEvents.push(events[key]);
  })
  return {
    days: newEvents,
    keys: eventKeys
  }
}

export const sortDaysEventsByAffectedType = (days, afftectedTypesKeys, pixelSizeLat, pixelSizeLon) => {
  let eventsByTypes = {}; 
  days.map(day => {
    const dayEvents = sortEventsByAffectedType(day, afftectedTypesKeys, pixelSizeLat, pixelSizeLon);
    Object.keys(dayEvents).forEach(eventType => {
      if(eventsByTypes[eventType] && Array.isArray(dayEvents[eventType])) {
        eventsByTypes[eventType] = eventsByTypes[eventType].concat(dayEvents[eventType]);
      } else {
        eventsByTypes[eventType] = dayEvents[eventType];
      }
    })
  })
  return eventsByTypes;
};

export const getDaysTill = (events, dayKey, timelineDaysCount) => {
  const removeDays = dayKey - timelineDaysCount;
  const eventKeys = Object.keys(events).slice(0, removeDays);
  const newEvents = [];
  eventKeys.forEach(key => {
    newEvents.push(events[key]);
  })
  return newEvents;
}