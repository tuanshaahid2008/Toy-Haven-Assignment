/* Toy Haven - Main JavaScript */

const products = [
 {id:1,name:'Anime Hero Figurine',category:'Figurines',price:29.99,image:'images/product1.jpg',icon:'🦸',description:'A detailed collectible anime hero figurine made for display, collecting and imaginative play.',details:['Detailed character design','Collector-friendly display piece','Great for anime fans']},
 {id:2,name:'Marvel Action Figures',category:'Figurines',price:24.99,image:'images/product2.jpg',icon:'🤖',description:'A classic action figure with a fun design that looks great in any toy or collector display.',details:['Classic collectible design','Poseable character','Suitable for collectors and fans']},
 {id:3,name:'Galaxy Explorer Toy',category:'Toys',price:34.99,image:'images/product3.jpg',icon:'🚀',description:'Blast off into imaginative adventures with this exciting galaxy explorer toy.',details:['Space-themed design','Adventure play','Bright detailed finish']},
 {id:4,name:'Chess & Checkers Board',category:'Board Games',price:39.99,image:'images/product4.jpg',icon:'🎲',description:'A classic board game set designed for strategic play and enjoyable family game nights.',details:['Chess and checkers gameplay','Great for family game nights','Reusable game set']},
 {id:5,name:'Hot Wheels Diecast Car',category:'Diecast Cars',price:8.99,image:'images/product5.jpg',icon:'🏎️',description:'A stylish diecast car for collectors, display shelves and racing-inspired play.',details:['Diecast model','Compact collectible size','Great for car collectors']},
 {id:6,name:'Remote Control Audi R8',category:'Toys',price:29.99,image:'images/product6.jpg',icon:'🏁',description:'A fun remote control racing car made for exciting races and interactive play.',details:['Remote-controlled toy','Racing-inspired design','Fun interactive play']},
 {id:7,name:'Toy Story Action Figure',category:'Figurines',price:19.99,image:'images/product7.jpg',icon:'⭐',description:'A fun Toy Story collectible action figure for fans, collectors and imaginative play.',details:['Character collectible','Display or play','Fun gift for fans']},
 {id:8,name:'Remote Control Ferrari 488 GTB',category:'Toys',price:29.99,image:'images/product8.jpg',icon:'🏎️',description:'A detailed remote control Ferrari-inspired toy for exciting racing fun.',details:['Remote control play','Sports car styling','Fun for racing fans']},
 {id:9,name:'DC Superheroes Action Figures',category:'Figurines',price:19.99,image:'images/product9.jpg',icon:'🦸',description:'Collectible superhero figures made for display, play and fans of heroic characters.',details:['Superhero character design','Display friendly','Great collectible gift']},
 {id:10,name:'Kitchen Toys Set',category:'Toys',price:39.99,image:'images/product10.jpg',icon:'🍳',description:'A colourful pretend-play kitchen set that encourages creativity and imagination.',details:['Pretend-play kitchen set','Encourages imaginative play','Colourful child-friendly design']},
 {id:11,name:'Jet Toys Models',category:'Toys',price:9.99,image:'images/product11.jpg',icon:'✈️',description:'Fun miniature jet models for imaginative play and collecting.',details:['Miniature aircraft design','Easy to display','Great for young collectors']},
 {id:12,name:'Remote Control Jet',category:'Toys',price:39.99,image:'images/product12.jpg',icon:'🛩️',description:'An exciting remote control jet toy designed for interactive play and adventure.',details:['Remote control operation','Aircraft-inspired design','Interactive play']},
 {id:13,name:'LEGO City Town',category:'Toys',price:39.99,image:'images/product13.jpg',icon:'🧱',description:'A creative building set for constructing fun city scenes and imaginative stories.',details:['Creative building play','City-themed pieces','Encourages problem solving']},
 {id:14,name:'Audi R8 1/18 Diecast Car',category:'Diecast Cars',price:8.99,image:'images/product14.jpg',icon:'🚘',description:'A detailed miniature Audi R8 model made for display and diecast collectors.',details:['1/18 scale model','Detailed car styling','Collector display piece']},
 {id:15,name:'MiniAuto Nissan GTR Die-Cast',category:'Diecast Cars',price:8.99,image:'images/product15.jpg',icon:'🚗',description:'A compact Nissan GTR-inspired diecast model for car enthusiasts and collectors.',details:['Diecast construction','Sports car styling','Easy to display']},
 {id:16,name:'Tokyoo 1/32 Jeep Wrangler Diecast',category:'Diecast Cars',price:8.99,image:'images/product16.jpg',icon:'🚙',description:'A miniature Jeep Wrangler-inspired diecast model with a rugged collector look.',details:['1/32 scale style','Rugged vehicle design','Collector-friendly size']},
 {id:17,name:'Remote Control Lightning McQueen',category:'Toys',price:10.99,image:'images/product17.jpg',icon:'🏁',description:'A fun racing-inspired remote control toy for fans of speed and imaginative play.',details:['Remote control play','Racing character styling','Fun interactive toy']},
 {id:18,name:'Baba branded Ludo Board for all age categories',category:'Board Games',price:9.99,image:'images/product18.jpg',icon:'🎲',description:'A classic Ludo board game for friendly competition with family and friends.',details:['Classic Ludo gameplay','Family-friendly','Great for game nights']}
];

