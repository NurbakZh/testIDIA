let btnLocation = document.getElementById('open_cart_btn');
let cartCounter = document.getElementById('cart_counter');
cartCounter.innerHTML = loadCount();

function formatterCart(priceSum) {
    let price = priceSum.toString();
    let formattedPrice = '';
    for (let i = 0; i < price.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedPrice = ' ' + formattedPrice;
        }
        formattedPrice = price[price.length - 1 - i] + formattedPrice;
    }
    return formattedPrice;
}

function loadCount() {
    let cart = getCart();
    const cardCount = cart.reduce((total, item) => total + item.quantity, 0);
    return cardCount;
}

function loadSum() {
    let cart = getCart();
    const cardSum = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    return cardSum;
}

function getCart() {
    const cart = sessionStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

btnLocation.addEventListener('click', function () {
    const cart = getCart();

    if (cart.length === 0) {
        alert('Корзина пустая!');
        return;
    }

    const divElement = document.createElement('div');
    divElement.classList.add('jqcart_layout');

    let cartItemsHTML = cart.map((item) => `
        <ul class="jqcart_tbody" data-id="${item.id}">
            <li class="jqcart_small_td">
                <img src="${item.img}" alt="Img">
            </li>
            <li>
                <div class="jqcart_nd">
                    <a href="#${item.link}">${item.name}</a>
                </div>
            </li>
            <li></li>
            <li class="jqcart_price">${formatterCart(item.price)}</li>
            <li>
                <div class="jqcart_pm">
                    <input type="text" class="jqcart_amount" data-id="${item.id}" value="${item.quantity}">
                    <span class="jqcart_incr" data-incr="1" data-id="${item.id}">
                        <i class="fa fa-angle-up" aria-hidden="true"></i>
                    </span>
                    <span class="jqcart_incr" data-incr="-1" data-id="${item.id}">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                </div>
            </li>
            <li class="jqcart_sum">${formatterCart(item.price * item.quantity)} тг</li>
        </ul>
    `).join('');

    divElement.innerHTML = `
        <div class="jqcart_content">
            <div class="jqcart_table_wrapper">
                <div class="jqcart_manage_order">

                    <ul class="jqcart_thead">
                        <li></li>
                        <li>ТОВАР</li>
                        <li></li>
                        <li>ЦЕНА</li>
                        <li>КОЛИЧЕСТВО</li>
                        <li>СТОИМОСТЬ</li>
                    </ul>

                    ${cartItemsHTML}
                </div>
            </div>

            <div class="jqcart_manage_block">
                <div class="jqcart_btn">
                    <button class="jqcart_open_form_btn">Оформить заказ</button>
                    <form class="jqcart_order_form" style="opacity: 0">
                        <input class="jqcart_return_btn" type="reset" value="Продолжить покупки">
                    </form>
                </div>
                <div class="jqcart_subtotal">Итого: <strong>${formatterCart(loadSum())}</strong> тг</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(divElement);

    document.querySelector('.jqcart_layout').addEventListener('click', function(event) {
        if (!event.target.closest('.jqcart_content')) {
            document.querySelector('.jqcart_layout').remove();
        }
    });

    document.querySelectorAll('.jqcart_incr').forEach(function (button) {
        button.addEventListener('click', function () {
            const itemId = this.getAttribute('data-id');
            const quantity = Number(this.getAttribute('data-incr'));
            changeQuantityOfItem(itemId, quantity);
        });
    });
});

function changeQuantityOfItem(itemId, quantity) {
    let cart = getCart();
    const index = cart.findIndex((cartItem) => cartItem.id === itemId);
    if (index >= 0) {
        cart[index].quantity += quantity;
        if(cart[index].quantity <= 0) {
            cart.splice(index, 1);
            document.querySelector(`ul[data-id="${itemId}"]`).remove();
        } else {
            document.querySelector(`ul[data-id="${itemId}"] .jqcart_amount`).value = cart[index].quantity;
            document.querySelector(`ul[data-id="${itemId}"] .jqcart_sum`).textContent = `${formatterCart(cart[index].quantity * cart[index].price)} тг`;
        }
    }
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    document.querySelector('.jqcart_subtotal strong').textContent = `${formatterCart(loadSum())}`;
    cartCounter.innerHTML = loadCount();
}

function addToCart(item) {
    let cart = getCart();
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index >= 0) {
        cart[index].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    cartCounter.innerHTML = loadCount();
}