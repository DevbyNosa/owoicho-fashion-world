// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const settingsBtn = document.querySelector(".frontend-btn-settings");
  const contentSettings = document.querySelector(".content-none");
  const downArrow = document.querySelector(".down-arrow");

  if (settingsBtn && contentSettings) {
    settingsBtn.addEventListener("click", () => {
    
      contentSettings.classList.toggle("content-active");
      
      
      if (downArrow) {
        downArrow.style.transform = contentSettings.classList.contains("content-active") 
          ? "rotate(180deg)" 
          : "rotate(0deg)";
      }
    });
  }
});