/* Reusable localStorage and validation functions */

function read(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value === null ? fallback : value;
    } catch (error) {
        return fallback;
    }
}

function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
    return '$' + Number(value).toFixed(2);
}

function getProduct(id) {
    return products.find(function(product) {
        return product.id === Number(id);
    });
}

function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function message(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

function categoryName(value) {
    const text = String(value || '').trim().toLowerCase();
    const categories = ['All', 'Figurines', 'Toys', 'Board Games', 'Diecast Cars'];

    for (let i = 0; i < categories.length; i++) {
        if (categories[i].toLowerCase() === text) return categories[i];
    }

    return 'All';
}

function normaliseCart(items) {
    if (!Array.isArray(items)) return [];

    return items.map(function(item) {
        return {
            id: Number(item.id || item.productId),
            quantity: Math.max(1, Number(item.quantity || 1))
        };
    }).filter(function(item) {
        return getProduct(item.id);
    });
}

function normaliseWishlist(items) {
    const result = [];
    if (!Array.isArray(items)) return result;

    items.forEach(function(item) {
        const id = Number(
            typeof item === 'object'
                ? (item.id || item.productId)
                : item
        );

        if (
            getProduct(id) &&
            !result.some(function(saved) {
                return saved.id === id;
            })
        ) {
            result.push({
                id: id,
                status: item.status || 'Interested'
            });
        }
    });

    return result;
}

let cart = normaliseCart(read('toyHavenCart', []));
let wishlist = normaliseWishlist(
    read('toyHavenWishlist', read('wishlist', []))
);
let category = 'All';
let wishFilter = 'All';

write('toyHavenCart', cart);
write('toyHavenWishlist', wishlist);
write('wishlist', wishlist);


/* Shopping cart */

function updateCartCount() {
    const count = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    document.querySelectorAll('#cartCount').forEach(function(element) {
        element.textContent = count;
    });
}

function cartTotal() {
    return cart.reduce(function(total, item) {
        const product = getProduct(item.id);

        return product
            ? total + product.price * item.quantity
            : total;
    }, 0);
}

function addToCart(id, quantity) {
    const product = getProduct(id);
    if (!product) return;

    quantity = Number(quantity || 1);

    const item = cart.find(function(entry) {
        return entry.id === product.id;
    });

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            quantity: quantity
        });
    }

    write('toyHavenCart', cart);
    updateCartCount();
    renderCart();
    renderCheckout();

    toast(product.name + ' added to cart!');
}

function changeQty(id, amount) {
    const numberId = Number(id);

    const item = cart.find(function(entry) {
        return entry.id === numberId;
    });

    if (!item) return;

    item.quantity += Number(amount);

    if (item.quantity < 1) {
        cart = cart.filter(function(entry) {
            return entry.id !== numberId;
        });
    }

    write('toyHavenCart', cart);
    updateCartCount();
    renderCart();
    renderCheckout();
}

