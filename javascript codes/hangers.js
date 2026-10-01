    import { product } from './product.js';
    import {cart,addToCart}from './cart.js';
    import { updateCartQuantity } from './headerDisplay.js';

    function renderSuitcaseProducts() {
        const homepage = document.getElementById('suitcase-products');
        const hanger = product.filter(product => product.type && product.type.toLowerCase() ==='hanger');
        let html = '';
        hanger.forEach(product => {
            html += `    
            <div class="products-details">
                <img class="product-image" src='${product.image}'>
                <div class="item-details">
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-price">
                        <p class="price">Ksh</p>
                            ${product.price}
                    </div>
                    <button class="add-to-cart" data-add-item='${product.id}'>Add to cart</button>
                </div>
            </div>  
        `;
        });
        document.querySelector('.homepage').
        innerHTML = html 
        || '<div>No suitcases available.</div>';
    }
window.addEventListener('DOMContentLoaded', () => {
renderSuitcaseProducts();
document.querySelectorAll('.add-to-cart')
.forEach((button)=>{
    const addProduct = button.dataset.addItem;
    button.addEventListener('click',(event)=>{
        addToCart(addProduct)
        updateCartQuantity(cart);
        console.log(cart)
        
    })
})
});