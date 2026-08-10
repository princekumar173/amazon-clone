/* ==========================================================================
   AMAZON CLONE APPLICATION LOGIC - ENHANCED VERSION
   ========================================================================== */

// --- Application State ---
const state = {
  cart: JSON.parse(localStorage.getItem('amazon_clone_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('amazon_clone_wishlist')) || [],
  orders: JSON.parse(localStorage.getItem('amazon_clone_orders')) || [
    {
      id: 'AMZ-849201',
      date: 'Aug 8, 2026',
      total: 399.00,
      status: 'In Transit',
      step: 3,
      items: [{ id: 'p2', qty: 1 }]
    }
  ],
  recentlyViewed: JSON.parse(localStorage.getItem('amazon_clone_recent')) || [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  currency: localStorage.getItem('amazon_clone_currency') || 'USD',
  currentSlide: 0,
  selectedColor: {},
  selectedSize: {}
};

// --- DOM Elements ---
const elements = {
  // Navigation & Search
  searchInput: document.getElementById('search-input'),
  searchCategorySelect: document.getElementById('search-category'),
  searchBtn: document.getElementById('search-btn'),
  searchSuggestions: document.getElementById('search-suggestions'),
  cartBadgeCount: document.getElementById('cart-badge-count'),
  cartBtn: document.getElementById('cart-btn'),
  wishlistBtn: document.getElementById('wishlist-btn-nav'),
  ordersBtn: document.getElementById('orders-btn-nav'),
  currencySelect: document.getElementById('currency-select'),
  categoryPills: document.querySelectorAll('.pill-btn'),
  sortSelect: document.getElementById('sort-select'),

  // Product Grid & Recently Viewed
  productGrid: document.getElementById('product-grid'),
  catalogTitle: document.getElementById('catalog-title'),
  resultCount: document.getElementById('result-count'),
  recentlyViewedSection: document.getElementById('recently-viewed-section'),
  recentlyViewedGrid: document.getElementById('recently-viewed-grid'),
  countdownTimer: document.getElementById('countdown-timer'),

  // Carousel
  carouselTrack: document.getElementById('carousel-track'),
  carouselPrev: document.getElementById('carousel-prev'),
  carouselNext: document.getElementById('carousel-next'),

  // Cart Drawer
  cartBackdrop: document.getElementById('cart-backdrop'),
  cartPanel: document.getElementById('cart-panel'),
  cartClose: document.getElementById('cart-close'),
  cartItemsList: document.getElementById('cart-items-list'),
  cartSubtotal: document.getElementById('cart-subtotal'),
  cartTotal: document.getElementById('cart-total'),
  checkoutBtn: document.getElementById('checkout-btn'),
  progressFill: document.getElementById('progress-fill'),
  progressText: document.getElementById('progress-text'),

  // Wishlist Drawer
  wishlistBackdrop: document.getElementById('wishlist-backdrop'),
  wishlistPanel: document.getElementById('wishlist-panel'),
  wishlistClose: document.getElementById('wishlist-close'),
  wishlistItemsList: document.getElementById('wishlist-items-list'),

  // Quick View Modal
  quickViewOverlay: document.getElementById('quick-view-overlay'),
  quickViewClose: document.getElementById('quick-view-close'),
  quickViewBody: document.getElementById('quick-view-body'),

  // Orders Tracker Modal
  ordersOverlay: document.getElementById('orders-overlay'),
  ordersClose: document.getElementById('orders-close'),
  ordersModalBody: document.getElementById('orders-modal-body'),

  // Checkout Modal
  checkoutOverlay: document.getElementById('checkout-overlay'),
  checkoutClose: document.getElementById('checkout-close'),
  checkoutForm: document.getElementById('checkout-form'),

  // Toast Container
  toastContainer: document.getElementById('toast-container')
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  if (elements.currencySelect) elements.currencySelect.value = state.currency;
  initCarousel();
  startCountdownTimer();
  renderProducts();
  renderRecentlyViewed();
  updateCartBadge();
  setupEventListeners();
});

// Helper for price formatting across active currency
function formatPrice(amountInUSD) {
  const currObj = CURRENCIES[state.currency] || CURRENCIES.USD;
  const converted = amountInUSD * currObj.rate;
  
  if (state.currency === 'JPY' || state.currency === 'INR') {
    return `${currObj.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${currObj.symbol}${converted.toFixed(2)}`;
}

function saveState() {
  localStorage.setItem('amazon_clone_cart', JSON.stringify(state.cart));
  localStorage.setItem('amazon_clone_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('amazon_clone_orders', JSON.stringify(state.orders));
  localStorage.setItem('amazon_clone_recent', JSON.stringify(state.recentlyViewed));
  localStorage.setItem('amazon_clone_currency', state.currency);
}

// ==========================================================================
// FLASH SALE COUNTDOWN TIMER
// ==========================================================================

function startCountdownTimer() {
  let seconds = 4 * 3600 + 38 * 60 + 22;
  setInterval(() => {
    seconds = seconds > 0 ? seconds - 1 : 24 * 3600;
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    if (elements.countdownTimer) {
      elements.countdownTimer.textContent = `${h}h : ${m}m : ${s}s`;
    }
  }, 1000);
}

// ==========================================================================
// HERO CAROUSEL CONTROLLER
// ==========================================================================

function initCarousel() {
  if (!elements.carouselTrack) return;
  
  elements.carouselTrack.innerHTML = HERO_SLIDES.map((slide, idx) => `
    <div class="carousel-slide" style="background: ${slide.bgGradient}">
      <div class="carousel-content">
        <span class="slide-badge">${slide.badge}</span>
        <h2 class="slide-title">${slide.title}</h2>
        <p class="slide-subtitle">${slide.subtitle}</p>
        <button class="slide-btn" onclick="filterByCategory('${slide.categoryFilter}')">${slide.btnText}</button>
      </div>
      <img src="${slide.image}" class="slide-image-preview" alt="${slide.title}" />
    </div>
  `).join('');

  setInterval(() => moveCarousel(1), 5000);
}

function moveCarousel(direction) {
  state.currentSlide = (state.currentSlide + direction + HERO_SLIDES.length) % HERO_SLIDES.length;
  elements.carouselTrack.style.transform = `translateX(-${state.currentSlide * 100}%)`;
}

// ==========================================================================
// PRODUCT CATALOG RENDERING & FILTERING
// ==========================================================================

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchCategory = state.selectedCategory === 'all' || p.category === state.selectedCategory;
    const query = state.searchQuery.toLowerCase().trim();
    const matchSearch = !query || 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);

    return matchCategory && matchSearch;
  }).sort((a, b) => {
    if (state.sortBy === 'price-low') return a.price - b.price;
    if (state.sortBy === 'price-high') return b.price - a.price;
    if (state.sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();

  elements.resultCount.textContent = `${filtered.length} items found`;
  if (state.selectedCategory !== 'all') {
    elements.catalogTitle.textContent = `${state.selectedCategory.toUpperCase()} Products`;
  } else if (state.searchQuery) {
    elements.catalogTitle.textContent = `Results for "${state.searchQuery}"`;
  } else {
    elements.catalogTitle.textContent = "Featured Products";
  }

  if (filtered.length === 0) {
    elements.productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No matching products found</h3>
        <p>Try searching with different keywords or clearing category filters.</p>
      </div>
    `;
    return;
  }

  elements.productGrid.innerHTML = filtered.map(p => {
    const isWishlisted = state.wishlist.includes(p.id);
    const starString = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));

    return `
      <div class="product-card" data-id="${p.id}">
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}', event)">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>

        <div class="card-img-wrap" onclick="openQuickView('${p.id}')">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          ${p.badge ? `<span class="card-badge ${p.badge.includes('Deal') ? 'deal' : ''}">${p.badge}</span>` : ''}
        </div>

        <div class="card-info">
          <h3 class="card-title" onclick="openQuickView('${p.id}')">${p.name}</h3>
          
          <div class="rating-wrap">
            <span class="stars">${starString}</span>
            <span class="review-count">(${p.reviewCount.toLocaleString()})</span>
          </div>

          <div class="price-wrap">
            <span class="price-main">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="price-orig">${formatPrice(p.originalPrice)}</span>` : ''}
          </div>

          ${p.isDeal ? `
            <div class="deal-claim-wrap">
              <div class="claim-progress-track">
                <div class="claim-progress-fill" style="width: ${p.claimed}%;"></div>
              </div>
              <div class="claim-text">${p.claimed}% claimed — Limited time deal</div>
            </div>
          ` : ''}

          <div class="shipping-tag">
            ${p.fastDelivery ? 'FREE One-Day Delivery <strong>Tomorrow</strong>' : 'FREE Shipping on orders over $35'}
          </div>

          <div class="card-actions">
            <button class="add-cart-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
            <button class="quick-view-btn" onclick="openQuickView('${p.id}')">Quick View</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterByCategory(category) {
  state.selectedCategory = category;
  elements.categoryPills.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  renderProducts();
}

// ==========================================================================
// SEARCH & AUTOCOMPLETE ENGINE
// ==========================================================================

function handleSearchInput() {
  const query = elements.searchInput.value.trim().toLowerCase();
  state.searchQuery = query;

  if (query.length < 2) {
    elements.searchSuggestions.classList.remove('active');
    renderProducts();
    return;
  }

  const matches = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  ).slice(0, 5);

  if (matches.length > 0) {
    elements.searchSuggestions.innerHTML = matches.map(m => `
      <div class="suggestion-item" onclick="selectSuggestion('${m.name.replace(/'/g, "\\'")}')">
        <span>${highlightMatch(m.name, query)}</span>
        <span class="suggestion-cat">${m.category}</span>
      </div>
    `).join('');
    elements.searchSuggestions.classList.add('active');
  } else {
    elements.searchSuggestions.classList.remove('active');
  }

  renderProducts();
}

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text;
  return text.substring(0, idx) + `<strong>${text.substring(idx, idx + query.length)}</strong>` + text.substring(idx + query.length);
}

function selectSuggestion(name) {
  elements.searchInput.value = name;
  state.searchQuery = name;
  elements.searchSuggestions.classList.remove('active');
  renderProducts();
}

// ==========================================================================
// RECENTLY VIEWED PRODUCTS
// ==========================================================================

function pushRecentlyViewed(productId) {
  state.recentlyViewed = state.recentlyViewed.filter(id => id !== productId);
  state.recentlyViewed.unshift(productId);
  if (state.recentlyViewed.length > 8) state.recentlyViewed.pop();
  saveState();
  renderRecentlyViewed();
}

function renderRecentlyViewed() {
  if (!elements.recentlyViewedSection || state.recentlyViewed.length === 0) return;

  elements.recentlyViewedSection.style.display = 'block';
  elements.recentlyViewedGrid.innerHTML = state.recentlyViewed.map(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return '';
    return `
      <div class="rv-item" onclick="openQuickView('${p.id}')">
        <img src="${p.image}" alt="${p.name}" />
        <div class="rv-name">${p.name}</div>
        <div class="rv-price">${formatPrice(p.price)}</div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// CART & WISHLIST DRAWER LOGIC
// ==========================================================================

function addToCart(productId, qty = 1) {
  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ id: productId, qty });
  }
  
  saveState();
  updateCartBadge();
  animateCartBadge();
  showToast("Item added to your Amazon Cart!");

  if (elements.cartPanel.classList.contains('active')) {
    renderCart();
  }
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  elements.cartBadgeCount.textContent = totalCount;
}

