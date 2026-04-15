// =====================================
// FORMATO MONEDA COP
// =====================================
const COP_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0
});

// =====================================
// DATA – DESTINOS (15)
// =====================================
const destinations = [
  { id: 1, 
    name: "Cartagena", 
    price: 850000, 
    region: "Caribe", 
    description: "Ciudad amurallada", 
    image: "https://maravilloso.exclusivetravelerclub.com/wp-content/uploads/2024/06/Carta3-1536x1021.png" 
  },
  { id: 2, 
    name: "Medellín", 
    price: 720000, 
    region: "Andina", 
    description: "Eterna primavera", 
    image: "https://www.bogotraveltours.com/wp-content/uploads/City-tours-Medellin-1.jpg" 
  },
  { id: 3, 
    name: "Eje Cafetero", 
    price: 680000, 
    region: "Andina", 
    description: "Café y paisajes", 
    image: "https://dominicktravel.com/wp-content/uploads/2017/11/Cocora_Jeep_Go_and_travel.jpg" 
  },
  { id: 4, 
    name: "San Andrés", 
    price: 1200000, 
    region: "Caribe", 
    description: "Mar de 7 colores", 
    image: "https://www.semana.com/resizer/v2/UNXXX6CQZVAALFRGVWO377H5DQ.jpg?auth=bbe6dba0d436dd03e397b5f63a63db173e687ab72eef21d9c3c6a27b2c0f5383&width=1920&height=1080" 
  },
  { id: 5, 
    name: "Santa Marta", 
    price: 780000, 
    region: "Caribe", 
    description: "Playas y sierra", 
    image: "https://www.santamartacolombia.com.co/wp-content/uploads/2024/09/santamarta11.jpg" 
  },
  { id: 6, 
    name: "Bogotá", 
    price: 600000, 
    region: "Andina", 
    description: "Capital cultural", 
    image: "https://cdn1.matadornetwork.com/blogs/2/2016/02/Bogota-Colombia-cityscape.jpeg" 
  },
  { id: 7, 
    name: "Cali", 
    price: 550000, 
    region: "Andina", 
    description: "Capital de la salsa", 
    image: "https://imagenes2.eltiempo.com/files/og_thumbnail/uploads/2024/10/20/6715cfed0ed24.jpeg" 
  },
  { id: 8, 
    name: "La Guajira", 
    price: 950000, 
    region: "Caribe", 
    description: "Desierto y mar", 
    image: "https://imagenes2.eltiempo.com/files/image_1200_535/uploads/2023/12/20/65834f9b7ea16.jpeg" 
  },
  { id: 9, 
    name: "Barichara", 
    price: 500000, 
    region: "Andina", 
    description: "Pueblo colonial", 
    image: "https://www.tangol.com/blog/Fotos/Notas/planes-en-barichara-sitios-turisticos-y-actividades-al-aire-libre_19338_202507241131190.PNG" 
  },
  { id: 10, 
    name: "Villa de Leyva", 
    price: 520000, 
    region: "Andina", 
    description: "Historia y arquitectura", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJpWdYnu0oACWiQvtFJ5EiAf02SDqZQeuwA&s" 
  },
  { id: 11, 
    name: "Amazonas", 
    price: 1300000, 
    region: "Andina", 
    description: "Selva y aventura", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQL9wzy2aJgid5oPAOfMx7LsJVdI5tWIYBWw&s" 
  },
  { id: 12, 
    name: "Nuquí", 
    price: 1100000, 
    region: "Caribe", 
    description: "Avistamiento de ballenas", 
    image: "https://productos.aviatur.com/aviaturcom2024/entradas-blog/nuqui.webp" 
  },
  { id: 13,
    name: "Manizales", 
    price: 650000, 
    region: "Andina", 
    description: "Montañas y café", 
    image: "https://colombia.co/sites/default/files/2024-12/banner-manizales.jpg" 
  },
  { id: 14, 
    name: "Pasto", 
    price: 480000, 
    region: "Andina", 
    description: "Cultura y volcanes", 
    image: "https://imagescdn.citix.com.co/citix/production/tours/151baf85-3ac9-4a0a-af56-a0b31e698e01/50869ef8cba70c931c080df2750caa80.webp" 
  },
  { id: 15, 
    name: "Tolú", 
    price: 700000, 
    region: "Caribe", 
    description: "Playas tranquilas", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd8bnthARewNPJ6oKjDkF7LWNg8I-fxm-YNQ&s" 
  }
];

// =====================================
// STATE
// =====================================
let cart = JSON.parse(localStorage.getItem("travelCart")) || [];
let currentIndex = 0;

// =====================================
// DOM
// =====================================
const destinationsContainer = document.getElementById("destinations");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// =====================================
// FUNCION MOVIMIENTO DE FLECHAS 
// =====================================
const moveSlider = () => {
  const cardWidth = 300; // ancho aproximado
  destinationsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
};

nextBtn.addEventListener("click", () => {
  if (currentIndex < destinations.length - 1) {
    currentIndex++;
    moveSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    moveSlider();
  }
});

const filterByRegion = region => {
  if (region === "all") renderDestinations();
  else renderDestinations(destinations.filter(d => d.region === region));
};

// =====================================
// RENDER DESTINOS
// =====================================
const renderDestinations = (data = destinations) => {
  destinationsContainer.innerHTML = "";

  data.forEach(dest => {
    const card = document.createElement("div");
    card.style.minWidth = "280px";

    card.innerHTML = `
      <article class="card h-100 shadow-sm">
        <img src="${dest.image}" class="card-img-top">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary mb-2">${dest.region}</span>
          <h5>${dest.name}</h5>
          <p class="text-muted">${dest.description}</p>
          <p class="fw-bold mt-auto">${COP_FORMATTER.format(dest.price)}</p>
          <button class="btn btn-primary w-100 mt-2"
            onclick="addToCart(${dest.id})">
            Reservar
          </button>
        </div>
      </article>
    `;

    destinationsContainer.appendChild(card);
  });
};

// =====================================
// RESTO (carrito igual)
// =====================================
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalElement = document.getElementById("total");

const cartCanvas = new bootstrap.Offcanvas(
  document.getElementById("cartCanvas")
);

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
      <button class="btn btn-sm btn-danger"
        onclick="removeFromCart(${index})">❌</button>
    `;
    cartItemsContainer.appendChild(li);
  });

  totalElement.textContent =
    COP_FORMATTER.format(calculateTotal());
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

// =====================================
// INIT
// =====================================
renderDestinations();
renderCart();
updateCartCount();