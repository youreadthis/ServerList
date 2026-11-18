const servers = [
  {
    name: "Лисья долина", game: "Minecraft", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    description: "Тихий уголок для больших приключений и уютного выживания.", tags: ["Выживание", "Дружное комьюнити", "Без вайпов"], online: 128, address: "play.foxvalley.ru", featured: true,
  },
  {
    name: "Северный порт", game: "Rust", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    description: "Собирай команду, строй базу и попробуй пережить эту неделю.", tags: ["x2", "Кланы", "Вайп по пятницам"], online: 86, address: "northport.gg", featured: true,
  },
  {
    name: "Пятый раунд", game: "CS2", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    description: "Классические карты, честные матчи и игроки на одной волне.", tags: ["5 на 5", "Без токсичности", "128 tick"], online: 42, address: "fifthround.net", featured: true,
  },
  {
    name: "Мох и камень", game: "Minecraft", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
    description: "Ванильное выживание в мире, который растёт вместе с игроками.", tags: ["Ваниль", "Строительство", "1.21"], online: 64, address: "mossstone.ru",
  },
  {
    name: "Красная черта", game: "Rust", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
    description: "Быстрый старт, активные рейды и большая карта для своих.", tags: ["x3", "Соло / дуо", "Активные рейды"], online: 37, address: "redline-rust.com",
  },
  {
    name: "Разминка", game: "CS2", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    description: "Заходи потренировать аим или остаться на ещё одну карту.", tags: ["Deathmatch", "Аим-карты", "Без рейтинга"], online: 25, address: "warmup.gg",
  },
  {
    name: "Зелёный горизонт", game: "Minecraft", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
    description: "Строй поселение, исследуй новые биомы и играй в своём темпе.", tags: ["Выживание", "Общее строительство", "1.21"], online: 53, address: "greenhorizon.ru",
  },
  {
    name: "Дикий рубеж", game: "Rust", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
    description: "Собирай ресурсы, укрепляй базу и вступай в борьбу за территорию.", tags: ["x2", "Соло / дуо / трио", "Вайп по четвергам"], online: 71, address: "wildfrontier.gg",
  },
  {
    name: "Точка прицела", game: "CS2", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    description: "Тренируй меткость на знакомых картах и играй командные матчи.", tags: ["5 на 5", "Аим-тренировка", "Без рейтинга"], online: 31, address: "aimpoint.gg",
  },
];

const defaultAccount = {
  name: "PixelFox",
  email: "player@example.com",
  owned: ["Лисья долина", "Северный порт"],
};

const statsMetrics = {
  views: { label: "Просмотры", color: "#ff6600", icon: "eye" },
  likes: { label: "Лайки", color: "#dc5465", icon: "heart" },
  transitions: { label: "Переходы", color: "#009999", icon: "mouse-pointer-2" },
};

function readAccount() {
  try {
    return { ...defaultAccount, ...JSON.parse(localStorage.getItem("servernaya-account") || "{}") };
  } catch {
    return defaultAccount;
  }
}

function readOwnedServerNames() {
  const owned = readAccount().owned;
  return Array.isArray(owned) ? owned : [];
}

function readFavorites() {
  try {
    const storedFavorites = localStorage.getItem("servernaya-favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      return Array.isArray(favorites) ? favorites : [];
    }
  } catch {
    // Continue with session storage when local storage is unavailable.
  }
  try {
    const favorites = JSON.parse(sessionStorage.getItem("servernaya-favorites") || "[]");
    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  const serializedFavorites = JSON.stringify(favorites);
  try {
    localStorage.setItem("servernaya-favorites", serializedFavorites);
  } catch {
    // Keep a session-scoped copy for browsers that restrict local storage.
  }
  try {
    sessionStorage.setItem("servernaya-favorites", serializedFavorites);
  } catch {
    return;
  }
}

function initializeTheme() {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  const getSavedTheme = () => {
    try {
      const localTheme = localStorage.getItem("servernaya-theme");
      if (localTheme) return localTheme;
    } catch {
      // Continue with session storage when local storage is unavailable.
    }
    try {
      return sessionStorage.getItem("servernaya-theme");
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem("servernaya-theme", theme);
    } catch {}
    try {
      sessionStorage.setItem("servernaya-theme", theme);
    } catch {}
  };

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить тёмную тему");
    toggle.title = isDark ? "Включить светлую тему" : "Включить тёмную тему";
    toggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;
    document.querySelector('meta[name="theme-color"]').content = isDark ? "#171c1a" : "#f5f6f2";
  };

  applyTheme(getSavedTheme() === "dark" ? "dark" : "light");
  toggle.addEventListener("click", () => {
    const theme = document.body.dataset.theme === "dark" ? "light" : "dark";
    const changeTheme = () => {
      saveTheme(theme);
      applyTheme(theme);
      if (window.lucide) window.lucide.createIcons();
    };
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(changeTheme);
    } else {
      changeTheme();
    }
  });
}

