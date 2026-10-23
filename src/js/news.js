/**
 * ARPSN - Rəsmi İnternet Portalı
 * Xəbərlər Kataloqu Filterləri və Canlı Axtarış (src/js/news.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.news-filter-tabs .filter-btn, .filter-btn');
    const newsCards = document.querySelectorAll('.news-grid .news-card-item');
    const searchInput = document.getElementById('newsSearchInput') || document.querySelector('.news-search-input');

    let activeFilter = 'all';
    let searchQuery = '';

    const filterMapping = {
        'bütün xəbərlər': 'all',
        'rəsmi xronika': ['rəsmi', 'əsas'],
        'dövlət proqramı': ['dövlət proqramı', 'proqram'],
        'vətəndaş qəbulu': ['vətəndaş'],
        'sosial-iqtisadi inkişaf': ['iqtisadi', 'dayanıqlı', 'inkişaf']
    };

    function applyFilterAndSearch() {
        newsCards.forEach(card => {
            const tagEl = card.querySelector('.news-card-tag');
            const titleEl = card.querySelector('.news-card-title');
            const excerptEl = card.querySelector('.news-card-excerpt');

            const tagText = tagEl ? tagEl.textContent.trim().toLowerCase() : '';
            const titleText = titleEl ? titleEl.textContent.trim().toLowerCase() : '';
            const excerptText = excerptEl ? excerptEl.textContent.trim().toLowerCase() : '';

            // 1. Kateqoriya filtr yoxlanışı
            let matchesCategory = false;
            if (activeFilter === 'all') {
                matchesCategory = true;
            } else if (Array.isArray(activeFilter)) {
                matchesCategory = activeFilter.some(keyword => tagText.includes(keyword));
            } else {
                matchesCategory = tagText.includes(activeFilter);
            }

            // 2. Axtarış sözü yoxlanışı
            let matchesSearch = true;
            if (searchQuery) {
                matchesSearch = titleText.includes(searchQuery) || excerptText.includes(searchQuery) || tagText.includes(searchQuery);
            }

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const text = btn.textContent.trim().toLowerCase();
            activeFilter = filterMapping[text] || (text === 'bütün xəbərlər' ? 'all' : text);
            applyFilterAndSearch();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            applyFilterAndSearch();
        });
    }
});
