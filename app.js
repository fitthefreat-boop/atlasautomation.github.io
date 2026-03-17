/* ============================================
   EMBER & OAK — app.js
   Dynamic interactions, animations, menu data
   ============================================ */

// ===================== MENU DATA =====================
const menuData = {
  starters: [
    { name: "Charred Leek & Goat Cheese Tart", desc: "Slow-roasted leeks from the Souss valley, aged chèvre, preserved lemon vinaigrette", price: "195 MAD", tag: "Signature" },
    { name: "Smoked Oysters", desc: "Atlantic oysters, ember-smoked, cucumber water, finger lime pearls", price: "220 MAD", tag: "Seasonal" },
    { name: "Wood-Fired Flatbread", desc: "Heritage wheat, whipped harissa butter, fresh herbs, Argan oil", price: "120 MAD", tag: "" },
    { name: "Seared Foie Gras", desc: "Duck foie gras, quince reduction, crushed hazelnuts, brioche perdu", price: "280 MAD", tag: "Chef's Pick" },
    { name: "Beet & Walnut Terrine", desc: "Atlas beets, pickled walnuts, smoked yoghurt, dill oil", price: "160 MAD", tag: "Vegetarian" },
  ],
  mains: [
    { name: "Rack of Atlas Lamb", desc: "Wood-roasted over heritage oak, chermoula, roasted aubergine, preserved tomato jus", price: "380 MAD", tag: "Signature" },
    { name: "Whole Roasted Sea Bass", desc: "Atlantic sea bass, saffron beurre blanc, charred fennel, sea herbs", price: "360 MAD", tag: "Chef's Pick" },
    { name: "Dry-Aged Entrecôte", desc: "45-day dry-aged Moroccan beef, ember butter, potato mousseline, bone marrow jus", price: "420 MAD", tag: "" },
    { name: "Wild Mushroom Risotto", desc: "Atlas mushrooms, aged Parmesan, truffle oil, microgreens", price: "240 MAD", tag: "Vegetarian" },
    { name: "Slow-Roasted Chicken", desc: "Free-range Doukkala chicken, souk spices, roasted root vegetables, natural jus", price: "295 MAD", tag: "Seasonal" },
    { name: "Grilled Merguez Brochette", desc: "House-made lamb merguez, harissa hummus, pickled cucumber, flatbread", price: "265 MAD", tag: "" },
  ],
  desserts: [
    { name: "Warm Chocolate Fondant", desc: "Valrhona dark chocolate, salted caramel, tonka bean ice cream", price: "135 MAD", tag: "Signature" },
    { name: "Bastilla au Lait", desc: "Reinvented Moroccan milk bastilla, orange blossom cream, crushed almonds, cinnamon sugar", price: "125 MAD", tag: "Chef's Pick" },
    { name: "Seasonal Tart", desc: "Strawberry and rhubarb tart, chantilly, micro basil — changes with market availability", price: "110 MAD", tag: "Seasonal" },
    { name: "Fromage & Honey Board", desc: "A curated selection of Moroccan and French cheeses, local honey, walnut loaf", price: "175 MAD", tag: "" },
    { name: "Sorbet Selection", desc: "Three house sorbets: blood orange, fig & anise, green tea — ask your server for today's flavors", price: "95 MAD", tag: "Vegan" },
  ],
  wines: [
    { name: "Château Roslane Premier Cru", desc: "Meknes AOC, Syrah & Grenache — aromas of black cherry, spice, and cedar", price: "460 MAD", tag: "Moroccan" },
    { name: "Siroua White", desc: "Chardonnay-Viognier blend, Siroua vineyards — stone fruit, floral, mineral finish", price: "380 MAD", tag: "Moroccan" },
    { name: "Domaine de la Zouina Rosé", desc: "Grenache rosé, Guerrouane — fresh red berries, Provence-style elegance", price: "320 MAD", tag: "Moroccan" },
    { name: "Sancerre Blanc, Domaine Henri Bourgeois", desc: "Loire Valley, France — classic Sauvignon Blanc, flint, citrus, gooseberry", price: "640 MAD", tag: "Import" },
    { name: "Côtes du Rhône, Chapoutier", desc: "Grenache-led blend, Rhône Valley — earthy, peppery, excellent with lamb", price: "510 MAD", tag: "Import" },
    { name: "Champagne Billecart-Salmon Brut", desc: "Non-vintage, Mareuil-sur-Aÿ — refined bubbles, brioche, white peach", price: "780 MAD", tag: "Prestige" },
  ]
};

// ===================== CURSOR =====================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effects on interactive elements
document.querySelectorAll('a, button, input, select, textarea, .exp-item, .chef-card, .g-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.4)';
    follower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.opacity = '0.5';
  });
});

// ===================== NAV =====================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Burger menu
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

burger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===================== SCROLL REVEAL =====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Stagger sibling reveals
function applyRevealDelays() {
  const groups = [
    '.story-stats .stat',
    '.exp-grid .exp-item',
    '.chefs-grid .chef-card',
  ];
  groups.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.dataset.delay = i * 120;
    });
  });
}
applyRevealDelays();
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===================== HERO ANIMATIONS =====================
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 200);
  });
});

// ===================== COUNTER ANIMATION =====================
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1600;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===================== MENU TABS =====================
const tabBtns = document.querySelectorAll('.tab');
const menuContent = document.getElementById('menuContent');

function renderMenu(category) {
  const items = menuData[category];
  const html = `
    <div class="menu-items">
      ${items.map((item, i) => `
        <div class="menu-item" style="transition-delay: ${i * 60}ms">
          <div class="menu-item-left">
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-desc">${item.desc}</div>
            ${item.tag ? `<span class="menu-item-tag">${item.tag}</span>` : ''}
          </div>
          <div class="menu-item-price">${item.price}</div>
        </div>
      `).join('')}
    </div>
  `;
  menuContent.innerHTML = html;

  // Trigger animations
  setTimeout(() => {
    menuContent.querySelectorAll('.menu-item').forEach(item => {
      item.classList.add('visible');
    });
  }, 30);
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    menuContent.style.opacity = '0';
    menuContent.style.transform = 'translateY(10px)';
    setTimeout(() => {
      renderMenu(btn.dataset.tab);
      menuContent.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      menuContent.style.opacity = '1';
      menuContent.style.transform = 'translateY(0)';
    }, 200);
  });
});

// Initial render
renderMenu('starters');

// ===================== GALLERY HOVER =====================
document.querySelectorAll('.g-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.03)';
    this.style.zIndex = '2';
  });
  item.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.zIndex = '';
  });
});

// ===================== FORM SUBMIT =====================
const form = document.getElementById('reserveForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.add('visible');
    btn.style.display = 'none';
    form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
  }, 1200);
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===================== PARALLAX HERO =====================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) {
    const scrollY = window.scrollY;
    hero.style.transform = `translateY(${scrollY * 0.25}px)`;
    hero.style.opacity = 1 - scrollY / 600;
  }
});

// ===================== ACTIVE NAV LINK =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--cream)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===================== GALLERY REVEAL =====================
const galleryItems = document.querySelectorAll('.g-item');
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      galleryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

galleryItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  galleryObserver.observe(item);
});

console.log('%c🔥 Ember & Oak', 'font-size:1.5rem; color:#c9a96e; font-family:serif;');
console.log('%cWhere Fire Meets Refinement', 'color:#c4b49a; font-size:0.9rem;');
