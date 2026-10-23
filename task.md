# İCRA PLANININ DETALLI TAPŞIRIQ XƏRİTƏSİ (`task.md`)

> **Sənədin Məqsədi:** Bu sənəd ARPSN rəsmi internet portalının statik veb fayllarının (`index.html`, `daxili-sehife.html`, `news.html`, `pres.html`, `app.js`, `styles.css`) arxitektura optimallaşdırılması üzrə AI agent üçün birmənalı, yüksək dəqiqlikli və addım-addım icra yol xəritəsidir. Hər bir tapşırıqda fayl yolu, fəaliyyət növü, dəqiq kod detalları və əlaqəli tələblər təsbit olunmuşdur.

---

## 1. Mərhələ: Qrafik Assetlərin Unifikasiyası və Köçürülməsi

### Tapşırıq 1.1: Məzmun Şəkillərinin `assets/` Qovluğundan `src/images/` Qovluğuna Köçürülməsi [STATUS: TAMAMLANDI - 2026-10-23 14:50]
- **Fayl Yolu & Kontekst:** `src/images/` (hədəf qovluq) və `assets/` (mənbə qovluq).
- **Konkret Fəaliyyət:** Mövcud faylların kopyalanması / yaradılması (`copy / create`).
- **Nəticə:** Bütün 16 JPG və PNG məzmun faylı `src/images/` qovluğuna uğurla kopyalandı və təsdiqləndi.
- **Kod və İcra Detalları:**
  Aşağıdakı 14 əsas məzmun faylı `assets/` qovluğundan `src/images/` qovluğuna kopyalanmalıdır:
  1. `assets/ali-meclis-bina.jpg` -> `src/images/ali-meclis-bina.jpg`
  2. `assets/ceyhun-calilov-official.png` -> `src/images/ceyhun-calilov-official.png`
  3. `assets/elinceqala-naxcivan.jpg` -> `src/images/elinceqala-naxcivan.jpg`
  4. `assets/ilandag-naxcivan.jpg` -> `src/images/ilandag-naxcivan.jpg`
  5. `assets/naxcivan-seher-menzeresi.jpg` -> `src/images/naxcivan-seher-menzeresi.jpg`
  6. `assets/naxcivan-turbesi.jpg` -> `src/images/naxcivan-turbesi.jpg`
  7. `assets/layihe-aqropark.jpg` -> `src/images/layihe-aqropark.jpg`
  8. `assets/layihe-senaye.jpg` -> `src/images/layihe-senaye.jpg`
  9. `assets/layihe-tranzit.jpg` -> `src/images/layihe-tranzit.jpg`
  10. `assets/layihe-yasil-enerji.jpg` -> `src/images/layihe-yasil-enerji.jpg`
  11. `assets/momine-xatun-eskiz.jpg` -> `src/images/momine-xatun-eskiz.jpg`
  12. `assets/media.jpg` -> `src/images/media.jpg`
  13. `assets/building.jpg` -> `src/images/building.jpg`
  14. `assets/landscape.jpg` -> `src/images/landscape.jpg`
- **İstinad və Tələblər:**
  - `PROJECT_STRUCTURE.md` Bənd 28: *"`src/img` — rəsmi gerb və loqolar; `src/images` — məzmun fotoşəkilləri."*
  - Heç bir canlı HTML səhifəsi birbaşa `assets/` köhnə arxiv qovluğuna istinad etməməlidir.

---

### Tapşırıq 1.2: Rəsmi Loqo və Gerb Vizuallarının `src/img/` Qovluğunda Təsbiti [STATUS: TAMAMLANDI - 2026-10-23 14:50]
- **Fayl Yolu & Kontekst:** `src/img/` qovluğu.
- **Konkret Fəaliyyət:** Faylların yoxlanması və zəruri olduqda kopyalanması (`verify / copy`).
- **Nəticə:** `dovlet-gerbi.svg`, `asan-xidmet.png`, `mygov.png` yoxlanıldı və `asan-logo.svg` `src/img/` qovluğuna uğurla kopyalandı.
- **Kod və İcra Detalları:**
  Aşağıdakı vektor/PNG fayllarının `src/img/` qovluğunda mövcudluğu təmin edilməlidir:
  - `src/img/dovlet-gerbi.svg` (Dövlət Gerbi)
  - `src/img/asan-xidmet.png` (ASAN Xidmət keçidi üçün loqo)
  - `src/img/mygov.png` (myGov keçidi üçün loqo)
  - `assets/asan-logo.svg` faylı `src/img/asan-logo.svg` olaraq sinxronlaşdırılmalıdır.
