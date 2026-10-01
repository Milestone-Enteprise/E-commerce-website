import { cartOrder,order } from "./order.js";
import { product } from "./product.js";


 let orderHtml='';
 const items = product
if (order.lenght === 0){
    orderHtml = `<p> Oops!🤯🤯 you have not made an order <\p>`
}else{ 
 order.forEach((orders)=> {
    const ordered = orders.id;
    const Quantity = orders.quantity;
    const Total = orders.total
    const orderItem = items.find((items) => (items.id === ordered))
    console.log(order)
    if(!orderItem) return
    orderHtml+=`
        <div class="order-left">
            <h1>Your Order</h1>
            <div class="order-items">
                <div class="order-item">
                <div class="order-item-content">
                    <img src='${orderItem.image}' alt="Product 1">
                    <div class="item-details">
                    <h3>${orderItem.name}</h3>
                    <p>${Quantity}</p>
                    </div>
                    <div class="item-price">Ksh ${Total}</div>
                </div>
                <div class="delivery-status">🚚 Delivery in Progress</div>
                </div>
            </div>
        </div>
    `
 })};
document.querySelector('.order-container')
.innerHTML = orderHtml;
//