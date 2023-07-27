import { TCities } from "../types";
import { getDistances } from "./distanceCalculation";
import { getMatchedCities } from "./utils";

const serverImitationDelayMs = 2000;

export const getAsyncMatchedCities = (userText: string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (userText.toLowerCase() === 'fail') {
      reject(new Error('Oops! Failed to search with this keyword. '));
    }
    resolve(getMatchedCities(userText))
  }, serverImitationDelayMs);
});

export const getAsyncDistances = (cities: TCities) => new Promise((resolve, reject) => {
  const isErrorImitation = cities.some(([cityName]) => cityName === 'Dijon');
  setTimeout(() => {
    if (isErrorImitation) {
      reject(new Error('Oops! Something went wrong!'));
    }
    resolve(getDistances(cities));
  }, serverImitationDelayMs)
})
