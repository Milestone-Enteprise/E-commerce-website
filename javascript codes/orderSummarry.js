import { orderDetails,paymentPopup,orderCart } from './orders.js';
import { orderUpdate, selected } from './cart.js';

let orderHtml='';
let paymentHtml='';
orderCart.forEach((orderCart) => {
    orderHtml+=`
            <div class="order-container">
            <!-- Order Summary Title -->
            <h2 class="order-title">Order Summary</h2>

            <!-- Customer Details -->
            <div class="customer-section">
                <h3> Delivery Details</h3>

                <input class="input-field" type="text" id="first-name" placeholder="First name" required>
                <input class="input-field" type="text" id="last-name" placeholder="last name" required>
                <input class="input-field" type="tel"id="phonenumber" placeholder="Phone Number" required>
                
                <div class="location-row">
                    <select class="select-field" id="selected-town">
                        <option disabled selected>Select Town</option>
                        <option>Nairobi</option>
                        <option>Mombasa</option>
                        <option>Kisumu</option>
                        <option>Nakuru</option>
                        <option>Eldoret</option>
                        <option>Kitale</option>
                        <option>Kilifi</option>
                        <option>Kericho</option>
                        <option>Bungoma</option>
                        <option>Nyeri</option>
                        <option>Kakamega</option>
                        <option>Malindi</option>
                        <option>Machakos</option>
                        <option>Kitui</option>
                        <option>Voi</option>
                        <option>Lodwar</option>
                        <option>Nyahururu</option>
                        <option>Narok</option>
                        <option>Nanyuki</option>
                        <option>Kajiado</option>
                    </select>
                   </div>
                  <input class="input-field" type="text" id="specific-location" placeholder="Specific Location" required>

            </div>

            <!-- Order Cost Summary -->
            <div class="cost-summary">
                <div class="product-count">
                    <span>Products</span>
                    <span>0</span>
                </div>

                <div class="product-cost">
                    <span>SubTotal</span>
                    <span>Ksh 0</span>
                </div>

                <div class="delivery-cost">
                    <span>Delivery Cost</span>
                    <span >Ksh 200</span>
                </div>

                <hr>

                <div class="total">
                    <span>Total</span>
                    <span >Ksh 0</span>
                </div>
            </div>

            <!-- Submit Button -->
            <button class="place-order-btn" id="checkout-button">
                Place Order
            </button>
        </div>
    `
});
orderCart.forEach(()=>{
    paymentHtml+=`
            <form id="payment-form">
            <div class="payment-container">
                <h1 class="payment-header">
                    M-pesa
                </h1>
                <h2 class="bill">
                    Your bill
                </h2>
                <div class="amount" id='amount'>
                    Ksh 3000
                </div>
                <input class="phonenumber" type="number" placeholder="input phone number" id="number" required>
                <button class="pay" id="pay-button">
                    PAY
                </button>
                <button class="cancel" id="closePopup">
                    cancel
                </button>
            </div>
        </form> 
 `
});
document.querySelector('.order-summary')
.innerHTML= orderHtml;
document.querySelector('.payment')
.innerHTML=paymentHtml;




const openPopup = document.getElementById('checkout-button');
const closePopup = document.getElementById('closePopup');
const payButtons = document.getElementById('.pay-button')
const popup = document.getElementById('payment-form');
popup.style.display= 'none';                                                                                                                      


document.querySelector(".place-order-btn").addEventListener("click", async (e) => {

 
  // prevent default form submission
    e.preventDefault?.(); 
    const name = document.getElementById("full-name")?.value?.trim();
    const clientnumber = document.getElementById("phonenumber")?.value?.trim();
    const region = document.getElementById("selected-town")?.value;
    const location = document.getElementById("specific-location")?.value?.trim();
    console.log(clientnumber)

    // Basic validation
    if (!name || !clientnumber || !region || !location) {
      alert("Please fill in all delivery details.");
      return;
    }
    // display the payment tab for mpesa
  paymentPopup(openPopup,closePopup,popup,payButtons)
   
  });


