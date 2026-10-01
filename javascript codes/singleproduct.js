import { product } from "./product.js";
import { selected, addToCart, cart, update } from "./cart.js";
import { cartOrder } from "./order.js";
//import { Total } from "./checkout.js";

let producthtml = "";

selected.forEach((item) => {
    const select = item.productId;
    const commodity = product.find(p => p.id === select);

    if (!commodity) return;

    producthtml += `
        <div class="product-image">
            <img class="image-1" src="${commodity.image}">
            <img class="image-1" src="${commodity.image}">
            <img class="image-1" src="${commodity.image}">
            <img class="image-1" src="${commodity.image}">
        </div>

        <div class="product-details">
            <h1 class="product-Name">
                ${commodity.name}
            </h1>

            <div class="rating">
                ${commodity.rating}
            </div>

            <h2 class="price" data-product-price="${commodity.price}">
                Ksh ${commodity.price}
            </h2>

            <p class="description">
                ${commodity.description}
            </p>
            <div class="size-container">
            <label for="size" class="size-label">Select Size</label>
                <select id="size" class="size-select">
                    <option hidden selected>Please select size</option>
                    <${commodity.size.map(sizeOption => `<option value="${sizeOption}">${sizeOption}</option>`).join('')}
                </select>
            </div>
            <div class="quantity-container">
            <label for="quantity" class="qty-label">Select Quantity</label>
                <select id="quantity" class="qty-select">
                    <option  hidden selected>Please select quantity</option>
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
  
            <button class="add-to-cart" data-add-item='${commodity.id}' data-product-item='${commodity.id}'>
                Add to cart
            </button>
        </div>
    `;
});

// Insert HTML into page
document.querySelector('.selected-product').innerHTML = producthtml;

// Enable add-to-cart button
document.querySelectorAll('.add-to-cart').forEach(button => {
    const addProduct = button.dataset.addItem;
    const orderItem= button.dataset.productItem;
    button.addEventListener('click', () => {
        const select= button.parentElement.parentElement.querySelector(".qty-select")
        const Quantity = parseInt(select.value); 
       const priceElement = button.parentElement.querySelector(".price");
        const Price = Number(priceElement.dataset.productPrice);
        console.log(Price)
        //const productTotal = Total()
        addToCart(addProduct,Quantity,Price);
        cartOrder(orderItem,Quantity,Price)
        update(Price,Quantity)

        window.location.href="cart.html"
    });
});
