// 1. Import your product data
import { products } from './product.js'; 

 export function search(){

const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('product-results');

// Initial display of all products
displayProducts(products); 

// 2. Add an event listener to the search bar
searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // 3. Filter the products based on the search term
    const filteredProducts = products.filter(product => {
        // Prepare the search material from the product object
        const searchableText = [
            product.name,
            product.type,
            ...product.keyWords 
            // The spread operator (...) combines the product's keywords array into this array
        ].join(' ').toLowerCase();

        // Check if the searchable text includes the user's search term
        return searchableText.includes(searchTerm);
    });

    // 4. Update the display with the filtered list
    displayProducts(filteredProducts);
});


// Function to render the products to the DOM
function displayProducts(productsToDisplay) {
    resultsContainer.innerHTML = ''; // Clear previous results

    if (productsToDisplay.length === 0) {
        resultsContainer.innerHTML = '<p>No products found matching your search.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Type: ${product.type}</p>
            <p>Keywords: ${product.keyWords.join(', ')}</p>
            `;
        resultsContainer.appendChild(productDiv);
    });
}
}