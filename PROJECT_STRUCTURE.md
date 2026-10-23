# ARPSN Layihə Quruluşu və Arxitekturası

Portal Azərbaycan Respublikası Prezidentinin Naxçıvan Muxtar Respublikasında Səlahiyyətli Nümayəndəliyinin rəsmi internet portalıdır (`arpsn.gov.az`).
Layihə `president.az` və `nptm.gov.az` dövlət informasiya arxitekturasına tam uyğunlaşdırılmışdır.

---

## 1. Kataloq Strukturu

Bütün köhnə və təkrarlanan `assets/` qovluqları silinmiş, vahid və standart **`src/`** kataloqu tətbiq edilmişdir.

```text
ARPSN/
├── index.html                 # Ana səhifə (Dövlət Gerbi, Prezident sitatı və fotosu, Hero, Layihələr, Rəqəmlər, Xəbərlər)
│
├── [NÜMAYƏNDƏLİK]
│   ├── about.html             # Haqqında və Missiya (src/css/about.css)
│   ├── statute.html           # Hüquqi Əsaslar / Əsasnamə - Fərman № 1921 (src/css/statute.css)
│   ├── leadership.html        # Səlahiyyətli Nümayəndə Ceyhun Cəlilov & Rəhbərlik (src/css/leadership.css)
│   └── structure.html         # Nümayəndəliyin Aparat Strukturu / Orqanoqram (src/css/structure.css)
│
├── [FƏALİYYƏT]
│   ├── state-program.html     # 2023–2027 Dövlət Proqramı Dashboard (src/css/state-program.css)
│   ├── projects.html          # Regional İnkişaf Layihələri & Tərəqqi (src/css/projects.css)
│   ├── coordination.html      # Qurumlararası Koordinasiya Şurası & İşçi Qrupları (src/css/coordination.css)
│   └── reports.html           # İctimai və Rüblük Monitorinq Hesabatları (src/css/reports.css)
│
├── [SƏNƏDLƏR]
│   └── documents.html         # Rəsmi Sənədlər və Normativ Aktlar Reyestri (src/css/documents.css, src/js/documents.js)
│
├── [NAXÇIVAN]
│   ├── nakhchivan-history.html# Ümumi Məlumat və Tarixi İrs (src/css/nakhchivan-history.css)
│   ├── districts.html         # 8 İnzibati Rayon Kartları və Xəritə (src/css/districts.css)
│   └── statistics.html        # Rəsmi Sosial-İqtisadi Statistika və Qrafiklər (src/css/statistics.css)
│
├── [MEDİA]
│   ├── news.html              # Son Rəsmi Xəbərlər (src/css/news.css, src/js/news.js)
│   ├── photo-gallery.html     # Fotoxronika Albomları (src/css/photo-gallery.css)
│   └── video-gallery.html     # Video Reportajlar və Kino Teatrı (src/css/video-gallery.css)
│
├── [MÜƏSSİSƏLƏR]
│   └── institutions.html      # Tabeli və Əlaqədar Regional Müəssisələr Kataloqu (src/css/institutions.css)
│
├── [VƏTƏNDAŞLAR ÜÇÜN]
│   ├── e-appeal.html          # Elektron Müraciət Xidməti (3 pilləli forma, izləmə kodu) (src/css/e-appeal.css)
│   ├── reception-schedule.html# Rəsmi Vətəndaş Qəbulu Qrafiki (src/css/reception-schedule.css)
│   ├── reception-booking.html # Qəbula Onlayn Növbə / Yazılma Portalı (src/css/reception-booking.css)
│   ├── appeal-status.html     # Müraciət Statusunu Yoxlama Portalı (src/css/appeal-status.css)
│   └── faq.html               # Tez-tez Verilən Suallar (FAQ) və Axtarış (src/css/faq.css)
│
├── [ƏLAQƏ]
│   └── contact.html           # Rəsmi Əlaqə, Şöbələr Cədvəli və Xəritə (src/css/contact.css, src/js/contact.js)
│
├── src/
│   ├── css/
│   │   ├── main.css           # Qlobal dizayn sistemi, naviqasiya, müyəssərlik menyusu stilləri
│   │   ├── home.css           # Ana səhifə stilləri və tam @media sorğuları
│   │   ├── [ dedicated css ]  # Hər bir daxili səhifənin fərdi CSS faylı
│   │   └── vendor/            # Bootstrap, Bootstrap Icons, Font Awesome lokal kitabxanaları
│   ├── js/
│   │   ├── main.js            # Qlobal funksionallıq, səssiz dil seçimi, müyəssərlik mühərriki
│   │   ├── home.js            # Ana səhifə slaydları və interaktiv göstəricilər
│   │   └── vendor/            # Bootstrap lokal scriptləri
│   ├── fonts/                 # Lokal fontlar (Inter, Outfit, Raleway, simvollar)
│   ├── img/                   # Dövlət Gerbi, ASAN, myGov loqoları
│   └── images/                # Rəsmi fotolar (Prezident, Ceyhun Cəlilov, tarixi abidələr)
│
├── robots.txt
└── sitemap.xml
```

---

## 2. Əsas Qaydalar və Standartlar
1. **Sıfır Həştəq (#) Qaydası**: Bütün naviqasiya alt-menyuları birbaşa müstəqil `.html` səhifələrinə bağlanır. Heç bir keçiddə `#` anchor marşrutlaması istifadə olunmur.
2. **Fərqli və Zəngin Dizayn**: Hər bir daxili səhifə `nptm.gov.az` standartlarına uyğun olaraq öz mövzusuna xas unikal vizual struktura malikdir (məs. orqanoqram sxemi, KPI panel, vaxt cədvəli, interaktiv addımlı forma).
3. **Müyəssərlik Menyusu (Accessibility Widget)**: Saytın sol kənarında `nptm.gov.az` nümunəsində olan CERT rəsmi müyəssərlik sistemi və lokal sürüşən panel quraşdırılmışdır (şrift ölçüləri, kontrast rejimləri, disleksiya şrifti, hərəkətlərin dayandırılması).
4. **Desktop Dizayn Baxışı**: İstifadəçinin tələbinə əsasən, daxili səhifələrin ilkin olaraq desktop dizaynı tamamlanmışdır; bəyənildikdən sonra mobil `@media` sorğuları işlənəcəkdir. Ana səhifənin isə mobil `@media` sorğuları artıq 100% tamamlanmışdır.