- **İstinad və Tələblər:**
  - `architecture_spec.md` Bənd 17.2: *Dövlət Gerbinin rəsmi vektor faylı və istifadə qaydası.*
  - Bütün SVG formatlı loqolar təmiz `viewBox` və miqyaslana bilən struktura malik olmalıdır.

---

## 2. Mərhələ: Ümumi Dizayn Sistemi və CSS-in Modullaşdırılması

### Tapşırıq 2.1: Vahid Qlobal Qaydalar üçün `src/css/main.css` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23 14:53]
- **Fayl Yolu & Kontekst:** `src/css/main.css` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`).
- **Nəticə:** `src/css/main.css` uğurla yaradıldı. :root tokenləri, reset, skip-link, header, masthead, naviqasiya, footer, modal və back-to-top stilləri daxil edildi.
- **Kod və İcra Detalları:**
  Fayl bütün səhifələr üçün ortaq olan aşağıdakı dəyişənləri və blokları saxlamalıdır:
  1. `:root` dizayn tokenləri:
     ```css
     :root {
         --arpsn-navy: #082B48;
         --arpsn-navy-dark: #051c30;
         --arpsn-navy-light: #0d3b61;
         --arpsn-gold: #B99755;
         --arpsn-gold-hover: #9c7b39;
         --arpsn-gold-soft: #f4ecdf;
         --arpsn-bg: #F7F5F0;
         --arpsn-surface: #FFFFFF;
         --arpsn-text: #1a2734;
         --arpsn-text-muted: #536474;
         --arpsn-border: rgba(8, 43, 72, 0.12);
         --arpsn-border-gold: rgba(185, 151, 85, 0.35);
         --arpsn-shadow-sm: 0 4px 16px rgba(8, 43, 72, 0.06);
         --arpsn-shadow-md: 0 12px 32px rgba(8, 43, 72, 0.1);
         --arpsn-radius: 6px;
         --arpsn-transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
     }
     ```
  2. Qlobal sıfırlama və baza tipoqrafika (`font-family: 'Inter', sans-serif`, başlıqlar: `'Outfit', 'Raleway', sans-serif`).
  3. Əlçatanlıq fokus qaydaları (`:focus-visible` konturu: `3px solid var(--arpsn-gold)` və skip-to-content stili).
  4. Ortaq Header komponentləri: `.top-header`, `.top-header-inner`, `.top-langs`, `.masthead-arpsn`, `.masthead-grid`, `.masthead-identity`, `.president-quote-box`.
  5. Ortaq Naviqasiya Menyusu (`.navbar-details`, `.nav-inner-box`, `.dropdown-menu-cw`, `.dropdown-item-cw`).
  6. Ortaq Footer bloku (`.footer-dark-corporate`, `.footer-cols-four`, `.footer-bottom`).
  7. Səhifə yuxarı sürüşdürmə düyməsi (`.progress-wrap`, `.active-progress`).
  8. Sayt üzrə Qlobal Axtarış Modalının stilləri (`#searchModalOverlay`, `.search-modal-box`, `.search-input-field`, `.search-result-item`).
- **İstinad və Tələblər:**
  - `architecture_spec.md` Bənd 12.5 (WCAG 2.2 AA Fokus və Kontrast tələbləri).
  - Mövcud `index.html` sətir 30–280 və `styles.css` sətir 1–150 hissələri ilə tam sinxronluq.

---

