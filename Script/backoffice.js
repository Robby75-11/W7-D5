const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ4MjM4MzRiZjAwMTUwMDA2ZmYiLCJpYXQiOjE3NDI1NDYwNTAsImV4cCI6MTc0Mzc1NTY1MH0.uSQ7uuPbQKbQeXUkV7p0T5M3NDP68U4lZJaPLDnB4os"; // Inserisci il tuo token personale
document.addEventListener("DOMContentLoaded", fetchProducts);
document.getElementById("productForm").addEventListener("submit", addProduct);
document
  .getElementById("resetForm")
  .addEventListener("click", () =>
    document.getElementById("productForm").reset()
  );

async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Errore nel recupero prodotti:", error);
  }
}

function displayProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product) => {
    productList.innerHTML += `
              <div class="col-md-4">
                  <div class="card mb-3">
                      <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                      <div class="card-body">
                          <h5 class="card-title">${product.name}</h5>
                          <p class="card-text">${product.description}</p>
                          <p class="card-text"><strong>€${product.price}</strong></p>
                          <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Elimina</button>
                      </div>
                  </div>
              </div>`;
  });
}

async function addProduct(event) {
  event.preventDefault();

  const productData = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert("Prodotto aggiunto con successo!");
      document.getElementById("productForm").reset();
      fetchProducts(); // Ricarica i prodotti
    } else {
      alert("Errore nell'aggiunta del prodotto.");
    }
  } catch (error) {
    console.error("Errore:", error);
  }
}

async function deleteProduct(productId) {
  if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

  try {
    const response = await fetch(API_URL + productId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });

    if (response.ok) {
      alert("Prodotto eliminato con successo!");
      fetchProducts(); // Ricarica i prodotti
    } else {
      alert("Errore nell'eliminazione del prodotto.");
    }
  } catch (error) {
    console.error("Errore:", error);
  }
}
