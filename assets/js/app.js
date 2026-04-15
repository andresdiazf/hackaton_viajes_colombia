// =====================================
// FORMATO MONEDA COP
// =====================================
const COP_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0
});
 
// =====================================
// DATA – DESTINOS DE COLOMBIA
// =====================================
const destinations = [
  {
    id: 1,
    name: "Cartagena",
    price: 850000,
    region: "Caribe",
    description: "Ciudad amurallada y playas caribeñas",
    image: "https://images.unsplash.com/photo-1589395937772-f67057e23320"
  },
  {
    id: 2,
    name: "Medellín",
    price: 720000,
    region: "Andina",
    description: "Ciudad de la eterna primavera",
    image: "https://images.unsplash.com/photo-1616512658620-4f06c2ee91d2"
  },
  {
    id: 3,
    name: "Eje Cafetero",
    price: 680000,
    region: "Andina",
    description: "Paisajes, café y naturaleza",
    image: "https://images.unsplash.com/photo-1621887386473-8d15836c0b0f"
  },
  {
    id: 4,
    name: "San Andrés",
    price: 1200000,
    region: "Caribe",
    description: "Mar de los siete colores",
    image: "https://images.unsplash.com/photo-1604580859490-b60fa9fdaa54"
  }
];
 
// =====================================
// STATE
// =====================================
let cart = JSON.parse(localStorage.getItem("travelCart")) || [];
 
// =====================================
// ELEMENTOS DOM
// =====================================
const destinationsContainer = document.getElementById("destinations");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalElement = document.getElementById("total");
 
const cartCanvas = new bootstrap.Offcanvas(
  document.getElementById("cartCanvas")
);
 
// =====================================
// FUNCIONES
// =====================================
const saveCart = () =>
  localStorage.setItem("travelCart", JSON.stringify(cart));
 
const updateCartCount = () =>
  cartCount.textContent = cart.length;
 
const calculateTotal = () =>
  cart.reduce((sum, item) => sum + item.price, 0);
 
const renderDestinations = (data = destinations) => {
  destinationsContainer.innerHTML = "";
 
  data.forEach(dest => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-3";
 
    col.innerHTML = `
      <article class="card h-100 shadow-sm">
        <img src="${dest.image}" class="card-img-top" alt="${dest.name}">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary mb-2">${dest.region}</span>
          <h5 class="card-title">${dest.name}</h5>
          <p class="card-text text-muted">${dest.description}</p>
          <p class="fw-bold mt-auto">
            ${COP_FORMATTER.format(dest.price)}
          </p>
          <button class="btn btn-primary w-100 mt-2"
            onclick="addToCart(${dest.id})">
            Reservar
          </button>
        </div>
      </article>
    `;
    destinationsContainer.appendChild(col);
  });
};
 
const renderCart = () => {
  cartItemsContainer.innerHTML = "";
 
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
 
    li.innerHTML = `
      ${item.name}
      <button class="btn btn-sm btn-danger"
        onclick="removeFromCart(${index})">
        ❌
      </button>
    `;
    cartItemsContainer.appendChild(li);
  });
 
  totalElement.textContent =
    COP_FORMATTER.format(calculateTotal());
 
  if (cart.length > 0) {
    const reserveBtn = document.createElement("button");
    reserveBtn.className = "btn btn-success w-100 mt-3";
    reserveBtn.textContent = "Confirmar Reserva";
    reserveBtn.onclick = confirmReservation;
    cartItemsContainer.appendChild(reserveBtn);
  }
};
 
const addToCart = id => {
  cart.push(destinations.find(d => d.id === id));
  saveCart();
  updateCartCount();
  renderCart();
  cartCanvas.show();
};
 
const removeFromCart = index => {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
};
 
const confirmReservation = () => {
  alert("✅ Reserva confirmada. ¡Gracias por viajar con Colombia Travel!");
  cart = [];
  saveCart();
  updateCartCount();
  renderCart();
};
 
// =====================================
// FILTROS
// =====================================
const filterByRegion = region => {
  if (region === "all") renderDestinations();
  else renderDestinations(destinations.filter(d => d.region === region));
};
 
// =====================================
// MODAL BIENVENIDA
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("welcomeShown")) {
    const modal = new bootstrap.Modal(
      document.getElementById("welcomeModal")
    );
    modal.show();
 
    document.getElementById("startJourney").addEventListener("click", () => {
      const lastTrip = document.getElementById("lastTrip").value;
      if (!lastTrip) return alert("Selecciona una opción");
 
      localStorage.setItem("welcomeShown", "true");
      localStorage.setItem("lastTrip", lastTrip);
      modal.hide();
    });
  }
});
 
// =====================================
// INIT
// =====================================
renderDestinations();
renderCart();
updateCartCount();