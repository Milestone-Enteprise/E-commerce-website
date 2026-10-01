export let order = JSON.parse(localStorage.getItem('order')) ||
 [];


export function cartOrder(orderItem, quantity,Price) {  
  let matchingItem = order.find(o => o.id === orderItem);
  const total = Price * quantity;
  const Total = Number(total)
  console.log(Total)
  if (matchingItem) {
    matchingItem.quantity += quantity;
    matchingItem.total = Number(
      (parseFloat(matchingItem.total) + parseFloat(Total)).toFixed(2));
  } else {
    order.push({
      id: orderItem,
      quantity: quantity,
      total: Total
    });

  }

  // Save updated list
  localStorage.setItem('order', JSON.stringify(order));

  // Calculate overall total
  let Quantitys = 0;
  let Subtotal = 0.0;

  order.forEach((item) => {
    Quantitys += item.quantity; // <-- FIXED
    Subtotal += parseFloat(item.total);
  });

  Subtotal = Number(Subtotal.toFixed(2));

  console.log(order);

  return { Quantitys, Subtotal };
}


export function removefromorder(removeItem){
     const filtered = order.filter(o => o.id !== removeItem);
    
     order.length = 0;
     order.push(...filtered);
       
localStorage.setItem('order',JSON.stringify(order))
window.dispatchEvent(new Event('cartUpdated'));
}