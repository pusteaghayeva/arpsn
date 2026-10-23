/**
 * ARPSN - Rəsmi İnternet Portalı
 * Nümayəndəlik Səhifəsi İnteraktivləri (src/js/representation.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Yan Menyu Aktivlik İzləyicisi (ScrollSpy)
    const navLinks = document.querySelectorAll('.sidebar-nav-list a');
    const sections = document.querySelectorAll('.content-section-card');

    function updateActiveSidebar() {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveSidebar, { passive: true });
    updateActiveSidebar();

    // 2. Hash ilə gəldikdə səlis scroll
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        }
    }
});