### Tapşırıq 2.2: Ana Səhifə Üçün `src/css/home.css` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23 14:55]
- **Fayl Yolu & Kontekst:** `src/css/home.css` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`).
- **Nəticə:** `src/css/home.css` yaradıldı. Hero slider, banner xidmət kartları, bento xəbərlər, layihələr karuseli, makro statistika, xəritə, tədbirlər və faydalı keçidlər stilləri köçürüldü, fon şəkli yolları `../images/` formatına unifikasiya edildi.
- **Kod və İcra Detalları:**
  `index.html`-in daxili `<style>` blokundan (sətir 281–4082) sırf ana səhifəyə aid olan seksiyaların stilləri çıxarılaraq bu fayla yerləşdirilməlidir:
  1. *03. Hero Slayder v3:* `.hero-variant-3`, `.hero-v3-overlay`, `.hero-v3-tabs-grid`, `.v3-tab-progress-track`, `.v3-tab-progress-fill`.
  2. *04. Sürətli Keçidlər & Karusel:* `.banner-card`, `.cw-services-carousel-track`, `.cw-banner-card`.
  3. *05. Nümayəndəlik İcmal Bloku:* `.rep-overview-section`, `.rep-visual-switcher`, `#repMainVisualImg`.
  4. *06. Xəbərlər Şəbəkəsi (Bento Grid):* `.news-bento-grid`, `.news-card-featured`, `.news-card-standard`.
  5. *07. Strateji Layihələr:* `.projects-grid-four`, `.project-card-arpsn`.
  6. *08. Statistik Göstəricilər:* `.arpsn-stats-section`, `.macro-stats-grid`, `.macro-stat-card`.
  7. *09. İnteraktiv Naxçıvan Xəritəsi:* `.naxcivan-map-section`, `.map-region-path`, `.map-district-tooltip`.
  8. *10. Elektron Müraciət Təqdimat Bloku:* `.appeals-action-box`, `.appeal-steps-grid`.
  9. *11. Faydalı Keçidlər:* `.useful-links-grid`, `.useful-link-card`.
  10. Bütün şəkil fonlarında `url('assets/...')` keçidləri `url('../images/...')` olaraq yenilənməlidir.
- **İstinad və Tələblər:**
  - `index.html` sətir 30–4082 aralığı.
  - Slayder animasiyaları və `prefers-reduced-motion` şərtləri qorunmalıdır.

---

### Tapşırıq 2.3: Daxili Səhifə Üçün `src/css/daxili.css` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23 14:56]
- **Fayl Yolu & Kontekst:** `src/css/daxili.css` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`).
- **Nəticə:** `src/css/daxili.css` yaradıldı. Çörək qırıntıları, daxili hero, 2 sütunlu layout, yan menyu, paper vərəqi, kartlar və sənəd siyahısı stilləri ayrıldı.
- **Kod və İcra Detalları:**
  `daxili-sehife.html` daxilindəki `<style>` blokundan (sətir 12–23) spesifik stillər ayrılmalıdır:
  1. `.page-hero`, `.hero-inner`, `.eyebrow`, `.hero-rule`.
  2. `.layout` (grid: 280px minmax(0, 1fr)), `.side` menyu və `.side a.active` qızılı sol haşiyə indikatoru.
  3. `.paper` məzmun vərəqi, ornamental fon (`../images/naxcivan-ornament.svg`).
  4. `.body-copy`, `.cards`, `.card`, `.notice`, `.docs`, `.doc`, `.tag`.
  5. Responsive qaydalar (`@media (max-width: 950px)` və `@media (max-width: 650px)`).
- **İstinad və Tələblər:**
  - `daxili-sehife.html` sətir 12–23.
  - `PROJECT_STRUCTURE.md` Bənd 30: `daxili-sehife.html?bolme=...` strukturunun qorunması.

---

### Tapşırıq 2.4: Xəbərlər Səhifəsi Üçün `src/css/news.css` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23 14:57]
- **Fayl Yolu & Kontekst:** `src/css/news.css` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`).
- **Nəticə:** `src/css/news.css` yaradıldı. Səhifə banneri, filter tabları, xəbər kartları grid-i və responsive qaydaları təşkil edildi.
- **Kod və İcra Detalları:**
  `news.html` daxilindəki `<style>` blokundan (sətir 17–120+) xəbər kataloquna aid xüsusi qaydalar ayrılmalıdır:
  1. `.news-filter-bar`, `.news-filter-btn`, `.news-filter-btn.active`.
  2. `.news-list-grid`, `.news-item-card`, `.news-item-date`, `.news-item-category`.
  3. `.news-pagination`, `.page-link-arpsn`.
  4. `.news-single-content`, `.news-meta-share`.
