import { validateLatLon, latLonToPixels } from "./helpers";
import { map } from "./map";

export const mapEventsToDays = (events, pixelSizeLat, pixelSizeLon) => {
    const eventsByDays = {};

    events.forEach(event => {
        if(event.affected_type && event.affected_type.length && validateLatLon(event.lat, event.lon)) {
            let eventFormated;
            event.affected_type.forEach(type => {
                const { latPixels, lonPixels } = latLonToPixels(event.lat, event.lon, pixelSizeLat, pixelSizeLon);
                
                eventFormated = { 
                    ...event,
                    latPxl: latPixels,
                    lonPxl: lonPixels
                };
            })

            if(!Array.isArray(eventsByDays[event.from])) {
                eventsByDays[event.from] = [eventFormated]
            } else {
                eventsByDays[event.from].push(eventFormated);
            }
        }
    });

    return eventsByDays;
}

export const sortEventsByAffectedType = (events, afftectedTypesKeys, pixelSizeLat, pixelSizeLon) => {
    const eventsByAffectedType = {};
    afftectedTypesKeys.forEach(afftectedTypesKey => {
      eventsByAffectedType[afftectedTypesKey] = [];
    });
  
    events.forEach(event => {
      if(event.affected_type && event.affected_type.length) {
        let eventFormated;
        event.affected_type.forEach(type => {
          const { latPixels, lonPixels } = latLonToPixels(event.lat, event.lon, pixelSizeLat, pixelSizeLon);
          if(latPixels && lonPixels) {
            const eventElement = document.createElement('div');
            eventElement.style.position = 'absolute';
            eventElement.style.top = latPixels + 'px';
            eventElement.style.right = lonPixels + 'px';
            eventElement.className = 'point'; 
            map.append(eventElement);
          }
          eventFormated = { 
            ...event,
            till: undefined,
            latPxl: latPixels,
            lonPxl: lonPixels
          };
          eventsByAffectedType[type].push(eventFormated);
        })
      }
    });
  
    return eventsByAffectedType;
  }