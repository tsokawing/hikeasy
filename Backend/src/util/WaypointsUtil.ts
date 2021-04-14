import polyline from '@mapbox/polyline';
import { HikEasyApp } from '../HikEasyApp';

export class WaypointsUtil {
  static getCenterPositionForEncodedWaypoint(
    encodedPath: string
  ): Array<number> | undefined {
    const decodedPathAsArrayOfImplicitPoints = polyline.decode(
      encodedPath,
      HikEasyApp.POLYLINE_PRECISION
    );
    // unfortunately the format is unfriendly to typescript models
    if (decodedPathAsArrayOfImplicitPoints.length == 0) {
      return undefined;
    }
    const firstPoint = decodedPathAsArrayOfImplicitPoints[0];
    let minLat = firstPoint[0];
    let maxLat = firstPoint[0];
    let minLng = firstPoint[1];
    let maxLng = firstPoint[1];
    decodedPathAsArrayOfImplicitPoints.forEach((point) => {
      const pointLatitude = point[0];
      const pointLongitude = point[1];
      minLat = Math.min(minLat, pointLatitude);
      maxLat = Math.max(maxLat, pointLatitude);
      minLng = Math.min(minLng, pointLongitude);
      maxLng = Math.max(maxLng, pointLongitude);
    });
    const displayCenter = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
    // console.log(displayCenter);
    return displayCenter;
  }
}