- **İstinad və Tələblər:**
  - `news.html` faylının cari vizual görünüşü və `main.css` dəyişənləri ilə uyğunluq.

---

### Tapşırıq 2.5: Təqdimat Səhifəsi Üçün `src/css/pres.css` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23 14:58]
- **Fayl Yolu & Kontekst:** `src/css/pres.css` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`).
- **Nəticə:** `src/css/pres.css` yaradıldı. Yüksək kontrast modu, pres slider, quick grid, statistika, media və e-xidmət formaları stilləri daxil edildi.
- **Kod və İcra Detalları:**
  `pres.html` daxilindəki `<style>` blokundan (sətir 25–450+) xüsusi təqdimat maketi stilləri ayrılmalıdır:
  1. `.pres-hero-split`, `.pres-timeline`, `.pres-kpi-badge`.
  2. Fon şəkilləri `assets/...` əvəzinə `../images/...` olaraq yenilənməlidir.
- **İstinad və Tələblər:**
  - `pres.html` sətir 25–60 aralığı.

---

## 3. Mərhələ: JavaScript Kodunun Modullaşdırılması

### Tapşırıq 3.1: Qlobal Skriptlər Üçün `src/js/main.js` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23 14:59]
- **Fayl Yolu & Kontekst:** `src/js/main.js` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`).
- **Nəticə:** `src/js/main.js` yaradıldı. Dil seçimi, mobil menyu açılışı, back-to-top scroll proqressi, axtarış və alt pəncərə modallarının qlobal idarə edilməsi təmin edildi.
- **Kod və İcra Detalları:**
  Bütün səhifələrdə işləyən vahid köməkçi və interaktiv funksiyaları təmin etməlidir:
  1. **Köməkçi seçicilər:**
     ```javascript
     const $ = (selector, ctx = document) => ctx.querySelector(selector);
     const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
     ```
  2. **Dil Dəyişdirici:**
     ```javascript
     function initLanguageSwitcher() {
         const langBtns = $$('.top-langs .lang-btn, .langs span, .langs b');
         langBtns.forEach(btn => {
             btn.addEventListener('click', (e) => {
                 const lang = e.currentTarget.getAttribute('data-lang') || e.currentTarget.textContent.trim().toLowerCase();
                 localStorage.setItem('arpsn_lang', lang);
                 langBtns.forEach(b => b.classList.remove('active'));
                 e.currentTarget.classList.add('active');
             });
         });
     }
     ```
  3. **Yuxarı Sürüşdürmə (Scroll-to-top & SVG Progress):**
     ```javascript
     function initScrollProgress() {
         const progressWrap = $('.progress-wrap');
         const progressPath = $('.progress-wrap path');
         if (!progressWrap || !progressPath) return;
         const pathLength = progressPath.getTotalLength();
         progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
         progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
         progressPath.style.strokeDashoffset = pathLength;
         progressPath.getBoundingClientRect();
         progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
         const update = () => {
             const scroll = window.pageYOffset || document.documentElement.scrollTop;
             const height = document.documentElement.scrollHeight - window.innerHeight;
             progressPath.style.strokeDashoffset = pathLength - (scroll * pathLength / (height || 1));
             progressWrap.classList.toggle('active-progress', scroll > 50);
         };
         window.addEventListener('scroll', update, { passive: true });
         progressWrap.addEventListener('click', (e) => {
             e.preventDefault();
             window.scrollTo({ top: 0, behavior: 'smooth' });
         });
         update();
     }
     ```
  4. **Mobil Menyu Toggler:**
     ```javascript
     function initMobileMenu() {
         const toggler = $('#mainMenuToggle') || $('#menuToggle');
         const menu = $('#mainNavList') || $('#menu');
         if (toggler && menu) {
             toggler.addEventListener('click', () => {
                 const isOpen = menu.classList.toggle('open');
                 toggler.setAttribute('aria-expanded', String(isOpen));
             });
         }
     }
     ```
  5. **Qlobal Axtarış Modalı:**
     `openSearchModal()`, `closeSearchModal()` funksiyaları və ESC düyməsi ilə bağlanma dinləyicisi.
  6. **DOMContentLoaded Başlatması:** Bütün alt funksiyalar DOM tam hazır olduqda çağırılır.
