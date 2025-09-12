// Ürünler için HTML kodunu tutan bir degisken tanımla  
let productsHTML = '';

// forEach() metodu kullanarak, daha önceden tanımlanmış products dizisindeki her bir ürün icin HTML kodunu olustur.
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png"> 
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2) /* Urun fiyatini 2 ondalikli olarak formatla*/}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// HTML kodunu sayfaya ekle
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Urun sepete ekle
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => { // Her bir sepete ekle butonuna tıklandıgında
    button.addEventListener('click', () => {
      const productId = button.dataset.productId; // Urunun id'sini al

      let matchingItem; // Aynı urunu sepete eklemek icin bir degisken tanimla

      cart.forEach((item) => {  // Her bir sepete ekle butonuna tıklandıgında
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) { // Aynı urunu sepete eklemek icin
        matchingItem.quantity += 1;
      } else { // Yeni urunu sepete eklemek icin
        cart.push({
          productId: productId,
          quantity: 1
        });
      }

      // Sepet sayısını guncelle
      let cartQuantity = 0;

      cart.forEach((item) => { 
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    });
  });