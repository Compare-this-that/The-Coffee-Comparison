// --- 1. THE DATA (WITH S/M/L PRICES) ---
const coffeeData = {
    "starbucks": {
        name: "Starbucks",
        items: [
            { name: "Caffè Latte", price: { s: 4.10, m: 4.40, l: 4.70 } },
            { name: "Cappuccino", price: { s: 4.10, m: 4.40, l: 4.70 } },
            { name: "Caffè Americano", price: { s: 3.50, m: 3.80, l: 4.10 } },
            { name: "Flat White", price: { s: 4.05, m: 4.35, l: 4.65 } },
            { name: "Caramel Macchiato", price: { s: 4.50, m: 4.80, l: 5.10 } },
            { name: "Filter Coffee", price: 2.75 } // This item has only one price
        ]
    },
    "costa": {
        name: "Costa Coffee",
        items: [
            { name: "Latte", price: { s: 4.10, m: 4.40, l: 4.70 } },
            { name: "Cappuccino", price: { s: 4.10, m: 4.40, l: 4.70 } },
            { name: "Americano", price: { s: 3.50, m: 3.80, l: 4.10 } },
            { name: "Flat White", price: { s: 4.05, m: 4.35, l: 4.65 } },
            { name: "Mocha", price: { s: 4.30, m: 4.60, l: 4.90 } },
            { name: "Filter Coffee", price: 2.80 }
        ]
    },
    "pret": {
        name: "Pret A Manger",
        items: [
            { name: "Latte", price: { s: 3.75, m: 4.05, l: 4.35 } },
            { name: "Cappuccino", price: { s: 3.75, m: 4.05, l: 4.35 } },
            { name: "Americano", price: { s: 3.30, m: 3.60, l: 3.90 } },
            { name: "Flat White", price: { s: 3.75, m: 4.05, l: 4.35 } },
            { name: "Mocha", price: { s: 3.85, m: 4.15, l: 4.45 } },
            { name: "Filter Coffee", price: 1.90 }
        ]
    },
    "greggs": {
        name: "Greggs",
        items: [
            { name: "Latte", price: { s: 2.20, m: 2.50, l: 2.50 } },
            { name: "Cappuccino", price: { s: 2.20, m: 2.50, l: 2.80 } },
            { name: "Americano", price: { s: 1.80, m: 2.10, l: 2.40 } },
            { name: "Flat White", price: 2.50 },
            { name: "Mocha", price: 2.60 },
            { name: "White Coffee", price: 2.10 },
            { name: "Gingerbread Latte", price: 3.75 }
        ]
    },
    "caffe-nero": {
        name: "Caffè Nero",
        items: [
            { name: "Latte", price: { s: 4.00, m: 4.30, l: 4.60 } },
            { name: "Cappuccino", price: { s: 4.00, m: 4.30, l: 4.60 } },
            { name: "Americano", price: { s: 3.40, m: 3.70, l: 4.00 } },
            { name: "Flat White", price: 4.45 },
            { name: "Mocha", price: { s: 4.25, m: 4.55, l: 4.85 } },
            { name: "Espresso", price: 3.05 }
        ]
    },
    "black-sheep": {
        name: "Black Sheep",
        items: [
            { name: "Latte", price: { s: 4.00, m: 4.30, l: 4.60 } },
            { name: "Cappuccino", price: { s: 4.00, m: 4.30, l: 4.60 } },
            { name: "Americano", price: { s: 3.40, m: 3.70, l: 4.00 } },
            { name: "Flat White", price: 4.45 },
            { name: "Mocha", price: { s: 4.25, m: 4.55, l: 4.85 } },
            { name: "Espresso", price: 3.05 }
        ]
    },
    "mcdonalds": {
        name: "Mcdonalds",
        items: [
            { name: "Latte", price: { s: 1.99, m: 2.29, l: 2.59 } },
            { name: "Cappuccino", price: { s: 1.99, m: 2.29, l: 2.59 } },
            { name: "Americano", price: 1.99 },
            { name: "Flat White", price: 2.09 },
            { name: "Mocha", price: 2.49 }
        ]
    }
};

// --- 2. THE LOGIC (UPDATED) ---

const shopSelect = document.getElementById('shop-select');
const priceDisplay = document.getElementById('price-display');

/**
 * Formats a number as GBP currency (e.g., 4.4 becomes £4.40)
 * @param {number} price - The price to format
 * @returns {string} - The formatted price string
 */
function formatPrice(price) {
    return price.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP'
    });
}

/**
 * This function is called when the user selects a shop.
 * It builds the HTML for the selected shop's menu.
 * @param {string} shopId - The value from the select (e.g., "starbucks")
 */
function displayPrices(shopId) {
    priceDisplay.innerHTML = '';
    priceDisplay.setAttribute('data-shop', shopId);

    const shop = coffeeData[shopId];

    if (!shop) {
        return;
    }

    const title = document.createElement('h2');
    title.className = 'shop-title';
    title.textContent = `${shop.name} Menu`;
    priceDisplay.appendChild(title);

    const list = document.createElement('ul');
    list.className = 'price-list';

    // Loop over each item and build the list
    shop.items.forEach(item => {
        const listItem = document.createElement('li');

        const itemName = document.createElement('span');
        itemName.className = 'item-name';
        itemName.textContent = item.name;

        // Create the container for the price(s)
        const itemPriceContainer = document.createElement('span');
        itemPriceContainer.className = 'item-price'; // Base class

        // --- NEW LOGIC ---
        // Check if the price is an object (S/M/L) or a single number
        if (typeof item.price === 'object' && item.price !== null) {
            // It's an object with S/M/L prices
            itemPriceContainer.classList.add('item-price-group');

            // Small
            const priceS = document.createElement('span');
            priceS.className = 'price-size';
            priceS.innerHTML = `<strong>S:</strong> ${formatPrice(item.price.s)}`;
            
            // Medium
            const priceM = document.createElement('span');
            priceM.className = 'price-size';
            priceM.innerHTML = `<strong>M:</strong> ${formatPrice(item.price.m)}`;
            
            // Large
            const priceL = document.createElement('span');
            priceL.className = 'price-size';
            priceL.innerHTML = `<strong>L:</strong> ${formatPrice(item.price.l)}`;

            itemPriceContainer.appendChild(priceS);
            itemPriceContainer.appendChild(priceM);
            itemPriceContainer.appendChild(priceL);

        } else {
            // It's just a single price (a number)
            itemPriceContainer.textContent = formatPrice(item.price);
        }
        // --- END OF NEW LOGIC ---

        listItem.appendChild(itemName);
        listItem.appendChild(itemPriceContainer);
        list.appendChild(listItem);
    });

    priceDisplay.appendChild(list);
}

// --- 3. THE EVENT LISTENER ---
shopSelect.addEventListener('change', (event) => {
    displayPrices(event.target.value);
});