// attach handler to pay button
const payBtn = document.getElementById('pay-button');
if (payBtn) {
  payBtn.addEventListener('click', async (e) => {
    e.preventDefault?.();

    const name = document.getElementById("full-name")?.value?.trim();
    const clientnumber = document.getElementById("phonenumber")?.value?.trim();
    const region = document.getElementById("selected-town")?.value;
    const location = document.getElementById("specific-location")?.value?.trim();

    // Get phone number from input
    const phone = document.getElementById('number')?.value?.trim();
    
    // Get amount from the div
    const amountText = document.getElementById('amount')?.innerText || 'Ksh 0';
    const amount = Number(amountText.replace(/[^0-9.]/g, '').trim());

    // Get order items from localStorage
    let orderItems = JSON.parse(localStorage.getItem('order') || '[]');

    // If orderItems is not an array, try to extract from it
    if (!Array.isArray(orderItems)) {
      alert('Order is not an array, attempting to extract...');
      orderItems = [];
    }

    // Filter out invalid items and ensure proper structure
    orderItems = orderItems.filter(item => item && item.id).map(item => ({
    productId: item.id || item.productId,
    quantity: Number(item.Quantity || item.quantity || 0),
    }));

    console.log('Processed order items:', orderItems);

    if (orderItems.length === 0) {
      alert('Your cart is empty. Please add items to cart first.');
      return;
    }


    // send delivery details to the backend
    try {
      const res = await fetch(" https://exchangeable-unwisely-arden.ngrok-free.dev/delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, clientnumber, region, location })
      });

      // Check HTTP status first and give useful logs
      if (!res.ok) {
        const text = await res.text();
        console.error("Delivery API error:", res.status, text);
        alert(`Server error (${res.status}). Check console for details.`);
        return;
      }

      const data = await res.json();
      if (data.success) {
      console.log("Delivery Response:", data.message);
     } else {
        console.error("Delivery API responded with failure:", data);
        alert("An error occurred while placing your order.");
      }
    } catch (err) {
      console.error("Network or server error on /delivery:", err);
      alert("Failed to place order. Check your network or server.");
    }


    // order placement to the backend
    try{

    // Basic validation{

      console.log('Sending to /order endpoint:', {
        order: orderItems,});

      const orderRes = await fetch('https://exchangeable-unwisely-arden.ngrok-free.dev/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          order: orderItems})
      });

      console.log('Response status:', orderRes.status);
      const responseText = await orderRes.text();
      console.log('Response body:', responseText);

      if (!orderRes.ok) {
        console.error('Order API error:', orderRes.status, responseText);
        alert(`Order failed (${orderRes.status}). Check console.`);
        return;
      }

      const orderData = JSON.parse(responseText);
      console.log('Order Response:', orderData);

      if (orderData.success) {
        alert('Your order has been placed successfully!');
        localStorage.removeItem('order');
        localStorage.removeItem('cartTotal');
        localStorage.setItem('cartQuantity', JSON.stringify(0));
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        alert('Order placement failed: ' + (orderData.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Network or server error on /order:', err);
      alert('Failed to place order. Check network or server.');
    }
  });
}

  const quantityElement = document.querySelector('.product-count');
  const subtotalElement = document.querySelector('.product-cost');
  const totalElement = document.querySelector('.total');
  const deliveryElement = document.querySelector('.delivery-cost');
  const bill = document.querySelector('.amount');





// Listen for same-tab updates
window.addEventListener('cartUpdated', () => {
  orderUpdate( quantityElement ,subtotalElement , totalElement ,bill );
  });

// Listen for cross-tab updates
window.addEventListener('storage', (e) => {
  if (e.key === 'order' || e.key === 'cartTotal' || e.key === 'cartQuantity') {
    orderUpdate( quantityElement ,subtotalElement , totalElement ,bill );
  }
});

// Init on load
document.addEventListener('DOMContentLoaded', orderUpdate( quantityElement ,subtotalElement,deliveryElement , totalElement ,bill ));
