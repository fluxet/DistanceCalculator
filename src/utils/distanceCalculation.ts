import { TCities, TCity } from "../types";

const earthRadiusKm = 6371;

const deg2rad = (deg: number) => deg * (Math.PI / 180);

const calculateDistance = (city1: TCity, city2: TCity) => {
  const [_1, lat1, lon1] = city1;
  const [_2, lat2, lon2] = city2;

  const deltaLat = deg2rad(lat2 - lat1);
  const deltaLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;
  return distance.toFixed(2);
};

export const getDistances = (cities: TCities) => cities
  .reduce((acc, city, i) => (cities[i + 1])
    ? [...acc, +calculateDistance(city, cities[i + 1])]
    : acc, []);

export const getDistancesFields = (distances: number[]) => distances
  .map((distance) => `${distance} km`);

export const getTotalDistance = (distances: number[]) => distances
  .reduce((acc, distance) => acc + distance, 0);