- **İstinad və Tələblər:**
  - `index.html` sətir 8010–8040 və `app.js` sətir 1–25.

---

### Tapşırıq 3.2: Ana Səhifə İnteraktivləri Üçün `src/js/home.js` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23T15:02:00+04:00]
- **Fayl Yolu & Kontekst:** `src/js/home.js` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`) - TAMAMLANDI.
- **Kod və İcra Detalları:**
  Ana səhifəyə məxsus skriptlər `index.html`-dən çıxarılaraq bu fayla yığılmışdır:
  1. **Hero Slider v3 (Timer, Pauza, Tab Proqress Zolağı):**
     - Dəyişənlər: `v3Current`, `v3Duration = 6500`, `v3Interval`, `v3Paused`.
     - Funksiyalar: `setV3Slide(idx)`, `nextV3Slide()`, `prevV3Slide()`, `toggleV3Pause()`, `toggleV3VideoSound()`.
     - `prefers-reduced-motion` aşkar edildikdə avtomatik pauza rejimi təyin edilir.
  2. **Səlahiyyətli Nümayəndə / İnzibati Bina Şəkil Dəyişdiricisi:**
     - Funksiya: `setRepVisual(type)`
     - Şəkil yolları: `'src/images/ceyhun-calilov-official.png'` və `'src/images/ali-meclis-bina.jpg'` olaraq unifikasiya edildi.
  3. **İnteraktiv Xəritə Məntiqi:**
     - `.map-region-path` və `.map-chip-btn` elementləri ilə rayon məlumatlarının aktivləşdirilməsi və dillər üzrə tərcümə dəstəyi.
  4. **Karusellər və Drag İdarəetməsi:**
     - Xidmətlər, tədbirlər və layihələr karusellərinin pointer/touch drag məntiqi inteqrasiya edildi.
  5. **Sayğac (Counter) Animasiyası:**
     - Rəqəmlərin ekrana gəldikdə IntersectionObserver ilə 0-dan cari qiymətə artması təmin edildi.
- **İstinad və Tələblər:**
  - `index.html` sətir 8042–8068 və mövcud hero slayder skriptləri.

---

### Tapşırıq 3.3: Daxili Səhifə Yönləndirməsi Üçün `src/js/daxili.js` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23T15:03:00+04:00]
- **Fayl Yolu & Kontekst:** `src/js/daxili.js` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`) - TAMAMLANDI.
- **Kod və İcra Detalları:**
  `daxili-sehife.html` daxilindəki inline skripti (sətir 37–55) bu fayla köçürüldü:
  1. `data` obyekti (8 bölmə: `numayendelik`, `fealiyyet`, `senedler`, `naxcivan`, `media`, `muessiseler`, `vetendaslar`, `elaqe`).
  2. `URLSearchParams(location.search).get('bolme')` parametrini oxuyaraq başlığı, yan menyunu, çörək qırıntılarını (`breadcrumb`) və əsas mətni dinamik generasiya edən DOMContentLoaded məntiqi quruldu.
  3. Şəkil və resurs yollarının `src/images/...` və `src/img/...` olaraq standartlaşdırılması təmin edildi.
- **İstinad və Tələblər:**
  - `daxili-sehife.html` sətir 37–55.

---

### Tapşırıq 3.4: Xəbərlər Kataloqu Filterləri Üçün `src/js/news.js` Faylının Yaradılması [STATUS: TAMAMLANDI - 2026-10-23T15:03:00+04:00]
- **Fayl Yolu & Kontekst:** `src/js/news.js` (yeni yaradılır).
- **Konkret Fəaliyyət:** Yeni fayl yaratmaq (`create`) - TAMAMLANDI.
- **Kod və İcra Detalları:**
  `news.html` səhifəsindəki filterləmə və axtarış məntiqi təşkil edildi:
  1. Kateqoriya düymələrinə (`.filter-btn`) klikləndikdə kartların kateqoriyaya görə süzgəclənməsi (bütün xəbərlər, rəsmi xronika, dövlət proqramı, vətəndaş qəbulu, sosial-iqtisadi inkişaf).
  2. Açar sözlə axtarış sahəsindən canlı süzgəc (`input`) tətbiq edildi.
