import { product, productScrollbar } from "./product.js";
import { cart, addToCart, select, selected } from './cart.js';
import { updateCartQuantity } from "./headerDisplay.js";

let homepagehtml = "";

product.forEach((product) => {

    // FIXED: add "..." only if needed
    const text = product.name;
    const editedText = text.length > 23 
        ? text.substring(0, 18) + "..." 
        : text;

    homepagehtml += `
        <div class="products-details" data-product-selected="${product.id}">
            <img class="image" src="${product.image}">

            <div class="item-details">
                <div class="product-name">
                    ${editedText}
                </div>

                <div class="product-price">
                    <p class="price">Ksh</p>
                    ${product.price}
                </div>
            </div>
        </div>    
    `;
});

document.querySelector('.homepage').innerHTML = homepagehtml;


let scrollbarhtml = "";
const item  = product.filter(product => product && product.type.toLowerCase() === 'carpet')
item.forEach((item)=>{
    const text = item.name
    const editedtext = text.length > 23 ? text.substring(0,20)+'....':text;
    scrollbarhtml+=`
    <div class="products-details" data-product-selected="${item.id}">
        <img class="image" src="${item.image}">

        <div class="item-details">
            <div class="product-name">
                ${editedtext}
            </div>

            <div class="product-price">
                <p class="price">Ksh</p>
                ${item.price}
            </div>
        </div>
    </div>
    `
})

document.querySelector(".scroll-bar").innerHTML= scrollbarhtml;


let homepagehtml2 = "";

product.forEach((product) => {

    // FIXED: add "..." only if needed
    const text = product.name;
    const editedText = text.length > 23 
        ? text.substring(0, 18) + "..." 
        : text;

    homepagehtml2 += `
        <div class="products-details" data-product-selected="${product.id}">
            <img class="image" src="${product.image}">

            <div class="item-details">
                <div class="product-name">
                    ${editedText}
                </div>

                <div class="product-price">
                    <p class="price">Ksh</p>
                    ${product.price}
                </div>
            </div>
        </div>    
    `;
});

document.querySelector('.homepage2').innerHTML = homepagehtml2;



// Handle clicks — open selected product
document.querySelectorAll('.products-details').forEach((div) => {
    const selectedProduct = div.dataset.productSelected;

    div.addEventListener('click', () => {
        select(selectedProduct);
        console.log(selected);
        window.location.href = "singleproduct.html"
    });
});
