const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.getElementById('primaryNav');
const body = document.body;

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.getAttribute('data-open') === 'true';
    const next = (!isOpen).toString();
    navLinks.setAttribute('data-open', next);
    navToggle.setAttribute('aria-expanded', next);
    navToggle.classList.toggle('is-open', next === 'true');
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks?.setAttribute('data-open', 'false');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.classList.remove('is-open');
    }
  });
});

const productCards = Array.from(document.querySelectorAll('.product-card'));

const catalog = productCards.map((card) => {
  const id = card.dataset.productId;
  const name = card.querySelector('h3')?.textContent.trim() ?? 'Product';
  const price = Number(card.dataset.price ?? 0);
  const image = card.querySelector('img')?.src ?? '';
  const category = card.dataset.category ?? 'all';
  return { id, name, price, image, category, element: card };
});

const cartPanel = document.querySelector('[data-cart-panel]');
const cartBody = document.querySelector('[data-cart-body]');
const cartToggleControls = document.querySelectorAll('[data-cart-toggle]');
const cartTotal = document.querySelector('[data-cart-total]');
const cartCount = document.querySelector('[data-cart-count]');
const checkoutButton = document.querySelector('[data-checkout]');
const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
const cartActivator = document.querySelector('.nav__action--icon[data-cart-toggle]');
const cartActivatorBaseLabel = cartActivator?.getAttribute('data-cart-label') ?? 'Открыть корзину';
const cartCloseButton = cartPanel?.querySelector('.cart__close');
const filterButtons = document.querySelectorAll('[data-filter]');
const favoriteButtons = document.querySelectorAll('[data-toggle-favorite]');
const searchTriggers = document.querySelectorAll('[data-open-search]');
const searchPanel = document.querySelector('[data-search-panel]');
const searchCloseControls = document.querySelectorAll('[data-close-search]');
const searchInput = document.querySelector('[data-search-input]');
const searchResults = document.querySelector('[data-search-results]');
const newsletterForm = document.querySelector('[data-newsletter]');
const accountPanel = document.querySelector('[data-account-panel]');
const accountToggleControls = document.querySelectorAll('[data-account-toggle]');
const accountCloseControls = document.querySelectorAll('[data-close-account]');
const accountForm = document.querySelector('[data-account-form]');
const accountGuest = document.querySelector('[data-account-guest]');
const accountDashboard = document.querySelector('[data-account-dashboard]');
const accountFeedback = document.querySelector('[data-account-feedback]');
const accountOrdersList = document.querySelector('[data-account-orders]');
const accountNameTargets = document.querySelectorAll('[data-account-name]');
const accountEmailTarget = document.querySelector('[data-account-email]');
const accountDiscountTarget = document.querySelector('[data-account-discount]');
const accountRegisteredTarget = document.querySelector('[data-account-registered]');
const accountLoyaltyTarget = document.querySelector('[data-account-loyalty]');
const accountLogoutButton = document.querySelector('[data-account-logout]');
const accountButtonLabel = document.querySelector('[data-account-button-label]');

if (cartPanel && !cartPanel.hasAttribute('data-open')) {
  cartPanel.setAttribute('data-open', 'false');
  cartPanel.setAttribute('aria-hidden', 'true');
}

if (searchPanel && !searchPanel.hasAttribute('data-open')) {
  searchPanel.setAttribute('data-open', 'false');
  searchPanel.setAttribute('aria-hidden', 'true');
}

if (accountPanel && !accountPanel.hasAttribute('data-open')) {
  accountPanel.setAttribute('data-open', 'false');
  accountPanel.setAttribute('aria-hidden', 'true');
}

const CART_STORAGE_KEY = 'pulse-cart-v1';
const FAV_STORAGE_KEY = 'pulse-favorites-v1';
const ACCOUNT_STORAGE_KEY = 'pulse-account-v1';

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

const loadStorage = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.warn(`Не удалось загрузить данные ${key}`, error);
    return fallback;
  }
};

const persistStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Не удалось сохранить данные ${key}`, error);
  }
};

const clearStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Не удалось очистить данные ${key}`, error);
  }
};

