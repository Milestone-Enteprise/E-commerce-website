import {cart, removefromcart,orderUpdate} from './cart.js';
import { product } from './product.js'
import {removefromorder} from './order.js';



 // ...existing code...
let cartHtml = '';
if (cart.length === 0) {
  cartHtml = `<p class="empty">You have added product to the cart yet</p>`;
} else {
  const customersItem = product;
  cart.forEach((item) => {
    const cartCommodity = item.productId;
    const Quantity = Number(item.Quantity) || 0;
  const cartProduct = customersItem.find(p => p.id === cartCommodity);
    if (!cartProduct) return; // skip if product not found
  const price = Number(cartProduct.price) || 0;
  const itemTotal = price * Quantity;

    const editedText = cartProduct.name.length > 25
      ? cartProduct.name.substring(0, 18) + "..."
      : cartProduct.name;

    cartHtml += `
     
      <div class="cart-item client-products-${cartProduct.id}">
        <img src="${cartProduct.image}" class="cart-img"/>
        <div class="cart-info">
          <div class="cart-details">
            <h3>${editedText}</h3>
            <button class="remove-btn" data-remove-item="${cartProduct.id}">
             <img  class="remove-btn"src="https://www.svgrepo.com/show/488895/delete-1.svg" alt="X" width="20"/>
             </button>
          </div>
          <div class="cart-quantity-controls">
          <div class="quantity-control">
              <button class="controls" id="subtract">-</button>
                <div class="cart-quantitys" data-product-quantity="id="quantity" ">
                  ${Quantity}
                </div>
                <button class="controls" id="${cartProduct.id} data-add-item="${cartProduct.id}">+</button>
              </div>
              <div class="prices-tag">
                <h4>Price:</h4>
                <div class="item-total"id="Total" data-item-total="${itemTotal}">Ksh ${itemTotal.toLocaleString('en-KE')}</div>
              </div>
          </div>
        </div>
      </div>
    `;
});
}

document.querySelector('.cart-products').innerHTML = cartHtml;
 


// remove buttons
document.querySelectorAll('.remove-btn').forEach((span) => {
  const removeItem = span.dataset.removeItem;
  span.addEventListener('click', () => {
    const removingitem = document.querySelector(`.client-products-${removeItem}`);
    if (removingitem) removingitem.remove();
    removefromorder(removeItem);
    removefromcart(removeItem);
    // update totals after removalc
    updateCartTotalsFromDOM();
  });
});




let amount = Array.from(document.querySelectorAll('[data-product-quantity]'))
  .reduce((s, el) => s + (Number(el.dataset.productQuantity) || 0), 0);
  const itemTotals = Array.from(document.querySelectorAll('[data-item-total]'))
    .map(el => Number(el.dataset.itemTotal) || 0);

let  Sub= itemTotals.reduce((s, v) => s + v, 0);



// compute and show totals based on current cart DOM (or fallback to localStorage)
export function updateCartTotalsFromDOM(Sub,amount) {
  // compute subtotal by summing data-item-total attributes
  const itemTotals = Array.from(document.querySelectorAll('[data-item-total]'))
    .map(el => Number(el.dataset.itemTotal) || 0);

  const Subtotal = itemTotals.reduce((s, v) => s + v, 0);
  const Quantity = Array.from(document.querySelectorAll('[data-product-quantity]'))
    .reduce((s, el) => s + (Number(el.dataset.productQuantity) || 0), 0);


  // also persist totals if other pages read them
  localStorage.setItem('cartTotal', JSON.stringify(Subtotal));
  localStorage.setItem('cartQuantity', JSON.stringify(Quantity));
   Sub =JSON.parse(localStorage.getItem("cartTotal"))
   amount =JSON.parse(localStorage.getItem("cartQuantity"))
   console.log(amount)

 return Subtotal,Quantity;
}
 

//order summarry that takes you to the check out page





const subsumarry = document.querySelector(".order-summarrys")
subsumarry.innerHTML= 
`   
  <div class="orders-sub">
      <div class="company-logo">
        <img  class="companys-logo" src="https://res.cloudinary.com/dpvnxaxv4/image/upload/v1787256946/f79335c6-54ed-4ba4-b787-dc25d0bcce4d.png" alt="KAMKUNJI WHOLESALES">
      </div>
      <h2 class="company-title">KAMKUNJI WHOLESALERS</h2>
      <h3 class="title">CART SUMMARRY</h3>
      <div class="product-summary">
        <p class="totals">Subtotal :</p>
        <span class="subtotal"   > KSH:${Sub}</span>
      </div>
      <div class="product-summary">
        <p class="product-amount" >Quantity</p>
        <span class="cart-amount" >${amount} PCS</span>
      </div>
      <div id="total"class="product-summary">
        <p class="subfinal">Total :</p>
        <span class="subtotal">KSH:${Sub}</span> 
      </div>
      <button class="checkout-btn">Proceed to checkout</button>
      <button class="shopping">Countinue shopping</button>
  </div>
`


// update totals when order-button clicked (existing handler kept, now calls updater)
const proceed=document.querySelector('.checkout-btn')
proceed.addEventListener('click', () => {
    window.location.href = "cartsummary.html";

    orderUpdate(quantityElement ,subtotalElement, deliveryElement , totalElement ,bill );
   // after redirect this won't run here; keep totals persisted instead
    updateCartTotalsFromDOM();
});

function getCartRow(productId) {
  return Array.from(document.querySelectorAll('.cart-item'))
    .find(row => row.dataset.cartItem === String(productId));
}



  cart.forEach((item)=>{
    const addbtn =document.querySelectorAll('[data-add-item]');
    const cartCommodity = item.productId;
    const Quantity= Number(item.Quantity) || 0;
    let addquantity = Quantity
    const row = getCartRow(item.productId);
    const quantityElement= row.querySelector('[data-product-quantity]');
    addbtn.forEach((button)=>{
        button.addEventListener('click',()=>{
          const product = button.dataset.addItem;
          if(product === cartCommodity){
            addquantity += 1;
            quantityElement.innerHTML= addquantity;
            localStorage.setItem('cartQuantity',JSON.stringify(addquantity));
          }
        })
      })
})


const subtractbtn = document.querySelectorAll("#subtract")
subtractbtn.forEach((button)=>{
        const quantityElement = document.querySelector('[data-product-quantity]');
        let quantity =Number(JSON.parse(localStorage.getItem('cartQuantity')))
        let quantitys= 0;
    button.addEventListener('click',(amount)=>{
      quantitys = quantity - 1;

      console.log(quantitys)
      quantityElement.innerHTML= quantitys;
      amount =JSON.parse(localStorage.getItem("cartQuantity"))
       localStorage.setItem('cartQuantity', JSON.stringify(quantitys));
    })
  });
