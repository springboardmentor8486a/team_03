// Convert decimal coordinates to DMS format with padded values
export function decimalToDMS(decimal, isLatitude) {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);

  
  const paddedDegrees = degrees.toString().padStart(2, '0');
  
  const paddedMinutes = minutes.toString().padStart(2, '0');
 
  const paddedSeconds = parseFloat(seconds).toFixed(1).padStart(4, '0');

  const direction = isLatitude
    ? decimal >= 0 ? "N" : "S"
    : decimal >= 0 ? "E" : "W";

  return `${paddedDegrees}°${paddedMinutes}'${paddedSeconds}"${direction}`;
}

// Convert DMS format to decimal coordinates
export function dmsToDecimal(dms) {
  const regex = /(\d+)°(\d+)'([\d.]+)"([NSEW])/;
  const parts = dms.match(regex);

  if (!parts) return null;

  const degrees = parseInt(parts[1]);
  const minutes = parseInt(parts[2]);
  const seconds = parseFloat(parts[3]);
  const direction = parts[4];

  let decimal = degrees + (minutes / 60) + (seconds / 3600);

  if (direction === 'S' || direction === 'W') {
    decimal = -decimal;
  }

  return decimal;
}