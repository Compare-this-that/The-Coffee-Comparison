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
            { name: "Filter Coffee", price: 2.75 } 
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

// --- 2. THE LOGIC (MENU & PRICES) ---

const shopSelect = document.getElementById('shop-select');
const priceDisplay = document.getElementById('price-display');

/**
 * Formats a number as GBP currency (e.g., 4.4 becomes £4.40)
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
        itemPriceContainer.className = 'item-price'; 

        // Check if the price is an object (S/M/L) or a single number
        if (typeof item.price === 'object' && item.price !== null) {
            itemPriceContainer.classList.add('item-price-group');

            const priceS = document.createElement('span');
            priceS.className = 'price-size';
            priceS.innerHTML = `<strong>S:</strong> ${formatPrice(item.price.s)}`;
            
            const priceM = document.createElement('span');
            priceM.className = 'price-size';
            priceM.innerHTML = `<strong>M:</strong> ${formatPrice(item.price.m)}`;
            
            const priceL = document.createElement('span');
            priceL.className = 'price-size';
            priceL.innerHTML = `<strong>L:</strong> ${formatPrice(item.price.l)}`;

            itemPriceContainer.appendChild(priceS);
            itemPriceContainer.appendChild(priceM);
            itemPriceContainer.appendChild(priceL);

        } else {
            itemPriceContainer.textContent = formatPrice(item.price);
        }

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


// --- 4. STORE LOCATOR LOGIC (POSTCODES & OSM) ---

// Function to fetch ONLY our specific coffee shops from Overpass API
async function fetchNearbyCoffeeShops(lat, lon) {
  const radiusInMeters = 5000; // 5km search radius (~3.1 miles)
  const selectedShopId = document.getElementById('shop-select').value;
  
  // 1. Define the core keywords for the brands on your list
  let keywords = ["starbucks", "costa", "pret", "greggs", "nero", "sheep", "mcdonald"];
  
  // If a specific shop is selected in the dropdown, filter our keywords to just that one
  if (selectedShopId && coffeeData[selectedShopId]) {
      const selectedName = coffeeData[selectedShopId].name.toLowerCase();
      keywords = keywords.filter(kw => selectedName.includes(kw));
  }

  // Create a search string for OpenStreetMap (e.g., "starbucks|costa|pret")
  const searchRegex = keywords.join("|");
  
  // 2. Base Overpass query: We use 'nwr' (Nodes, Ways, Relations) to catch buildings, 
  // and we specifically only ask for names/brands matching our regex string.
  const overpassQuery = `
    [out:json];
    (
      nwr["name"~"${searchRegex}",i](around:${radiusInMeters},${lat},${lon});
      nwr["brand"~"${searchRegex}",i](around:${radiusInMeters},${lat},${lon});
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // 3. Map the results, ensuring we handle building 'centers' correctly so distances aren't broken
    let foundShops = data.elements.map(element => {
      const shopLat = element.lat || (element.center && element.center.lat);
      const shopLon = element.lon || (element.center && element.center.lon);
      const name = element.tags.name || element.tags.brand || "Coffee Shop";
      const address = [element.tags["addr:street"], element.tags["addr:city"]].filter(Boolean).join(", ") || "Address not available";
      
      return { name, lat: shopLat, lon: shopLon, address };
    });

    // 4. Strict filter: Make 100% sure the returned shop contains our brand keyword 
    // (prevents independent spots like "The Costa Del Sol Cafe" from showing up)
    foundShops = foundShops.filter(shop => {
      if (!shop.lat || !shop.lon) return false; // Remove broken coordinates
      const shopNameLower = shop.name.toLowerCase();
      return keywords.some(kw => shopNameLower.includes(kw));
    });

    return foundShops;

  } catch (error) {
    console.error("Error fetching from Overpass:", error);
    return [];
  }
}
