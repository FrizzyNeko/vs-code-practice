import { cart } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { renderOrderSummary } from "./orderSummary.js";
import { addOrder } from '../../data/orders.js'

// Ödeme bileşenini oluştur
export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    // Sepetteki ürünlerin fiyatlarını hesapla
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId); // Sepetteki ürünün bilgilerini al
        productPriceCents +=product.priceCents * cartItem.quantity; // Ürünün fiyatını ürün adediyle çarp ve toplam fiyatı güncelle
        
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId); // Kargo seçeneğini al
        shippingPriceCents += deliveryOption.priceCents; // Kargo fiyatını güncelle
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents; // Toplam fiyatı hesapla
    const taxCents = Math.round(totalBeforeTaxCents * 0.18); // Vergiyi hesapla
    const totalCents = totalBeforeTaxCents + taxCents; // Toplam fiyatı hesapla
    
    // Ödeme bileşenini oluştur
    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order')
      .addEventListener('click', async () => {
        try {
          const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart: cart
            })
          });

          const order = await response.json();
          addOrder(order);

        } catch (error) {
          console.log('Unexpected error. Try again later.')
        }

        window.location.href = 'orders.html';
      });
}

