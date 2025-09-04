const pizzas = [
  { id: 1, name: "Чизбургер пицца", price: 80000, img: "./image 2 (4).png" },
  { id: 2, name: "Сырная", price: 100000, img: "./image 7 (1).png" },
  { id: 3, name: "Креветки по азиатски", price: 90000, img: "./image 6 (1).png" },
  { id: 4, name: "Сырный цыпленок", price: 75000, img: "./image 5 (1).png" }
];

let cart = [];
let currentPizzas = [...pizzas];

const pizzaList = document.querySelector(".pizzas");
const cartBtn = document.getElementById("cartBtn");
const cartPage = document.getElementById("cartPage");
const backBtn = document.getElementById("backBtn");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const emptyCart = document.getElementById("emptyCart");
const sortBtn = document.getElementById("sortBtn");

function renderPizzas(list) {
  pizzaList.innerHTML = "";
  list.forEach(pizza => {
    const div = document.createElement("div");
    div.className = "pizza";
    div.innerHTML = `
      <img src="${pizza.img}" alt="${pizza.name}">
      <h3>${pizza.name}</h3>
      <p>${pizza.price} so'm</p>
      <button onclick="addToCart(${pizza.id})">➕ Добавить</button>
    `;
    pizzaList.appendChild(div);
  });
}
renderPizzas(currentPizzas);

sortBtn.addEventListener("change", (e) => {
  const value = e.target.value;

  if (value === "tsena") {
    currentPizzas.sort((a, b) => a.price - b.price);
  } else if (value === "alfavit") {
    currentPizzas.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    currentPizzas = [...pizzas];
  }

  renderPizzas(currentPizzas);
});


function addToCart(id) {
  const pizza = pizzas.find(p => p.id === id);
  cart.push(pizza);
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  cartBtn.textContent = `${total} so'm | ${cart.length} 🛒`;
}

cartBtn.addEventListener("click", () => {
  pizzaList.classList.add("hidden");
  cartPage.classList.remove("hidden");
  renderCart();
});

backBtn.addEventListener("click", () => {
  pizzaList.classList.remove("hidden");
  cartPage.classList.add("hidden");
});

function renderCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    emptyCart.style.display = "block";
  } else {
    emptyCart.style.display = "none";
    let total = 0;
    cart.forEach((p) => {
      total += p.price;
      const item = document.createElement("div");
      item.textContent = `${p.name} - ${p.price} so'm`;
      cartItems.appendChild(item);
    });
    totalPrice.textContent = total;
  }
}

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  updateCartCount();
  renderCart();
});