function renderServerCard(server, index) {
  const favorites = readFavorites();
  const isFavorite = favorites.includes(server.name);
  // Карточка сервера
  const card = `
    <div class="col">
    <article class="card server-card h-100" style="animation-delay:${index * 55}ms">
      <div class="server-cover">
        <img src="${server.image}" alt="Мир сервера «${server.name}»" loading="lazy">
        <span class="game-label">${server.game}</span>
        <span class="online-label d-flex align-items-center gap-2"><span class="live-dot"></span>${server.online} онлайн</span>
      </div>
      <div class="card-body server-card-body">
        <div class="server-card-title-row d-flex align-items-start justify-content-between gap-2">
          <h3>${server.name}</h3>
          <button class="btn btn-link d-inline-flex align-items-center justify-content-center favorite-button${isFavorite ? " is-favorite" : ""}" type="button" data-favorite="${server.name}" aria-label="${isFavorite ? "Убрать из избранного" : "Добавить в избранное"}" aria-pressed="${isFavorite}"><i data-lucide="heart"></i></button>
        </div>
        <p class="server-description">${server.description}</p>
        <div class="tag-row d-flex flex-wrap gap-2">${server.tags.map((tag) => `<span class="server-tag">${tag}</span>`).join("")}</div>
        <div class="server-card-meta d-flex justify-content-between gap-2"><span><i data-lucide="users-round"></i> ${server.online} игроков</span><span>${server.address}</span></div>
      </div>
    </article>
    </div>`;
  return card;
}

function renderServers(container, items) {
  if (!container) return;
  container.innerHTML = items.length
    ? items.map((server, index) => renderServerCard(server, index)).join("")
    : `<div class="empty-state"><i data-lucide="search-x"></i>${container.dataset.emptyMessage || "По этому запросу ничего не нашлось. Попробуй изменить фильтры."}</div>`;
  if (window.lucide) window.lucide.createIcons();
}

function initializeCatalog() {
  const page = document.body.dataset.page;
  const list = document.querySelector(`[data-server-list="${page === "home" ? "featured" : "catalog"}"]`);
  if (!list) return;
  if (page === "home") {
    renderServers(list, servers.filter((server) => server.featured));
    return;
  }

  const search = document.querySelector("#server-search");
  const count = document.querySelector("#result-count");
  let activeFilter = "all";
  const updateResults = () => {
    const query = search.value.trim().toLocaleLowerCase("ru");
    const results = servers.filter((server) => {
      const matchesGame = activeFilter === "all" || server.game === activeFilter;
      const searchable = [server.name, server.game, server.description, ...server.tags].join(" ").toLocaleLowerCase("ru");
      return matchesGame && searchable.includes(query);
    });
    renderServers(list, results);
    count.textContent = `${results.length} ${results.length === 1 ? "результат" : results.length > 1 && results.length < 5 ? "результата" : "результатов"}`;
  };
  search.addEventListener("input", updateResults);
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((chip) => {
        const selected = chip === button;
        chip.classList.toggle("btn-dark", selected);
        chip.classList.toggle("btn-outline-dark", !selected);
        chip.setAttribute("aria-pressed", String(selected));
      });
      updateResults();
    });
  });
  updateResults();
}

function initializeAccount() {
  const list = document.querySelector("#owned-servers");
  if (!list) return;
  const account = readAccount();
  document.querySelector("#profile-name").textContent = account.name;
  document.querySelector("#profile-email").textContent = account.email;
  document.querySelector("#profile-avatar").textContent = account.name.slice(0, 1).toLocaleUpperCase("ru");
  const ownedServerNames = readOwnedServerNames();
  const owned = servers.filter((server) => ownedServerNames.includes(server.name));
  document.querySelector("#owned-count").textContent = String(owned.length).padStart(2, "0");
  list.innerHTML = owned.length ? owned.map((server) => `
    <article class="owned-server row g-3 align-items-center mx-0">
      <div class="owned-thumb col-auto"><img src="${server.image}" alt="" loading="lazy"></div>
      <div class="owned-info col"><h3>${server.name}</h3><p>${server.game} · ${server.online} игроков онлайн</p></div>
      <span class="owned-address col-auto">${server.address}</span>
      <span class="status-pill badge rounded-0 col-auto">Активен</span>
      <a class="owned-stats-link col-auto" href="stats.html?server=${encodeURIComponent(server.name)}" aria-label="Статистика сервера «${server.name}»"><i data-lucide="chart-no-axes-column-increasing" aria-hidden="true"></i><span>Статистика</span></a>
    </article>`).join("") : '<div class="empty-state">Пока нет размещённых серверов.</div>';
  const favoritesCount = document.querySelector("#favorite-count");
  if (favoritesCount) favoritesCount.textContent = String(readFavorites().length).padStart(2, "0");
  if (window.lucide) window.lucide.createIcons();
}

function initializeFavorites() {
  const list = document.querySelector('[data-server-list="favorites"]');
  if (!list) return;
  const favorites = readFavorites();
  const favoriteServers = servers.filter((server) => favorites.includes(server.name));
  renderServers(list, favoriteServers);
  const count = document.querySelector("#favorite-result-count");
  if (count) count.textContent = `${favoriteServers.length} ${favoriteServers.length === 1 ? "сервер" : favoriteServers.length > 1 && favoriteServers.length < 5 ? "сервера" : "серверов"}`;
}

