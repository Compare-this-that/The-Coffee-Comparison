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

function formatPrice(price) {
    return price.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP'
    });
}

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

    shop.items.forEach(item => {
        const listItem = document.createElement('li');

        const itemName = document.createElement('span');
        itemName.className = 'item-name';
        itemName.textContent = item.name;

        const itemPriceContainer = document.createElement('span');
        itemPriceContainer.className = 'item-price'; 

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

// Fetch ONLY our specific coffee shops from Overpass API
async function fetchNearbyCoffeeShops(lat, lon) {
  const radiusInMeters = 5000; // 5km search radius (~3.1 miles)
  const selectedShopId = document.getElementById('shop-select').value;
  
  let keywords = ["starbucks", "costa", "pret", "greggs", "nero", "sheep", "mcdonald"];
  
  if (selectedShopId && coffeeData[selectedShopId]) {
      const selectedName = coffeeData[selectedShopId].name.toLowerCase();
      keywords = keywords.filter(kw => selectedName.includes(kw));
  }

  const searchRegex = keywords.join("|");
  
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
    
    let foundShops = data.elements.map(element => {
      const shopLat = element.lat || (element.center && element.center.lat);
      const shopLon = element.lon || (element.center && element.center.lon);
      const name = element.tags.name || element.tags.brand || "Coffee Shop";
      const address = [element.tags["addr:street"], element.tags["addr:city"]].filter(Boolean).join(", ") || "Address not available";
      
      return { name, lat: shopLat, lon: shopLon, address };
    });

    foundShops = foundShops.filter(shop => {
      if (!shop.lat || !shop.lon) return false; 
      const shopNameLower = shop.name.toLowerCase();
      return keywords.some(kw => shopNameLower.includes(kw));
    });

    return foundShops;

  } catch (error) {
    console.error("Error fetching from Overpass:", error);
    return [];
  }
}

// The Math (Haversine Formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// The Main Search Function (This was missing!)
async function findNearestCoffee() {
  const postcodeInput = document.getElementById('postcode-input').value.trim();
  const errorMessage = document.getElementById('error-message');
  const resultsList = document.getElementById('results-list');
  
  errorMessage.style.display = 'none';
  resultsList.innerHTML = 'Loading live map data...';

  if (!postcodeInput) {
    showError("Please enter a postcode.");
    return;
  }

  try {
    const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcodeInput)}`);
    const postcodeData = await postcodeResponse.json();

    if (postcodeData.status !== 200) {
      showError("Invalid postcode. Please try again.");
      return;
    }

    const userLat = postcodeData.result.latitude;
    const userLon = postcodeData.result.longitude;

    const coffeeShops = await fetchNearbyCoffeeShops(userLat, userLon);
    
    // Deduplicate results
    const uniqueShops = Array.from(new Set(coffeeShops.map(s => s.lat + ',' + s.lon)))
      .map(id => coffeeShops.find(s => s.lat + ',' + s.lon === id));
    
    if (uniqueShops.length === 0) {
      showError("No matching coffee shops found within 3 miles.");
      return;
    }

    const shopsWithDistances = uniqueShops.map(shop => {
      const distance = calculateDistance(userLat, userLon, shop.lat, shop.lon);
      return { ...shop, distance: distance };
    });

    shopsWithDistances.sort((a, b) => a.distance - b.distance);

    resultsList.innerHTML = ''; 
    
    const fragment = document.createDocumentFragment();
    shopsWithDistances.slice(0, 5).forEach(shop => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${shop.name}</strong> - ${shop.distance.toFixed(1)} miles away<br><small>${shop.address}</small>`;
      fragment.appendChild(li);
    });
    
    resultsList.appendChild(fragment);

  } catch (error) {
    showError("Something went wrong mapping the shops. Please try again.");
  }
}

function showError(msg) {
  const errorMessage = document.getElementById('error-message');
  const resultsList = document.getElementById('results-list');
  errorMessage.textContent = msg;
  errorMessage.style.display = 'block';
  resultsList.innerHTML = '';
}
