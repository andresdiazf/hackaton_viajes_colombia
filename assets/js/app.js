// ===============================
// MONEDA COP
// ===============================
const COP_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0
});
 
// ===============================
// BANNER DINÁMICO
// ===============================
const URL_IMAGEN_BANNER =
  "https://blob.diariodelyaqui.mx/images/2025/05/29/5-mejores-playas-para-pasar-las-vacaciones-de-verano-en-san-carlos-051e98b5.jpg%22;
 
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banner-dinamico");
  if (banner) {
    banner.style.backgroundImage = `url("${URL_IMAGEN_BANNER}")`;
  }
});
 
// ===============================
// DESTINOS (15)
// ===============================
const destinations = [
  { id: 1, name: "Cartagena", price: 850000, region: "Caribe", description: "Ciudad amurallada", image: "https://maravilloso.exclusivetravelerclub.com/wp-content/uploads/2024/06/Carta3-1536x1021.png" },
  { id: 2, name: "Medellín", price: 720000, region: "Andina", description: "Eterna primavera", image: "https://www.bogotraveltours.com/wp-content/uploads/City-tours-Medellin-1.jpg" },
  { id: 3, name: "Eje Cafetero", price: 680000, region: "Andina", description: "Café y paisajes", image: "https://dominicktravel.com/wp-content/uploads/2017/11/Cocora_Jeep_Go_and_travel.jpg" },
  { id: 4, name: "San Andrés", price: 1200000, region: "Caribe", description: "Mar de 7 colores", image: "https://www.semana.com/resizer/v2/UNXXX6CQZVAALFRGVWO377H5DQ.jpg" },
  { id: 5, name: "Santa Marta", price: 780000, region: "Caribe", description: "Playas y sierra", image: "https://www.santamartacolombia.com.co/wp-content/uploads/2024/09/santamarta11.jpg" },
  { id: 6, name: "Bogotá", price: 600000, region: "Andina", description: "Capital cultural", image: "https://cdn1.matadornetwork.com/blogs/2/2016/02/Bogota-Colombia-cityscape.jpeg" },
  { id: 7, name: "Cali", price: 550000, region: "Andina", description: "Capital de la salsa", image: "https://imagenes2.eltiempo.com/files/og_thumbnail/uploads/2024/10/20/6715cfed0ed24.jpeg" },
  { id: 8, name: "La Guajira", price: 950000, region: "Caribe", description: "Desierto y mar", image: "https://imagenes2.eltiempo.com/files/image_1200_535/uploads/2023/12/20/65834f9b7ea16.jpeg" },
  { id: 9, name: "Barichara", price: 500000, region: "Andina", description: "Pueblo colonial", image: "https://www.tangol.com/blog/Fotos/Notas/planes-en-barichara-sitios-turisticos-y-actividades-al-aire-libre_19338_202507241131190.PNG%22 },
  { id: 10, name: "Villa de Leyva", price: 520000, region: "Andina", description: "Historia y arquitectura", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJpWdYnu0oACWiQvtFJ5EiAf02SDqZQeuwA&s" }
];
 
// ===============================
// STATE
// ===============================
let cart = JSON.parse(localStorage.getItem("travelCart")) || [];
 
// ===============================
// DOM
// ===============================
const destinationsContainer = document.getElementById("destinations");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalElement = document.getElementById("total");
 
const cartCanvas = new bootstrap.Offcanvas(
  document.getElementById("cartCanvas")
);
 
// ===============================
// RENDER DESTINOS
// ===============================
const renderDestinations = (data = destinations) => {
  destinationsContainer.innerHTML = "";
 
  data.forEach(dest => {
    const card = document.createElement("div");
    card.style.minWidth = "280px";
 
    card.innerHTML = `
      <article class="card shadow-sm">
        <img src="${dest.image}" class="card-img-top" alt="${dest.name}">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary mb-2">${dest.region}</span>
          <h5>${dest.name}</h5>
          <p class="text-muted">${dest.description}</p>
          <p class="fw-bold mt-auto">${COP_FORMATTER.format(dest.price)}</p>
          <button class="btn btn-primary w-100" onclick="addToCart(${dest.id})">
            Reservar
          </button>
        </div>
      </article>
    `;
    destinationsContainer.appendChild(card);
  });
};
 
// ===============================
// CARRITO
// ===============================
const saveCart = () =>
  localStorage.setItem("travelCart", JSON.stringify(cart));
 
const updateCartCount = () =>
  cartCount.textContent = cart.length;
 
const calculateTotal = () =>
  cart.reduce((sum, item) => sum + item.price, 0);
 
const renderCart = () => {
  cartItemsContainer.innerHTML = "";
 
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
 
    li.innerHTML = `
      ${item.name}
      <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">❌</button>
    `;
    cartItemsContainer.appendChild(li);
  });
 
  totalElement.textContent = COP_FORMATTER.format(calculateTotal());
 
  if (cart.length) {
    const btn = document.createElement("button");
    btn.className = "btn btn-success w-100 mt-3";
    btn.textContent = "Confirmar Reserva";
    btn.onclick = confirmReservation;
    cartItemsContainer.appendChild(btn);
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
 
// ===============================
// SONIDO AVIÓN ✈️
// ===============================
const confirmReservation = () => {
  const sound = document.getElementById("planeSound");
  sound.currentTime = 0;
  sound.play();
 
  setTimeout(() => {
    alert("✅ Reserva confirmada. ¡Gracias por viajar con Viajes Colombia!");
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
  }, 3000);
};
 
// ===============================
// INIT
// ===============================
renderDestinations();
renderCart();
updateCartCount();