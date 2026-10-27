/* =========================================
   1. CONFIGURATION DE LA BOUTIQUE
========================================= */

// Remplace ce numéro par celui du commerçant.
// Format international sans +, espaces ni tirets.
const WHATSAPP_NUMBER = "221770000000";


/* =========================================
   2. DONNÉES DES PRODUITS
========================================= */

const products = [
    {
        id: 1,
        name: "T-shirt Essential",
        category: "Vêtements",
        price: 8500,
        description: "T-shirt confortable au style minimaliste.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
        badge: "POPULAIRE"
    },
    {
        id: 2,
        name: "Sweat Urban",
        category: "Vêtements",
        price: 15000,
        description: "Sweat moderne pour un look décontracté.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
        badge: "TENDANCE"
    },
    {
        id: 3,
        name: "Sneakers Street",
        category: "Chaussures",
        price: 22000,
        description: "Baskets au design urbain et polyvalent.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
        badge: "NOUVEAU"
    },
    {
        id: 4,
        name: "Sac Élégance",
        category: "Accessoires",
        price: 18000,
        description: "Un sac élégant pour compléter votre tenue.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
        badge: ""
    },
    {
        id: 5,
        name: "Chemise Premium",
        category: "Vêtements",
        price: 12500,
        description: "Chemise intemporelle pour toutes les occasions.",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85",
        badge: "NOUVEAU"
    },
    {
        id: 6,
        name: "Sneakers Classic",
        category: "Chaussures",
        price: 25000,
        description: "Des baskets classiques faciles à associer.",
        image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=85",
        badge: ""
    },
    {
        id: 7,
        name: "Montre Minimal",
        category: "Accessoires",
        price: 17500,
        description: "Une montre au design sobre et raffiné.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85",
        badge: "ÉLÉGANT"
    },
    {
        id: 8,
        name: "Lunettes Urban",
        category: "Accessoires",
        price: 7500,
        description: "Des lunettes pour affirmer votre personnalité.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
        badge: ""
    }
];


/* =========================================
   3. RÉCUPÉRATION DES ÉLÉMENTS HTML
========================================= */

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const productCount = document.getElementById("productCount");
const emptyMessage = document.getElementById("emptyMessage");

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

let selectedCategory = "Tous";


/* =========================================
   4. FORMATAGE DES PRIX
========================================= */

function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}


/* =========================================
   5. CRÉATION D'UNE CARTE PRODUIT
========================================= */

function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "product-image";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    // Affiche une solution de remplacement si l'image ne charge pas.
    image.addEventListener("error", function () {
        image.src = "https://placehold.co/600x800/f7f5f0/171717?text=URBAN+STYLE";
    }, { once: true });

    imageContainer.appendChild(image);

    if (product.badge) {
        const badge = document.createElement("span");
        badge.className = "product-badge";
        badge.textContent = product.badge;
        imageContainer.appendChild(badge);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const orderButton = document.createElement("button");
    orderButton.className = "order-button";
    orderButton.type = "button";
    orderButton.textContent = "Commander ↗";

    orderButton.addEventListener("click", function () {
        orderProduct(product);
    });

    bottom.append(price, orderButton);
    info.append(category, name, description, bottom);
    article.append(imageContainer, info);

    return article;
}


/* =========================================
   6. AFFICHAGE DES PRODUITS
========================================= */

function renderProducts() {
    const searchTerm = searchInput.value
        .trim()
        .toLocaleLowerCase("fr");

    const filteredProducts = products.filter(function (product) {
        const matchesCategory =
            selectedCategory === "Tous" ||
            product.category === selectedCategory;

        const searchableText = [
            product.name,
            product.category,
            product.description
        ].join(" ").toLocaleLowerCase("fr");

        const matchesSearch = searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    productsGrid.replaceChildren();

    filteredProducts.forEach(function (product) {
        productsGrid.appendChild(createProductCard(product));
    });

    productCount.textContent =
        filteredProducts.length +
        (filteredProducts.length > 1 ? " articles" : " article");

    emptyMessage.hidden = filteredProducts.length !== 0;
    productsGrid.hidden = filteredProducts.length === 0;
}


/* =========================================
   7. RECHERCHE DE PRODUITS
========================================= */

searchInput.addEventListener("input", renderProducts);


/* =========================================
   8. FILTRES PAR CATÉGORIE
========================================= */

categoryFilters.addEventListener("click", function (event) {
    const button = event.target.closest(".filter-button");

    if (!button) {
        return;
    }

    selectedCategory = button.dataset.category;

    categoryFilters.querySelectorAll(".filter-button").forEach(function (item) {
        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
    });

    renderProducts();
});


/* =========================================
   9. COMMANDE WHATSAPP
========================================= */

function orderProduct(product) {
    const message =
        "Bonjour URBAN STYLE ! Je souhaite commander ce produit :\n\n" +
        "Produit : " + product.name + "\n" +
        "Prix affiché : " + formatPrice(product.price) + "\n\n" +
        "Est-il disponible ?";

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
}


/* =========================================
   10. MENU MOBILE
========================================= */

menuToggle.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        menuToggle.textContent = "☰";
    });
});


/* =========================================
   11. ANNÉE AUTOMATIQUE
========================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* =========================================
   12. INITIALISATION
========================================= */

renderProducts();
