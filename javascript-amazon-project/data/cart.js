export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

export function addToCart(productId) {
  let matchingItem; // Aynı urunu sepete eklemek icin bir degisken tanimla

  cart.forEach((cartItem) => {  // Her bir sepete ekle butonuna tıklandıgında
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  // Urunun adetini al
  const quantitySelector = document.querySelector(`.js-product-quantity-selector-${productId}`);
  let quantityValue = Number(quantitySelector.value);

  
  if (matchingItem) { // Aynı urunu sepete eklemek icin
    matchingItem.quantity += quantityValue;
  } else { // Yeni urunu sepete eklemek icin
    cart.push({
      productId: productId,
      quantity: quantityValue
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}

