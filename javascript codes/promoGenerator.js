import { promoProducts} from "./promo.js";
let promoHtml='';

promoProducts.forEach((promoProduct)=>{
    promoHtml+=`
        <div class="product-promo">  
            <div class="promo">
            <img class="productx" src="${promoProduct.image1}" alt="${promoProduct.alt}">
                <div class="tooltip">
                 Quick shop
                </div> 
            </div>
         <div class="promo">
            <img class="productx" src="${promoProduct.image2}" alt="${promoProduct.alt}">
                <div class="tooltip">
                 Quick shop
                </div> 
            </div>
                    <div class="promo">
            <img class="productx" src="${promoProduct.image3}" alt="${promoProduct.alt}">
                <div class="tooltip">
                 Quick shop
                </div> 
            </div>
        </div>
     `
});
document.querySelector('.products-promo')
.innerHTML= promoHtml




document.addEventListener("DOMContentLoaded", () => {
  const promos = document.querySelectorAll(".product-promo");
  let currentPromo = 0;

  function promoDisplay() {
    promos.forEach(promo => {
      promo.style.display = "flex";
    });
        setInterval(() => {
        promos[currentPromo].style.display = 'none';
        currentPromo = (currentPromo + 1) % promos.length;
        promos[currentPromo].style.display = 'flex';
    }, 8000); // Change promo every 10 seconds
  }

   return promoDisplay();
});