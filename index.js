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
    updateModalCart();
    cartModal.style.display = "flex";
})
cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal || event.target === closeModalBtn) {
        cartModal.style.display = "none"
    }
})

// Add item to checkout
menu.addEventListener("click", (event) => {
    const parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price)
    }
})

function addToCart(name, price) {
    const existItem = checkoutItems.find(item => item.name === name)

    if (existItem) {
        existItem.quantity += 1;
        return
    } else {
        checkoutItems.push({
            name,
            price,
            quantity: 1
        })
    }

    updateModalCart();
}

function updateModalCart() {
    cartItemsContainer.innerHTML = ""
    let total = 0;

    checkoutItems.forEach(item => {
        const itemELement = document.createElement("div");
        itemELement.classList.add("flex", "flex-col", "justify-between", "mb-4",)

        itemELement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button>
                    Remover
                </button>
            </div>
        `

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(itemELement);
    })

    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = checkoutItems.length;
}