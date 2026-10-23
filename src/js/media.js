/**
 * MEDİA VƏ MƏTBUAT MƏRKƏZİ — İNTERAKTİV LOGİKA
 * ARPSN Rəsmi İnternet Portalı
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Kateqoriya Filtrləri
    const filterButtons = document.querySelectorAll('.media-tab-btn');
    const newsCards = document.querySelectorAll('.news-card-arpsn');
    const searchInput = document.getElementById('mediaSearchInput');

    function applyMediaFilters() {
        const activeBtn = document.querySelector('.media-tab-btn.active');
        const selectedCategory = activeBtn ? activeBtn.getAttribute('data-cat') : 'all';
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

        let visibleCount = 0;

        newsCards.forEach(card => {
            const cardCategory = card.getAttribute('data-cat') || '';
            const cardText = card.innerText.toLowerCase();

            const matchCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);
            const matchQuery = (query === '' || cardText.includes(query));

            if (matchCategory && matchQuery) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // "Heç bir xəbər tapılmadı" bildirişi
        const emptyAlert = document.getElementById('mediaEmptyAlert');
        if (emptyAlert) {
            emptyAlert.style.display = (visibleCount === 0) ? 'block' : 'none';
        }
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyMediaFilters();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyMediaFilters);
    }

    // 2. Fotoxronika Qalereya Tıklanması (Şəkil Böyütmə Modal)
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4') ? item.querySelector('h4').innerText : 'Rəsmi Fotoxronika';
            if (img) {
                showPhotoLightbox(img.src, title);
            }
        });
    });

    function showPhotoLightbox(src, title) {
        let lightbox = document.getElementById('mediaLightboxModal');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'mediaLightboxModal';
            lightbox.style.position = 'fixed';
            lightbox.style.inset = '0';
            lightbox.style.backgroundColor = 'rgba(8, 43, 72, 0.95)';
            lightbox.style.zIndex = '9999';
            lightbox.style.display = 'flex';
            lightbox.style.flexDirection = 'column';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.padding = '20px';
            lightbox.innerHTML = `
                <div style="position: relative; max-width: 900px; width: 100%; text-align: center;">
                    <button type="button" id="closeLightboxBtn" style="position: absolute; right: 0; top: -45px; background: none; border: none; color: #ffffff; font-size: 28px; cursor: pointer;">
                        <i class="bi bi-x-lg"></i>
                    </button>
                    <img id="lightboxImg" src="" alt="Böyüdülmüş foto" style="max-width: 100%; max-height: 75vh; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); object-fit: contain;">
                    <p id="lightboxCaption" style="color: #F7F5F0; font-size: 15px; margin-top: 14px; font-weight: 600;"></p>
                </div>
            `;
            document.body.appendChild(lightbox);

            document.getElementById('closeLightboxBtn').addEventListener('click', () => {
                lightbox.style.display = 'none';
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            });
        }

        document.getElementById('lightboxImg').src = src;
        document.getElementById('lightboxCaption').innerText = title;
        lightbox.style.display = 'flex';
    }

    // URL parametrini yoxla (?cat=official və s.)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        const targetBtn = document.querySelector(`.media-tab-btn[data-cat="${catParam}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }
});
