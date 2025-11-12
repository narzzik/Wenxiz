(function () {
  const body = document.body;
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.site-nav__toggle');
  const links = document.querySelectorAll('.site-nav__list a');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const animated = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && animated.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animated.forEach((el) => observer.observe(el));
  } else {
    animated.forEach((el) => el.classList.add('is-visible'));
  }

  const searchOverlay = document.querySelector('.search-overlay');
  const searchForm = document.querySelector('.site-search');
  const searchInput = document.getElementById('product-search');
  const quickSearchTrigger = document.querySelector('[data-open-quick-search]');

  const closeSearchOverlay = () => {
    body.classList.remove('search-open');
  };

  if (quickSearchTrigger && searchForm && searchInput) {
    quickSearchTrigger.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        const isOpen = body.classList.toggle('search-open');
        if (isOpen) {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
          requestAnimationFrame(() => searchInput.focus());
        } else {
          closeSearchOverlay();
        }
      } else {
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', closeSearchOverlay);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSearchOverlay();
      closeModal();
    }
  });

  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      closeSearchOverlay();
    });
  }

  const productList = document.querySelector('[data-product-list]');
  const productCards = Array.from(productList ? productList.querySelectorAll('.product-card') : []);

  const products = productCards.map((card, index) => {
    const nameEl = card.querySelector('h3');
    const descriptionEl = card.querySelector('p');
    const imageEl = card.querySelector('img');
    return {
      element: card,
      index,
      id: card.dataset.productId || `product-${index}`,
      name: nameEl ? nameEl.textContent.trim() : 'Товар',
      nameLower: nameEl ? nameEl.textContent.trim().toLowerCase() : '',
      description: descriptionEl ? descriptionEl.textContent.trim() : '',
      category: card.dataset.category || 'other',
      price: Number(card.dataset.price || 0),
      priceFormatted: card.querySelector('.product-card__price')?.textContent.trim() || '',
      rating: Number(card.dataset.rating || 0),
      sustainable: card.dataset.sustainable === 'true',
      image: imageEl ? imageEl.src : '',
    };
  });

  let currentCategory = 'all';
  let sustainableOnly = false;
  let searchTerm = '';
  let sortMode = 'featured';

  const sortSelect = document.getElementById('sort-select');
  const filterButtons = document.querySelectorAll('[data-filter]');
  const sustainableToggle = document.getElementById('sustainable-toggle');

  function applyFilters() {
    if (!productList) return;

    const filtered = products
      .filter((product) => {
        const matchCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchSustainable = !sustainableOnly || product.sustainable;
        const matchSearch = !searchTerm || product.nameLower.includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        return matchCategory && matchSustainable && matchSearch;
      })
      .sort((a, b) => {
        switch (sortMode) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return a.index - b.index;
        }
      });

    productList.innerHTML = '';
    filtered.forEach((product) => productList.appendChild(product.element));
  }

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      searchTerm = event.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        currentCategory = button.dataset.filter || 'all';
        applyFilters();
      });
    });
  }

  if (sustainableToggle) {
    sustainableToggle.addEventListener('change', (event) => {
      sustainableOnly = event.target.checked;
      applyFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (event) => {
      sortMode = event.target.value;
      applyFilters();
    });
  }

  applyFilters();

  const modalMap = new Map([
    ['account', document.getElementById('account-modal')],
    ['wishlist', document.getElementById('wishlist-modal')],
    ['cart', document.getElementById('cart-modal')],
    ['quickview', document.getElementById('quickview-modal')],
  ]);

  let activeModal = null;

  function openModal(target) {
    const modal = modalMap.get(target);
    if (!modal) return;
    closeSearchOverlay();
    modal.removeAttribute('hidden');
    activeModal = modal;
    body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.setAttribute('hidden', '');
    activeModal = null;
    body.style.overflow = '';
  }

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  document.querySelectorAll('[data-open-account]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal('account'));
  });

  const wishlistTrigger = document.querySelector('[data-open-wishlist]');
  if (wishlistTrigger) {
    wishlistTrigger.addEventListener('click', () => openModal('wishlist'));
  }

  const cartTrigger = document.querySelector('[data-open-cart]');
  if (cartTrigger) {
    cartTrigger.addEventListener('click', () => openModal('cart'));
  }

  const wishlistKey = 'wenxizWishlist';
  const cartKey = 'wenxizCart';
  const userKey = 'wenxizUser';

  const wishlistList = document.getElementById('wishlist-items');
  const wishlistCountBadge = document.querySelector('[data-wishlist-count]');
  const cartList = document.getElementById('cart-items');
  const cartCountBadge = document.querySelector('[data-cart-count]');
  const cartTotal = document.querySelector('[data-cart-total]');
  const activityFeed = document.getElementById('activity-feed');
  const accountName = document.querySelector('[data-account-name]');
  const profileCashback = document.querySelector('[data-profile-cashback]');
  const profileTier = document.querySelector('[data-profile-tier]');
  const profilePreferences = document.querySelector('[data-profile-preferences]');
  const personalizedGrid = document.getElementById('personalized-grid');
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const quickviewModal = modalMap.get('quickview');
  const quickviewImage = document.getElementById('quickview-image');
  const quickviewTitle = document.getElementById('quickview-title');
  const quickviewPrice = document.getElementById('quickview-price');
  const quickviewDescription = document.getElementById('quickview-description');
  const quickviewAdd = document.querySelector('[data-quickview-add]');
  const newsletterForm = document.querySelector('.newsletter__form');
  const newsletterHint = document.querySelector('[data-newsletter-hint]');
  const citySelect = document.getElementById('city-select');
  const storeList = document.getElementById('store-list');

  const loadState = (key, fallback) => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  const saveState = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // ignore
    }
  };

  let wishlist = loadState(wishlistKey, []);
  let cart = loadState(cartKey, []);
  let currentUser = loadState(userKey, null);

  if (currentUser) {
    currentUser.cashback = Number(currentUser.cashback || 0);
    currentUser.preference = currentUser.preference || 'apparel';
    if (!currentUser.preferenceLabel) {
      currentUser.preferenceLabel =
        currentUser.preference === 'footwear'
          ? 'Обувь'
          : currentUser.preference === 'accessories'
          ? 'Аксессуары'
          : 'Одежда';
    }
  }
  let currentQuickviewId = null;

  function logActivity(message) {
    if (!activityFeed) return;
    const item = document.createElement('li');
    item.textContent = message;
    activityFeed.prepend(item);
    while (activityFeed.children.length > 5) {
      activityFeed.removeChild(activityFeed.lastElementChild);
    }
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
  }

  function updateWishlistUI() {
    if (!wishlistList || !wishlistCountBadge) return;

    if (!wishlist.length) {
      wishlistList.innerHTML = '<li>Добавьте товары в избранное, чтобы сравнить позже.</li>';
    } else {
      wishlistList.innerHTML = '';
      wishlist.forEach((id) => {
        const product = products.find((item) => item.id === id);
        if (!product) return;
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="list-item__info">
            <strong>${product.name}</strong>
            <span class="list-item__meta">${product.priceFormatted || formatCurrency(product.price)}</span>
          </div>
          <button type="button" data-remove-wishlist="${id}" aria-label="Удалить из избранного">×</button>
        `;
        wishlistList.appendChild(li);
      });
    }

    wishlistCountBadge.textContent = String(wishlist.length);

    productCards.forEach((card) => {
      const button = card.querySelector('.product-card__wishlist');
      if (!button) return;
      const isActive = wishlist.includes(card.dataset.productId);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function updateCartUI() {
    if (!cartList || !cartCountBadge || !cartTotal) return;

    if (!cart.length) {
      cartList.innerHTML = '<li>Корзина пуста. Добавьте товары, чтобы оформить заказ.</li>';
      cartTotal.textContent = '0 ₽';
    } else {
      cartList.innerHTML = '';
      let total = 0;
      cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        const price = product ? product.price : item.price;
        const subtotal = price * item.qty;
        total += subtotal;
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="list-item__info">
            <strong>${product ? product.name : item.name}</strong>
            <span class="list-item__meta">Количество: ${item.qty}</span>
          </div>
          <span class="list-item__price">${formatCurrency(subtotal)}</span>
          <button type="button" data-remove-cart="${item.id}" aria-label="Удалить из корзины">×</button>
        `;
        cartList.appendChild(li);
      });
      cartTotal.textContent = formatCurrency(total);
    }

    const itemsCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadge.textContent = String(itemsCount);
  }

  function updateProfileUI() {
    if (!accountName) return;
    if (currentUser) {
      accountName.textContent = currentUser.name.split(' ')[0];
      if (profileCashback) profileCashback.textContent = (currentUser.cashback || 0).toLocaleString('ru-RU');
      if (profileTier) profileTier.textContent = currentUser.tier || 'Silver';
      if (profilePreferences) profilePreferences.textContent = currentUser.preferenceLabel || 'Обновляется';
      renderPersonalized();
    } else {
      accountName.textContent = 'Войти';
      if (profileCashback) profileCashback.textContent = '0';
      if (profileTier) profileTier.textContent = 'Гость';
      if (profilePreferences) profilePreferences.textContent = 'Не выбрано';
      if (personalizedGrid) {
        personalizedGrid.innerHTML = `
          <div class="personalized__placeholder">
            <p>Заполните профиль, чтобы увидеть персональные предложения.</p>
            <button class="btn btn--outline" type="button" data-open-account>Указать предпочтения</button>
          </div>
        `;
        personalizedGrid.querySelector('[data-open-account]')?.addEventListener('click', () => openModal('account'));
      }
    }
  }

  function renderPersonalized() {
    if (!currentUser || !personalizedGrid) return;

    const preferred = currentUser.preference || 'apparel';
    const pool = products.filter((product) => product.category === preferred);
    const fallback = products
      .filter((product) => product.category !== preferred)
      .sort((a, b) => b.rating - a.rating);

    const selection = [...pool.sort((a, b) => b.rating - a.rating), ...fallback].slice(0, 3);

    personalizedGrid.innerHTML = '';

    selection.forEach((product) => {
      const card = document.createElement('article');
      card.className = 'personalized__card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>
        <div class="personalized__footer">
          <span class="product-card__price">${product.priceFormatted || formatCurrency(product.price)}</span>
          <button class="btn btn--primary" type="button" data-add-from-personalized="${product.id}">Добавить в корзину</button>
        </div>
      `;
      personalizedGrid.appendChild(card);
    });
  }

  function saveWishlist() {
    saveState(wishlistKey, wishlist);
    updateWishlistUI();
  }

  function saveCart() {
    saveState(cartKey, cart);
    updateCartUI();
  }

  function saveUser() {
    saveState(userKey, currentUser);
    updateProfileUI();
  }

  function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    const product = products.find((item) => item.id === productId);
    if (index >= 0) {
      wishlist.splice(index, 1);
      logActivity(`Удалено из избранного: ${product ? product.name : productId}`);
    } else {
      wishlist.push(productId);
      if (product) {
        logActivity(`Добавлено в избранное: ${product.name}`);
      }
    }
    saveWishlist();
  }

  function addToCart(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: productId, qty: 1, price: product.price, name: product.name });
    }
    logActivity(`Товар добавлен в корзину: ${product.name}`);
    saveCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
  }

  function handleWishlistClick(event) {
    const button = event.target.closest('.product-card__wishlist');
    if (!button) return;
    const card = button.closest('.product-card');
    if (!card) return;
    toggleWishlist(card.dataset.productId);
  }

  function handleAddToCart(event) {
    const button = event.target.closest('.product-card__add');
    if (!button) return;
    const card = button.closest('.product-card');
    if (!card) return;
    addToCart(card.dataset.productId);
  }

  function openQuickview(button) {
    if (!quickviewModal || !button) return;
    const card = button.closest('.product-card');
    if (!card) return;
    currentQuickviewId = card.dataset.productId;
    const name = button.getAttribute('data-product-name');
    const price = button.getAttribute('data-product-price');
    const description = button.getAttribute('data-product-description');
    const image = button.getAttribute('data-product-image');

    if (quickviewTitle) quickviewTitle.textContent = name || 'Товар Wenxiz';
    if (quickviewPrice) quickviewPrice.textContent = price || '';
    if (quickviewDescription) quickviewDescription.textContent = description || '';
    if (quickviewImage && image) quickviewImage.src = image;

    openModal('quickview');
  }

  productList?.addEventListener('click', (event) => {
    if (event.target.closest('.product-card__wishlist')) {
      event.preventDefault();
      handleWishlistClick(event);
    } else if (event.target.closest('.product-card__add')) {
      event.preventDefault();
      handleAddToCart(event);
    } else if (event.target.closest('.product-card__quickview')) {
      event.preventDefault();
      const button = event.target.closest('.product-card__quickview');
      openQuickview(button);
    }
  });

  personalizedGrid?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add-from-personalized]');
    if (!button) return;
    const productId = button.getAttribute('data-add-from-personalized');
    addToCart(productId);
  });

  wishlistList?.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('[data-remove-wishlist]');
    if (!removeBtn) return;
    const productId = removeBtn.getAttribute('data-remove-wishlist');
    toggleWishlist(productId);
  });

  cartList?.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('[data-remove-cart]');
    if (!removeBtn) return;
    const productId = removeBtn.getAttribute('data-remove-cart');
    removeFromCart(productId);
  });

  if (quickviewAdd) {
    quickviewAdd.addEventListener('click', () => {
      if (currentQuickviewId) {
        addToCart(currentQuickviewId);
        closeModal();
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const password = String(formData.get('password') || '').trim();
      const preference = String(formData.get('preference') || 'apparel');
      const size = String(formData.get('size') || '').trim();

      if (!name || !email || password.length < 6) {
        registerForm.reportValidity();
        return;
      }

      currentUser = {
        name,
        email,
        password,
        preference,
        preferenceLabel:
          preference === 'footwear' ? 'Обувь' : preference === 'accessories' ? 'Аксессуары' : 'Одежда',
        size,
        tier: 'Silver',
        cashback: 1500,
      };

      saveUser();
      logActivity(`Создан профиль Wenxiz ID для ${name}.`);
      closeModal();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const email = String(formData.get('email') || '').trim();
      const password = String(formData.get('password') || '').trim();

      if (!currentUser || currentUser.email !== email || currentUser.password !== password) {
        loginForm.classList.add('is-invalid');
        setTimeout(() => loginForm.classList.remove('is-invalid'), 1500);
        return;
      }

      logActivity(`Выполнен вход: ${currentUser.name}.`);
      closeModal();
    });
  }

  if (newsletterForm && newsletterHint) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]');
      if (!email || !email.value) {
        email?.reportValidity();
        return;
      }
      newsletterHint.textContent = 'Спасибо! Мы добавили вас в лист раннего доступа.';
      logActivity('Подписка на новости Wenxiz активирована.');
      newsletterForm.reset();
    });
  }

  if (citySelect && storeList) {
    const stores = {
      moscow: ['Москва · Тверская, 12 — Experience Hub', 'Москва · Афимолл — Click & Collect', 'Москва · Ходынка — Flagship Store'],
      'saint-petersburg': ['Санкт-Петербург · Большая Конюшенная, 25 — Flagship', 'Санкт-Петербург · Галерея — Pick Up'],
      sochi: ['Сочи · Роза Хутор — Seasonal Hub', 'Сочи · Морской порт — Pop-up store'],
      dubai: ['Dubai Mall · Concept Boutique', 'Dubai Marina · Private Lounge'],
    };

    const updateStores = (city) => {
      const list = stores[city] || [];
      storeList.innerHTML = '';
      list.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        storeList.appendChild(li);
      });
    };

    updateStores(citySelect.value);

    citySelect.addEventListener('change', (event) => {
      updateStores(event.target.value);
      logActivity(`Выбран магазин: ${event.target.options[event.target.selectedIndex].textContent}`);
    });
  }

  document.addEventListener('click', (event) => {
    if (!body.classList.contains('search-open')) return;
    const withinSearch = event.target.closest('.site-search');
    if (!withinSearch && !event.target.closest('[data-open-quick-search]')) {
      closeSearchOverlay();
    }
  });

  updateWishlistUI();
  updateCartUI();
  updateProfileUI();
})();
