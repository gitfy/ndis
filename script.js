function showTab(tabId) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    // Add active class to selected tab
    const tabElement = document.querySelector(`.tab[onclick*='${tabId}']`);
    if (tabElement) tabElement.classList.add('active');
    // Load tab content from external file
    fetch(`/${tabId}.html`)
        .then(response => {
            if (!response.ok) throw new Error('File not found');
            return response.text();
        })
        .then(html => {
            // Remove 'active' class from all loaded sections
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            tempDiv.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
            document.getElementById('main-content').innerHTML = tempDiv.innerHTML;
        })
        .catch(() => {
            document.getElementById('main-content').innerHTML = '<section><h2>Content not found</h2></section>';
        });
    // Close menu on mobile after tab click
    const tabs = document.querySelector('nav ul.tabs');
    if (tabs.classList.contains('open')) {
        tabs.classList.remove('open');
    }
}

// Set default tab on load
window.onload = function() {
    const icon = document.getElementById('theme-icon');
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.removeAttribute('data-theme');
        icon.textContent = '🌙';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
    }
    showTab('home');
    // Setup dots for all horizontal scrolls on load
    setupDots('community-scroll', 'community-scroll-dots');
    setupDots('community-scroll2', 'community-scroll2-dots');
};

function setupDots(rowId, dotsId) {
    const row = document.getElementById(rowId);
    const dots = document.getElementById(dotsId);
    if (!row || !dots) return;
    dots.innerHTML = '';
    const items = row.querySelectorAll('.scroll-item');
    items.forEach((item, idx) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to section ${idx + 1}`);
        dot.setAttribute('role', 'tab');
        dot.onclick = () => {
            row.scrollTo({ left: item.offsetLeft, behavior: 'smooth' });
        };
        dots.appendChild(dot);
    });
    row.addEventListener('scroll', () => updateDots(rowId, dotsId));
}

function updateDots(rowId, dotsId) {
    const row = document.getElementById(rowId);
    const dots = document.getElementById(dotsId);
    if (!row || !dots) return;
    const items = row.querySelectorAll('.scroll-item');
    let activeIdx = 0;
    let minDist = Infinity;
    items.forEach((item, idx) => {
        const dist = Math.abs(row.scrollLeft - item.offsetLeft);
        if (dist < minDist) {
            minDist = dist;
            activeIdx = idx;
        }
    });
    dots.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
    });
}

// ...existing code...
function scrollRow(rowId, direction) {
    const row = document.getElementById(rowId);
    if (row) {
        const scrollAmount = 280;
        row.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        setTimeout(() => updateDots(rowId, rowId + '-dots'), 350);
    }
}

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

function toggleMenu() {
    const tabs = document.querySelector('nav ul.tabs');
    tabs.classList.toggle('open');
}
