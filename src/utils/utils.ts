import { TCities } from "../types";

const cities: TCities = [
  ['Paris', 48.856614, 2.352222],
  ['Marseille', 43.296482, 5.369780],
  ['Lyon', 45.764043, 4.835659],
  ['Toulouse', 43.604652, 1.444209],
  ['Nice', 43.710173, 7.261953],
  ['Nantes', 47.218371, -1.553621],
  ['Strasbourg', 48.573405, 7.752111],
  ['Montpellier', 43.610769, 3.876716],
  ['Bordeaux', 44.837789, -0.579180],
  ['Lille', 50.629250, 3.057256],
  ['Rennes', 48.117266, -1.677793],
  ['Reims', 49.258329, 4.031696],
  ['Le Havre', 49.494370, 0.107929],
  ['Saint-Étienne', 45.439695, 4.387178],
  ['Toulon', 43.124228, 5.928000],
  ['Angers', 47.478419, -0.563166],
  ['Grenoble', 45.188529, 5.724524],
  ['Dijon', 47.322047, 5.041480],
  ['Nîmes', 43.836699, 4.360054],
  ['Aix-en-Provence', 43.529742, 5.447427],
  ['Fail', 0, 0],
];

export const prepareCitiesQuery = (cities: TCities): string => cities
  .reduce((acc: string, [cityName, latitude, longitude]) => acc
    ? `${acc}|${cityName}_${latitude}_${longitude}`
    : `${cityName}_${latitude}_${longitude}`, '');

export const getMatchedCities = (userText: string) => (userText.length)
  ? cities.filter(([name]) => name.toLowerCase().includes(userText.toLowerCase()))
  : [];

export const parseCities = (query: string) => query
  .split('|')
  .map((str) => str.split('_'))
  .map(([city, lat, lon]) => [city, +lat, +lon]) as TCities;

