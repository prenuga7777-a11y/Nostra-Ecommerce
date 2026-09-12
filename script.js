
/* =========================
   Search and Filter
========================= */

const searchInput = document.querySelector("#searchInput");

const categoryFilters =
    document.querySelectorAll('input[name="category"]');

const products =
    document.querySelectorAll(".collection-product");


function filterProducts() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        document.querySelector(
            'input[name="category"]:checked'
        ).value;


    products.forEach(function(product) {

        const productName =
            product.querySelector("h3")
            .textContent
            .toLowerCase();

        const productCategory =
            product.getAttribute("data-category");


        const searchMatch =
            productName.includes(searchValue);

        const categoryMatch =
            selectedCategory === "all" ||
            productCategory === selectedCategory;


        if (searchMatch && categoryMatch) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// Search
if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


// Category Filter
categoryFilters.forEach(function(radio) {

    radio.addEventListener(
        "change",
        filterProducts
    );

});


/* =========================
   Shop Now
========================= */

function goToCollections() {

    window.location.href = "collections.html";

}


/* =========================
   Contact Form Validation
========================= */

const contactForm =
    document.querySelector("#contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.querySelector("#name");

            const email =
                document.querySelector("#email");

            const message =
                document.querySelector("#message");

            const contactMessage =
                document.querySelector("#contactMessage");


            let isValid = true;


            // Name validation

            if (name.value.trim() === "") {

                name.style.border =
                    "2px solid red";

                isValid = false;

            } else {

                name.style.border =
                    "2px solid green";

            }


            // Email validation

            if (
                email.value.trim() === "" ||
                !email.value.includes("@")
            ) {

                email.style.border =
                    "2px solid red";

                isValid = false;

            } else {

                email.style.border =
                    "2px solid green";

            }


            // Message validation

            if (message.value.trim() === "") {

                message.style.border =
                    "2px solid red";

                isValid = false;

            } else {

                message.style.border =
                    "2px solid green";

            }


            // Success message

            if (isValid) {

                contactMessage.textContent =
                    "Message Sent Successfully!";

                contactMessage.style.color =
                    "green";


                contactForm.reset();


                name.style.border =
                    "1px solid #ccc";

                email.style.border =
                    "1px solid #ccc";

                message.style.border =
                    "1px solid #ccc";

            } else {

                contactMessage.textContent =
                    "Please fill all the fields correctly.";

                contactMessage.style.color =
                    "red";

            }

        }
    );

}


/* Add To Cart*/

let cartCount =
    Number(localStorage.getItem("cartCount")) || 0;


const cartCountElement =
    document.querySelector("#cartCount");


if (cartCountElement) {

    cartCountElement.textContent =
        "Cart: " + cartCount;

}


function addToCart(productName, price, image) {

    cartCount++;


    localStorage.setItem(
        "cartCount",
        cartCount
    );


    let cartItems =
        JSON.parse(
            localStorage.getItem("cartItems")
        ) || [];


    const existingProduct =
        cartItems.find(function(item) {

            return item.name === productName;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cartItems.push({

            name: productName,

            price: price,

            image: image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );


    const cart =
        document.querySelector("#cartCount");


    if (cart) {

        cart.textContent =
            "Cart: " + cartCount;

    }


    alert(
        productName + " added to cart!"
    );

}


/* Display Cart Items */

const cartItemsContainer =
    document.querySelector("#cartItems");


if (cartItemsContainer) {

    const cartItems =
        JSON.parse(
            localStorage.getItem("cartItems")
        ) || [];


    let total = 0;


    if (cartItems.length === 0) {

        cartItemsContainer.innerHTML = `

            <p>Your cart is empty.</p>

            <button onclick="goToCollections()">
                Continue Shopping
            </button>

        `;

    } else {

        cartItems.forEach(
            function(item, index) {

                const div =
                    document.createElement("div");


                div.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <h3>${item.name}</h3>

                    <p>₹${item.price}</p>


                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>


                    <br><br>


                    <button
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                `;


                cartItemsContainer.appendChild(div);


                total =
                    total +
                    (item.price * item.quantity);

            }
        );

    }


    const cartTotal =
        document.querySelector("#cartTotal");


    if (cartTotal) {

        cartTotal.textContent =
            "Total: ₹" + total;

    }

}


/* Remove From Cart */

function removeFromCart(index) {

    let cartItems =
        JSON.parse(
            localStorage.getItem("cartItems")
        ) || [];


    cartItems.splice(index, 1);


    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );


    cartCount =
        cartItems.reduce(
            function(total, item) {

                return total + item.quantity;

            },
            0
        );


    localStorage.setItem(
        "cartCount",
        cartCount
    );


    location.reload();

}


/*  Increase Quantity */

function increaseQuantity(index) {

    let cartItems =
        JSON.parse(
            localStorage.getItem("cartItems")
        ) || [];


    cartItems[index].quantity++;


    cartCount =
        cartItems.reduce(
            function(total, item) {

                return total + item.quantity;

            },
            0
        );


    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );


    localStorage.setItem(
        "cartCount",
        cartCount
    );


    location.reload();

}


/*  Decrease Quantity */

function decreaseQuantity(index) {

    let cartItems =
        JSON.parse(
            localStorage.getItem("cartItems")
        ) || [];


    if (cartItems[index].quantity > 1) {

        cartItems[index].quantity--;

    }


    cartCount =
        cartItems.reduce(
            function(total, item) {

                return total + item.quantity;

            },
            0
        );


    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );


    localStorage.setItem(
        "cartCount",
        cartCount
    );


    location.reload();

}


/* Order */

function order() {

    alert(
        "Order placed successfully!"
    );


    localStorage.removeItem(
        "cartItems"
    );

    localStorage.removeItem(
        "cartCount"
    );


    location.reload();

}


/* Clear Cart */

function clearCart() {

    localStorage.removeItem(
        "cartItems"
    );

    localStorage.removeItem(
        "cartCount"
    );


    location.reload();

}


/*  Hero Slider */

const heroImages = [

    "./images/hero.jpg",

    "./images/hero1.jpg",

    "./images/hero2.jpeg"

];


let currentImage = 0;


const heroImage =
    document.getElementById("heroImage");


const dots =
    document.querySelectorAll(".dot");


function showSlide(index) {

    currentImage = index;


    if (heroImage) {

        heroImage.src =
            heroImages[currentImage];

    }


    dots.forEach(
        function(dot) {

            dot.classList.remove(
                "active"
            );

        }
    );


    if (dots[currentImage]) {

        dots[currentImage].classList.add(
            "active"
        );

    }

}


function nextSlide() {

    currentImage++;


    if (
        currentImage >=
        heroImages.length
    ) {

        currentImage = 0;

    }


    showSlide(currentImage);

}


function previousSlide() {

    currentImage--;


    if (currentImage < 0) {

        currentImage =
            heroImages.length - 1;

    }


    showSlide(currentImage);

}


if (heroImage) {

    setInterval(
        function() {

            nextSlide();

        },
        3000
    );

}


/* Mobile Menu*/

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}


    if (navLinks) {

        navLinks.classList.toggle(
            "show"
        );

    }



