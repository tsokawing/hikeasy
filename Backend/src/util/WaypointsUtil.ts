import { HikEasyApp } from '../HikEasyApp';
const polyline = require('@mapbox/polyline');

export class WaypointsUtil {
  static getCenterPositionForEncodedWaypoint(encodedPath: string): void {
    const test = polyline.decode(encodedPath, HikEasyApp.POLYLINE_PRECISION);
    console.log(test);
    return;
  }
}
