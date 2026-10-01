export const orderCart=[
    {
        name:'ORDER TOTAL',
        cost:2000
    }
]
export function paymentPopup(openPopup,closePopup,popup,payButton){
    popup.style.display= 'none'
    // Show popup
    openPopup.addEventListener('click', () => {
      popup.style.display = 'flex';
    });

    // Hide popup
    closePopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });
    // payButton.addEventListener('click', () => {
      //popup.style.display = 'none';
   // });
    // Close popup if user clicks outside content
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
}

export function orderDetails(popups,openPopups){
      popups.style.display= 'flex'
      // Show popup
      // Close popup if user clicks outside content
    popups.addEventListener('click', (e) => {
      if (e.target === popups) {
        popups.style.display = 'none';
      }
    });
}