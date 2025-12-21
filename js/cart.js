let cartContainer = document.querySelector('.cart-products');
let totalElement = document.querySelector('.total-price-display');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    updateCartCount();
    cartContainer.innerHTML = '';

    if (cart.length == 0) {
        cartContainer.innerHTML = '<p>Ваш кошик порожній.</p>'
        totalElement.innerText = '0 £';
        return;

    }

cart.forEach(function(item) {
    let html = `
            <div class="cart-product" data-id="${item.id}">
                <div class="info-box">
                    <h3>${item.name}</h3>
                    <p class="product-price">${item.price} £</p>
                </div>
                
                <div class="count-box">
                    <p>Кількість: </p>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                </div>
                
                <div class="total-box">
    ${(item.price * item.quantity).toFixed(2)} £
</div>
                
                <button class="btn btn-danger remove-btn">Видалити</button>
            </div>
        `;
        cartContainer.innerHTML += html;
    totalElement.innerText = `${calculateTotal()} £`;
});
}

function calculateTotal() {
    let total = 0;
    for (let item of cart) {
        total += item.price * item.quantity;
    }
    return total.toFixed(2);
}

function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

renderCart();



cartContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        let parent = event.target.closest('.cart-product');
        let productId = parent.getAttribute('data-id');
        cart = cart.filter(item => item.id !=productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
})


cartContainer.addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
        let input = event.target;
        let parent = input.closest('.cart-product');
        let Id = parseInt(parent.dataset.id);
        let newQuantity = parseInt(input.value);
        let item = cart.find(item => item.id === Id);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            renderCart();
        }
    }
});
