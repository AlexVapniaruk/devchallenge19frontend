import { extremeCoordinatesOfUkraine } from "./static";

export const validateNameKey = (nameKey, keys) => {
  if(keys.includes(nameKey)) {
    return nameKey;
  }
  
  return false;
}

export const latLonToPixels = (lat, lon, pixelSizeLat, pixelSizeLon) => {
  const latPixels = (extremeCoordinatesOfUkraine.north.lat  - lat) / pixelSizeLat;
  const lonPixels = (extremeCoordinatesOfUkraine.east.lon - lon) / pixelSizeLon;

  return {
    latPixels,
    lonPixels
  }
}

export const validateLatLon = (lat, lon) => {
  if(lat > extremeCoordinatesOfUkraine.north.lat || lat < extremeCoordinatesOfUkraine.south.lat) {
    return false; 
  }
  if(lon > extremeCoordinatesOfUkraine.east.lon || lon < extremeCoordinatesOfUkraine.west.lon) {
    return false;
  }

  return true;
}

export const sortObjectKeys = (o) => {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

export const convertDateToHuman = (date, lang) => {
    if(date) {
        const d = new Date(date);
        const formatter = new Intl.DateTimeFormat(lang, { month: 'short' });
        const monthName = formatter.format(d);
        return d.getDate()  + " " + monthName + ", " + d.getFullYear();
    }
}