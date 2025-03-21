const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ4MjM4MzRiZjAwMTUwMDA2ZmYiLCJpYXQiOjE3NDI1NDYwNTAsImV4cCI6MTc0Mzc1NTY1MH0.uSQ7uuPbQKbQeXUkV7p0T5M3NDP68U4lZJaPLDnB4os"; // Inserisci il tuo token personale
document.addEventListener("DOMContentLoaded", fetchProductDetails);

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // Ottiene l'ID del prodotto dall'URL
}

async function fetchProductDetails() {
  const productId = getProductId();
  if (!productId) {
    alert("ID prodotto non trovato!");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(API_URL + productId, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ4MjM4MzRiZjAwMTUwMDA2ZmYiLCJpYXQiOjE3NDI1NDYwNTAsImV4cCI6MTc0Mzc1NTY1MH0.uSQ7uuPbQKbQeXUkV7p0T5M3NDP68U4lZJaPLDnB4os",
      },
    });

    if (!response.ok) throw new Error("Errore nel caricamento del prodotto");

    const product = await response.json();
    displayProduct(product);
  } catch (error) {
    console.error(error);
    alert("Errore nel caricamento del prodotto.");
  }
}

function displayProduct(product) {
  document.getElementById("productDetails").innerHTML = `
          <div class="col-md-6">
              <img src="${product.imageUrl}" class="img-fluid rounded" alt="${product.name}">
          </div>
          <div class="col-md-6">
              <h1>${product.name}</h1>
              <p>${product.description}</p>
              <h3>€${product.price}</h3>
              <button class="btn btn-primary" onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.imageUrl}')">
                  🛒 Aggiungi al Carrello
              </button>
          </div>
      `;
}

function addToCart(id, name, price, imageUrl) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id, name, price, imageUrl, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} aggiunto al carrello!`);
}
