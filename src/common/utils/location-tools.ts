import * as NodeGeoCoder from 'node-geocoder';

const options = {
  provider: 'opencage',
  apiKey: '6ae405d96b8b4b7891de17ab0f929fd8',
  formatter: null,
};

const geocoder = NodeGeoCoder(options);

// ANCHOR Distance Between Two Points
export const distanceBetween = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
) => {
  const R = 6371e3; // metres
  const φ1 = (from.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (to.lat * Math.PI) / 180;
  const Δφ = ((to.lat - from.lat) * Math.PI) / 180;
  const Δλ = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // in metres
  return d;
};

// ANCHOR Check if "to" location is inside "from" location radius
export const isInsideRadius = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  radius: number,
) => {
  const distance = distanceBetween(from, to);
  return distance <= radius;
};

// ANCHOR Get address using lat and lng in spanish
export const getAddress = async (lat: number, lng: number) => {
  const address = await geocoder.reverse({ lat, lon: lng });
  return address;
};

// ANCHOR Get coordinates using address in spanish
export const getCoordinates = async (address: string) => {
  const coordinates = await geocoder.geocode(address);
  return coordinates;
};

const run = async () => {
  const address = await getAddress(10.501211, -66.790689);
  console.log(address);

  const coordinates = await getCoordinates(
    'Chacao, Distrito Capital, Venezuela',
  );
  console.log(coordinates);
};

run();
