const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ4MjM4MzRiZjAwMTUwMDA2ZmYiLCJpYXQiOjE3NDI1NDYwNTAsImV4cCI6MTc0Mzc1NTY1MH0.uSQ7uuPbQKbQeXUkV7p0T5M3NDP68U4lZJaPLDnB4os"; // Inserisci il tuo token personale

function loadProducts() {
  $.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
      Authorization:
        " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ4MjM4MzRiZjAwMTUwMDA2ZmYiLCJpYXQiOjE3NDI1NDYwNTAsImV4cCI6MTc0Mzc1NTY1MH0.uSQ7uuPbQKbQeXUkV7p0T5M3NDP68U4lZJaPLDnB4os",
    },
    success: function (data) {
      const productList = $("#productList");
      productList.empty();
      data.forEach((product) => {
        const productItem = `
        `;
        productList.append(productItem);
      });
    },
    error: function () {
      alert("Errore durante il caricamento dei prodotti.");
    },
  });
}

function viewDetails(productId) {
  window.location.href = `details.html?id=${productId}`;
}

function editProduct(productId) {
  // Reindirizza alla pagina di back-office con il prodotto da modificare
  window.location.href = `backoffice.html?id=${productId}`;
}

$(document).ready(function () {
  loadProducts();
});
async function deleteProduct(productId, productCard) {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      }
    );

    if (!response.ok) throw new Error("Errore nell'eliminazione del prodotto");

    // Rimuovi la card del prodotto dal DOM
    productCard.remove(); // Elimina la card, compresa l'immagine

    alert("Prodotto eliminato con successo!");
  } catch (error) {
    console.error(error);
    alert("Errore nell'eliminazione del prodotto.");
  }
}

javascript;
Copia;
Modifica;
productCard
  .querySelector(`#deleteBtn${product._id}`)
  .addEventListener("click", function () {
    const confirmDelete = confirm(
      "Sei sicuro di voler eliminare questo prodotto?"
    );
    if (confirmDelete) {
      deleteProduct(product._id, productCard); // Passa la card da rimuovere
    }
  });