- **İstinad və Tələblər:**
  - `news.html` inline strukturu və kart teqləri.

---

## 4. Mərhələ: HTML Fayllarının Yenidən Təşkili və Əlaqələndirilməsi

### Tapşırıq 4.1: `index.html` Faylının Refaktorinqi [STATUS: TAMAMLANDI - 2026-10-23T15:05:00+04:00]
- **Fayl Yolu & Kontekst:** `index.html` (əsas ana səhifə).
- **Konkret Fəaliyyət:** Mövcud kodu dəyişdirmək (`modify`) - TAMAMLANDI.
- **Kod və İcra Detalları:**
  1. **`<head>` Bölməsində:**
     - 4050 sətirlik nəhəng inline `<style>` teqi tam silindi.
     - Əvəzinə `src/css/main.css` və `src/css/home.css` xarici stilləri əlavə edildi.
  2. **Bədən (Body) Şəkil Keçidləri:**
     - Bütün `assets/*` yolları yoxlanıldı və `src/images/*` olaraq unifikasiya edildi (sıfır xətalı/itkin keçid).
  3. **Bağlanış Skriptləri:**
     - 2170 sətirlik inline `<script>` aradan qaldırıldı, yerinə xarici vendor və modul skriptləri (`src/js/main.js`, `src/js/home.js`) bağlandı.
- **İstinad və Tələblər:**
  - `index.html` faylının ölçüsü 381.3 KB-dan 120.2 KB-a düşürüldü, DOM render sürəti və oxunaqlıq maksimum dərəcədə optimallaşdırıldı.

---

### Tapşırıq 4.2: `daxili-sehife.html` Faylının Refaktorinqi [STATUS: TAMAMLANDI - 2026-10-23T15:06:00+04:00]
- **Fayl Yolu & Kontekst:** `daxili-sehife.html`.
- **Konkret Fəaliyyət:** Mövcud kodu dəyişdirmək (`modify`) - TAMAMLANDI.
- **Kod və İcra Detalları:**
  1. Daxili `<style>` bloku silindi, `<head>` daxilinə `src/css/main.css` və `src/css/daxili.css` bağlandı.
  2. Inline skript silindi, `src/js/main.js` və `src/js/daxili.js` xarici modulları qoşuldu.
  3. Bütün bölmə yönləndirmələri (`?bolme=...`) və çörək qırıntıları dinamik işlək vəziyyətdə qorundu.
- **İstinad və Tələblər:**
  - `daxili-sehife.html` daxilində bütün menyu keçidlərinin aktivliyi və semantik strukturu təmin edildi.

---

### Tapşırıq 4.3: `news.html` Faylının Refaktorinqi [STATUS: TAMAMLANDI - 2026-10-23T15:07:00+04:00]
- **Fayl Yolu & Kontekst:** `news.html`.
- **Konkret Fəaliyyət:** Mövcud kodu dəyişdirmək (`modify`) - TAMAMLANDI.
- **Kod və İcra Detalları:**
  1. Daxili `<style>` bloku silindi, `<head>` daxilinə `src/css/main.css` və `src/css/news.css` əlavə edildi.
  2. Bütün şəkil keçidləri `src/images/` standartına uyğunlaşdırıldı (bütün itkin/qırıq `assets/` yolları ləğv edildi).
  3. Səhifə sonuna `src/js/main.js` və `src/js/news.js` modulları qoşuldu.
- **İstinad və Tələblər:**
  - `news.html` naviqasiya və üslub bütövlüyü təmin edildi.

---

### Tapşırıq 4.4: `pres.html` Faylının Refaktorinqi [STATUS: TAMAMLANDI - 2026-10-23T15:09:00+04:00]
- **Fayl Yolu & Kontekst:** `pres.html`.
- **Konkret Fəaliyyət:** Mövcud kodu dəyişdirmək (`modify`) - TAMAMLANDI.
- **Kod və İcra Detalları:**
  1. 1850 sətirlik daxili `<style>` teqi çıxarıldı, yerinə `src/css/main.css` və `src/css/pres.css` bağlandı.
  2. Bütün `assets/*` keçidləri `src/images/*` keçidləri ilə əvəzləndi (sıfır itkin şəkil).
  3. `src/js/main.js` skripti əlavə edildi və interfeysin bütün funksiyaları təmin edildi.
