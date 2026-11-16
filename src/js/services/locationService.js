import { listCars } from './carService.js';

// 2.10: өгөгдөл ба харагдацыг салгасан service layer
const CITIES = [
  {id:'ulaanbaatar',nameMn:'Улаанбаатар',nameEn:'Ulaanbaatar',x:69,y:65},
  {id:'darkhan',nameMn:'Дархан',nameEn:'Darkhan',x:55,y:31},
  {id:'erdenet',nameMn:'Эрдэнэт',nameEn:'Erdenet',x:38,y:45}
];
export const getCities = () => CITIES;
export function cityCars(city) { return listCars().filter(car => car.city === city.nameMn); }
