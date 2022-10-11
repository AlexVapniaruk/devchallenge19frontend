//https://en.wikipedia.org/wiki/List_of_extreme_points_of_Ukraine
//Converted here:
//https://www.latlong.net/degrees-minutes-seconds-to-decimal-degrees
export const extremeCoordinatesOfUkraine = {
  north: {
    lat: 52.37944444, 
    lon: 33.19111111
  },
  west: {
    lat: 48.41833333,
    lon: 22.13694444
  },
  east: {
    lat: 49.26055556,
    lon: 40.22777778
  },
  south: {
    lat: 44.38638889,
    lon: 33.77722222
  },
  get latLength() {
    return this.north.lat - this.south.lat;
  },
  get lonLength() {
    return this.east.lon - this.west.lon;
  }
}
