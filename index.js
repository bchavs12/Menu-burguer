const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const inputAdress = document.getElementById("adress");
const addressWarn = document.getElementById("address-warn");

const checkoutItems = [];

// Close and open ModalCheckout
cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
})
cartModal.addEventListener("click", (event) => {
    if(event.target === cartModal || event.target === closeModalBtn){
        cartModal.style.display = "none"
    }
})

// Add item to checkout
menu.addEventListener("click", (event) => {
    const parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price)    
    }
})

function addToCart(name, price){
    const existItem = checkoutItems.find(item => item.name === name)

    if(existItem){
        existItem.quantity += 1;
        return
    }

    checkoutItems.push({
        name,
        price,
        quantity: 1
    })
}