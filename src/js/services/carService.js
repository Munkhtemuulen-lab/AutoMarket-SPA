
/*
  AutoMarket SPA
  carService.js

  Автомашины мэдээлэл хадгалах,
  зар нэмэх, устгах,
  дуртай зар удирдах үйлчилгээ
*/

// Үндсэн 9 машины мэдээлэл
export const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Crown Athlete GRS184",
    year: 2008,
    price: 28500000,
    km: 145000,
    fuel: "petrol",
    color: "#b6c0c9",
    gradient: "silver",
    tag: "SPORT EDITION",
    city: "Улаанбаатар",
    badge: "Popular",
    shape: "sedan"
  },
  {
    id: 2,
    brand: "Lexus",
    model: "IS 250",
    year: 2012,
    price: 39500000,
    km: 118000,
    fuel: "petrol",
    color: "#d8dce2",
    gradient: "light",
    tag: "PREMIUM SEDAN",
    city: "Улаанбаатар",
    badge: "Premium",
    shape: "sedan"
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Land Cruiser 200",
    year: 2016,
    price: 129000000,
    km: 98000,
    fuel: "diesel",
    color: "#ded9c9",
    gradient: "cream",
    tag: "4WD LEGEND",
    city: "Улаанбаатар",
    badge: "4WD",
    shape: "suv"
  },
  {
    id: 4,
    brand: "Mercedes-Benz",
    model: "E 300",
    year: 2017,
    price: 79500000,
    km: 89000,
    fuel: "petrol",
    color: "#313a47",
    gradient: "dark",
    tag: "EXECUTIVE CLASS",
    city: "Дархан",
    badge: "Luxury",
    shape: "sedan"
  },
  {
    id: 5,
    brand: "Subaru",
    model: "WRX STI",
    year: 2015,
    price: 61000000,
    km: 76000,
    fuel: "petrol",
    color: "#2861a1",
    gradient: "blue",
    tag: "RALLY ICON",
    city: "Улаанбаатар",
    badge: "Performance",
    shape: "sedan"
  },
  {
    id: 6,
    brand: "Toyota",
    model: "Prius 50",
    year: 2018,
    price: 33500000,
    km: 134000,
    fuel: "hybrid",
    color: "#e7e8e9",
    gradient: "light",
    tag: "HYBRID DRIVE",
    city: "Эрдэнэт",
    badge: "Eco",
    shape: "sedan"
  },
  {
    id: 7,
    brand: "BMW",
    model: "530i M Sport",
    year: 2018,
    price: 87000000,
    km: 92000,
    fuel: "petrol",
    color: "#626974",
    gradient: "dark",
    tag: "M PERFORMANCE",
    city: "Улаанбаатар",
    badge: "Sport",
    shape: "sedan"
  },
  {
    id: 8,
    brand: "Toyota",
    model: "Crown Royal Saloon",
    year: 2007,
    price: 23500000,
    km: 178000,
    fuel: "petrol",
    color: "#e3e0d9",
    gradient: "cream",
    tag: "ROYAL COMFORT",
    city: "Улаанбаатар",
    badge: "Classic",
    shape: "sedan"
  },
  {
    id: 9,
    brand: "Nissan",
    model: "Patrol Y62",
    year: 2018,
    price: 114000000,
    km: 105000,
    fuel: "petrol",
    color: "#c5cbd0",
    gradient: "silver",
    tag: "FULL SIZE SUV",
    city: "Улаанбаатар",
    badge: "4WD",
    shape: "suv"
  }
];

// Бүх автомашины жагсаалт
export function listCars() {
  try {
    const customCars = JSON.parse(
      localStorage.getItem("automarket-cars") || "[]"
    );

    return [...customCars, ...cars];
  } catch {
    return cars;
  }
}

// Шинэ автомашины зар нэмэх
export function addCar(car) {
  const custom = listCars().filter(
    x => x.custom
  );

  custom.unshift({
    ...car,
    id: Date.now(),
    custom: true,
    shape: "sedan",
    color: "#7f99ae",
    gradient: "blue",
    badge: "New"
  });

  localStorage.setItem(
    "automarket-cars",
    JSON.stringify(custom)
  );
}

// Өөрийн нэмсэн зар устгах
export function deleteCar(id) {
  const customCars = listCars().filter(
    car => car.custom && car.id !== Number(id)
  );

  localStorage.setItem(
    "automarket-cars",
    JSON.stringify(customCars)
  );

  // Устгасан зарыг дуртай жагсаалтаас хасах
  const favorites = getFavorites().filter(
    favoriteId => Number(favoriteId) !== Number(id)
  );

  localStorage.setItem(
    "automarket-favorites",
    JSON.stringify(favorites)
  );
}

// Дуртай заруудыг авах
export function getFavorites() {
  try {
    return JSON.parse(
      localStorage.getItem("automarket-favorites") || "[]"
    );
  } catch {
    return [];
  }
}

// Дуртай зар нэмэх / хасах
export function toggleFavorite(id) {
  const s = new Set(getFavorites());

  s.has(id)
    ? s.delete(id)
    : s.add(id);

  localStorage.setItem(
    "automarket-favorites",
    JSON.stringify([...s])
  );

  return s.has(id);
}

// Мөнгөн дүн форматлах
export const money = n =>
  new Intl.NumberFormat("mn-MN").format(
    Number(n) || 0
  ) + " ₮";

// HTML текстийг аюулгүй болгох
export const escapeHtml = x =>
  String(x ?? "").replace(
    /[&<>"']/g,
    c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c])
  );
