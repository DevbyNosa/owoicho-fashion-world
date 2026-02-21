// Contact Btn for hero section
const contactBtn = document.querySelector(".contact-btn");


if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    window.location.href = "#contact";
  });
}

const hero = document.querySelector('.hero-section');
const overlay = document.querySelector('.hero-overlay');

const images = [
  "/images/man-on-suit.webp",
  "/images/taste-of-fashion-man.webp"
];

let index = 0;

images.forEach(src => {
  const img = new Image();
  img.src = src;
});


function changeImage() {
  index = (index + 1) % images.length;
  const nextImageUrl = images[index];

 
  overlay.style.backgroundImage = `url('${nextImageUrl}')`;
  
  
  overlay.style.opacity = "1";
  overlay.classList.add('animating');


  setTimeout(() => {
    hero.style.backgroundImage = `url('${nextImageUrl}')`;
    overlay.style.opacity = "0";
    overlay.classList.remove('animating');
  }, 1500); 
}

setInterval(changeImage, 4000);

const exploreImages = document.querySelectorAll(".explore-item");


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
    
      const index = Array.from(exploreImages).indexOf(entry.target);
      
     
      entry.target.style.setProperty('--animation-delay', `${index * 0.1}s`);
      entry.target.classList.add("show");
      
     
    }
  });
}, {
  threshold: 0.7,
});

exploreImages.forEach(item => observer.observe(item));


const notifier = document.querySelector(".notifier");

setTimeout(()=> {
    notifier.innerHTML = ""
}, 5000) 