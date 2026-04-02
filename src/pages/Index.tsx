import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "catalog" | "constructor" | "cart" | "about" | "delivery" | "contacts" | "reviews" | "account";

const HERO_IMG = "https://cdn.poehali.dev/projects/cf63e53f-9bbd-4994-8d75-abc1733f32fa/files/b1fde4d4-89b5-4ca0-acc4-6bce888ab330.jpg";

const products = [
  { id: 1, name: "Минимализм", model: "iPhone 15 Pro", price: 1490, tag: "Хит", color: "#1a1a2e" },
  { id: 2, name: "Geometric", model: "Samsung S24", price: 1290, tag: "Новинка", color: "#16213e" },
  { id: 3, name: "Carbon Elite", model: "iPhone 15", price: 1690, tag: "Премиум", color: "#0f3460" },
  { id: 4, name: "Midnight", model: "Xiaomi 14", price: 990, tag: "", color: "#1a1a2e" },
  { id: 5, name: "Slate Pro", model: "iPhone 14 Pro", price: 1390, tag: "", color: "#16213e" },
  { id: 6, name: "Obsidian", model: "Google Pixel 8", price: 1190, tag: "Хит", color: "#0d1117" },
];

const reviews = [
  { id: 1, name: "Александр П.", rating: 5, text: "Качество превосходное. Чехол плотно сидит, материал приятный. Заказывал уже третий раз.", date: "15 марта 2026" },
  { id: 2, name: "Мария К.", rating: 5, text: "Конструктор — просто находка. Сделала свой дизайн за 10 минут, доставили быстро.", date: "2 марта 2026" },
  { id: 3, name: "Денис В.", rating: 4, text: "Хороший магазин, широкий выбор. Буду заказывать ещё.", date: "20 февраля 2026" },
  { id: 4, name: "Светлана М.", rating: 5, text: "Подарила мужу чехол с его фото — был в восторге. Спасибо за качество!", date: "10 февраля 2026" },
];

const savedDesigns = [
  { id: 1, name: "Мой дизайн #1", model: "iPhone 15 Pro", date: "28 марта 2026", color: "#c9972a" },
  { id: 2, name: "Подарок другу", model: "Samsung S24", date: "15 марта 2026", color: "#3a6ea5" },
];

