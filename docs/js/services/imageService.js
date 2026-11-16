// 2.8: Зургийн зураглал (images.json) унших service.
import { IMAGES_URL } from "../config.js";
let mapping;
export async function loadImages() {
  if (mapping) return mapping;
  try {
    const response = await fetch(IMAGES_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    mapping = json && typeof json === 'object' && !Array.isArray(json) ? json : {};
  } catch (error) {
    console.warn("Could not load images.json", error);
    mapping = {};
  }
  return mapping;
}
