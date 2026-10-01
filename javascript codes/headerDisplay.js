import { headerGenerator } from "./header code.js";
import { addToCart, cart } from "./cart.js";
import { product } from "./product.js";
let headerhtml='';
 headerGenerator.forEach((headerGenerator) => {

        headerhtml+=`
              <div class="left-section">
                 <div class="main-menu" id='menu'>
                    <img class="menu" src="https://res.cloudinary.com/dpvnxaxv4/image/upload/v1787054635/main_menu_gtblk2.jpg">
                </div>
                <div class="company-logo">
                    <img class="logo" src="https://res.cloudinary.com/dpvnxaxv4/image/upload/v1787256946/f79335c6-54ed-4ba4-b787-dc25d0bcce4d.png">
                </div>
               <p class="company-name">${headerGenerator.companyName}</p>        
            </div>
            <div class="middle-section">
                <div class="search">
                    <input class="search-bar" text="Search" placeholder="Search" id="searchInput">
                </div>
                <div id="product-container" class='searchbar-dropdown'>
                </div>
            </div>
            <div class="right-section">
                <a href="cart.html">
                <div class="cart-button">
                   <img class="cart" src="https://res.cloudinary.com/dpvnxaxv4/image/upload/v1787054626/cart_r0edca.jpg">
                    <div class="tooltip">
                      cart
                    </div> 
                    <div class="cart-quantity"></div>
                </div>   
                </a>  
                <div class="notification-button">
                      <img class="notification" src="https://res.cloudinary.com/dpvnxaxv4/image/upload/v1787054644/notification_ujbnx5.jpg">
                      <div class="tooltip">
                         notifications
                      </div>        
                </div>
                <div class="account-button">
                    <img class="account" src="https://res.cloudinary.com/dpvnxaxv4/image/upload/v1787054552/account_msq3jd.jpg">
                    <div class="tooltip">
                        accounts
                    </div>
                </div>
            </div>

<!-- sidebar code-->
          <div id="side" class="sidebar"> 
             <div class="sidebar-overlay"></div>
              <p class= "home"> 
                 HOME
              </p>
              <p class="message">
                MESSAGE
              <p>  
              <p class="orders">
                 ORDERS
              </p>
              <p class="feedback">
                FEEDBACK
              </p>   
              <p class="about">
                ABOUT
              </p> 
              <div class="product">PRODUCTS 
              </div>
          </div>
    ` 
})
document.querySelector('.header')
.innerHTML= headerhtml;



// Update cart quantity function
export function updateCartQuantity(cart) {
    document.querySelectorAll(".cart-quantity").forEach((cartQ) => {    
        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.Quantity;
        });
        localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
        cartQ.innerHTML = cartQuantity;
    });
}



   const searchInput = document.getElementById('searchInput');
    const keywordList = document.getElementById('product-container');

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();

      // ✅ This is where we define 'filtered'
      const filtered = product.filter(p =>
        p.keyWords.some(k => k.toLowerCase().includes(query))
      );

      const allKeywords = filtered.flatMap(p => p.keyWords);

    });

const searchBar = document.querySelector('.search-bar');
const suggestionsContainer = document.createElement('div');
suggestionsContainer.classList.add('search-suggestions');
searchBar.parentElement.appendChild(suggestionsContainer);

searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    // Filter products based on search
    const matches = product.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        (p.keyWords && p.keyWords.some(word => word.toLowerCase().includes(query)))
    );

    // Show suggestions
    if (matches.length > 0) {
        suggestionsContainer.style.display = 'block';
        suggestionsContainer.innerHTML = matches
            .slice(0, 5) // Show top 5 matches
            .map(p => `
                <div class="suggestion-item" data-id="${p.id}">
                    <img src="${p.image}" style="width: 40px; height: 40px; margin-right: 10px;">
                    ${p.name} - ${p.type}
                </div>
            `).join('');
    } else {
        suggestionsContainer.style.display = 'none';
    }
});

// Handle suggestion clicks
suggestionsContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion-item');
    if (item) {
        const productId = item.dataset.id;
        const selectedProduct = product.find(p => p.id === productId);
        // Navigate to product or show details
        window.location.href = `product.html?id=${productId}`;
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar') && !e.target.closest('.search-suggestions')) {
        suggestionsContainer.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', () => {
  // Sidebar routes
  const sidebarItems = {
    '.home': 'kamkunji wholesalers.html',
    '.message': 'https://wa.me/254707985803?text=Hello%2C%20how%20may%20I%20be%20of%20service%3F',
    '.customer-care': 'ordersPage.html',
    '.feedback': 'feedback.html'
  };

  // Elements
  const mainMenu = document.querySelector('.main-menu');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  // ✅ Show sidebar
  mainMenu.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent immediate hide
    sidebar.classList.add('show-sidebar');
   
  });

  // ✅ Hide sidebar when clicking overlay or anywhere else
  document.addEventListener('click', (e) => {
    if (
      !sidebar.contains(e.target) && 
      !mainMenu.contains(e.target)
    ) {
      sidebar.classList.remove('show-sidebar');
      overlay.classList.remove('show-overlay');
    }
  });

  // ✅ Add navigation for sidebar items
  for (const [selector, path] of Object.entries(sidebarItems)) {
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault();

// Close sidebar
        sidebar.classList.remove('show-sidebar');
        overlay.classList.remove('show-overlay');

        // Navigate after short delay for smooth UX
        setTimeout(() => {
          window.location.href = path;
        }, 200);
      });
    }
  }
});



//clicking accounts button and opening the login page
const accounts = document.querySelector(".account-button");
accounts.addEventListener("click",(e)=>{
   window.location.href="index.html"

})

//showing product on the sidebar

const sidebarproducts = document.querySelector(".product");
 sidebarproducts.addEventListener("click",()=>{
  console.log("clicked");
   sidebarproducts.innerHTML =`
              <div class="product">PRODUCTS 
                <div class="product-select">
                  <span class="livingrooms">LIVING ROOM</span>
                  <span class="bedrooms">BEDROOM</span>
                  <span class="bathrooms" >BATHROOM</span>
                  <span class="utensil">KITCHENWARE </span>
                  <span class="electronic">ELECTRONICS</span>
                  <span class="bagpack">TRAVELLING BAGS</span>
                  <span class="organizer"> ORGANIZERS </span>
                </div>
              </div>
            `
 })
