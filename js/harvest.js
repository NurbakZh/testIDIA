// LIST

const data = [
    {
        link: '#chair.html',
        title: 'Slim PRO',
        desc: 'Cтул Slim PRO предназначено не только для работы за компьютером, но и для дополнения антуража помещения. Красиво выполненная конструкция не только изысканно смотрится.',
        price: '83000',
        img: 'images/stul_kresla/SlimPRO.png',
        code: '6702',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Slim',
        desc: 'Изящные, легкие, универсальные и эргономичные кресла Slim подойдут для кабинета руководителя. А различные модификации этой серии позволят оформить в едином стиле различные зоны офиса.',
        price: '79000',
        img: 'images/stul_kresla/slim.png',
        code: '6101',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Slim DC',
        desc: 'Кресло Slim DC - это офисное кресло для руководителя спинка и сидение которого выполнена из из мягкой сетки.',
        price: '134100',
        img: 'images/stul_kresla/GloryDC.png',
        code: '6987',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Hi-tech',
        desc: 'Модель Hi-tech изготовлена в модном дизайне, а значит, будет отлично смотреться в любом современном интерьере.',
        price: '95500',
        img: 'images/stul_kresla/Hi-tech.png',
        code: '6203',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Hi-tech PRO',
        desc: 'Профилированная спинка – спинка, имеет анатомически правильную форму, повторяющую естественный изгиб позвоночника.',
        price: '125000',
        img: 'images/stul_kresla/Hi-techPRO.png',
        code: '6057',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Prestige DC',
        desc: 'Утонченность и функциональность, высокое качество обивочных материалов и комплектующих – сочетание, достойное современного офисного кресла.',
        price: '122000',
        img: 'images/stul_kresla/PrestigeDC.png',
        code: '6041',
        parent: 'computer',
        category: 'computer_chair',
    },
    {
        link: '#chair.html',
        title: 'Comfort DC',
        desc: 'Многоцелевое кресло нового поколения, олицетворяет новые стандарты простоты, универсальной применимости, качества и комфорта.',
        price: '97610',
        img: 'images/stul_kresla/ComfortDC.png',
        code: '6807',
        parent: 'computer',
        category: 'computer_chair',
    },
];

// SHOW

let computerChairList = document.getElementById('computerChairList_____SHOW');

sortBy(data, "priceAsc");

//displayList(data, computerChairList);

function displayList(array, uniqId) {

    uniqId.innerHTML = "";

    array.map((a) => {

        let formatter = function (priceSum) {
            let price = priceSum.toString();
            let formattedPrice = '';
            for (let i = 0; i < price.length; i++) {
                if (i > 0 && i % 3 === 0) {
                    formattedPrice = ' ' + formattedPrice;
                }
                formattedPrice = price[price.length - 1 - i] + formattedPrice;
            }
            return formattedPrice;
        };

        let productItem = document.createElement('div');

        productItem.classList.add("product_item");

        productItem.innerHTML = `
        <a class="product_item_content" href="${a.link}">
            <img class="product_item_img" src="${a.img}" alt="Product">
            <div class="product_item_text">
                <h5>${a.title} | code: ${a.code}</h5>
                <p>${a.desc}</p>
            </div>
        </a>
        <div class="product_item_price">
            <span class="product_item_price_text">Цена:</span>
            <br>
            <span class="product_item_price_cost">${formatter(a.price)} <span class="product_item_price_par">₸</span> </span>
            <a class="product_item_price_btn" data-code="${a.code}">В корзину</a>
        </div>
        `;

        const productItemPriceCost = productItem.querySelector('.product_item_price_btn');
        productItemPriceCost.addEventListener('click', function () {
            const newItem = {
                id: a.code,
                img: a.img,
                name: a.title,
                price: Number(a.price),
                quantity: 1
            };
            addToCart(newItem);
        });

        uniqId.appendChild(productItem);

    });

}

function sortBy(array, method) {
    switch(method) {
        // Ascending - возрастание цены
        case 'priceAsc':
            displayList(array.sort((a, b) => Number(a.price) - Number(b.price)), computerChairList);
            break;

        // Descending - снижение цены
        case 'priceDes':
            displayList(array.sort((a, b) => Number(b.price) - Number(a.price)), computerChairList);
            break;

        case 'code':
            displayList(array.sort((a, b) => a.code.localeCompare(b.code)), computerChairList);
            break;

        case 'name':
            displayList(array.sort((a, b) => a.title.localeCompare(b.title)), computerChairList);
            break;

        default: 
            displayList(array.sort((a, b) => Number(a.price) - Number(b.price)), computerChairList);
    }
}

const sortingOption = document.querySelector('.sorting_option');
sortingOption.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        const method = event.target.getAttribute('sortBy');
        sortBy(data, method);
    }
});