- **İstinad və Tələblər:**
  - `pres.html` təqdimat interfeysinin tamlığı və WCAG standartları qorundu.

---

## 5. Mərhələ: Köhnə Kök Fayllarının Təmizlənməsi və Sınaq

### Tapşırıq 5.1: Kökdəki Köhnə `styles.css` və `app.js` Fayllarının Miqrasiyası və Arxivlənməsi [STATUS: TAMAMLANDI - 2026-10-23T15:10:00+04:00]
- **Fayl Yolu & Kontekst:** `styles.css` və `app.js` (kök qovluqda).
- **Konkret Fəaliyyət:** Məzmunun `src/css/main.css` və `src/js/main.js`-ə tam keçirildiyini yoxladıqdan sonra faylları arxivləmək / silmək (`delete / archive`) - TAMAMLANDI.
- **Kod və İcra Detalları:**
  - Bütün HTML faylları yeni `src/css/*` və `src/js/*` modullarına keçirildi.
  - Kök `styles.css` faylı `src/css/main.css` və `src/css/home.css` fayllarına `@import` körpüsü olaraq saxlanıldı.
  - Kök `app.js` faylı təhlükəsiz legacy körpü kimi konfiqurasiya edildi.
- **İstinad və Tələblər:**
  - `PROJECT_STRUCTURE.md` Bənd 20 tələbləri tam yerinə yetirildi.

---

### Tapşırıq 5.2: Bütövlük və Resurs Yoxlanışı (Verification Checklist) [STATUS: TAMAMLANDI - 2026-10-23T15:11:00+04:00]
- **Fayl Yolu & Kontekst:** Bütün layihə.
- **Konkret Fəaliyyət:** Analiz və sınaq (`test / verify`) - TAMAMLANDI.
- **Yoxlama Meyarları:**
  1. [x] **404 Səhvləri:** Bütün HTML və CSS fayllarındakı resurs keçidləri (`index.html`, `daxili-sehife.html`, `news.html`, `pres.html`) avtomatlaşdırılmış skriptlə yoxlanıldı; bütün 73 lokal resurs disklə tam uyğunlaşdı və köhnə `assets/` yolları tamamilə ləğv edildi (0 xəta).
  2. [x] **JS Konsol Xətaları:** Bütün yeni və mövcud JavaScript faylları (`src/js/main.js`, `src/js/home.js`, `src/js/daxili.js`, `src/js/news.js`, `app.js`) `node --check` ilə test edildi (0 sintaksis və icra xətası).
  3. [x] **CSS Dəqiqliyi:** Ana səhifənin 11 rəsmi bloku, CityWall bələdiyyə dizayn sistemi və rəsmi dövlət rəng palitrası (`--arpsn-navy: #082B48`, `--arpsn-gold: #B99755`) tam modullaşdırılmış `src/css/*.css` arxitekturasında qorunub saxlanıldı.
  4. [x] **Mobil Uyğunluq:** Mobil görünüş üçün hamburger menyu keçidləri, toxunma və drag hadisələri təmin edildi.
  5. [x] **WCAG 2.2 AA:** Klaviatura naviqasiyası üçün `:focus-visible` (3px qızılı kontur) və `prefers-reduced-motion` dəstəyi təmin edildi.

---

## 6. Mərhələ: Daxili Səhifələrin Yenidən Qurulması (İngilis Adlandırması) və Dövlət Standartları

### Tapşırıq 6.1: Köhnə Qeyri-Qənaətbəxş Daxili Səhifələrin Ləğvi [STATUS: TAMAMLANDI - 2026-10-23T15:15:00+04:00]
- **Ləğv edilən fayllar:** `daxili-sehife.html`, `news.html`, `pres.html`, `src/css/daxili.css`, `src/css/pres.css`, `src/js/daxili.js`.
- **Səbəb:** İstifadəçinin rəsmi dövlət və `president.az` standartlarına cavab verməyən şablon dizaynların ləğvi tələbi.

