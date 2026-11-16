// 2.6: JSON өгөгдлийг UI-ээс тусгаарлан унших service.
import { DATA_URL } from "../config.js";
import { cars } from "./carService.js";

let cache = null;
export async function loadCatalog() {
  if (cache) return cache;
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("cars.json must be an array");
    cache = data.filter(c => Number.isFinite(Number(c.id)) && typeof c.model === 'string');
    return cache;
  } catch (error) {
    console.warn("Could not load cars.json, using built-in sample cars", error);
    return cars;
  }
}