function animateCartBadge() {
  elements.cartBadgeCount.classList.remove('bump');
  void elements.cartBadgeCount.offsetWidth; // trigger reflow
  elements.cartBadgeCount.classList.add('bump');
}

function openCart() {
  renderCart();
  elements.cartBackdrop.classList.add('active');
  elements.cartPanel.classList.add('active');
}

function closeCart() {
  elements.cartBackdrop.classList.remove('active');
  elements.cartPanel.classList.remove('active');
}

function renderCart() {
  if (state.cart.length === 0) {
    elements.cartItemsList.innerHTML = `
      <div class="empty-state">
        <svg style="width:48px;height:48px;fill:#bbb;margin-bottom:12px;" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <h4 style="font-size:1.1rem;margin-bottom:4px;">Your Amazon Cart is empty</h4>
        <p style="font-size:0.85rem;">Discover daily deals and add products to your cart.</p>
      </div>
    `;
    elements.cartSubtotal.textContent = formatPrice(0);
    elements.cartTotal.textContent = formatPrice(0);
    elements.progressFill.style.width = "0%";
    elements.progressText.textContent = "Add $35.00 for FREE Shipping";
    elements.checkoutBtn.disabled = true;
    return;
  }

  elements.checkoutBtn.disabled = false;
  let subtotal = 0;

  elements.cartItemsList.innerHTML = state.cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return '';
    const itemTotal = p.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-item-card">
        <img src="${p.image}" class="cart-item-img" alt="${p.name}" />
        <div class="cart-item-details">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <div class="cart-qty-controls">
            <button class="qty-btn" onclick="changeQty('${p.id}', -1)">-</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${p.id}', 1)">+</button>
            <button class="remove-item-btn" onclick="removeFromCart('${p.id}')">Delete</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  elements.cartSubtotal.textContent = formatPrice(subtotal);
  elements.cartTotal.textContent = formatPrice(subtotal);

  const freeThreshold = 35.00;
  const progressPercent = Math.min(100, (subtotal / freeThreshold) * 100);
  elements.progressFill.style.width = `${progressPercent}%`;
  
  if (subtotal >= freeThreshold) {
    elements.progressText.innerHTML = "<strong>Your order qualifies for FREE Shipping!</strong>";
  } else {
    const diff = freeThreshold - subtotal;
    elements.progressText.textContent = `Add $${diff.toFixed(2)} more for FREE Shipping`;
  }
}

function changeQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveState();
    updateCartBadge();
    renderCart();
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveState();
  updateCartBadge();
  renderCart();
  showToast("Item removed from cart");
}

// Wishlist Logic
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();
  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast("Removed from Wishlist");
  } else {
    state.wishlist.push(productId);
    showToast("Saved to your Wishlist!");
  }
  saveState();
  renderProducts();
  if (elements.wishlistPanel.classList.contains('active')) {
    renderWishlist();
  }
}

function openWishlist() {
  renderWishlist();
  elements.wishlistBackdrop.classList.add('active');
  elements.wishlistPanel.classList.add('active');
}

function closeWishlist() {
  elements.wishlistBackdrop.classList.remove('active');
  elements.wishlistPanel.classList.remove('active');
}

function renderWishlist() {
  if (state.wishlist.length === 0) {
    elements.wishlistItemsList.innerHTML = `
      <div class="empty-state">
        <h4>Your Wishlist is empty</h4>
        <p style="font-size:0.85rem;">Click the heart icon on any product to save it for later.</p>
      </div>
    `;
    return;
  }

  elements.wishlistItemsList.innerHTML = state.wishlist.map(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return '';
    return `
      <div class="cart-item-card">
        <img src="${p.image}" class="cart-item-img" alt="${p.name}" />
        <div class="cart-item-details">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <div style="display:flex;gap:10px;margin-top:8px;">
            <button class="add-cart-btn" style="font-size:0.75rem;padding:4px 10px;" onclick="addToCart('${p.id}')">Add to Cart</button>
            <button class="remove-item-btn" onclick="toggleWishlist('${p.id}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// QUICK VIEW MODAL WITH VARIANTS & REVIEWS
// ==========================================================================

function openQuickView(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;

  pushRecentlyViewed(productId);

  const starString = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
  state.selectedColor[productId] = state.selectedColor[productId] || p.colors[0];
  state.selectedSize[productId] = state.selectedSize[productId] || p.sizes[0];

  elements.quickViewBody.innerHTML = `
    <div class="quick-view-content">
      <div class="qv-image-wrap">
        <img src="${p.image}" alt="${p.name}" />
      </div>
      <div class="qv-info-wrap">
        <h2 class="qv-title">${p.name}</h2>
        <div class="rating-wrap">
          <span class="stars">${starString}</span>
          <span class="review-count">${p.rating} out of 5 (${p.reviewCount.toLocaleString()} ratings)</span>
        </div>
        
        <div class="price-wrap" style="margin-top:8px;">
          <span class="price-main">${formatPrice(p.price)}</span>
          ${p.originalPrice ? `<span class="price-orig">${formatPrice(p.originalPrice)}</span>` : ''}
        </div>
        
        <p class="qv-desc">${p.description}</p>
        
        <!-- Color Variants -->
        <div class="variant-section">
          <div class="variant-title">Color: <strong>${state.selectedColor[productId]}</strong></div>
          <div class="variant-chips">
            ${p.colors.map(c => `
              <button class="chip-btn ${state.selectedColor[productId] === c ? 'active' : ''}" onclick="selectColor('${p.id}', '${c}')">${c}</button>
            `).join('')}
          </div>
        </div>

        <!-- Size / Config Variants -->
        <div class="variant-section">
          <div class="variant-title">Configuration: <strong>${state.selectedSize[productId]}</strong></div>
          <div class="variant-chips">
            ${p.sizes.map(s => `
              <button class="chip-btn ${state.selectedSize[productId] === s ? 'active' : ''}" onclick="selectSize('${p.id}', '${s}')">${s}</button>
            `).join('')}
          </div>
        </div>

        <div class="qv-specs-list">
          <strong style="display:block;margin-bottom:6px;">Specifications:</strong>
          ${Object.entries(p.specs).map(([key, val]) => `
            <div class="qv-spec-item">
              <span style="color:#666;">${key}</span>
              <strong>${val}</strong>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;gap:10px;margin-top:auto;">
          <button class="add-cart-btn" style="padding:12px;font-size:1rem;" onclick="addToCart('${p.id}'); closeQuickView();">Add to Cart</button>
          <button class="quick-view-btn" onclick="toggleWishlist('${p.id}');">Wishlist</button>
        </div>
      </div>
    </div>

    <!-- Customer Reviews Breakdown -->
    <div style="padding: 0 30px 30px;">
      <div class="reviews-breakdown-container">
        <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:16px;">Customer Reviews & Ratings</h3>
        <div class="reviews-grid">
          <div>
            <div style="font-size:2rem;font-weight:800;">${p.rating} <span style="font-size:1rem;color:#ffa41c;">★</span></div>
            <div style="font-size:0.8rem;color:#666;margin-bottom:12px;">Global rating scale</div>
            
            ${[5, 4, 3, 2, 1].map(star => {
              const pct = p.starBreakdown[star] || 0;
              return `
                <div class="star-bar-row">
                  <span>${star} star</span>
                  <div class="star-bar-track">
                    <div class="star-bar-fill" style="width:${pct}%;"></div>
                  </div>
                  <span>${pct}%</span>
                </div>
              `;
            }).join('')}
          </div>

          <div>
            <strong style="display:block;margin-bottom:10px;">Top Reviews:</strong>
            ${p.reviews.map(r => `
              <div class="user-review-card">
                <div class="review-author">👤 ${r.name} — <span style="color:#007600;">Verified Purchase</span></div>
                <div class="stars">${'★'.repeat(r.rating)}</div>
                <div class="review-headline">${r.title}</div>
                <div class="review-body">${r.comment}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  elements.quickViewOverlay.classList.add('active');
}

function selectColor(productId, color) {
  state.selectedColor[productId] = color;
  openQuickView(productId);
}

function selectSize(productId, size) {
  state.selectedSize[productId] = size;
  openQuickView(productId);
}

function closeQuickView() {
  elements.quickViewOverlay.classList.remove('active');
}

// ==========================================================================
// ORDERS HISTORY TRACKER MODAL
// ==========================================================================

function openOrdersModal() {
  renderOrdersModal();
  elements.ordersOverlay.classList.add('active');
}

function closeOrdersModal() {
  elements.ordersOverlay.classList.remove('active');
}

function renderOrdersModal() {
  if (state.orders.length === 0) {
    elements.ordersModalBody.innerHTML = `
      <div class="empty-state">
        <h4>No recent orders found</h4>
        <p>Your placed orders and package tracking history will appear here.</p>
      </div>
    `;
    return;
  }

  elements.ordersModalBody.innerHTML = state.orders.map(order => `
    <div class="order-history-card">
      <div class="order-card-header">
        <div>ORDER PLACED: <strong>${order.date}</strong></div>
        <div>TOTAL: <strong>${formatPrice(order.total)}</strong></div>
        <div>ORDER ID: <strong>${order.id}</strong></div>
      </div>
      <div class="order-card-body">
        <div style="font-weight:700;font-size:1rem;color:#007600;margin-bottom:8px;">
          Status: ${order.status || 'Dispatched - Arriving Tomorrow by 10 PM'}
        </div>

        <div class="order-step-timeline">
          <div class="step-node completed">
            <div class="node-icon">✓</div>
            <span>Ordered</span>
          </div>
          <div class="step-node completed">
            <div class="node-icon">✓</div>
            <span>Dispatched</span>
          </div>
          <div class="step-node ${order.step >= 3 ? 'completed' : ''}">
            <div class="node-icon">🚚</div>
            <span>Out for Delivery</span>
          </div>
          <div class="step-node ${order.step >= 4 ? 'completed' : ''}">
            <div class="node-icon">📦</div>
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// CHECKOUT & ORDERS FLOW
// ==========================================================================

function openCheckout() {
  closeCart();
  if (state.cart.length === 0) return;

  elements.checkoutOverlay.classList.add('active');
}

function closeCheckout() {
  elements.checkoutOverlay.classList.remove('active');
}

function processOrder(e) {
  e.preventDefault();
  
  const orderId = 'AMZ-' + Math.floor(100000 + Math.random() * 900000);
  const total = state.cart.reduce((sum, i) => {
    const p = PRODUCTS.find(prod => prod.id === i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);

  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    total: total,
    status: 'Dispatched - Arriving Tomorrow',
    step: 2,
    items: [...state.cart]
  };

  state.orders.unshift(newOrder);
  state.cart = [];
  saveState();
  updateCartBadge();

  elements.checkoutForm.innerHTML = `
    <div class="success-celebration">
      <div class="success-icon">✓</div>
      <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:8px;">Order Placed, Thank You!</h2>
      <p style="color:#555;">Confirmation email sent. Your package is preparing for dispatch.</p>
      
      <div class="tracking-box">
        <strong>Order ID: ${orderId}</strong><br>
        Estimated Delivery: <strong>Tomorrow by 10 PM</strong>
      </div>

      <button class="slide-btn" onclick="closeCheckout(); location.reload();">Continue Shopping</button>
    </div>
  `;
}

// ==========================================================================
// TOAST NOTIFICATIONS SYSTEM
// ==========================================================================

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <svg style="width:20px;height:20px;fill:var(--accent-orange);" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    <span>${message}</span>
  `;

  elements.toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

function setupEventListeners() {
  // Search
  elements.searchInput.addEventListener('input', handleSearchInput);
  elements.searchBtn.addEventListener('click', () => {
    state.searchQuery = elements.searchInput.value.trim();
    renderProducts();
  });

  // Currency Dropdown
  if (elements.currencySelect) {
    elements.currencySelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      saveState();
      renderProducts();
      renderRecentlyViewed();
      if (elements.cartPanel.classList.contains('active')) renderCart();
      showToast(`Switched currency to ${state.currency}`);
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search')) {
      elements.searchSuggestions.classList.remove('active');
    }
  });

  elements.categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterByCategory(pill.dataset.category);
    });
  });

  elements.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  elements.carouselPrev.addEventListener('click', () => moveCarousel(-1));
  elements.carouselNext.addEventListener('click', () => moveCarousel(1));

  // Cart Drawer
  elements.cartBtn.addEventListener('click', openCart);
  elements.cartClose.addEventListener('click', closeCart);
  elements.cartBackdrop.addEventListener('click', closeCart);
  elements.checkoutBtn.addEventListener('click', openCheckout);

  // Wishlist Drawer
  elements.wishlistBtn.addEventListener('click', openWishlist);
  elements.wishlistClose.addEventListener('click', closeWishlist);
  elements.wishlistBackdrop.addEventListener('click', closeWishlist);

  // Orders Modal
  if (elements.ordersBtn) elements.ordersBtn.addEventListener('click', openOrdersModal);
  if (elements.ordersClose) elements.ordersClose.addEventListener('click', closeOrdersModal);
  if (elements.ordersOverlay) {
    elements.ordersOverlay.addEventListener('click', (e) => {
      if (e.target === elements.ordersOverlay) closeOrdersModal();
    });
  }

  // Quick View Modal
  elements.quickViewClose.addEventListener('click', closeQuickView);
  elements.quickViewOverlay.addEventListener('click', (e) => {
    if (e.target === elements.quickViewOverlay) closeQuickView();
  });

  // Checkout Modal
  elements.checkoutClose.addEventListener('click', closeCheckout);
  elements.checkoutForm.addEventListener('submit', processOrder);
}
