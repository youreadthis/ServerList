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

function readAccount() {
  try {
    return { ...defaultAccount, ...JSON.parse(localStorage.getItem("servernaya-account") || "{}") };
  } catch {
    return defaultAccount;
  }
}

function renderServerCard(server, index) {
  const favorites = JSON.parse(localStorage.getItem("servernaya-favorites") || "[]");
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
    ? items.map(renderServerCard).join("")
    : '<div class="empty-state"><i data-lucide="search-x"></i>По этому запросу ничего не нашлось. Попробуй изменить фильтры.</div>';
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
  const owned = servers.filter((server) => account.owned.includes(server.name));
  document.querySelector("#owned-count").textContent = String(owned.length).padStart(2, "0");
  list.innerHTML = owned.length ? owned.map((server) => `
    <article class="owned-server row g-3 align-items-center mx-0">
      <div class="owned-thumb col-auto"><img src="${server.image}" alt="" loading="lazy"></div>
      <div class="owned-info col"><h3>${server.name}</h3><p>${server.game} · ${server.online} игроков онлайн</p></div>
      <span class="owned-address col-auto">${server.address}</span>
      <span class="status-pill badge rounded-0 col-auto">Активен</span>
    </article>`).join("") : '<div class="empty-state">Пока нет размещённых серверов.</div>';
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

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-favorite]");
  if (!button) return;
  const favorites = JSON.parse(localStorage.getItem("servernaya-favorites") || "[]");
  const name = button.dataset.favorite;
  const updated = favorites.includes(name) ? favorites.filter((item) => item !== name) : [...favorites, name];
  localStorage.setItem("servernaya-favorites", JSON.stringify(updated));
  button.classList.toggle("is-favorite", updated.includes(name));
  button.setAttribute("aria-pressed", String(updated.includes(name)));
  button.setAttribute("aria-label", updated.includes(name) ? "Убрать из избранного" : "Добавить в избранное");
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();
  initializeCatalog();
  initializeAccount();
  initializeRegistration();
});