/**
 * ARPSN - Rəsmi İnternet Portalı
 * Rəsmi Sənədlər Filtrasiyası və Canlı Axtarış (src/js/documents.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('docSearchInput');
    const filterPills = document.querySelectorAll('.doc-pill-btn');
    const docCards = document.querySelectorAll('.doc-card-item');
    const countDisplay = document.getElementById('docCountDisplay');

    let currentFilter = 'all';
    let searchQuery = '';

    // URL parametrlərindən ilkin filtrasiya
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam) {
        filterPills.forEach(pill => {
            if (pill.getAttribute('data-filter') === filterParam) {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentFilter = filterParam;
            }
        });
    }

    function filterDocuments() {
        let visibleCount = 0;

        docCards.forEach(card => {
            const type = (card.getAttribute('data-type') || '').toLowerCase();
            const year = (card.getAttribute('data-year') || '').toLowerCase();
            const textContent = card.textContent.toLowerCase();

            let matchesCategory = (currentFilter === 'all') || (type === currentFilter) || (year === currentFilter);
            let matchesSearch = !searchQuery || textContent.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'grid';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (countDisplay) {
            countDisplay.innerHTML = `Göstərilən sənədlər: <strong>${visibleCount}</strong> ədəd`;
        }
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.getAttribute('data-filter') || 'all';
            filterDocuments();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            filterDocuments();
        });
    }

    filterDocuments();
});