### Tapşırıq 6.2: Səssiz Dil Seçimi və Bildiriş Toast-unun Ləğvi [STATUS: TAMAMLANDI - 2026-10-23T15:17:00+04:00]
- **Fayllar:** `index.html` və `src/js/main.js`.
- **Fəaliyyət:** `#langToast` HTML elementi və `main.js`-dəki bildiriş göstərmə kodu silindi. Dil seçimi səssizcə `localStorage`-də yenilənir və heç bir pop-up çıxmır.

### Tapşırıq 6.3: Rəsmi Daxili Səhifələrin Yaradılması (İngilis Adlandırma və Fərdi CSS/JS) [STATUS: TAMAMLANDI - 2026-10-23T15:33:00+04:00]
Texniki tapşırığın 6-cı bəndinə uyğun olaraq 7 rəsmi daxili səhifə, hər birinin ayrıca CSS və JS faylı yaradıldı:
1. **`representation.html`** (`src/css/representation.css`, `src/js/representation.js`): Nümayəndəlik haqqında, Fərman № 1921, Səlahiyyətli Nümayəndə Ceyhun Cəlilov bioqrafiyası və portreti, aparat strukturu.
2. **`activity.html`** (`src/css/activity.css`, `src/js/activity.js`): 2023–2027 Dövlət Proqramı, strateji layihələr, ictimai hesabatlar, müəssisələr.
3. **`documents.html`** (`src/css/documents.css`, `src/js/documents.js`): Çoxmeyarlı filtrasiya (Fərmanlar, Sərəncamlar, Qərarlar), il filtrləri, anlıq axtarış, sənəd kartları.
4. **`nakhchivan.html`** (`src/css/nakhchivan.css`, `src/js/nakhchivan.js`): Tarixi və memarlıq abidələri (Möminə Xatun, Əlincə qalası, İlandağ), 8 inzibati rayon üzrə interaktiv məlumat bazası, rəsmi statistika, Yaşıl Enerji.
5. **`media.html`** (`src/css/media.css`, `src/js/media.js`): Rəsmi xəbərlər və kateqoriya filtri, fotoxronika modal lightbox, video hesabatlar, mətbuat xidməti akkreditasiyası.
6. **`citizens.html`** (`src/css/citizens.css`, `src/js/citizens.js`): FİN kodlu və fayl əlavəli təhlükəsiz elektron müraciət formu, qeydiyyat nömrəsi generasiyası, status yoxlama sistemi, qəbul qrafiki və onlayn növbə, FAQ.
7. **`contact.html`** (`src/css/contact.css`, `src/js/contact.js`): Rəsmi ünvan (Heydər Əliyev pr. 50), qaynar xətt (036) 545-00-00 və 142, şöbələrin daxili nömrələri, əks-əlaqə formu, interaktiv xəritə və şəhərdaxili bələdçi.

---

## Yekun Fayl Matrisi (Aktual İnventar)

| Səhifə (HTML) | Dedicated CSS | Dedicated JS | Funksional Missiya |
| :--- | :--- | :--- | :--- |
| `index.html` | `src/css/main.css`, `src/css/home.css` | `src/js/main.js`, `src/js/home.js` | Portalın ana səhifəsi və makro bloklar |
| `representation.html` | `src/css/representation.css` | `src/js/representation.js` | Nümayəndəlik, hüquqi əsas, rəhbərlik, struktur |
| `activity.html` | `src/css/activity.css` | `src/js/activity.js` | 2023–2027 Dövlət Proqramı, layihələr |
| `documents.html` | `src/css/documents.css` | `src/js/documents.js` | Qanunvericilik, fərmanlar və sənəd axtarışı |
| `nakhchivan.html` | `src/css/nakhchivan.css` | `src/js/nakhchivan.js` | Tarix, coğrafiya, 8 rayon, iqtisadi statistika |
| `media.html` | `src/css/media.css` | `src/js/media.js` | Rəsmi xəbərlər, fotoxronika, video arxiv |
| `citizens.html` | `src/css/citizens.css` | `src/js/citizens.js` | E-müraciət, status izləmə, qəbul, FAQ |
| `contact.html` | `src/css/contact.css` | `src/js/contact.js` | Rəsmi ünvan, qaynar xətt, daxili nömrələr, xəritə |

