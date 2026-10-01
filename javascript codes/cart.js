export let cart = JSON.parse(localStorage.getItem('cart')) || [];
 export let productQuantity = JSON.parse(localStorage.getItem('ProductQuantity')) || 0;
 export let productCost = JSON.parse(localStorage.getItem('productTotal')) || 0;
export function addToCart(addProduct,Quantity){
    let matchingItem;
    cart.forEach((item)=>{
      if(item.productId === addProduct){
        matchingItem = item;
      }
    })   

      if(matchingItem){
        matchingItem.Quantity+=Quantity
      }else{
      cart.push({
        productId : addProduct,
        Quantity: Quantity,
      });  
    }; 
    let cartQuantity=0
    cart.forEach((item)=>{
        cartQuantity+=item.Quantity
    })
    localStorage.setItem('cart',JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'));
}



export function removefromcart(removeItem){
    const newCart= [];
    cart.forEach((item)=>{
        if (item.productId!== removeItem){
            newCart.push(item)
        };
    });
cart = newCart
localStorage.setItem('cart',JSON.stringify(cart))
window.dispatchEvent(new Event('cartUpdated'));
}



export  function update(Price,Quantity,productTotal) {
        const Total = Price * Quantity;
}


export let selected=JSON.parse(localStorage.getItem('product'))||[] 
export function select(selectedProduct){
      selected=[]
      selected.push({
        productId : selectedProduct,
        Quantity: 1,
      })
    localStorage.setItem('product',JSON.stringify(selected))
    };  


export function orderUpdate( quantityElement ,subtotalElement,deliveryElement , totalElement ,bill ){

    let Quantity = 0;
    let Subtotal = 0;
    let total = 0;
    let order = JSON.parse(localStorage.getItem('order')) || [];
    // Sum all quantities and totals from order[]
    order.forEach((orders) => {
      Quantity += orders.quantity;
     Subtotal += orders.total;
     return { Quantity, Subtotal };
    });


   
    //Subtotal = Number(Subtotal.toFixed(2));

    // 🔹 Update the DOM values dynamically



    

    if (quantityElement) {
      quantityElement.innerHTML = `
        <p>Products</p>
        ${Quantity}
      `;
    }

    if (subtotalElement) {
      subtotalElement.innerHTML = `
      <span>SubTotal</span>
        Ksh ${Subtotal.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      `;
    }
 if (Quantity <=10){
      const deliveryCost = 150; 
      deliveryElement.innerHTML = `
        <p>Delivery Cost</p>
        Ksh ${deliveryCost.toFixed(2)}
      `;

      if (totalElement) {
         total = Subtotal + deliveryCost;
        totalElement.innerHTML = `
          <p>Total</p>
          Ksh ${total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        `;
      }
 };
 if (Quantity > 10 && Quantity <=20){
      const deliveryCost = 250;
        deliveryElement.innerHTML = `
        <p>Delivery Cost</p>
        Ksh ${deliveryCost.toFixed(2)}
      `;

      if (totalElement) {
         total = Subtotal + deliveryCost;
        totalElement.innerHTML = `  
          <p>Total</p>
          Ksh ${total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        `;
      }
  };
  if (Quantity >20  && Quantity <=30){
      const deliveryCost = 350;
      deliveryElement.innerHTML = `
        <p>Delivery Cost</p>
        Ksh ${deliveryCost.toFixed(2)}
      `;

      if (totalElement) {
        total = Subtotal + deliveryCost; 
        totalElement.innerHTML = `
          <p>Total</p>
          Ksh ${total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        `;
      }
  };
  if (Quantity >30 && Quantity <=50){
      const deliveryCost = 450;

      deliveryElement.innerHTML = `
        <p>Delivery Cost</p>
        Ksh ${deliveryCost.toFixed(2)}
      `;

      if (totalElement) {
       total = Subtotal + deliveryCost;
        totalElement.innerHTML = `
          <p>Total</p>  
          Ksh ${total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        `;
      } 
    }
    if (bill) {
    bill.innerHTML = `Ksh ${total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    // Debug
    console.log(`Updated Quantity: ${Quantity}`);
    console.log(`Updated Subtotal: Ksh ${Subtotal}`);
  }};