function initializeRegistration() {
  const form = document.querySelector("#register-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const existing = readAccount();
    localStorage.setItem("servernaya-account", JSON.stringify({
      ...existing,
      name: data.get("name").trim(),
      email: data.get("email").trim(),
    }));
    window.location.href = "account.html";
  });
}

function initializeStats() {
  const page = document.querySelector(".stats-page");
  if (!page) return;

  const serverName = new URLSearchParams(window.location.search).get("server");
  const server = servers.find((item) => item.name === serverName);
  if (!server || !readOwnedServerNames().includes(server.name)) {
    window.location.replace("account.html");
    return;
  }
  const dayFactors = [0.72, 0.86, 0.78, 1.03, 0.94, 1.22, 1.14];
  const today = new Date();
  const dates = dayFactors.map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (dayFactors.length - index - 1));
    return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(date);
  });
  const views = dayFactors.map((factor, index) => Math.round(server.online * (25 + index * 2) * factor));
  const history = {
    views,
    likes: views.map((value, index) => Math.round(value * (0.075 + (index % 3) * 0.008))),
    transitions: views.map((value, index) => Math.round(value * (0.19 + (index % 2) * 0.025))),
  };
  const totals = Object.fromEntries(Object.entries(history).map(([key, values]) => [key, values.reduce((sum, value) => sum + value, 0)]));

  document.querySelector("#stats-server-name").textContent = server.name;
  document.querySelector("#stats-server-crumb").textContent = server.name;
  document.querySelector("#stats-server-game").textContent = server.game;
  document.querySelector("#stats-server-image").src = server.image;
  document.querySelector("#stats-server-image").alt = `Иллюстрация сервера «${server.name}»`;
  document.querySelector("#stats-server-address").textContent = server.address;
  document.querySelector("#stats-server-online").textContent = `${server.online} игроков онлайн`;

  const formatNumber = new Intl.NumberFormat("ru-RU");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  Object.entries(statsMetrics).forEach(([key]) => {
    const counter = document.querySelector(`[data-stat-value="${key}"]`);
    const total = totals[key];
    if (reducedMotion) {
      counter.textContent = formatNumber.format(total);
      return;
    }
    const start = performance.now();
    const animateCounter = (now) => {
      const progress = Math.min((now - start) / 850, 1);
      const eased = 1 - (1 - progress) ** 3;
      counter.textContent = formatNumber.format(Math.round(total * eased));
      if (progress < 1) requestAnimationFrame(animateCounter);
    };
    requestAnimationFrame(animateCounter);
  });

  const activeKey = "views";
  const selectedMetric = statsMetrics[activeKey];
  const chart = new Chart(document.querySelector("#stats-chart"), {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: selectedMetric.label,
        data: history[activeKey],
        borderColor: selectedMetric.color,
        backgroundColor: `${selectedMetric.color}20`,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: selectedMetric.color,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.36,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: reducedMotion ? 0 : 1000, easing: "easeOutQuart" },
      interaction: { intersect: false, mode: "index" },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatNumber.format(context.parsed.y)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#78817b", font: { family: "DM Sans" } } },
        y: { beginAtZero: true, border: { display: false }, grid: { color: "#dfe3dd80" }, ticks: { color: "#78817b", precision: 0 } },
      },
    },
  });
  let chartSwitchAnimation;

  document.querySelectorAll("[data-stats-metric]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.statsMetric;
      const metric = statsMetrics[key];
      document.querySelectorAll("[data-stats-metric]").forEach((tab) => {
        const selected = tab === button;
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", String(selected));
      });
      chart.data.datasets[0].label = metric.label;
      chart.data.datasets[0].data = history[key];
      chart.data.datasets[0].borderColor = metric.color;
      chart.data.datasets[0].backgroundColor = `${metric.color}20`;
      chart.data.datasets[0].pointBackgroundColor = metric.color;
      chart.update();
      if (!reducedMotion) {
        chartSwitchAnimation?.cancel();
        chartSwitchAnimation = chart.canvas.animate(
          [{ opacity: 0.55, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 460, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
        );
      }
    });
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-favorite]");
  if (!button) return;
  const favorites = readFavorites();
  const name = button.dataset.favorite;
  const updated = favorites.includes(name) ? favorites.filter((item) => item !== name) : [...favorites, name];
  saveFavorites(updated);
  if (document.body.dataset.page === "favorites") {
    initializeFavorites();
    if (window.lucide) window.lucide.createIcons();
    return;
  }
  button.classList.toggle("is-favorite", updated.includes(name));
  button.setAttribute("aria-pressed", String(updated.includes(name)));
  button.setAttribute("aria-label", updated.includes(name) ? "Убрать из избранного" : "Добавить в избранное");
  const favoritesCount = document.querySelector("#favorite-count");
  if (favoritesCount) favoritesCount.textContent = String(updated.length).padStart(2, "0");
});

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  if (window.lucide) window.lucide.createIcons();
  initializeCatalog();
  initializeAccount();
  initializeFavorites();
  initializeRegistration();
  initializeStats();
});