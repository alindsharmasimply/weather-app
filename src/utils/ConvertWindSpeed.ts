export function convertWindSpeed(speedInMeters: number): string {
  const speedInKilometersPerHour = speedInMeters * 3.6;
  return `${speedInKilometersPerHour.toFixed(0)}Km/Hr`;
}