const cartState = loadStorage(CART_STORAGE_KEY, {});
const favoritesState = new Set(loadStorage(FAV_STORAGE_KEY, []));
const normalizeAccount = (value) => {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const {
    name = '',
    email = '',
    discountCode = 'WELCOME10',
    discountValue = 10,
    loyaltyTier = 'Pulse+ Start',
    registeredAt = new Date().toISOString(),
    orders = [],
  } = value;

  return {
    name,
    email,
    discountCode,
    discountValue,
    loyaltyTier,
    registeredAt,
    orders: Array.isArray(orders) ? orders : [],
  };
};

const orderStatusLabels = {
  delivered: 'Доставлено',
  processing: 'В обработке',
  shipped: 'Отправлено',
};

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

const createSampleOrders = () => {
  const now = new Date();
  const makeDate = (daysAgo) => {
    const clone = new Date(now);
    clone.setDate(clone.getDate() - daysAgo);
    return clone.toISOString();
  };

  return [
    {
      id: 'order-1024',
      title: 'Motion Runner',
      total: 14490,
      status: 'delivered',
      date: makeDate(3),
    },
    {
      id: 'order-986',
      title: 'Tech Shell Jacket',
      total: 19990,
      status: 'shipped',
      date: makeDate(11),
    },
    {
      id: 'order-942',
      title: 'Crossbody Flex Bag',
      total: 7990,
      status: 'processing',
      date: makeDate(24),
    },
  ];
};

let accountState = normalizeAccount(loadStorage(ACCOUNT_STORAGE_KEY, null));

const getCartEntries = () => Object.entries(cartState).filter(([, quantity]) => quantity > 0);

const formatPrice = (value) => currencyFormatter.format(Math.max(0, Math.round(value)));

const toggleBodyLock = (shouldLock) => {
  body.classList.toggle('is-locked', shouldLock);
};

const closeAccount = () => {
  if (!accountPanel) return;
  accountPanel.setAttribute('data-open', 'false');
  accountPanel.setAttribute('aria-hidden', 'true');
  accountToggleControls.forEach((control) => control.setAttribute('aria-expanded', 'false'));
  toggleBodyLock(false);
};

const syncCartBadge = () => {
  if (!cartCount) return;
  const totalItems = getCartEntries().reduce((sum, [, quantity]) => sum + quantity, 0);
  cartCount.textContent = totalItems.toString();
  cartCount.hidden = totalItems === 0;
  cartCount.setAttribute('aria-hidden', (totalItems === 0).toString());
  cartActivator?.classList.toggle('is-active', totalItems > 0);
  if (cartActivator) {
    const label = `${cartActivatorBaseLabel}, товаров: ${totalItems}`;
    cartActivator.setAttribute('aria-label', label);
  }
};

