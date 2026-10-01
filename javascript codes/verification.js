let verificationhtml='';

verificationhtml+=`
    <h2>Verify Your Email</h2>
    <p>Enter the 6-digit code sent to your email</p>

    <div class="otp-inputs">
      <input type="text" maxlength="1" />
      <input type="text" maxlength="1" />
      <input type="text" maxlength="1" />
      <input type="text" maxlength="1" />
      <input type="text" maxlength="1" />
      <input type="text" maxlength="1" />
    </div>
    <span class="resend-btn">Resend otp</span>
    <button class="verification-btn">Verify OTP</button>


    <p id="message"></p>
`
document.querySelector('.container')
.innerHTML = verificationhtml ;



   const otps = document.querySelectorAll(".otp-inputs input")

    otps.forEach((input,index) =>{

 // move to the next div when  a value is entered
      input.addEventListener("input",(e)=>{
         if (input.value && index < otps.length -1){
            otps[index+1].focus()
         }
 })

// delete the otp when the backspace is clicked

     input.addEventListener("keydown",(e)=>{
      if(e.key === "Backspace" && index > 0 && input.value ==="" ){
         otps[index-1].focus();
    }})

 })


document.querySelectorAll('.verification-btn').forEach((button) => {
     button.addEventListener("click" ,async ()=>{
      const  otp = Array.from(otps).map(input => input.value).join("");

       if ( otp.length !== 6){
         alert('Please enter all the 6 digits');
      }

      
       const Email =localStorage.getItem('Email');
      console.log(Email)

     try{
        const  res = await fetch("https://exchangeable-unwisely-arden.ngrok-free.dev/verification",{
            method: "POST" ,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({otp,Email})
        })

       const data =  await res.json();
        
      if(data.success){
          alert(data.message)
         window.location.href= "index.html"
       }

     }catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup');
          }

     })  
});


document.querySelector('.resend-btn').addEventListener('click', async () => {
   const Email = localStorage.getItem("Email");
   try{
      const res = await fetch("https://exchangeable-unwisely-arden.ngrok-free.dev/resend",{
         method: "POST",
         headers: {"Content-Type":"application/json"},
         body:JSON.stringify({Email})
      })

      const data = await res.json();
      if(data.success){
         alert(data.message)}
      else{
         alert('Could not resend OTP')}
   } catch(err){
      console.log('An error has occured')
   }
})