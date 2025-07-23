function showTab(tabId) {
    // Update tab states and ARIA attributes
    document.querySelectorAll('.tab').forEach(tab => {
        const link = tab.querySelector('a');
        tab.classList.remove('active');
        link.setAttribute('aria-selected', 'false');
    });
    
    // Add active class to selected tab and update ARIA
    const tabLink = document.querySelector(`.tab a[onclick*='${tabId}']`);
    if (tabLink) {
        tabLink.parentElement.classList.add('active');
        tabLink.setAttribute('aria-selected', 'true');
    }
    // Compute base path for fetching tab content
    let base = '';
    if (window.location.hostname.endsWith('github.io')) {
        // For GitHub Pages, get the repo name from the path
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
            base = '/' + pathParts[0] + '/';
        }
    }
    // Load tab content from external file (base + relative path)
    fetch(`${base}${tabId}.html`)
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
            // Setup dots for horizontal scrolls if present
            setTimeout(() => {
                if (document.getElementById('community-scroll')) {
                    setupDots('community-scroll', 'community-scroll-dots');
                }
                if (document.getElementById('community-scroll2')) {
                    setupDots('community-scroll2', 'community-scroll2-dots');
                }
            }, 100);
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

// Set up keyboard navigation for tabs
function setupTabKeyboardNavigation() {
    const tabLinks = document.querySelectorAll('.tab a[role="tab"]');
    
    tabLinks.forEach(link => {
        link.addEventListener('keydown', (e) => {
            const tabs = Array.from(tabLinks);
            const index = tabs.indexOf(e.target);
            
            switch(e.key) {
                case 'ArrowRight':
                    // Move to next tab, or first tab if at end
                    const nextIndex = (index + 1) % tabs.length;
                    const nextTab = tabs[nextIndex].getAttribute('onclick').match(/'([^']+)'/)[1];
                    showTab(nextTab);
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    // Move to previous tab, or last tab if at beginning
                    const prevIndex = (index - 1 + tabs.length) % tabs.length;
                    const prevTab = tabs[prevIndex].getAttribute('onclick').match(/'([^']+)'/)[1];
                    showTab(prevTab);
                    e.preventDefault();
                    break;
                case 'Home':
                    // Move to first tab
                    const firstTab = tabs[0].getAttribute('onclick').match(/'([^']+)'/)[1];
                    showTab(firstTab);
                    e.preventDefault();
                    break;
                case 'End':
                    // Move to last tab
                    const lastTab = tabs[tabs.length - 1].getAttribute('onclick').match(/'([^']+)'/)[1];
                    showTab(lastTab);
                    e.preventDefault();
                    break;
            }
        });
    });
}

// Set default tab on load
window.onload = function() {
    // Always set dark theme
    document.body.setAttribute('data-theme', 'dark');
    
    // Initialize the first tab
    showTab('home');
    
    // Setup keyboard navigation
    setupTabKeyboardNavigation();
    
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

function scrollRow(rowId, direction) {
    const row = document.getElementById(rowId);
    if (row) {
        const scrollAmount = 280;
        row.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        setTimeout(() => updateDots(rowId, rowId + '-dots'), 350);
    }
}

// Theme function removed - site always uses dark theme

function toggleMenu() {
    const tabs = document.querySelector('nav ul.tabs');
    tabs.classList.toggle('open');
}
