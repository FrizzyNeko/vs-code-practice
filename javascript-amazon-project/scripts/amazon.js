import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { products, loadProductsFetch} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProductsFetch().then(() => {
  renderProductsGrid();
});

function renderProductsGrid() {
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
            src="${product.getStarsUrl()}"> 
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-product-quantity-selector-${product.id}">
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

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
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

  const cartTimers = {};

  function updateCartQuantity() {
    // Sepet sayısını guncelle
    let cartQuantity = 0;

    cart.forEach((cartItem) => { 
      cartQuantity += cartItem.quantity;
    });
    
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  function showAddedToCartMessage(productId) {
    // "Added to cart" mesajını güncelle
      const addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCartElement.style.opacity = 1;

      // Önceki timer'ı temizle
      if (cartTimers[productId]) {
        clearTimeout(cartTimers[productId]);
      }

      // Yeni timer başlat
      cartTimers[productId] = setTimeout(() => {
        addedToCartElement.style.opacity = 0;
        cartTimers[productId] = null; 
      }, 2000);
  }

  // Urun sepete ekle
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => { // Her bir sepete ekle butonuna tıklandıgında
      button.addEventListener('click', () => {
        const productId = button.dataset.productId; // Urunun id'sini al

        addToCart(productId);

        updateCartQuantity();

        showAddedToCartMessage(productId);

      });
    });

    const cartQuantiy = calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantiy;
}