const designColors = ["#1a1a2e", "#16213e", "#0f3460", "#2d4a22", "#4a1942", "#3b1f0a", "#c9972a", "#e8e8e8"];
const designPatterns = ["Однотонный", "Полосы", "Клетка", "Точки", "Диагональ", "Соты"];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<typeof products>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#1a1a2e");
  const [selectedPattern, setSelectedPattern] = useState("Однотонный");
  const [selectedModel, setSelectedModel] = useState("iPhone 15 Pro");
  const [designText, setDesignText] = useState("");
  const [userDesigns, setUserDesigns] = useState(savedDesigns);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };

  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0);

  const saveDesign = () => {
    const newDesign = {
      id: userDesigns.length + 1,
      name: designText || `Мой дизайн #${userDesigns.length + 1}`,
      model: selectedModel,
      date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      color: selectedColor,
    };
    setUserDesigns(prev => [...prev, newDesign]);
    alert("Дизайн сохранён в личный кабинет!");
  };

  const navItems: { key: Page; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "catalog", label: "Каталог" },
    { key: "constructor", label: "Конструктор" },
    { key: "about", label: "О компании" },
    { key: "delivery", label: "Доставка" },
    { key: "reviews", label: "Отзывы" },
    { key: "contacts", label: "Контакты" },
  ];

  const navigate = (p: Page) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center bg-primary">
              <span className="text-primary-foreground font-display font-bold text-sm">CS</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              Case<span className="text-primary">Studio</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className={`nav-link text-sm font-medium tracking-wide ${page === item.key ? "text-primary active" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate("cart")} className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ShoppingBag" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => navigate("account")} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="User" size={20} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <div className="px-6 py-4 flex flex-col gap-3">
              {navItems.map(item => (
                <button key={item.key} onClick={() => navigate(item.key)} className={`text-left text-sm py-2 border-b border-border last:border-0 ${page === item.key ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* ===== HOME ===== */}
        {page === "home" && (
          <div>
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden grid-bg">
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
              <img src={HERO_IMG} alt="CaseStudio" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="relative z-20 max-w-7xl mx-auto px-6 py-24">
                <p className="tag mb-4 animate-fade-in-up stagger-1 opacity-0">Премиальные чехлы для телефонов</p>
                <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 animate-fade-in-up stagger-2 opacity-0">
                  Защита.<br />
                  <span className="gold-gradient">Стиль.</span><br />
                  Личность.
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed animate-fade-in-up stagger-3 opacity-0">
                  Более 500 моделей чехлов. Создайте собственный дизайн или выберите из готовой коллекции.
                </p>
                <div className="flex gap-4 flex-wrap animate-fade-in-up stagger-4 opacity-0">
                  <button onClick={() => navigate("catalog")} className="btn-gold px-8 py-3 rounded text-sm">
                    Смотреть каталог
                  </button>
                  <button onClick={() => navigate("constructor")} className="btn-outline-gold px-8 py-3 rounded text-sm">
                    Создать дизайн
                  </button>
                </div>
                <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm animate-fade-in-up stagger-5 opacity-0">
                  {[["500+", "Моделей"], ["15К+", "Клиентов"], ["4.9", "Рейтинг"]].map(([val, label]) => (
                    <div key={label}>
                      <div className="font-display text-2xl font-bold text-primary">{val}</div>
                      <div className="text-muted-foreground text-xs mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="py-20 section-divider">
              <div className="max-w-7xl mx-auto px-6">
                <p className="tag mb-3 text-center">Почему CaseStudio</p>
                <h2 className="font-display text-3xl font-bold text-center mb-12">Качество в каждой детали</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { icon: "Shield", title: "Надёжная защита", desc: "Материалы военного класса, прошедшие тестирование на ударостойкость" },
                    { icon: "Palette", title: "Свой дизайн", desc: "Конструктор позволяет создать уникальный чехол за несколько минут" },
                    { icon: "Truck", title: "Быстрая доставка", desc: "Курьером по всей России от 1 до 3 рабочих дней" },
                    { icon: "RotateCcw", title: "Гарантия возврата", desc: "30 дней на возврат или обмен без лишних вопросов" },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="bg-card border border-border rounded-lg p-6 card-hover">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                        <Icon name={icon as "Shield"} size={20} className="text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-sm mb-2">{title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Popular */}
            <section className="py-20 section-divider">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <p className="tag mb-2">Коллекция</p>
                    <h2 className="font-display text-3xl font-bold">Популярные модели</h2>
                  </div>
                  <button onClick={() => navigate("catalog")} className="btn-outline-gold px-5 py-2 rounded text-xs hidden md:flex items-center gap-2">
                    Весь каталог <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.slice(0, 3).map(p => (
                    <div key={p.id} className="bg-card border border-border rounded-lg overflow-hidden card-hover">
                      <div className="h-48 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.color}ee 0%, ${p.color}88 100%)` }}>
                        <div className="w-20 h-36 rounded-2xl border-2 border-white/20 shadow-2xl flex items-center justify-center" style={{ backgroundColor: p.color }}>
                          <div className="w-14 h-28 rounded-xl border border-white/10 flex items-center justify-center">
                            <Icon name="Smartphone" size={24} className="text-white/30" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display font-semibold text-sm">{p.name}</h3>
                          {p.tag && <span className="tag text-[10px]">{p.tag}</span>}
                        </div>
                        <p className="text-muted-foreground text-xs mb-4">{p.model}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-display font-bold text-primary">{p.price.toLocaleString()} ₽</span>
                          <button onClick={() => addToCart(p)} className="btn-gold px-4 py-2 rounded text-xs">В корзину</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-24 section-divider relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative max-w-3xl mx-auto px-6 text-center">
                <p className="tag mb-3">Конструктор дизайнов</p>
                <h2 className="font-display text-4xl font-bold mb-4">Создайте чехол своей мечты</h2>
                <p className="text-muted-foreground mb-8">Загрузите фото, выберите цвет, добавьте текст — и ваш уникальный чехол готов к заказу.</p>
                <button onClick={() => navigate("constructor")} className="btn-gold px-10 py-4 rounded text-sm">
                  Открыть конструктор
                </button>
              </div>
            </section>

            {/* Reviews preview */}
            <section className="py-20 section-divider">
              <div className="max-w-7xl mx-auto px-6">
                <p className="tag mb-2 text-center">Отзывы</p>
                <h2 className="font-display text-3xl font-bold text-center mb-10">Нам доверяют</h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {reviews.slice(0, 2).map(r => (
                    <div key={r.id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: r.rating }).map((_, i) => <span key={i} className="text-primary text-sm">★</span>)}
                      </div>
                      <p className="text-sm leading-relaxed mb-4 text-foreground/80">"{r.text}"</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="font-semibold">{r.name}</span>
                        <span>{r.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <button onClick={() => navigate("reviews")} className="btn-outline-gold px-6 py-2.5 rounded text-xs">
                    Все отзывы
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== CATALOG ===== */}
        {page === "catalog" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <p className="tag mb-2">Ассортимент</p>
            <h1 className="font-display text-4xl font-bold mb-2">Каталог чехлов</h1>
            <p className="text-muted-foreground mb-10">Выберите модель для вашего устройства</p>

            <div className="flex gap-3 flex-wrap mb-8">
              {["Все модели", "iPhone", "Samsung", "Xiaomi", "Google Pixel"].map(f => (
                <button key={f} className={`px-4 py-2 rounded border text-xs font-display font-medium transition-all ${f === "Все модели" ? "btn-gold border-transparent" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                  {f}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map(p => (
                <div key={p.id} className="bg-card border border-border rounded-lg overflow-hidden card-hover">
                  <div className="h-52 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.color}ee 0%, ${p.color}77 100%)` }}>
                    <div className="w-20 h-36 rounded-2xl border-2 border-white/20 shadow-2xl" style={{ backgroundColor: p.color }}>
                      <div className="w-full h-full rounded-2xl border border-white/10 flex items-center justify-center">
                        <Icon name="Smartphone" size={24} className="text-white/30" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-display font-semibold text-sm">{p.name}</h3>
                      {p.tag && <span className="tag text-[10px]">{p.tag}</span>}
                    </div>
                    <p className="text-muted-foreground text-xs mb-4">{p.model}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-primary">{p.price.toLocaleString()} ₽</span>
                      <button onClick={() => addToCart(p)} className="btn-gold px-4 py-2 rounded text-xs">В корзину</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== CONSTRUCTOR ===== */}
        {page === "constructor" && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <p className="tag mb-2">Персонализация</p>
            <h1 className="font-display text-4xl font-bold mb-2">Конструктор дизайна</h1>
            <p className="text-muted-foreground mb-10">Создайте уникальный чехол и сохраните дизайн в личном кабинете</p>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Preview */}
              <div className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center min-h-[480px]">
                <p className="tag mb-6">Предпросмотр</p>
                <div className="relative">
                  <div
                    className="w-32 h-56 rounded-3xl border-4 border-white/20 shadow-2xl flex items-center justify-center transition-all duration-500"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <div className="w-24 h-48 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 overflow-hidden p-3 relative">
                      {selectedPattern === "Полосы" && (
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 2px, transparent 2px, transparent 12px)" }} />
                      )}
                      {selectedPattern === "Клетка" && (
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 20px)" }} />
                      )}
                      {selectedPattern === "Точки" && (
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }} />
                      )}
                      {designText && (
                        <span className="text-white/90 text-[9px] text-center font-bold break-all leading-tight z-10 px-1">
                          {designText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-6">{selectedModel}</p>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <label className="tag block mb-3">Модель телефона</label>
                  <select
                    value={selectedModel}
                    onChange={e => setSelectedModel(e.target.value)}
                    className="w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    {["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "Samsung S24", "Samsung S23", "Xiaomi 14", "Google Pixel 8"].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="tag block mb-3">Цвет чехла</label>
                  <div className="flex gap-3 flex-wrap">
                    {designColors.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className="w-9 h-9 rounded-full border-2 transition-all"
                        style={{
                          backgroundColor: c,
                          borderColor: selectedColor === c ? "hsl(42, 85%, 52%)" : "hsl(220, 12%, 25%)",
                          transform: selectedColor === c ? "scale(1.15)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="tag block mb-3">Паттерн</label>
                  <div className="grid grid-cols-3 gap-2">
                    {designPatterns.map(pattern => (
                      <button
                        key={pattern}
                        onClick={() => setSelectedPattern(pattern)}
                        className={`py-2.5 px-3 rounded border text-xs font-display font-medium transition-all ${selectedPattern === pattern ? "btn-gold border-transparent" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
                      >
                        {pattern}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="tag block mb-3">Текст на чехле</label>
                  <input
                    type="text"
                    value={designText}
                    onChange={e => setDesignText(e.target.value)}
                    placeholder="Ваш текст (до 20 символов)"
                    maxLength={20}
                    className="w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={saveDesign} className="btn-outline-gold flex-1 py-3 rounded text-xs flex items-center justify-center gap-2">
                    <Icon name="Save" size={14} /> Сохранить дизайн
                  </button>
                  <button
                    onClick={() => addToCart({ id: 99, name: "Мой дизайн", model: selectedModel, price: 1890, tag: "Custom", color: selectedColor })}
                    className="btn-gold flex-1 py-3 rounded text-xs"
                  >
                    Заказать — 1 890 ₽
                  </button>
                </div>

                {!isLoggedIn && (
                  <p className="text-muted-foreground text-xs border border-border rounded p-3">
                    <Icon name="Info" size={12} className="inline mr-1" />
                    Войдите в{" "}
                    <button onClick={() => navigate("account")} className="text-primary underline">личный кабинет</button>
                    , чтобы сохранять дизайны
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== CART ===== */}
        {page === "cart" && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <p className="tag mb-2">Оформление</p>
            <h1 className="font-display text-4xl font-bold mb-8">Корзина</h1>

            {cart.length === 0 ? (
              <div className="text-center py-24">
                <Icon name="ShoppingBag" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-6">Корзина пуста</p>
                <button onClick={() => navigate("catalog")} className="btn-gold px-8 py-3 rounded text-sm">
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-lg p-5 flex items-center gap-5">
                      <div className="w-12 h-20 rounded-xl flex-shrink-0" style={{ backgroundColor: item.color || "#1a1a2e" }} />
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-sm">{item.name}</h3>
                        <p className="text-muted-foreground text-xs">{item.model}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-primary">{item.price.toLocaleString()} ₽</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive text-xs mt-1 transition-colors">
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-card border border-border rounded-lg p-6 h-fit">
                  <h3 className="font-display font-semibold mb-4">Итого</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Товары ({cart.length})</span>
                      <span>{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Доставка</span>
                      <span className="text-primary">Бесплатно</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4 mb-5">
                    <div className="flex justify-between font-display font-bold">
                      <span>Итого</span>
                      <span className="text-primary">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                  </div>
                  <button className="btn-gold w-full py-3 rounded text-sm">Оформить заказ</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== ACCOUNT ===== */}
        {page === "account" && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <p className="tag mb-2">Профиль</p>
            <h1 className="font-display text-4xl font-bold mb-8">Личный кабинет</h1>

            {!isLoggedIn ? (
              <div className="max-w-md">
                <div className="bg-card border border-border rounded-lg p-8">
                  <h2 className="font-display font-semibold text-lg mb-6">Войти в аккаунт</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="tag block mb-2">Email</label>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="tag block mb-2">Пароль</label>
                      <input
                        type="password"
                        value={loginPass}
                        onChange={e => setLoginPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <button onClick={() => setIsLoggedIn(true)} className="btn-gold w-full py-3 rounded text-sm">
                      Войти
                    </button>
                    <button className="btn-outline-gold w-full py-3 rounded text-sm">
                      Зарегистрироваться
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center gap-5 flex-wrap">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                    <Icon name="User" size={28} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl">{loginEmail || "user@example.com"}</h2>
                    <p className="text-muted-foreground text-sm">Постоянный клиент</p>
                  </div>
                  <button onClick={() => setIsLoggedIn(false)} className="ml-auto btn-outline-gold px-4 py-2 rounded text-xs">
                    Выйти
                  </button>
                </div>

                <div>
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Palette" size={16} className="text-primary" />
                    Мои дизайны
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {userDesigns.map(d => (
                      <div key={d.id} className="bg-card border border-border rounded-lg p-5 card-hover flex items-center gap-4">
                        <div className="w-10 h-16 rounded-lg flex-shrink-0" style={{ backgroundColor: d.color }} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-semibold text-sm truncate">{d.name}</h4>
                          <p className="text-muted-foreground text-xs">{d.model}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">{d.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => navigate("constructor")} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                            <Icon name="Edit2" size={14} />
                          </button>
                          <button onClick={() => addToCart({ id: d.id + 100, name: d.name, model: d.model, price: 1890, tag: "Custom", color: d.color })} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                            <Icon name="ShoppingBag" size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => navigate("constructor")} className="border border-dashed border-border rounded-lg p-5 flex items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary transition-all text-sm font-display font-medium">
                      <Icon name="Plus" size={16} />
                      Новый дизайн
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Package" size={16} className="text-primary" />
                    История заказов
                  </h3>
                  <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <p className="text-muted-foreground text-sm">Заказов пока нет</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {page === "about" && (
          <div className="max-w-5xl mx-auto px-6 py-12">
            <p className="tag mb-2">Наша история</p>
            <h1 className="font-display text-4xl font-bold mb-6">О компании CaseStudio</h1>
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  CaseStudio — российский производитель премиальных чехлов для смартфонов. Основана в 2018 году командой дизайнеров и инженеров с общей целью: создавать чехлы, которые защищают и выражают личность владельца.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы работаем с прямыми поставщиками материалов и контролируем каждый этап производства. Все чехлы проходят тестирование на ударостойкость и долговечность перед отправкой клиенту.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Наш конструктор дизайнов позволяет создавать уникальные чехлы, отражающие вашу индивидуальность — от минималистичных однотонных вариантов до сложных персонализированных изображений.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "2018", label: "Год основания" },
                  { val: "500+", label: "Моделей в каталоге" },
                  { val: "15 000+", label: "Довольных клиентов" },
                  { val: "48 ч", label: "Среднее время доставки" },
                ].map(({ val, label }) => (
                  <div key={label} className="bg-card border border-border rounded-lg p-6">
                    <div className="font-display text-3xl font-bold text-primary mb-1">{val}</div>
                    <div className="text-muted-foreground text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="section-divider pt-12">
              <p className="tag mb-4">Команда</p>
              <h2 className="font-display text-2xl font-bold mb-8">Люди за брендом</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { name: "Алексей Громов", role: "Основатель и CEO", initials: "АГ" },
                  { name: "Екатерина Соколова", role: "Главный дизайнер", initials: "ЕС" },
                  { name: "Михаил Петров", role: "Руководитель производства", initials: "МП" },
                ].map(({ name, role, initials }) => (
                  <div key={name} className="bg-card border border-border rounded-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                      <span className="font-display font-bold text-primary">{initials}</span>
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-1">{name}</h3>
                    <p className="text-muted-foreground text-xs">{role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== DELIVERY ===== */}
        {page === "delivery" && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <p className="tag mb-2">Логистика</p>
            <h1 className="font-display text-4xl font-bold mb-8">Доставка и оплата</h1>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card border border-border rounded-lg p-7">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Truck" size={20} className="text-primary" />
                </div>
                <h2 className="font-display font-bold text-lg mb-4">Способы доставки</h2>
                <div className="space-y-3">
                  {[
                    { label: "Курьер по Москве", detail: "1–2 дня / 250 ₽ (бесплатно от 3 000 ₽)" },
                    { label: "Курьер по России", detail: "3–5 дней / 350 ₽ (бесплатно от 5 000 ₽)" },
                    { label: "Пункты СДЭК", detail: "2–4 дня / 200 ₽" },
                    { label: "Почта России", detail: "5–14 дней / 150 ₽" },
                  ].map(({ label, detail }) => (
                    <div key={label} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                      <Icon name="CheckCircle" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-display font-semibold text-sm">{label}</p>
                        <p className="text-muted-foreground text-xs">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-7">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="CreditCard" size={20} className="text-primary" />
                </div>
                <h2 className="font-display font-bold text-lg mb-4">Способы оплаты</h2>
                <div className="space-y-3">
                  {[
                    { label: "Карта онлайн", detail: "Visa, Mastercard, МИР" },
                    { label: "SberPay / СБП", detail: "Быстрая оплата по QR" },
                    { label: "Наложенный платёж", detail: "Оплата при получении" },
                    { label: "Счёт для юридических лиц", detail: "По запросу" },
                  ].map(({ label, detail }) => (
                    <div key={label} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                      <Icon name="CheckCircle" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-display font-semibold text-sm">{label}</p>
                        <p className="text-muted-foreground text-xs">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
                <Icon name="RotateCcw" size={16} className="text-primary" />
                Возврат и обмен
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Принимаем возврат в течение 30 дней с момента получения. Персонализированные чехлы обмену не подлежат, за исключением производственного брака. Для оформления возврата свяжитесь с нами по e-mail.
              </p>
            </div>
          </div>
        )}

        {/* ===== REVIEWS ===== */}
        {page === "reviews" && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <p className="tag mb-2">Клиенты о нас</p>
            <h1 className="font-display text-4xl font-bold mb-2">Отзывы</h1>
            <div className="flex items-center gap-3 mb-10">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-primary text-lg">★</span>)}</div>
              <span className="font-display font-bold text-xl text-primary">4.9</span>
              <span className="text-muted-foreground text-sm">из 5 на основе 847 отзывов</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {reviews.map(r => (
                <div key={r.id} className="bg-card border border-border rounded-lg p-6 card-hover">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => <span key={i} className="text-primary text-sm">★</span>)}
                  </div>
                  <p className="text-sm leading-relaxed mb-4 text-foreground/80">"{r.text}"</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="font-semibold">{r.name}</span>
                    <span>{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-lg p-7">
              <h3 className="font-display font-semibold mb-4">Оставить отзыв</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button key={i} className="text-2xl text-muted-foreground hover:text-primary transition-colors">★</button>
                  ))}
                </div>
                <textarea
                  placeholder="Поделитесь впечатлениями о товаре и сервисе..."
                  rows={4}
                  className="w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                />
                <button className="btn-gold px-8 py-3 rounded text-sm">Отправить отзыв</button>
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {page === "contacts" && (
          <div className="max-w-5xl mx-auto px-6 py-12">
            <p className="tag mb-2">Связь</p>
            <h1 className="font-display text-4xl font-bold mb-8">Контакты</h1>
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                {[
                  { icon: "MapPin", title: "Адрес", lines: ["125009, Москва", "ул. Тверская, 12, офис 304"] },
                  { icon: "Phone", title: "Телефон", lines: ["+7 (495) 123-45-67", "Пн–Пт: 9:00–19:00"] },
                  { icon: "Mail", title: "Email", lines: ["hello@casestudio.ru", "Ответим в течение 2 часов"] },
                  { icon: "MessageCircle", title: "Мессенджеры", lines: ["Telegram: @casestudio", "WhatsApp: +7 (495) 123-45-67"] },
                ].map(({ icon, title, lines }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={icon as "MapPin"} size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm mb-1">{title}</p>
                      {lines.map(l => <p key={l} className="text-muted-foreground text-sm">{l}</p>)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-lg p-7">
                <h3 className="font-display font-semibold mb-5">Написать нам</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <textarea
                    placeholder="Ваш вопрос..."
                    rows={4}
                    className="w-full bg-secondary border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                  />
                  <button className="btn-gold w-full py-3 rounded text-sm">Отправить сообщение</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="section-divider mt-16 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded flex items-center justify-center bg-primary">
                  <span className="text-primary-foreground font-display font-bold text-xs">CS</span>
                </div>
                <span className="font-display font-bold">Case<span className="text-primary">Studio</span></span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">Премиальные чехлы с конструктором дизайнов</p>
            </div>
            <div>
              <p className="tag mb-3">Магазин</p>
              {[["catalog", "Каталог"], ["constructor", "Конструктор"], ["cart", "Корзина"]].map(([k, l]) => (
                <button key={k} onClick={() => navigate(k as Page)} className="block text-muted-foreground text-xs hover:text-primary transition-colors mb-2">{l}</button>
              ))}
            </div>
            <div>
              <p className="tag mb-3">Компания</p>
              {[["about", "О нас"], ["reviews", "Отзывы"], ["delivery", "Доставка"]].map(([k, l]) => (
                <button key={k} onClick={() => navigate(k as Page)} className="block text-muted-foreground text-xs hover:text-primary transition-colors mb-2">{l}</button>
              ))}
            </div>
            <div>
              <p className="tag mb-3">Контакты</p>
              <p className="text-muted-foreground text-xs mb-1">+7 (495) 123-45-67</p>
              <p className="text-muted-foreground text-xs">hello@casestudio.ru</p>
            </div>
          </div>
          <div className="section-divider pt-6 flex flex-col md:flex-row justify-between gap-3">
            <p className="text-muted-foreground text-xs">© 2026 CaseStudio. Все права защищены.</p>
            <p className="text-muted-foreground text-xs">ИП Громов А.С. · ИНН 7700000001</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
