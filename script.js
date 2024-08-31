

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
  alert("Thank you for subscribing.");
}

function addToCart(product) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product} has been added to your cart.`);
}

function clearCart() {
  sessionStorage.removeItem('cart');
  alert("Cart cleared");
  displayCart();
}


function processOrder() {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    sessionStorage.removeItem('cart');
    alert("Thank you for your order");
    displayCart();
  } else {
    alert("Cart is empty");
  }
}


function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("footeremail").value;
  const message = document.getElementById("message").value;
  
  if (name && email && message) {
    const orderInfo = {
      name: name,
      email: email,
      message: message
    };
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
    alert("Your order information has been saved.");
  } else {
    alert("Thank you for your message");
  }
}


document.addEventListener('DOMContentLoaded', function() {
  
  var modal = document.getElementById("cartModal");
  var btn = document.getElementById("viewCartBtn");
  var span = document.getElementsByClassName("close")[0];

  if (btn) {
    btn.onclick = function() {
      modal.style.display = "block";
      displayCart();
    }
  }

  if (span) {
    span.onclick = function() {
      modal.style.display = "none";
    }
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  const subscribeButton = document.querySelector('.newsletter button');
  if (subscribeButton) {
    subscribeButton.addEventListener('click', handleSubscribe);
  }

  
  const addToCartButtons = document.querySelectorAll('.products button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = this.previousElementSibling.textContent;
      addToCart(product);
    });
  });

  
  const clearCartButton = document.getElementById('clearCart');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
  }

  
  const processOrderButton = document.getElementById('processOrder');
  if (processOrderButton) {
    processOrderButton.addEventListener('click', processOrder);
  }

  
  const contactForm = document.querySelector('.form-container form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

 
  const menu = document.getElementById("burgermenu");
  const links = document.getElementById("burgermenulinks");
  if (menu && links) {
    menu.addEventListener("click", function () {
      links.classList.toggle("show");
    });
  }

  
  const bookcat = document.getElementById("bookcat");
  if (bookcat) {
    bookcat.addEventListener("mouseover", () => {
      bookcat.style.backgroundColor = "lightgray";
    });
    bookcat.addEventListener("mouseout", () => {
      bookcat.style.backgroundColor = "white";
    });
  }

  
  const emailForm = document.querySelector("form");
  if (emailForm) {
    emailForm.addEventListener("submit", function (event) {
      const email = document.getElementById("footeremail");
      if (!email.value.includes("@")) {
        event.preventDefault();
        alert("Please enter a valid email address.");
      }
    });
  }

  displayCart();
});