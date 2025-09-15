export const cart = [];

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