let products = [
    {

    id: 1,
    name: "Minecraft",
    img: 'Igm\Minecraft.png',
    description: "Продається ліцензія на Minecraft",
    type: "game",
    price: 13.37
},
    {
        id: 2,
        name: "FIFA 26",
        img: 'Igm\fifa26.jpg',
        description: "Продається ліцензія на FIFA 26",
        type: "game",
        price: 29.99
    },
]; 
let cart = [];
let productsContainer = document.querySelector('.products-div');
let btnGroup = document.querySelector('.btn-group');

function renderProducts(items) {
    productsContainer.innerHTML = ''
    if (items.length === 0) {
        productsContainer.innerHTML = '<p>netu</p>';
        return;
    }
    items.forEach(function(item) {
        let productHTML = `
            <article class="product" data-category="${item.type}">
                <img src='${item.img}' alt="${item.name}" class="product-img">
                h3>${item.name}</h3>
                <p class product-description">${item.description}</p>
                <p class="product-price"> £ ${item.price}</p>
                <button type="button" btn btn-primary">Бегом до кошика</button>
            </article>
        `
        productsContainer.innerHTML += productHTML;
        
    })
}