
import {
  money,
  getFavorites,
  escapeHtml,
  toggleFavorite,
  listCars,
  deleteCar
} from "../services/carService.js";

import { t } from "../i18n/i18n.js";

// Машины загварт тохирох зураг
const carImages = {
  1: "crown-athlete.jpg",
  2: "lexus-is250.jpg",
  3: "land-cruiser-200.jpg",
  4: "mercedes-e300.jpg",
  5: "subaru-wrx.jpg",
  6: "prius-50.jpg",
  7: "bmw-530i.jpg",
  8: "crown-royal.jpg",
  9: "nissan-patrol.jpg"
};

// Машины зургийн замыг авах
function getCarImage(car) {
  if (carImages[car.id]) {
    return `./assets/${carImages[car.id]}`;
  }

  // Шинээр нэмсэн машины зураг
  return car.shape === "suv"
    ? "./assets/suv.svg"
    : "./assets/sedan.svg";
}

// Машины карт үүсгэх
export function card(car) {
  const fav = getFavorites().includes(car.id);

  return `
    <article class="car-card">

      <div class="car-art ${escapeHtml(car.gradient || "silver")}">

        <div class="corner-tag">
          ${escapeHtml(car.badge || "NEW")}
        </div>

        <div class="art-label">
          ${escapeHtml(car.tag || "AUTO MARKET")}
        </div>

        <img
          loading="lazy"
          src="${getCarImage(car)}"
          alt="${escapeHtml(car.brand + " " + car.model)}"
        >

        <button
          class="heart ${fav ? "hearted" : ""}"
          data-fav="${car.id}"
          title="${t("favorite")}"
          aria-label="${t("favorite")}"
        >
          ${fav ? "♥" : "♡"}
        </button>

      </div>

      <div class="card-body">

        <div class="small-label">
          ${escapeHtml(car.brand)} · ${car.year}
        </div>

        <h3>${escapeHtml(car.model)}</h3>

        <div class="specs">
          <span>
            ◷ ${Number(car.km).toLocaleString()} км
          </span>

          <span>
            ⛽ ${t(car.fuel)}
          </span>
        </div>

        <div class="card-bottom">

          <strong>${money(car.price)}</strong>

          <button
            class="outline-btn"
            data-detail="${car.id}"
          >
            ${t("details")} ↗
          </button>

        </div>

        ${
          car.custom
            ? `
              <button
                class="delete-car-btn"
                data-delete="${car.id}"
                type="button"
              >
                🗑 Устгах
              </button>
            `
            : ""
        }

      </div>

    </article>
  `;
}

// Машины картын товчлуурууд
export function wireCards(root, onFavorite) {

  // Дуртай машинд нэмэх
  root.querySelectorAll("[data-fav]").forEach(button => {
    button.addEventListener("click", () => {
      toggleFavorite(Number(button.dataset.fav));
      onFavorite();
    });
  });

  // Дэлгэрэнгүй мэдээлэл
  root.querySelectorAll("[data-detail]").forEach(button => {
    button.addEventListener("click", () => {
      showCarDetail(Number(button.dataset.detail));
    });
  });

  // Өөрийн нэмсэн зар устгах
  root.querySelectorAll("[data-delete]").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.delete);

      const car = listCars().find(item => item.id === id);

      // Зөвхөн өөрийн нэмсэн зар
      if (!car || !car.custom) return;

      const confirmed = confirm(
        `${car.brand} ${car.model} зарыг устгах уу?`
      );

      if (!confirmed) return;

      // Зарыг localStorage-оос устгах
      deleteCar(id);

      // Картуудыг дахин харуулах
      if (typeof onFavorite === "function") {
        onFavorite();
      } else {
        window.location.reload();
      }

      alert("Зар амжилттай устлаа!");
    });
  });
}

// Машины дэлгэрэнгүй мэдээлэл
export function showCarDetail(id) {

  const car = listCars().find(item => item.id === id);

  if (!car) return;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true">

      <button
        class="modal-x"
        data-close
        aria-label="${t("close")}"
      >
        ×
      </button>

      <div class="car-art ${escapeHtml(car.gradient || "silver")}">

        <div class="art-label">
          ${escapeHtml(car.tag || "AUTO MARKET")}
        </div>

        <img
          src="${getCarImage(car)}"
          alt="${escapeHtml(car.brand + " " + car.model)}"
        >

      </div>

      <div class="modal-info">

        <div class="small-label">
          ${escapeHtml(car.brand)} · ${car.year}
        </div>

        <h2>${escapeHtml(car.model)}</h2>

        <h3 class="price-text">
          ${money(car.price)}
        </h3>

        <div class="detail-grid">

          <span>
            ${t("km")}
            <b>${Number(car.km).toLocaleString()} км</b>
          </span>

          <span>
            ${t("fuel")}
            <b>${t(car.fuel)}</b>
          </span>

          <span>
            ${t("gear")}
            <b>${t("automatic")}</b>
          </span>

          <span>
            ${t("location")}
            <b>${escapeHtml(car.city || "Улаанбаатар")}</b>
          </span>

        </div>

        ${
          car.description
            ? `<p>${escapeHtml(car.description)}</p>`
            : ""
        }

        <p class="muted">${t("example")}</p>

        <button class="primary-btn" data-close>
          ${t("close")}
        </button>

      </div>
    </div>
  `;

  document.body.append(overlay);

  // Цонх хаах
  const close = () => {
    overlay.remove();
    document.removeEventListener("keydown", esc);
  };

  overlay.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", close);
  });

  overlay.addEventListener("click", event => {
    if (event.target === overlay) {
      close();
    }
  });

  // ESC товчоор хаах
  const esc = event => {
    if (event.key === "Escape") {
      close();
    }
  };

  document.addEventListener("keydown", esc);
}