function removeCart(id) {
    cart = cart.filter(function(item) {
        return item.id !== Number(id);
    });

    write('toyHavenCart', cart);
    updateCartCount();
    renderCart();
    renderCheckout();

    toast('Product removed from cart.');
}

function clearCart() {
    if (
        !cart.length ||
        !confirm('Are you sure you want to clear your cart?')
    ) return;

    cart = [];

    write('toyHavenCart', cart);
    updateCartCount();
    renderCart();
    renderCheckout();
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');

    if (!container || !summary) return;

    if (!cart.length) {
        container.innerHTML =
            '<div class="empty">' +
            '<h2>Your cart is empty 🛒</h2>' +
            '<p>Add some toys to get started.</p><br>' +
            '<a class="btn" href="products.html">Browse Products</a>' +
            '</div>';

        summary.innerHTML = '';
        return;
    }

    container.innerHTML = cart.map(function(item) {
        const p = getProduct(item.id);

        if (!p) return '';

        return `
            <div class="cart-item">
                <img class="cart-img" src="${p.image}" alt="${p.name}">

                <div>
                    <h3>${p.name}</h3>
                    <p class="muted">${p.category}</p>
                    <p>${money(p.price)} each</p>
                </div>

                <div class="qty">
                    <button
                        onclick="changeQty(${p.id},-1)"
                        aria-label="Decrease quantity">−</button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQty(${p.id},1)"
                        aria-label="Increase quantity">+</button>
                </div>

                <div>
                    <strong>${money(p.price * item.quantity)}</strong><br>
                    <button
                        class="remove"
                        onclick="removeCart(${p.id})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');

    const count = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    summary.innerHTML = `
        <h2>Cart Summary</h2>
        <p>Items: <strong>${count}</strong></p>

        <div class="total">
            <span>Total</span>
            <strong>${money(cartTotal())}</strong>
        </div>

        <a class="btn" href="checkout.html">
            Proceed to Checkout
        </a>

        <button class="clear" onclick="clearCart()">
            Clear Cart
        </button>
    `;
}


/* Wishlist and collection status */

function saveWishlist() {
    write('toyHavenWishlist', wishlist);
    write('wishlist', wishlist);
}

function getWishStatus(id) {
    const item = wishlist.find(function(entry) {
        return entry.id === Number(id);
    });

    return item ? item.status : '';
}

function toggleWish(id) {
    id = Number(id);

    const index = wishlist.findIndex(function(item) {
        return item.id === id;
    });

    if (index >= 0) {
        wishlist.splice(index, 1);
        toast('Removed from wishlist.');
    } else {
        wishlist.push({
            id: id,
            status: 'Interested'
        });

        toast('Added to wishlist ❤️');
    }

    saveWishlist();
    renderFeatured();
    renderProducts();
    renderWishlist();
    refreshProductDetailWishlist();
}

function setStatus(id, status) {
    id = Number(id);

    const item = wishlist.find(function(entry) {
        return entry.id === id;
    });

    if (item) {
        item.status = status;
    } else {
        wishlist.push({
            id: id,
            status: status
        });
    }

    saveWishlist();
    renderWishlist();
    renderProducts();
    renderFeatured();
}


/* Reusable product card */

function createProductCard(product, featured) {
    const saved = !!getWishStatus(product.id);

    return `
        <article
            class="product-card"
            data-product-id="${product.id}"
            tabindex="0"
            role="link"
            aria-label="View details for ${product.name}">

            <div class="product-image-wrap">

                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.style.display='none';
                    this.nextElementSibling.style.display='flex';">

                <div class="fallback">
                    ${product.icon}
                </div>

                ${
                    featured
                        ? '<span class="product-day-badge">PRODUCT OF THE DAY</span>'
                        : ''
                }

                <button
                    class="wish ${saved ? 'active' : ''}"
                    onclick="event.stopPropagation();
                    toggleWish(${product.id})">

                    ${saved ? '♥' : '♡'}

                </button>

            </div>

            <div class="product-info">

                <div class="cat">
                    ${product.category}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="price">
                    ${money(product.price)}
                </div>

                <div class="product-actions">
                    <button
                        class="btn"
                        onclick="event.stopPropagation();
                        addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>

                <p class="view-details-hint">
                    View product details →
                </p>

            </div>

        </article>
    `;
}

function setupProductCardLinks() {
    document
        .querySelectorAll('.product-card[data-product-id]')
        .forEach(function(card) {

            card.onclick = function(event) {
                if (
                    !event.target.closest(
                        'button,a,input,select,textarea'
                    )
                ) {
                    location.href =
                        'product-details.html?id=' +
                        card.dataset.productId;
                }
            };

            card.onkeydown = function(event) {
                if (
                    (event.key === 'Enter' ||
                    event.key === ' ') &&
                    !event.target.closest(
                        'button,a,input,select,textarea'
                    )
                ) {
                    event.preventDefault();

                    location.href =
                        'product-details.html?id=' +
                        card.dataset.productId;
                }
            };
        });
}


/* Featured product of the day */

function getFeaturedProducts() {
    const start =
        Math.floor(Date.now() / 86400000) %
        products.length;

    return [0, 1, 2].map(function(offset) {
        return products[
            (start + offset) % products.length
        ];
    });
}

function renderFeatured() {
    const container =
        document.getElementById('featured-products');

    if (!container) return;

    container.innerHTML =
        getFeaturedProducts()
            .map(function(product, index) {
                return createProductCard(
                    product,
                    index === 0
                );
            })
            .join('');

    setupProductCardLinks();
}


/* Product listing, search and category filter */

function renderProducts() {
    const grid =
        document.getElementById('productGrid');

    if (!grid) return;

    const searchBox =
        document.getElementById('productSearch');

    const search =
        searchBox
            ? searchBox.value.toLowerCase().trim()
            : '';

    const filtered =
        products.filter(function(product) {
            return (
                (category === 'All' ||
                product.category === category) &&
                product.name.toLowerCase().includes(search)
            );
        });

    const count =
        document.getElementById('productResultCount');

    if (count) {
        count.textContent =
            filtered.length +
            ' product' +
            (filtered.length === 1 ? '' : 's') +
            ' found';
    }

    grid.innerHTML = filtered.length
        ? filtered.map(function(product) {
            return createProductCard(product, false);
        }).join('')
        : `
            <div class="empty">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

    setupProductCardLinks();
}


/* Checkout */

function renderCheckout() {
    const container =
        document.getElementById('checkoutItems');

    const total =
        document.getElementById('checkoutTotal');

    if (!container || !total) return;

    container.innerHTML = cart.length
        ? cart.map(function(item) {
            const p = getProduct(item.id);

            return p
                ? `
                    <div class="checkout-item">
                        <span>
                            ${p.name} × ${item.quantity}
                        </span>
                        <strong>
                            ${money(p.price * item.quantity)}
                        </strong>
                    </div>
                `
                : '';
        }).join('')
        : '<p class="muted">Your cart is empty.</p>';

    total.textContent = money(cartTotal());
}

function setupCheckout() {
    const form =
        document.getElementById('checkoutForm');

    if (!form) return;

    const cardFields =
        document.getElementById('cardFields');

    const card =
        document.getElementById('cardNumber');

    const expiry =
        document.getElementById('expiry');

    const cvv =
        document.getElementById('cvv');

    document
        .querySelectorAll('input[name="payment"]')
        .forEach(function(radio) {

            radio.addEventListener(
                'change',
                function() {
                    if (cardFields) {
                        cardFields.style.display =
                            radio.checked &&
                            radio.value === 'Card'
                                ? 'block'
                                : 'none';
                    }
                }
            );
        });

    if (card) {
        card.addEventListener('input', function() {
            const digits =
                card.value
                    .replace(/\D/g, '')
                    .slice(0, 16);

            card.value =
                digits
                    .replace(/(.{4})/g, '$1 ')
                    .trim();
        });
    }

    if (expiry) {
        expiry.addEventListener('input', function() {
            const digits =
                expiry.value
                    .replace(/\D/g, '')
                    .slice(0, 4);

            expiry.value =
                digits.length > 2
                    ? digits.slice(0, 2) +
                      '/' +
                      digits.slice(2)
                    : digits;
        });
    }

    if (cvv) {
        cvv.addEventListener('input', function() {
            cvv.value =
                cvv.value
                    .replace(/\D/g, '')
                    .slice(0, 3);
        });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name =
            document
                .getElementById('checkoutName')
                .value
                .trim();

        const email =
            document
                .getElementById('checkoutEmail')
                .value
                .trim();

        const address =
            document
                .getElementById('checkoutAddress')
                .value
                .trim();

        const selected =
            document.querySelector(
                'input[name="payment"]:checked'
            );

        const payment =
            selected
                ? selected.value
                : '';

        if (!cart.length) {
            return message(
                'checkoutMessage',
                'Your cart is empty.'
            );
        }

        if (name.length < 2) {
            return message(
                'checkoutMessage',
                'Please enter your full name.'
            );
        }

        if (!validEmail(email)) {
            return message(
                'checkoutMessage',
                'Please enter a valid email address.'
            );
        }

        if (address.length < 8) {
            return message(
                'checkoutMessage',
                'Please enter a complete delivery address.'
            );
        }

        if (
            payment === 'Card' &&
            (
                card.value.replace(/\s/g, '').length !== 16 ||
                expiry.value.length !== 5 ||
                cvv.value.length !== 3
            )
        ) {
            return message(
                'checkoutMessage',
                'Please enter valid card details.'
            );
        }

        const orders =
            read('toyHavenOrders', []);

        orders.push({
            orderId: 'TH-' + Date.now(),
            name: name,
            email: email,
            address: address,
            payment: payment,
            total: cartTotal(),
            items: cart,
            date: new Date().toISOString()
        });

        write('toyHavenOrders', orders);

        cart = [];

        write('toyHavenCart', cart);

        updateCartCount();

        form.reset();

        if (cardFields) {
            cardFields.style.display = 'none';
        }

        message('checkoutMessage', '');

        const modal =
            document.getElementById('successModal');

        if (modal) {
            modal.classList.remove('hidden');
        }

        renderCheckout();
        renderCart();
    });
}


/* Wishlist / collection page */

function renderWishlist() {
    const grid =
        document.getElementById('wishlistGrid');

    if (!grid) return;

    const saved =
        wishlist
            .map(function(item) {

                const product =
                    getProduct(item.id);

                if (!product) return null;

                const copy =
                    Object.assign({}, product);

                copy.status =
                    item.status || 'Interested';

                return copy;

            })
            .filter(function(product) {
                return (
                    product &&
                    (
                        wishFilter === 'All' ||
                        product.status === wishFilter
                    )
                );
            });

    if (!saved.length) {
        grid.innerHTML = `
            <div class="empty">
                <h2>No saved products ❤️</h2>
                <p>
                    Add products from the Products page
                    using the heart button.
                </p>
                <br>
                <a class="btn" href="products.html">
                    Browse Products
                </a>
            </div>
        `;

        return;
    }

    grid.innerHTML =
        saved.map(function(product) {

            return `
                <article
                    class="product-card"
                    data-product-id="${product.id}"
                    tabindex="0"
                    role="link">

                    <div class="product-image-wrap">

                        <img
                            class="product-image"
                            src="${product.image}"
                            alt="${product.name}"
                            onerror="this.style.display='none';
                            this.nextElementSibling.style.display='flex';">

                        <div class="fallback">
                            ${product.icon}
                        </div>

                        <button
                            class="wish active"
                            onclick="event.stopPropagation();
                            toggleWish(${product.id})">

                            ♥

                        </button>

                    </div>

                    <div class="product-info">

                        <div class="cat">
                            ${product.category}
                        </div>

                        <h3 class="product-name">
                            ${product.name}
                        </h3>

                        <div class="price">
                            ${money(product.price)}
                        </div>

                        <label>
                            Collection Status

                            <select
                                onchange="setStatus(
                                    ${product.id},
                                    this.value
                                )">

                                <option
                                    ${product.status === 'Interested'
                                        ? 'selected'
                                        : ''}>
                                    Interested
                                </option>

                                <option
                                    ${product.status === 'Owned'
                                        ? 'selected'
                                        : ''}>
                                    Owned
                                </option>

                                <option
                                    ${product.status === 'Not Interested'
                                        ? 'selected'
                                        : ''}>
                                    Not Interested
                                </option>

                            </select>

                        </label>

                        <div class="product-actions">

                            <button
                                class="btn"
                                onclick="event.stopPropagation();
                                addToCart(${product.id})">

                                Add to Cart

                            </button>

                        </div>

                        <p class="view-details-hint">
                            View product details →
                        </p>

                    </div>

                </article>
            `;

        })
        .join('');

    setupProductCardLinks();
}


/* Product details */

function renderProductDetails() {
    const container =
        document.getElementById('productDetails');

    if (!container) return;

    const id =
        new URLSearchParams(location.search)
            .get('id');

    const product =
        getProduct(id);

    if (!product) {
        container.innerHTML = `
            <div class="empty">
                <h2>Product not found</h2>
                <p>
                    The product you are looking for
                    does not exist.
                </p>
                <br>
                <a class="btn" href="products.html">
                    Back to Products
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = `
        <div class="product-detail-top">

            <div class="product-detail-gallery">

                <div class="main-product-image-box">

                    <img
                        id="mainProductImage"
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="this.style.display='none';
                        document.getElementById('mainProductFallback')
                        .style.display='flex';">

                    <div
                        id="mainProductFallback"
                        class="detail-image-fallback">

                        ${product.icon}

                    </div>

                    <button
                        id="zoomProductImage"
                        class="zoom-button">

                        🔍

                    </button>

                </div>

                <div class="thumbnail-row">

                    <button
                        class="product-thumbnail active"
                        data-image="${product.image}">

                        <img
                            src="${product.image}"
                            alt="${product.name}">

                    </button>

                </div>

            </div>

            <div class="product-detail-info">

                <div class="detail-category">
                    ${product.category}
                </div>

                <h1>
                    ${product.name}
                </h1>

                <div class="detail-rating">
                    ★★★★★
                    <span>Customer favourite</span>
                </div>

                <div class="detail-price">
                    ${money(product.price)}
                </div>

                <p class="detail-description">
                    ${product.description}
                </p>

                <span class="detail-stock">
                    ✓ In stock
                </span>

                <div class="detail-actions">

                    <div class="detail-quantity">

                        <button id="detailQtyMinus">
                            −
                        </button>

                        <span id="detailQty">
                            1
                        </span>

                        <button id="detailQtyPlus">
                            +
                        </button>

                    </div>

                    <button
                        class="btn"
                        id="detailAddToCart">

                        Add to Cart

                    </button>

                    <button
                        class="filter"
                        id="detailWishlist">

                        ♡ Wishlist

                    </button>

                </div>

            </div>

        </div>

        <div class="product-detail-extra">

            <div class="detail-extra-card">

                <h2>Product Details</h2>

                <ul>
                    ${product.details
                        .map(function(detail) {
                            return '<li>' + detail + '</li>';
                        })
                        .join('')}
                </ul>

            </div>

            <div class="detail-extra-card">

                <h2>Why You'll Love It</h2>

                <p>
                    A fun addition to your Toy Haven
                    collection, suitable for display,
                    gifting and imaginative play.
                </p>

            </div>

            <div class="detail-extra-card">

                <h2>Delivery & Returns</h2>

                <p>
                    Orders are prepared for delivery
                    with care. Contact Support if you
                    need help with an order or return.
                </p>

            </div>

        </div>
    `;

    const main =
        document.getElementById('mainProductImage');

    let quantity = 1;

    const quantityText =
        document.getElementById('detailQty');

    document.getElementById('detailQtyMinus').onclick =
        function() {
            quantity = Math.max(1, quantity - 1);
            quantityText.textContent = quantity;
        };

    document.getElementById('detailQtyPlus').onclick =
        function() {
            quantity++;
            quantityText.textContent = quantity;
        };

    document.getElementById('detailAddToCart').onclick =
        function() {
            addToCart(product.id, quantity);
        };

    document.getElementById('detailWishlist').onclick =
        function() {
            toggleWish(product.id);
            refreshProductDetailWishlist();
        };

    document.getElementById('zoomProductImage').onclick =
        function() {
            openImageModal(
                main.src,
                product.name
            );
        };

    document
        .querySelectorAll('.product-thumbnail')
        .forEach(function(button) {

            button.onclick = function() {

                main.src =
                    button.dataset.image;

                document
                    .querySelectorAll('.product-thumbnail')
                    .forEach(function(item) {
                        item.classList.remove('active');
                    });

                button.classList.add('active');
            };
        });

    refreshProductDetailWishlist();
}

function refreshProductDetailWishlist() {
    const button =
        document.getElementById('detailWishlist');

    if (!button) return;

    const id =
        new URLSearchParams(location.search)
            .get('id');

    const saved =
        !!getWishStatus(id);

    button.textContent =
        saved
            ? '♥ Saved'
            : '♡ Wishlist';

    button.classList.toggle(
        'active',
        saved
    );
}

function openImageModal(src, alt) {
    let modal =
        document.getElementById('imageModal');

    if (!modal) {

        modal =
            document.createElement('div');

        modal.id = 'imageModal';
        modal.className = 'image-modal';

        modal.innerHTML = `
            <button class="close-image-modal">
                ×
            </button>

            <img
                id="modalProductImage"
                alt="">
        `;

        document.body.appendChild(modal);

        modal.onclick = function(event) {
            if (
                event.target === modal ||
                event.target.className ===
                'close-image-modal'
            ) {
                modal.classList.remove('open');
            }
        };
    }

    document
        .getElementById('modalProductImage')
        .src = src;

    document
        .getElementById('modalProductImage')
        .alt = alt;

    modal.classList.add('open');
}


/* Hero slider */

function setupHero() {
    const hero =
        document.getElementById('heroBanner');

    if (!hero) return;

    const slides =
        hero.querySelectorAll('.hero-slide');

    const dots =
        hero.querySelectorAll('.hero-dot');

    const previous =
        document.getElementById('heroPrev');

    const next =
        document.getElementById('heroNext');

    let current = 0;
    let timer;

    function showSlide(index) {
        current =
            (index + slides.length) %
            slides.length;

        slides.forEach(function(slide, i) {
            slide.classList.toggle(
                'active',
                i === current
            );
        });

        dots.forEach(function(dot, i) {
            dot.classList.toggle(
                'active',
                i === current
            );
        });
    }

    function start() {
        clearInterval(timer);

        timer =
            setInterval(function() {
                showSlide(current + 1);
            }, 5000);
    }

    dots.forEach(function(dot, i) {
        dot.onclick = function() {
            showSlide(i);
            start();
        };
    });

    if (previous) {
        previous.onclick = function() {
            showSlide(current - 1);
            start();
        };
    }

    if (next) {
        next.onclick = function() {
            showSlide(current + 1);
            start();
        };
    }

    hero.onmouseenter = function() {
        clearInterval(timer);
    };

    hero.onmouseleave = start;

    showSlide(0);
    start();
}


/* Responsive navigation */

function setupNavigation() {
    const menu =
        document.getElementById('menuToggle');

    const nav =
        document.getElementById('navLinks');

    if (!menu || !nav) return;

    menu.onclick = function() {
        const open =
            nav.classList.toggle('open');

        menu.textContent =
            open ? '✕' : '☰';

        menu.setAttribute(
            'aria-expanded',
            open
        );
    };

    nav.querySelectorAll('a')
        .forEach(function(link) {

            link.onclick = function() {

                nav.classList.remove('open');

                menu.textContent = '☰';

                menu.setAttribute(
                    'aria-expanded',
                    'false'
                );
            };
        });
}


/* Newsletter and support */

function setupNewsletter() {
    const form =
        document.getElementById('newsletterForm');

    if (!form) return;

    form.onsubmit = function(event) {
        event.preventDefault();

        const email =
            document
                .getElementById('newsletterEmail')
                .value
                .trim();

        if (!validEmail(email)) {
            return message(
                'newsletterMessage',
                'Please enter a valid email address.'
            );
        }

        write(
            'toyHavenNewsletter',
            {
                email: email,
                date: new Date().toISOString()
            }
        );

        message(
            'newsletterMessage',
            'Thanks! You are subscribed.'
        );

        form.reset();
    };
}

function setupSupport() {
    document
        .querySelectorAll('.faq button')
        .forEach(function(button) {

            button.onclick = function() {
                button.parentElement
                    .classList
                    .toggle('open');
            };
        });

    const form =
        document.getElementById('supportForm');

    if (!form) return;

    form.onsubmit = function(event) {
        event.preventDefault();

        const name =
            document
                .getElementById('supportName')
                .value
                .trim();

        const email =
            document
                .getElementById('supportEmail')
                .value
                .trim();

        const text =
            document
                .getElementById('supportMessage')
                .value
                .trim();

        if (name.length < 2) {
            return message(
                'supportConfirmation',
                'Please enter your name.'
            );
        }

        if (!validEmail(email)) {
            return message(
                'supportConfirmation',
                'Please enter a valid email address.'
            );
        }

        if (text.length < 10) {
            return message(
                'supportConfirmation',
                'Please enter a message of at least 10 characters.'
            );
        }

        const feedback =
            read('toyHavenFeedback', []);

        feedback.push({
            name: name,
            email: email,
            message: text,
            date: new Date().toISOString()
        });

        write(
            'toyHavenFeedback',
            feedback
        );

        message(
            'supportConfirmation',
            'Thank you! Your message has been saved successfully.'
        );

        form.reset();
    };
}


/* Toast message */

function toast(text) {
    let element =
        document.getElementById('toast');

    if (!element) {
        element =
            document.createElement('div');

        element.id = 'toast';
        element.className = 'toast';

        document.body.appendChild(element);
    }

    element.textContent = text;

    element.classList.add('show');

    clearTimeout(
        window.toyHavenToastTimer
    );

    window.toyHavenToastTimer =
        setTimeout(function() {
            element.classList.remove('show');
        }, 1800);
}


/* Start all page features */

function startWebsite() {
    updateCartCount();

    setupNavigation();
    setupHero();
    setupNewsletter();
    setupSupport();
    setupCheckout();

    renderFeatured();
    renderProducts();
    renderCart();
    renderCheckout();
    renderWishlist();
    renderProductDetails();

    document
        .querySelectorAll('.filter[data-category]')
        .forEach(function(button) {

            button.onclick = function() {

                category =
                    categoryName(
                        button.dataset.category
                    );

                document
                    .querySelectorAll(
                        '.filter[data-category]'
                    )
                    .forEach(function(item) {

                        item.classList.toggle(
                            'active',
                            categoryName(
                                item.dataset.category
                            ) === category
                        );
                    });

                renderProducts();
            };
        });

    const search =
        document.getElementById('productSearch');

    if (search) {
        search.oninput =
            renderProducts;
    }

    const urlCategory =
        new URLSearchParams(location.search)
            .get('category');

    if (urlCategory) {

        category =
            categoryName(urlCategory);

        document
            .querySelectorAll(
                '.filter[data-category]'
            )
            .forEach(function(button) {

                button.classList.toggle(
                    'active',
                    categoryName(
                        button.dataset.category
                    ) === category
                );
            });

        renderProducts();
    }

    document
        .querySelectorAll('.tab')
        .forEach(function(button) {

            button.onclick = function() {

                wishFilter =
                    button.dataset.status ||
                    'All';

                document
                    .querySelectorAll('.tab')
                    .forEach(function(item) {
                        item.classList.remove(
                            'active'
                        );
                    });

                button.classList.add('active');

                renderWishlist();
            };
        });
}

document.addEventListener(
    'DOMContentLoaded',
    startWebsite
);


/* PWA support */

if ('serviceWorker' in navigator) {
    window.addEventListener(
        'load',
        function() {
            navigator.serviceWorker
                .register('./sw.js')
                .catch(function() {});
        }
    );
}