const renderCart = () => {
  if (!cartBody) return;
  const entries = getCartEntries();

  cartBody.innerHTML = '';

  if (entries.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'cart__empty';
    empty.textContent = 'Добавьте товары, чтобы увидеть их здесь.';
    cartBody.append(empty);
  } else {
    entries.forEach(([productId, quantity]) => {
      const product = catalog.find((item) => item.id === productId);
      if (!product) return;

      const item = document.createElement('article');
      item.className = 'cart-item';
      item.setAttribute('data-cart-item', productId);
      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="cart-item__info">
          <h3 class="cart-item__title">${product.name}</h3>
          <p class="cart-item__meta">${formatPrice(product.price)}</p>
        </div>
        <div class="cart-item__actions">
          <div class="quantity-control" aria-label="Количество">
            <button type="button" data-quantity="decrease" aria-label="Уменьшить количество">−</button>
            <span>${quantity}</span>
            <button type="button" data-quantity="increase" aria-label="Увеличить количество">+</button>
          </div>
          <button class="cart-item__remove" type="button" data-remove>Удалить</button>
        </div>
      `;
      cartBody.append(item);
    });
  }

  const total = entries.reduce((sum, [productId, quantity]) => {
    const product = catalog.find((item) => item.id === productId);
    if (!product) return sum;
    return sum + product.price * quantity;
  }, 0);

  if (cartTotal) {
    cartTotal.textContent = formatPrice(total);
  }

  if (checkoutButton) {
    const hasItems = entries.length > 0;
    checkoutButton.disabled = !hasItems;
    checkoutButton.textContent = hasItems ? 'Перейти к оформлению' : 'Оформить заказ';
  }

  productCards.forEach((card) => {
    const button = card.querySelector('[data-add-to-cart]');
    const productId = card.dataset.productId;
    const quantity = productId ? cartState[productId] ?? 0 : 0;
    if (button) {
      const inCart = quantity > 0;
      button.textContent = inCart ? 'В корзине' : 'Добавить';
      button.classList.toggle('is-added', inCart);
    }
  });

  syncCartBadge();
};

const sanitizeCart = () => {
  Object.keys(cartState).forEach((key) => {
    if (!cartState[key]) {
      delete cartState[key];
    }
  });
};

const persistCart = () => {
  sanitizeCart();
  persistStorage(CART_STORAGE_KEY, cartState);
};

const persistFavorites = () => {
  persistStorage(FAV_STORAGE_KEY, Array.from(favoritesState));
};

const persistAccount = () => {
  if (accountState) {
    persistStorage(ACCOUNT_STORAGE_KEY, accountState);
  } else {
    clearStorage(ACCOUNT_STORAGE_KEY);
  }
};

const setAccountFeedback = (state, message) => {
  if (!accountFeedback) return;
  accountFeedback.textContent = message ?? '';
  if (state) {
    accountFeedback.dataset.state = state;
  } else {
    delete accountFeedback.dataset.state;
  }
};

const syncAccountUI = () => {
  const hasAccount = Boolean(accountState);

  if (accountButtonLabel) {
    const labelName = hasAccount && accountState?.name ? accountState.name.trim().split(' ')[0] : '';
    accountButtonLabel.textContent = labelName || 'Войти';
  }

  if (accountGuest) {
    accountGuest.hidden = hasAccount;
  }

  if (accountDashboard) {
    accountDashboard.hidden = !hasAccount;
  }

  if (!hasAccount) {
    if (accountOrdersList) {
      accountOrdersList.innerHTML = '';
    }
    return;
  }

  const { name, email, discountCode, discountValue, loyaltyTier, registeredAt } = accountState;

  accountNameTargets.forEach((target) => {
    if (target) {
      target.textContent = name;
    }
  });

  if (accountEmailTarget) {
    accountEmailTarget.textContent = email;
  }

  if (accountDiscountTarget) {
    const discountText = discountCode ? `${discountCode} · ${discountValue}%` : `${discountValue}%`;
    accountDiscountTarget.textContent = discountText;
  }

  if (accountRegisteredTarget) {
    accountRegisteredTarget.textContent = formatDate(registeredAt);
  }

  if (accountLoyaltyTarget) {
    accountLoyaltyTarget.textContent = loyaltyTier;
  }

  if (accountOrdersList) {
    accountOrdersList.innerHTML = '';
    const orders = Array.isArray(accountState.orders) ? accountState.orders.slice(0, 3) : [];

    if (orders.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'order-list__empty';
      empty.textContent = 'Здесь появятся ваши последние заказы.';
      accountOrdersList.append(empty);
    } else {
      orders.forEach((order) => {
        const item = document.createElement('li');
        item.className = 'order-list__item';
        item.innerHTML = `
          <div>
            <strong>${order.title}</strong>
            <span>${formatDate(order.date)} · ${orderStatusLabels[order.status] ?? order.status}</span>
          </div>
          <strong>${formatPrice(order.total)}</strong>
        `;
        accountOrdersList.append(item);
      });
    }
  }
};

const updateFavoriteButtons = () => {
  favoriteButtons.forEach((button) => {
    const card = button.closest('.product-card');
    const productId = card?.dataset.productId;
    const isFavorite = productId ? favoritesState.has(productId) : false;
    button.setAttribute('aria-pressed', isFavorite.toString());
    card?.classList.toggle('is-favorite', isFavorite);
  });
};

const addToCart = (productId, quantity = 1) => {
  if (!productId) return;
  const product = catalog.find((item) => item.id === productId);
  if (!product) return;
  const current = cartState[productId] ?? 0;
  cartState[productId] = current + quantity;
  persistCart();
  renderCart();
};

const openCart = () => {
  if (!cartPanel) return;
  closeAccount();
  closeSearch();
  cartPanel.setAttribute('data-open', 'true');
  cartPanel.setAttribute('aria-hidden', 'false');
  toggleBodyLock(true);
  cartToggleControls.forEach((control) => control.setAttribute('aria-expanded', 'true'));
  window.setTimeout(() => {
    cartCloseButton?.focus();
  }, 120);
};

const closeCart = () => {
  if (!cartPanel) return;
  cartPanel.setAttribute('data-open', 'false');
  cartPanel.setAttribute('aria-hidden', 'true');
  toggleBodyLock(false);
  cartToggleControls.forEach((control) => control.setAttribute('aria-expanded', 'false'));
};

cartToggleControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = cartPanel?.getAttribute('data-open') === 'true';
    if (isOpen) {
      closeCart();
    } else {
      openCart();
    }
  });
});

if (cartBody) {
  cartBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const item = target.closest('[data-cart-item]');
    if (!item) return;
    const productId = item.getAttribute('data-cart-item');
    if (!productId) return;

    if (target.matches('[data-quantity="increase"]')) {
      cartState[productId] = (cartState[productId] ?? 0) + 1;
    } else if (target.matches('[data-quantity="decrease"]')) {
      cartState[productId] = Math.max(0, (cartState[productId] ?? 0) - 1);
      if (cartState[productId] === 0) {
        delete cartState[productId];
      }
    } else if (target.matches('[data-remove]')) {
      delete cartState[productId];
    } else {
      return;
    }

    persistCart();
    renderCart();
  });
}

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const productId = card?.dataset.productId;
    addToCart(productId);
    button.blur();
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    filterButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn === button);
      btn.setAttribute('aria-selected', (btn === button).toString());
    });

    productCards.forEach((card) => {
      if (!filter || filter === 'all') {
        card.hidden = false;
        return;
      }
      const category = card.dataset.category;
      card.hidden = category !== filter;
    });
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const productId = card?.dataset.productId;
    if (!productId) return;
    if (favoritesState.has(productId)) {
      favoritesState.delete(productId);
    } else {
      favoritesState.add(productId);
    }
    persistFavorites();
    updateFavoriteButtons();
  });
});

const openSearch = () => {
  if (!searchPanel) return;
  closeAccount();
  closeCart();
  searchPanel.setAttribute('data-open', 'true');
  searchPanel.setAttribute('aria-hidden', 'false');
  toggleBodyLock(true);
  window.setTimeout(() => searchInput?.focus(), 100);
};

const closeSearch = () => {
  if (!searchPanel) return;
  searchPanel.setAttribute('data-open', 'false');
  searchPanel.setAttribute('aria-hidden', 'true');
  toggleBodyLock(false);
  if (searchInput) {
    searchInput.value = '';
  }
  if (searchResults) {
    searchResults.innerHTML = '<p class="search__hint">Начните печатать, чтобы увидеть товары.</p>';
  }
};

const focusAccountPanel = () => {
  if (!accountPanel) return;
  const target = accountState
    ? accountLogoutButton || accountPanel.querySelector('[data-account-dashboard] a, [data-account-dashboard] button')
    : accountForm?.querySelector('input');

  if (target instanceof HTMLElement) {
    target.focus();
  }
};

const openAccount = () => {
  if (!accountPanel) return;
  closeCart();
  closeSearch();
  accountPanel.setAttribute('data-open', 'true');
  accountPanel.setAttribute('aria-hidden', 'false');
  accountToggleControls.forEach((control) => control.setAttribute('aria-expanded', 'true'));
  toggleBodyLock(true);
  window.setTimeout(() => focusAccountPanel(), 120);
};

searchTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openSearch();
  });
});

searchCloseControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    closeSearch();
  });
});

if (searchPanel) {
  searchPanel.addEventListener('click', (event) => {
    if (event.target === searchPanel) {
      closeSearch();
    }
  });
}

accountToggleControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = accountPanel?.getAttribute('data-open') === 'true';
    if (isOpen) {
      closeAccount();
    } else {
      if (!accountState) {
        setAccountFeedback(null, '');
      }
      openAccount();
    }
  });
});

accountCloseControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    closeAccount();
  });
});

accountForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!(event.target instanceof HTMLFormElement)) return;
  const formData = new FormData(event.target);
  const rawName = String(formData.get('name') ?? '');
  const rawEmail = String(formData.get('email') ?? '');
  const rawPassword = String(formData.get('password') ?? '');

  const name = rawName.replace(/\s+/g, ' ').trim();
  const email = rawEmail.trim().toLowerCase();
  const password = rawPassword.trim();

  if (!name || !email || !password) {
    setAccountFeedback('error', 'Заполните все поля, чтобы продолжить.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setAccountFeedback('error', 'Введите корректный email.');
    return;
  }

  if (password.length < 6) {
    setAccountFeedback('error', 'Пароль должен содержать минимум 6 символов.');
    return;
  }

  accountState = {
    name,
    email,
    discountCode: 'WELCOME10',
    discountValue: 10,
    loyaltyTier: 'Pulse+ Start',
    registeredAt: new Date().toISOString(),
    orders: createSampleOrders(),
  };

  persistAccount();
  syncAccountUI();
  setAccountFeedback(null, '');
  event.target.reset();
  window.setTimeout(() => focusAccountPanel(), 160);
});

accountLogoutButton?.addEventListener('click', () => {
  accountState = null;
  persistAccount();
  syncAccountUI();
  setAccountFeedback('success', 'Вы вышли из профиля. Возвращайтесь!');
  window.setTimeout(() => focusAccountPanel(), 160);
});

const renderSearchResults = (query) => {
  if (!searchResults) return;
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    searchResults.innerHTML = '<p class="search__hint">Начните печатать, чтобы увидеть товары.</p>';
    return;
  }

  const matches = catalog.filter((product) => product.name.toLowerCase().includes(normalized));

  if (matches.length === 0) {
    searchResults.innerHTML = '<p class="search__hint">Товары не найдены. Попробуйте другой запрос.</p>';
    return;
  }

  searchResults.innerHTML = '';

  matches.forEach((product) => {
    const row = document.createElement('div');
    row.className = 'search-result';
    row.setAttribute('data-result-id', product.id);
    row.innerHTML = `
      <div>
        <strong>${product.name}</strong>
        <span>${formatPrice(product.price)}</span>
      </div>
      <button class="search-result__action" type="button" data-add-from-search>Добавить</button>
    `;
    searchResults.append(row);
  });
};

searchInput?.addEventListener('input', (event) => {
  const value = (event.target instanceof HTMLInputElement ? event.target.value : '') ?? '';
  renderSearchResults(value);
});

searchResults?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (!target.matches('[data-add-from-search]')) return;
  const parent = target.closest('[data-result-id]');
  const productId = parent?.getAttribute('data-result-id');
  addToCart(productId);
  target.textContent = 'В корзине';
  target.disabled = true;
  setTimeout(() => {
    target.disabled = false;
    const quantity = productId ? cartState[productId] ?? 0 : 0;
    target.textContent = quantity > 0 ? 'В корзине' : 'Добавить';
  }, 1500);
  openCart();
});

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  const emailInput = form.querySelector('input[name="email"]');
  if (!(emailInput instanceof HTMLInputElement)) return;
  const email = emailInput.value.trim();
  if (!email) return;

  emailInput.disabled = true;
  const button = form.querySelector('button[type="submit"]');
  if (button instanceof HTMLButtonElement) {
    button.disabled = true;
    button.textContent = 'Готово';
  }

  const existingMessage = form.parentElement?.querySelector('.newsletter-success');
  if (existingMessage) {
    existingMessage.remove();
  }

  const confirmation = document.createElement('p');
  confirmation.className = 'newsletter-success';
  confirmation.textContent = 'Спасибо! Мы уже отправили вам письмо с подтверждением.';
  form.after(confirmation);

  setTimeout(() => {
    emailInput.value = '';
    emailInput.disabled = false;
    if (button instanceof HTMLButtonElement) {
      button.disabled = false;
      button.textContent = 'Подписаться';
    }
  }, 2000);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (cartPanel?.getAttribute('data-open') === 'true') {
      closeCart();
    }
    if (searchPanel?.getAttribute('data-open') === 'true') {
      closeSearch();
    }
    if (accountPanel?.getAttribute('data-open') === 'true') {
      closeAccount();
    }
  }
});

renderCart();
updateFavoriteButtons();
syncAccountUI();
