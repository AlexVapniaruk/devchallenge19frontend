export const map = document.querySelector('.map');
export const mapWrap = document.querySelector('.map-wrap');

export function putEventOnMap(latPixels, lonPixels, map) {
  if(latPixels && lonPixels) {
    const eventElement = document.createElement('div');
    eventElement.style.position = 'absolute';
    eventElement.style.top = latPixels + 'px';
    eventElement.style.right = lonPixels + 'px';
    eventElement.className = 'point'; 
    map.append(eventElement);
  }
}
  