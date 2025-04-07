// Improved script.js with enhanced functionality

function displayCart() {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  let cartList = document.getElementById('cartItems');
  if (cartList) {
    cartList.innerHTML = '';
    cart.forEach(item => {
      let li = document.createElement('li');
      li.textContent = item;
      cartList.appendChild(li);
    });
  }
}

function handleSubscribe() {
  alert("Thank you for subscribing to Osaka updates!");
}

function addToCart(product) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  
  // Add animation for added items
  const notification = document.createElement('div');
  notification.textContent = `${product} has been added to your cart!`;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.left = '20px';
  notification.style.backgroundColor = '#4CAF50';
  notification.style.color = 'white';
  notification.style.padding = '10px';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '1000';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 1s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 1000);
  }, 3000);
}

function clearCart() {
  sessionStorage.removeItem('cart');
  alert("Cart cleared - Osaka is sad now!");
  displayCart();
}

function processOrder() {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    sessionStorage.removeItem('cart');
    alert("Thank you for your order! Osaka will deliver it in your dreams!");
    displayCart();
  } else {
    alert("Cart is empty - Osaka needs items!");
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name")?.value || "";
  const email = document.getElementById("footeremail")?.value || "";
  const message = document.getElementById("message")?.value || "";
  
  if (name && email && message) {
    const orderInfo = {
      name: name,
      email: email,
      message: message
    };
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
    alert("Your message has been received! Osaka will respond when she wakes up.");
  } else {
    alert("Thank you for your message!");
  }
}

// Easter egg functionality - Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;

document.addEventListener('keydown', function(e) {
  // Check if the pressed key matches the next key in the Konami code
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;
    
    // If the full code is entered
    if (konamiPosition === konamiCode.length) {
      activateEasterEgg();
      konamiPosition = 0;
    }
  } else {
    konamiPosition = 0;
  }
});

function activateEasterEgg() {
  // Create a rainbow effect across the page
  const rainbow = document.createElement('div');
  rainbow.style.position = 'fixed';
  rainbow.style.top = '0';
  rainbow.style.left = '0';
  rainbow.style.width = '100%';
  rainbow.style.height = '100%';
  rainbow.style.background = 'linear-gradient(to bottom, red, orange, yellow, green, blue, indigo, violet)';
  rainbow.style.opacity = '0.3';
  rainbow.style.zIndex = '9999';
  rainbow.style.pointerEvents = 'none';
  
  document.body.appendChild(rainbow);
  
  // Play a sound if possible
  const audio = new Audio();
  audio.src = 'https://www.myinstants.com/media/sounds/nyan-cat.mp3';
  audio.play().catch(e => console.log('Audio playback failed: ', e));
  
  setTimeout(() => {
    rainbow.style.opacity = '0';
    rainbow.style.transition = 'opacity 1s ease';
    setTimeout(() => {
      document.body.removeChild(rainbow);
    }, 1000);
  }, 5000);
  
  alert("Osaka says: NYAN NYAN NYAN!");
}

document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Handle burger menu
  const menu = document.getElementById("burgermenu");
  const links = document.getElementById("burgermenulinks");
  
  if (menu && links) {
    menu.addEventListener("click", function() {
      links.classList.toggle("show");
    });
  }
  
  // Add animation to the moving gif when clicked
  const movingGif = document.getElementById('movingGif');
  if (movingGif) {
    movingGif.addEventListener('click', function() {
      this.style.transform += ' rotate(360deg)';
      setTimeout(() => {
        moveGif();
      }, 1000);
    });
  }
  
  // Setup modal functionality if exists
  var modal = document.getElementById("cartModal");
  var btn = document.getElementById("viewCartBtn");
  var span = document.getElementsByClassName("close")[0];

  if (btn && modal) {
    btn.onclick = function() {
      modal.style.display = "block";
      displayCart();
    }
  }

  if (span && modal) {
    span.onclick = function() {
      modal.style.display = "none";
    }
  }

  if (modal) {
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  // Newsletter subscription
  const subscribeButton = document.querySelector('.newsletter button');
  if (subscribeButton) {
    subscribeButton.addEventListener('click', handleSubscribe);
  }

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.products button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = this.previousElementSibling?.textContent || "Mystery Item";
      addToCart(product);
    });
  });

  // Cart buttons
  const clearCartButton = document.getElementById('clearCart');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
  }

  const processOrderButton = document.getElementById('processOrder');
  if (processOrderButton) {
    processOrderButton.addEventListener('click', processOrder);
  }

  // Contact form
  const contactForm = document.querySelector('#contactusform');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Email validation
  const emailForm = document.querySelector("form");
  if (emailForm) {
    emailForm.addEventListener("submit", function(event) {
      const email = document.querySelector("input[type='email']");
      if (email && !email.value.includes("@")) {
        event.preventDefault();
        alert("Please enter a valid email address.");
      }
    });
  }

  // Initialize cart display
  displayCart();
});

// Function for the moving GIF if it exists
function moveGif() {
  const gif = document.getElementById("movingGif");
  if (!gif) return;
  
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  const maxX = containerWidth - gif.clientWidth;
  const maxY = containerHeight - gif.clientHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  gif.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Add some random Osaka-style thoughts to the page
function addRandomThought() {
  const thoughts = [
    "Did you ever wonder if clouds get lonely?",
    "What if your belly button is actually a reset button?",
    "Do fish know they're wet?",
    "If you're waiting for the waiter, aren't you the waiter?",
    "Is cereal soup?",
    "What if the CIA is watching through your microwave?"
  ];
  
  const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
  const thoughtBubble = document.createElement('div');
  
  thoughtBubble.textContent = randomThought;
  thoughtBubble.style.position = 'fixed';
  thoughtBubble.style.bottom = Math.random() * 50 + 50 + 'px';
  thoughtBubble.style.right = Math.random() * 20 + 10 + 'px';
  thoughtBubble.style.backgroundColor = '#FFF8DC';
  thoughtBubble.style.padding = '10px';
  thoughtBubble.style.borderRadius = '15px';
  thoughtBubble.style.maxWidth = '200px';
  thoughtBubble.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.2)';
  thoughtBubble.style.zIndex = '90';
  thoughtBubble.style.fontStyle = 'italic';
  
  document.body.appendChild(thoughtBubble);
  
  setTimeout(() => {
    thoughtBubble.style.opacity = '0';
    thoughtBubble.style.transition = 'opacity 1s ease';
    setTimeout(() => {
      document.body.removeChild(thoughtBubble);
    }, 1000);
  }, 8000);
}

// Add random thoughts periodically
setInterval(addRandomThought, 30000);