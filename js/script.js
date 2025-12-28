
let products = [
    {
        "id": 1,
        "name": "Minecraft",
        "img": "Igm/minecraft.png",
        "description": "Продається ліцензія на Minecraft",
        "type": "game",
        "price": 13.37
    },
    {
        "id": 2,
        "name": "FIFA 26",
        "img": "Igm/fifa26.jpg",
        "description": "Продається ліцензія на FIFA 26",
        "type": "game",
        "price": 25.79
    },
    {
        "id": 3,
        "name": "S.T.A.L.K.E.R.2.",
        "img": "Igm/S.T.A.L.K.E.R.2.png",
        "description": "Продається гра S.T.A.L.K.E.R.2.",
        "type": "game",
        "price": 18.67
    },
    {
        "id": 4,
        "name": "Zaregai 2",
        "img": "Igm/Zaregai 2.png",
        "description": "Продається гра Zaregai 2",
        "type": "game",
        "price": 13.67
    },
    {
        "id": 5,
        "name": "Robux",
        "img": "Igm/robux.png",
        "description": "Продаються робукси 400 штук",
        "type": "donate",
        "price": 4.99
    },
    {
        "id": 6,
        "name": "Robux",
        "img": "Igm/robux.png",
        "description": "Продаються робукси 800 штук",
        "type": "donate",
        "price": 9.99
    },
    {
        "id": 7,
        "name": "Robux",
        "img": "Igm/robux.png",
        "description": "Продаються робукси 1500 штук",
        "type": "donate",
        "price": 14.99
    },
    {
        "id": 8,
        "name": "Robux",
        "img": "Igm/robux.png",
        "description": "Продаються робукси 4500 штук",
        "type": "donate",
        "price": 25.99
    },
    {
        "id": 9,
        "name": "Metro 2033",
        "img": "Igm/metro 2033.png",
        "description": "Продається гра metro 2033",
        "type": "game",
        "price": 16.50
    },
    {
        "id": 10,
        "name": "Prime CS2",
        "img": "Igm/завантаження (7).png",
        "description": "Прайм для помойки 2",
        "type": "donate",
        "price": 13.38
    },
    {
        "id": 10,
        "name": "Ultimate FC 26",
        "img": "Igm/Untitled (1).png",
        "description": "Ультимативний пакет для FIFA 26, создай свій драфт мрії!",
        "type": "donate",
        "price": 26.56
    },
]

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productsContainer = document.querySelector('.products-div');
let btnGroup = document.querySelector('.btn-group');

function renderProducts(items) {
    productsContainer.innerHTML = ''
    if (items.length === 0) {
        productsContainer.innerHTML = '<p>Товарів не знайдено</p>';
        return;
    }
    items.forEach(function(item) {
        let productHTML = `
            <article class="product" data-id="${item.id}">
                <img src='${item.img}' alt="${item.name}" class="product-img">
                <h3>${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <span class="price">£ ${item.price}</span>
                <button type="button" class="btn btn-primary buy-button" data-id="${item.id}">Бегом до кошика</button>
            </article>
        `
        productsContainer.innerHTML += productHTML;
    })
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', function() {
            addtoCart(this.getAttribute('data-id'));
        });
    });
}

function applyFilter(categoryType) {
    if (categoryType === 'all') {
        renderProducts(products);
    } else {
        let filteredProducts = products.filter(product => product.type === categoryType);
        renderProducts(filteredProducts);
    }
}

function addtoCart(productId) {
    let product = products.find(item => item.id == productId);
    if (product) {
        let cartProduct = cart.find(item => item.id == productId);
        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Товар "' + product.name + '" додано до кошика!');
    }
}

function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

let productsMap = {
    'Всі': 'all',
    'Ігри': 'game',
    'Донат': 'donate',
}

function setupFilterButtons() {
    for (let button of btnGroup.children) {
        if (button.classList.contains('filter-button')) {
            button.addEventListener('click', function() {
                document.querySelectorAll('.filter-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                let category = productsMap[button.innerHTML.trim()];
                applyFilter(category);
            });
        }
    }
}

renderProducts(products);
setupFilterButtons();
updateCartCount();
