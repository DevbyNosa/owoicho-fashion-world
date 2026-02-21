

  const errorMessage = document.querySelector(".error-message");
  setTimeout(() => {
    errorMessage.innerHTML = "";
  }, 3000);

 document.addEventListener('DOMContentLoaded', function() {
    
     const modal = document.getElementById('modalDash');

      
     setTimeout(() => {
        modal.style.display = "none"
     }, 6000)
  });


  const visibilityIcon = document.querySelector(".visibilty-icon");
  const inputPassword = document.querySelector(".input-password");




visibilityIcon.addEventListener("click", () => {
   if(inputPassword.type === "password") {
       inputPassword.type = "text"; 

      
   } else {
       inputPassword.type = "password";
       
   }
   
   visibilityIcon.classList.toggle("fa-eye");
visibilityIcon.classList.toggle("fa-eye-slash");

});


 document.addEventListener('DOMContentLoaded', function() {
      const modal = document.getElementById('modalDash');
      
      
      modal.style.display = 'flex';
      
      // Hide after 5 seconds
      setTimeout(() => {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.style.display = 'none';
        }, 500);
      }, 5000);

     
    });


    