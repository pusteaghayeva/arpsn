/**
 * ARPSN RƏSMİ İNTERNET PORTALI — ƏSAS SKRİPT (src/js/main.js)
 * Təyinat: Bütün səhifələr üçün vahid interaktivlər, naviqasiya, axtarış və əlçatanlıq
 */

// Köməkçi seçicilər
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

// 1. Dil Tərcümə Lüğəti və İdarəetməsi (i18n: AZ, EN, RU - Bütün Sayt Bölmələri)
const translations = {
    az: {
        // Topbar & Header
        topAddress: '<i class="bi bi-geo-alt-fill"></i> Naxçıvan şəhəri, Heydər Əliyev prospekti 50',
        topHotline: '<i class="bi bi-telephone-fill"></i> Qaynar xətt: (036) 545-00-00',
        topSearchBtn: '<i class="bi bi-search"></i> <span id="mastheadSearchTxt">Axtarış</span>',
        mastheadSearchTxt: 'Axtarış',
        identitySmall: 'AZƏRBAYCAN RESPUBLİKASI PREZİDENTİNİN',
        identityStrong: 'Naxçıvan Muxtar Respublikasında<br>Səlahiyyətli Nümayəndəliyi',
        quoteText: '“Naxçıvan, eyni zamanda, Azərbaycana bir çox görkəmli şəxsiyyətlər bəxş edib. Naxçıvan Azərbaycan xalqına dahi şəxsiyyət Heydər Əliyev kimi Ulu Öndər bəxş edib”.',
        quoteAuthor: '— İlham Əliyev',

        // Navigation
        navHome: 'Ana səhifə',
        navRep: 'Nümayəndəlik <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAbout: '<i class="bi bi-info-circle"></i> Haqqında və Missiya',
        navStatute: '<i class="bi bi-journal-text"></i> Hüquqi Əsaslar (Əsasnamə)',
        navLeader: '<i class="bi bi-person-badge"></i> Səlahiyyətli Nümayəndə (Ceyhun Cəlilov)',
        navStruct: '<i class="bi bi-diagram-3"></i> Nümayəndəliyin Aparat Strukturu',
        navAct: 'Fəaliyyət <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navStateProg: '<i class="bi bi-calendar3-range"></i> 2023–2027 Dövlət Proqramı',
        navProjects: '<i class="bi bi-buildings"></i> Regional İnkişaf Layihələri',
        navCoord: '<i class="bi bi-diagram-2"></i> Qurumlararası Koordinasiya',
        navReports: '<i class="bi bi-file-earmark-bar-graph"></i> İctimai Hesabatlar',
        navDocs: 'Sənədlər <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAllDocs: '<i class="bi bi-folder2-open"></i> Bütün Rəsmi Sənədlər',
        navDecrees: '<i class="bi bi-file-earmark-check"></i> Fərman və Əsasnamə',
        navProgDocs: '<i class="bi bi-file-earmark-text"></i> Dövlət Proqramları',
        navNakh: 'Naxçıvan <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navHistory: '<i class="bi bi-info-square"></i> Ümumi Məlumat və Tarixi İrs',
        navDistricts: '<i class="bi bi-map-fill"></i> Rayonlar və İnteraktiv Xəritə',
        navStats: '<i class="bi bi-bar-chart-fill"></i> Rəsmi Statistika və Göstəricilər',
        navMedia: 'Media <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navNews: '<i class="bi bi-newspaper"></i> Son Xəbərlər',
        navPhotos: '<i class="bi bi-images"></i> Fotoxronika',
        navVideos: '<i class="bi bi-camera-reels"></i> Video Reportajlar',
        navCit: 'Vətəndaşlar üçün <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAppeal: '<i class="bi bi-envelope-paper-fill"></i> Elektron Müraciət Göndər',
        navSchedule: '<i class="bi bi-calendar-check-fill"></i> Qəbul Qrafiki və Günləri',
        navBooking: '<i class="bi bi-person-check-fill"></i> Qəbula Onlayn Yazılma',
        navStatus: '<i class="bi bi-search"></i> Müraciət Statusunu Yoxla',
        navFaq: '<i class="bi bi-question-circle"></i> Tez-tez Verilən Suallar (FAQ)',
        navContact: 'Əlaqə',

        // Hero Tabs
        heroTabMeta0: '<span>01</span> · STRATEGİYA',
        heroTabLabel0: '2023–2027 Dövlət Proqramı',
        heroTabMeta1: '<span>02</span> · İRS & MƏDƏNİYYƏT',
        heroTabLabel1: 'Tarixi İrs və Əlincəqala',
        heroTabMeta2: '<span>03</span> · YAŞIL ENERJİ',
        heroTabLabel2: 'Bərpa Olunan Enerji Klasteri',
        heroTabMeta3: '<span>04</span> · E-XİDMƏT',
        heroTabLabel3: 'Vətəndaş Kommunikasiyası',

        // Quick Service Cards
        qcTitle1: 'Elektron Müraciət',
        qcDesc1: 'Rəsmi ərizə, təklif və şikayətlərin operativ onlayn qəbulu və cavablandırılması.',
        qcTitle2: 'Qəbula Onlayn Yazılma',
        qcDesc2: 'Səlahiyyətli Nümayəndənin qəbuluna elektron növbə və fərdi görüş qeydiyyatı.',
        qcTitle3: 'Müraciət Statusu',
        qcDesc3: 'Qeydiyyat nömrəsi ilə müraciətin icra vəziyyətinin real vaxtda yoxlanılması.',
        qcTitle4: 'Fərman və Əsasnamə',
        qcDesc4: 'Prezidentin 22 dekabr Fərmanı, Əsasnamə və 2023–2027 sosial-iqtisadi inkişaf planı.',
        qcTitle5: '2023–2027 Proqramı',
        qcDesc5: 'Naxçıvanın sosial-iqtisadi inkişafı üzrə 11 strateji sahə və prioritet layihələr.',
        qcTitle6: 'Aparat Strukturu',
        qcDesc6: 'Nümayəndəliyin rəhbərliyi, struktur şöbələri və icra mexanizmləri.',

        // News Section
        newsSecTitle: 'Son Xəbərlər və Yeniliklər',
        allNewsBtn: 'Bütün xəbərlər →',
        badgeFeaturedNews: 'ƏSAS XƏBƏR',
        newsMainTitle: 'Naxçıvanın sosial-iqtisadi inkişafı və strateji layihələrin icrası',
        newsMainDesc: 'Azərbaycan Respublikası Prezidentinin Səlahiyyətli Nümayəndəliyinin koordinasiyası ilə regional inkişaf, 2023–2027 Dövlət Proqramının icrası və təsdiq olunmuş prioritet layihələr üzrə həyata keçirilən tədbirlər barədə ictimai məlumat.',
        newsReadMore: 'Ətraflı oxu <i class="bi bi-arrow-right"></i>',
        newsTag1: 'VƏTƏNDAŞ MÜRACİƏTİ',
        newsTitle1: 'Prezidentin Səlahiyyətli Nümayəndəliyində vətəndaşların qəbulu keçirilib',
        newsDesc1: 'Səlahiyyətli Nümayəndə Ceyhun Cəlilov tərəfindən vətəndaşlar qəbul edilmiş, ərizə və müraciətlər operativ nəzarətə götürülüb.',
        newsTag2: 'İQTİSADİ TƏHLİL',
        newsTitle2: 'Naxçıvan Muxtar Respublikasının sosial-iqtisadi göstəriciləri təhlil olunub',
        newsDesc2: '2023–2027-ci illər Dövlət Proqramının icra dinamikası və statistik nəticələr müzakirə edilib.',
        newsTag3: 'DAYANIQLI İNKİŞAF',
        newsTitle3: 'Yaşıl enerji və dayanıqlı regional infrastruktur layihələrinə baxış keçirilib',
        newsDesc3: 'Bərpa olunan enerji gücləri və yeni logistika magistrallarının inşası üzrə monitorinq aparılıb.',

        // Activity Section
        btnVisBuilding: '<i class="bi bi-bank2"></i> İnzibati Bina (Ali Məclis)',
        btnVisLeader: '<i class="bi bi-person-badge"></i> Səlahiyyətli Nümayəndə',
        repMainVisualCap: '<i class="bi bi-geo-alt-fill text-warning"></i> Naxçıvan şəhəri · Rəsmi İnzibati İqamətgah (Ali Məclis)',
        actKicker: 'DÖVLƏT İDARƏÇİLİYİ VƏ NƏZARƏT',
        actSecTitle: 'Nümayəndəliyin Fəaliyyət Sahələri və Missiyası',
        actLead: 'Nümayəndəlik dövlət başçısının tapşırıq və qərarlarının vaxtında və keyfiyyətlə icrasını təmin edir, mərkəzi və yerli icra hakimiyyəti orqanlarının fəaliyyətini əlaqələndirir.',
        actDir1Title: 'Siyasətin İcrası',
        actDir1Desc: 'Prezident fərmanlarının və dövlət proqramlarının sahələr üzrə tam icrasına birbaşa nəzarət.',
        actDir2Title: 'Qurumlararası Əlaqə',
        actDir2Desc: 'Nazirliklər, komitələr və yerli strukturlar arasında vahid koordinasiya mühiti.',
        actDir3Title: 'Vətəndaş Hüquqları',
        actDir3Desc: 'Hər bir müraciətin qanuni müddətdə həlli və operativ geri dönüş mexanizmi.',
        actDir4Title: 'Dayanıqlı İnkişaf',
        actDir4Desc: 'İqtisadiyyatın şaxələndirilməsi, yeni iş yerləri və azad ticarət zonalarının formalaşması.',

        // Projects Section
        projKicker: '2023–2027 DÖVLƏT PROQRAMI · STRATEGİK HƏDƏFLƏR',
        projSecTitle: 'İnkişaf layihələri',
        projLead: 'Azərbaycan Respublikası Prezidentinin sərəncam və tapşırıqlarına uyğun olaraq Naxçıvan Muxtar Respublikasında icra olunan prioritet infrastruktur və iqtisadi layihələr.',
        projTitle1: 'Araz Sənaye Parkı və İstehsalat Zonaları',
        projDesc1: 'Modern sənaye klasteri, innovativ istehsalat sahələri və ixracyönümlü emal müəssisələrinin yaradılması.',
        projTitle2: 'Yaşıl Enerji və Günəş Elektrik Stansiyaları',
        projDesc2: 'Naxçıvanın "Yaşıl Enerji Zonası" konsepsiyası çərçivəsində irihəcmli günəş və külək enerjisi parkları.',
        projTitle3: 'Müasir Aqroparklar və Meliorasiya Layihələri',
        projDesc3: 'Müasir suvarma sistemləri, intensiv bağçılıq və kənd təsərrüfatı məhsullarının istehsalının artırılması.',
        projTitle4: 'Nəqliyyat Dəhlizi və Logistika Mərkəzi',
        projDesc4: 'Zəngəzur dəhlizi boyunca multimodal dəmir yolu, avtomagistral qovşaqları və müasir beynəlxalq yük terminalı.',
        projTitle5: 'Turizm və Ekoturizm Klasteri',
        projDesc5: 'Batabat yaylağı, Ağbulaq Xizək Mərkəzi və müalicəvi Duzdağ Fizioterapiya Kompleksi ətrafında müasir infrastruktur.',
        projTitle6: 'Rəqəmsal İnnovasiyalar və Texnopark',
        projDesc6: 'Regionda yüksək texnologiyalar parkı, fiber-optik rabitə şəbəkəsi və dövlət xidmətlərinin tam elektronlaşdırılması.',

        // Macro Statistics
        statTitle1: 'Ümumi ərazi sahəsi',
        statSub1: 'Muxtar respublikanın inzibati coğrafiyası',
        statTitle2: 'Əhali sayı',
        statSub2: 'Rəsmi dövlət qeydiyyatı üzrə',
        statTitle3: 'İnzibati ərazi vahidi',
        statSub3: 'Naxçıvan şəhəri və 7 rayon',
        statUnit3: 'Rayon',
        statTitle4: 'Sənaye istehsalında artım',
        statSub4: 'İllik dinamika və sənaye həcmi',
        statTitle5: 'Yaşıl enerji hədəfi',
        statSub5: 'Bərpa olunan enerji gücü',
        statTitle6: 'Qazlaşdırma və enerji',
        statSub6: 'Yaşayış məntəqələrinin tam təminatı',
        mapSecTitle: 'İnzibati Ərazi Bölgüsü və Rayon İcmalı',

        // Media Section
        mediaSecTitle: 'Rəsmi Görüşlər və Tədbirlər',

        // Useful Links
        usefulKicker: 'RƏSMİ RESURSLAR VƏ PORTALLAR',
        usefulSecTitle: 'Faydalı Keçidlər',

        // Footer
        footerLogoTitle: 'ARPSN',
        footerDesc: 'Naxçıvan Muxtar Respublikasında dövlət siyasətinin vahid mərkəzdən koordinasiyası və regional sosial-iqtisadi inkişafın təminatçısı olan ali rəsmi institut.',
        footerLinks: 'Rəsmi Keçidlər',
        footerServices: 'Vətəndaş Xidmətləri',
        footerContact: 'Rəsmi Əlaqə',
        footerAddress: 'AZ 7000, Naxçıvan şəhəri, Heydər Əliyev prospekti 50',
        footerHotline: 'Qaynar xətt: (036) 545-00-00',
        footerHours: 'B.e. - C. 09:00 - 18:00 (Nahar: 13:00 - 14:00)',
        copyright: '© 2026 Azərbaycan Respublikası Prezidentinin Naxçıvan Muxtar Respublikasında Səlahiyyətli Nümayəndəliyi. Bütün hüquqlar qorunur.',

        // Search & Drawer
        searchPlaceholder: 'Axtarış sözünü daxil edin (məs: qəbul saatları, müraciət, fərman, layihələr)...',
        searchSubmit: '<i class="bi bi-search"></i> <span>Axtar</span>',
        drawerAbout: 'Naxçıvan Muxtar Respublikasında dövlət siyasətinin vahid koordinasiyası, sosial-iqtisadi inkişaf və vətəndaşlarla birbaşa elektron kommunikasiya portalı.',
        drawerQuickTitle: 'SÜRƏTLİ XİDMƏTLƏR',
        drawerContactTitle: 'RƏSMİ ƏLAQƏ'
    },
    en: {
        // Topbar & Header
        topAddress: '<i class="bi bi-geo-alt-fill"></i> 50 Heydar Aliyev Avenue, Nakhchivan city',
        topHotline: '<i class="bi bi-telephone-fill"></i> Hotline: (036) 545-00-00',
        topSearchBtn: '<i class="bi bi-search"></i> <span id="mastheadSearchTxt">Search</span>',
        mastheadSearchTxt: 'Search',
        identitySmall: 'PRESIDENT OF THE REPUBLIC OF AZERBAIJAN',
        identityStrong: 'Authorized Representation in the<br>Nakhchivan Autonomous Republic',
        quoteText: '“Nakhchivan has presented many prominent personalities to Azerbaijan. Nakhchivan bestowed upon the Azerbaijani people the Great Leader Heydar Aliyev.”',
        quoteAuthor: '— Ilham Aliyev',

        // Navigation
        navHome: 'Home',
        navRep: 'Representation <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAbout: '<i class="bi bi-info-circle"></i> About & Mission',
        navStatute: '<i class="bi bi-journal-text"></i> Legal Framework (Statute)',
        navLeader: '<i class="bi bi-person-badge"></i> Authorized Representative (Jeyhun Jalilov)',
        navStruct: '<i class="bi bi-diagram-3"></i> Apparatus Structure',
        navAct: 'Activities <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navStateProg: '<i class="bi bi-calendar3-range"></i> 2023–2027 State Program',
        navProjects: '<i class="bi bi-buildings"></i> Regional Development Projects',
        navCoord: '<i class="bi bi-diagram-2"></i> Inter-Agency Coordination',
        navReports: '<i class="bi bi-file-earmark-bar-graph"></i> Public Reports',
        navDocs: 'Documents <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAllDocs: '<i class="bi bi-folder2-open"></i> All Official Documents',
        navDecrees: '<i class="bi bi-file-earmark-check"></i> Decrees & Statute',
        navProgDocs: '<i class="bi bi-file-earmark-text"></i> State Programs',
        navNakh: 'Nakhchivan <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navHistory: '<i class="bi bi-info-square"></i> General Information & Heritage',
        navDistricts: '<i class="bi bi-map-fill"></i> Districts & Interactive Map',
        navStats: '<i class="bi bi-bar-chart-fill"></i> Official Statistics & Data',
        navMedia: 'Media <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navNews: '<i class="bi bi-newspaper"></i> Latest News',
        navPhotos: '<i class="bi bi-images"></i> Photo Chronicle',
        navVideos: '<i class="bi bi-camera-reels"></i> Video Reports',
        navCit: 'For Citizens <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAppeal: '<i class="bi bi-envelope-paper-fill"></i> Submit E-Appeal',
        navSchedule: '<i class="bi bi-calendar-check-fill"></i> Reception Schedule & Days',
        navBooking: '<i class="bi bi-person-check-fill"></i> Online Appointment Booking',
        navStatus: '<i class="bi bi-search"></i> Check Appeal Status',
        navFaq: '<i class="bi bi-question-circle"></i> Frequently Asked Questions (FAQ)',
        navContact: 'Contact',

        // Hero Tabs
        heroTabMeta0: '<span>01</span> · STRATEGY',
        heroTabLabel0: '2023–2027 State Program',
        heroTabMeta1: '<span>02</span> · HERITAGE & CULTURE',
        heroTabLabel1: 'Historical Heritage & Alinja',
        heroTabMeta2: '<span>03</span> · GREEN ENERGY',
        heroTabLabel2: 'Renewable Energy Cluster',
        heroTabMeta3: '<span>04</span> · E-SERVICES',
        heroTabLabel3: 'Citizen Communication',

        // Quick Service Cards
        qcTitle1: 'Electronic Appeal',
        qcDesc1: 'Prompt online submission, registration and tracking of official citizen applications.',
        qcTitle2: 'Online Appointment',
        qcDesc2: 'Online queue reservation and personal appointment booking with the Authorized Representative.',
        qcTitle3: 'Appeal Status',
        qcDesc3: 'Real-time tracking of appeal execution status via state registration number.',
        qcTitle4: 'Decree & Statute',
        qcDesc4: 'Presidential Decree of Dec 22, Official Statute and 2023–2027 socio-economic development plan.',
        qcTitle5: '2023–2027 Program',
        qcDesc5: '11 strategic areas and priority investment projects for Nakhchivan’s socio-economic growth.',
        qcTitle6: 'Apparatus Structure',
        qcDesc6: 'Executive leadership, structural departments and administrative implementation mechanisms.',

        // News Section
        newsSecTitle: 'Latest News & Press Releases',
        allNewsBtn: 'All news →',
        badgeFeaturedNews: 'MAIN NEWS',
        newsMainTitle: 'Socio-economic development and implementation of strategic projects in Nakhchivan',
        newsMainDesc: 'Public briefing on regional development, implementation of the 2023–2027 State Program, and priority projects coordinated by the Authorized Representation of the President.',
        newsReadMore: 'Read full release <i class="bi bi-arrow-right"></i>',
        newsTag1: 'CITIZEN APPEAL',
        newsTitle1: 'Citizen reception held at the Authorized Representation of the President',
        newsDesc1: 'Authorized Representative Jeyhun Jalilov received citizens; petitions and inquiries were taken under prompt supervisory control.',
        newsTag2: 'ECONOMIC ANALYSIS',
        newsTitle2: 'Socio-economic performance indicators of Nakhchivan AR reviewed',
        newsDesc2: 'Implementation dynamics and statistical outcomes of the 2023–2027 State Program were discussed in detail.',
        newsTag3: 'SUSTAINABLE DEVELOPMENT',
        newsTitle3: 'Inspection conducted on green energy and regional infrastructure projects',
        newsDesc3: 'Field monitoring carried out on renewable energy capacities and construction of new transport arteries.',

        // Activity Section
        btnVisBuilding: '<i class="bi bi-bank2"></i> Administrative Building (Ali Majlis)',
        btnVisLeader: '<i class="bi bi-person-badge"></i> Authorized Representative',
        repMainVisualCap: '<i class="bi bi-geo-alt-fill text-warning"></i> Nakhchivan city · Official Administrative Headquarters (Ali Majlis)',
        actKicker: 'PUBLIC GOVERNANCE & SUPERVISION',
        actSecTitle: 'Scope of Activities and Official Mission',
        actLead: 'The Representation ensures prompt and high-quality implementation of Presidential decisions and coordinates central and local executive authorities.',
        actDir1Title: 'Policy Execution',
        actDir1Desc: 'Direct supervision over full sectoral implementation of Presidential decrees and state programs.',
        actDir2Title: 'Inter-Agency Coordination',
        actDir2Desc: 'Unified coordination environment across ministries, state committees and local authorities.',
        actDir3Title: 'Citizen Rights',
        actDir3Desc: 'Timely statutory processing of every appeal and guaranteed prompt feedback mechanism.',
        actDir4Title: 'Sustainable Growth',
        actDir4Desc: 'Economic diversification, creation of modern employment and establishment of free trade zones.',

        // Projects Section
        projKicker: '2023–2027 STATE PROGRAM · STRATEGIC TARGETS',
        projSecTitle: 'Development Projects',
        projLead: 'Priority infrastructural and economic projects implemented in Nakhchivan AR in line with Presidential decrees and directives.',
        projTitle1: 'Araz Industrial Park and Manufacturing Zones',
        projDesc1: 'Modern industrial cluster, innovative production facilities and export-oriented processing plants.',
        projTitle2: 'Green Energy and Solar Power Stations',
        projDesc2: 'Large-scale solar and wind energy parks within the framework of Nakhchivan’s "Green Energy Zone" vision.',
        projTitle3: 'Modern Agroparks and Melioration Projects',
        projDesc3: 'Advanced irrigation infrastructure, intensive horticulture and enhanced agro-production output.',
        projTitle4: 'Transport Corridor & Logistics Hub',
        projDesc4: 'Multimodal railway, highway junctions and contemporary cargo logistics terminals along the Zangezur corridor.',
        projTitle5: 'Tourism and Ecotourism Cluster',
        projDesc5: 'Contemporary resort facilities around Batabat plateau, Agbulag Ski Center and curative Duzdag Physiotherapy Complex.',
        projTitle6: 'Digital Innovation & Regional Technopark',
        projDesc6: 'Regional high-tech park, high-speed fiber optic network and full digitization of public administrative services.',

        // Macro Statistics
        statTitle1: 'Total Geographic Area',
        statSub1: 'Administrative territory of the Autonomous Republic',
        statTitle2: 'Population',
        statSub2: 'According to official state registry',
        statTitle3: 'Administrative Units',
        statSub3: 'Nakhchivan city and 7 administrative districts',
        statUnit3: 'Districts',
        statTitle4: 'Industrial Growth',
        statSub4: 'Annual industrial dynamics and volume increase',
        statTitle5: 'Green Energy Target',
        statSub5: 'Planned renewable generation capacity',
        statTitle6: 'Gasification & Energy Access',
        statSub6: 'Complete infrastructure coverage of all settlements',
        mapSecTitle: 'Administrative Territorial Division & District Overview',

        // Media Section
        mediaSecTitle: 'Official Meetings and Events',

        // Useful Links
        usefulKicker: 'OFFICIAL RESOURCES & PORTALS',
        usefulSecTitle: 'Useful Links',

        // Footer
        footerLogoTitle: 'ARPSN',
        footerDesc: 'The supreme official institution ensuring coordinated implementation of state policy and regional socio-economic development in the Nakhchivan Autonomous Republic.',
        footerLinks: 'Official Links',
        footerServices: 'Citizen Services',
        footerContact: 'Official Contact',
        footerAddress: '50 Heydar Aliyev Avenue, Nakhchivan city, AZ 7000',
        footerHotline: 'Hotline: (036) 545-00-00',
        footerHours: 'Mon - Fri 09:00 - 18:00 (Lunch: 13:00 - 14:00)',
        copyright: '© 2026 Authorized Representation of the President of the Republic of Azerbaijan in Nakhchivan AR. All rights reserved.',

        // Search & Drawer
        searchPlaceholder: 'Enter search keyword (e.g. reception hours, e-appeal, decree, projects)...',
        searchSubmit: '<i class="bi bi-search"></i> <span>Search</span>',
        drawerAbout: 'Official portal for unified coordination of state policy, socio-economic development and direct citizen electronic communication in Nakhchivan AR.',
        drawerQuickTitle: 'QUICK SERVICES',
        drawerContactTitle: 'OFFICIAL CONTACT'
    },
    ru: {
        // Topbar & Header
        topAddress: '<i class="bi bi-geo-alt-fill"></i> г. Нахчыван, проспект Гейдара Алиева 50',
        topHotline: '<i class="bi bi-telephone-fill"></i> Горячая линия: (036) 545-00-00',
        topSearchBtn: '<i class="bi bi-search"></i> <span id="mastheadSearchTxt">Поиск</span>',
        mastheadSearchTxt: 'Поиск',
        identitySmall: 'ПРЕЗИДЕНТА АЗЕРБАЙДЖАНСКОЙ РЕСПУБЛИКИ',
        identityStrong: 'Полномочное представительство в<br>Нахчыванской Автономной Республике',
        quoteText: '«Нахчыван подарил Азербайджану многих выдающихся личностей. Нахчыван подарил азербайджанскому народу великого лидера Гейдара Алиева».',
        quoteAuthor: '— Ильхам Алиев',

        // Navigation
        navHome: 'Главная',
        navRep: 'Представительство <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAbout: '<i class="bi bi-info-circle"></i> О нас и Миссия',
        navStatute: '<i class="bi bi-journal-text"></i> Правовые основы (Положение)',
        navLeader: '<i class="bi bi-person-badge"></i> Полномочный представитель (Джейхун Джалилов)',
        navStruct: '<i class="bi bi-diagram-3"></i> Структура аппарата',
        navAct: 'Деятельность <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navStateProg: '<i class="bi bi-calendar3-range"></i> Госпрограмма 2023–2027',
        navProjects: '<i class="bi bi-buildings"></i> Региональные проекты развития',
        navCoord: '<i class="bi bi-diagram-2"></i> Межведомственная координация',
        navReports: '<i class="bi bi-file-earmark-bar-graph"></i> Публичные отчеты',
        navDocs: 'Документы <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAllDocs: '<i class="bi bi-folder2-open"></i> Все официальные документы',
        navDecrees: '<i class="bi bi-file-earmark-check"></i> Указы и Положение',
        navProgDocs: '<i class="bi bi-file-earmark-text"></i> Государственные программы',
        navNakh: 'Нахчыван <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navHistory: '<i class="bi bi-info-square"></i> Общая информация и наследие',
        navDistricts: '<i class="bi bi-map-fill"></i> Районы и интерактивная карта',
        navStats: '<i class="bi bi-bar-chart-fill"></i> Официальная статистика',
        navMedia: 'Медиа <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navNews: '<i class="bi bi-newspaper"></i> Последние новости',
        navPhotos: '<i class="bi bi-images"></i> Фотохроника',
        navVideos: '<i class="bi bi-camera-reels"></i> Видеорепортажи',
        navCit: 'Для граждан <i class="bi bi-chevron-down" style="font-size: 9px;"></i>',
        navAppeal: '<i class="bi bi-envelope-paper-fill"></i> Электронное обращение',
        navSchedule: '<i class="bi bi-calendar-check-fill"></i> График и дни приема',
        navBooking: '<i class="bi bi-person-check-fill"></i> Онлайн-запись на прием',
        navStatus: '<i class="bi bi-search"></i> Проверить статус обращения',
        navFaq: '<i class="bi bi-question-circle"></i> Часто задаваемые вопросы (FAQ)',
        navContact: 'Контакты',

        // Hero Tabs
        heroTabMeta0: '<span>01</span> · СТРАТЕГИЯ',
        heroTabLabel0: 'Госпрограмма 2023–2027',
        heroTabMeta1: '<span>02</span> · НАСЛЕДИЕ И КУЛЬТУРА',
        heroTabLabel1: 'Историческое наследие',
        heroTabMeta2: '<span>03</span> · ЗЕЛЕНАЯ ЭНЕРГИЯ',
        heroTabLabel2: 'Кластер чистой энергии',
        heroTabMeta3: '<span>04</span> · Э-УСЛУГИ',
        heroTabLabel3: 'Коммуникация с гражданами',

        // Quick Service Cards
        qcTitle1: 'Электронное обращение',
        qcDesc1: 'Оперативный онлайн-прием заявлений, предложений и жалоб граждан.',
        qcTitle2: 'Онлайн-запись на прием',
        qcDesc2: 'Электронная очередь и предварительная запись на личный прием к Полномочному представителю.',
        qcTitle3: 'Статус обращения',
        qcDesc3: 'Проверка статуса исполнения обращения в реальном времени по регистрационному номеру.',
        qcTitle4: 'Указ и Положение',
        qcDesc4: 'Указ Президента от 22 декабря, Положение и план развития на 2023–2027 годы.',
        qcTitle5: 'Программа 2023–2027',
        qcDesc5: '11 стратегических направлений и ключевые приоритетные проекты Нахчывана.',
        qcTitle6: 'Структура аппарата',
        qcDesc6: 'Руководство Представительства, структурные подразделения и механизмы исполнения.',

        // News Section
        newsSecTitle: 'Последние новости и события',
        allNewsBtn: 'Все новости →',
        badgeFeaturedNews: 'ГЛАВНАЯ НОВОСТЬ',
        newsMainTitle: 'Социально-экономическое развитие и реализация стратегических проектов в Нахчыване',
        newsMainDesc: 'Публичная информация о региональном развитии, реализации Государственной программы на 2023–2027 годы и приоритетных проектах при координации Полномочного представительства Президента.',
        newsReadMore: 'Подробнее <i class="bi bi-arrow-right"></i>',
        newsTag1: 'ОБРАЩЕНИЕ ГРАЖДАН',
        newsTitle1: 'В Полномочном представительстве Президента проведен прием граждан',
        newsDesc1: 'Полномочный представитель Джейхун Джалилов принял граждан; все заявления взяты на оперативный контроль.',
        newsTag2: 'ЭКОНОМИЧЕСКИЙ АНАЛИЗ',
        newsTitle2: 'Проанализированы социально-экономические показатели Нахчыванской АР',
        newsDesc2: 'Обсуждены динамика реализации Государственной программы 2023–2027 годов и статистические результаты.',
        newsTag3: 'УСТОЙЧИВОЕ РАЗВИТИЕ',
        newsTitle3: 'Состоялся осмотр проектов зеленой энергии и инфраструктуры',
        newsDesc3: 'Проведен мониторинг мощностей возобновляемой энергии и строительства новых транспортных артерий.',

        // Activity Section
        btnVisBuilding: '<i class="bi bi-bank2"></i> Административное здание (Али Меджлис)',
        btnVisLeader: '<i class="bi bi-person-badge"></i> Полномочный представитель',
        repMainVisualCap: '<i class="bi bi-geo-alt-fill text-warning"></i> г. Нахчыван · Официальная резиденция (Али Меджлис)',
        actKicker: 'ГОСУДАРСТВЕННОЕ УПРАВЛЕНИЕ И КОНТРОЛЬ',
        actSecTitle: 'Сферы деятельности и миссия Представительства',
        actLead: 'Представительство обеспечивает своевременное и качественное исполнение решений главы государства и координирует деятельность органов исполнительной власти.',
        actDir1Title: 'Исполнение политики',
        actDir1Desc: 'Непосредственный контроль за полной реализацией указов Президента и госпрограмм.',
        actDir2Title: 'Межведомственная координация',
        actDir2Desc: 'Единая координационная среда между министерствами, комитетами и местными структурами.',
        actDir3Title: 'Права граждан',
        actDir3Desc: 'Рассмотрение каждого обращения в законные сроки и оперативная обратная связь.',
        actDir4Title: 'Устойчивое развитие',
        actDir4Desc: 'Диверсификация экономики, создание новых рабочих мест и зон свободной торговли.',

        // Projects Section
        projKicker: 'ГОСПРОГРАММА 2023–2027 · СТРАТЕГИЧЕСКИЕ ЦЕЛИ',
        projSecTitle: 'Проекты развития',
        projLead: 'Приоритетные инфраструктурные и экономические проекты, реализуемые в Нахчыванской АР в соответствии с указами Президента.',
        projTitle1: 'Промышленный парк «Араз» и производственные зоны',
        projDesc1: 'Современный промышленный кластер, инновационные производства и экспортоориентированные предприятия.',
        projTitle2: 'Зеленая энергия и солнечные электростанции',
        projDesc2: 'Крупные парки солнечной и ветровой энергии в рамках концепции «Зоны зеленой энергии» Нахчывана.',
        projTitle3: 'Современные агропарки и мелиоративные проекты',
        projDesc3: 'Передовые оросительные системы, интенсивное садоводство и увеличение объема агропроизводства.',
        projTitle4: 'Транспортный коридор и логистический центр',
        projDesc4: 'Мультимодальная железная дорога, автомагистральные развязки и международный грузовой терминал вдоль Зангезурского коридора.',
        projTitle5: 'Туристический и экотуристический кластер',
        projDesc5: 'Современная инфраструктура вокруг плато Батабат, лыжного центра Агбулаг и физиотерапевтического комплекса Дуздаг.',
        projTitle6: 'Цифровые инновации и технопарк',
        projDesc6: 'Региональный парк высоких технологий, оптоволоконная сеть и полная цифровизация госуслуг.',

        // Macro Statistics
        statTitle1: 'Общая площадь территории',
        statSub1: 'Административная география автономной республики',
        statTitle2: 'Численность населения',
        statSub2: 'По данным официального госреестра',
        statTitle3: 'Административно-территориальные единицы',
        statSub3: 'Город Нахчыван и 7 районов',
        statUnit3: 'Районов',
        statTitle4: 'Рост промышленного производства',
        statSub4: 'Годовая динамика и объем промышленности',
        statTitle5: 'Цель зеленой энергии',
        statSub5: 'Мощность возобновляемой энергии',
        statTitle6: 'Газификация и энергоснабжение',
        statSub6: 'Полный охват населенных пунктов',
        mapSecTitle: 'Административное деление и обзор районов',

        // Media Section
        mediaSecTitle: 'Официальные встречи и мероприятия',

        // Useful Links
        usefulKicker: 'ОФИЦИАЛЬНЫЕ РЕСУРСЫ И ПОРТАЛЫ',
        usefulSecTitle: 'Полезные ссылки',

        // Footer
        footerLogoTitle: 'ARPSN',
        footerDesc: 'Высший официальный институт, обеспечивающий единую координацию государственной политики и социально-экономическое развитие в Нахчыванской АР.',
        footerLinks: 'Официальные ссылки',
        footerServices: 'Услуги для граждан',
        footerContact: 'Официальные контакты',
        footerAddress: 'AZ 7000, г. Нахчыван, проспект Гейдара Алиева 50',
        footerHotline: 'Горячая линия: (036) 545-00-00',
        footerHours: 'Пн - Пт 09:00 - 18:00 (Обед: 13:00 - 14:00)',
        copyright: '© 2026 Полномочное представительство Президента Азербайджанской Республики в Нахчыванской АР. Все права защищены.',

        // Search & Drawer
        searchPlaceholder: 'Введите слово для поиска (напр.: часы приема, обращение, указ, проекты)...',
        searchSubmit: '<i class="bi bi-search"></i> <span>Поиск</span>',
        drawerAbout: 'Официальный портал единой координации госполитики, социально-экономического развития и прямой электронной связи с гражданами в Нахчыванской АР.',
        drawerQuickTitle: 'БЫСТРЫЕ УСЛУГИ',
        drawerContactTitle: 'ОФИЦИАЛЬНЫЕ КОНТАКТЫ'
    }
};

function applyLanguage(lang) {
    if (!translations[lang]) lang = 'az';
    const t = translations[lang];
    document.documentElement.lang = lang;

    // 1. Avtomatik ID üzrə bütün elementlərin yenilənməsi
    Object.keys(t).forEach(key => {
        const el = document.getElementById(key);
        if (el) {
            el.innerHTML = t[key];
        }
    });

    // 2. data-i18n atributu olan istənilən elementin yenilənməsi
    $$('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    // 3. Xüsusi selektorlar və daxili bölmələr
    const idSmall = $('.identity-text small'); if (idSmall) idSmall.innerHTML = t.identitySmall;
    const idStrong = $('.identity-text strong'); if (idStrong) idStrong.innerHTML = t.identityStrong;
    const qText = $('#presidentQuote') || $('.president-quote-box blockquote p') || $('.president-quote-box blockquote'); 
    if (qText) qText.innerHTML = t.quoteText;
    const qAuth = $('#presidentCite') || $('.president-quote-box cite'); if (qAuth) qAuth.innerHTML = t.quoteAuthor;

    // Naviqasiya linkləri
    const setHtml = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
    setHtml('#navLinkHome', t.navHome);
    setHtml('#navLinkRep', t.navRep);
    setHtml('.dropdown-item-cw[href="about.html"]', t.navAbout);
    setHtml('.dropdown-item-cw[href="statute.html"]', t.navStatute);
    setHtml('.dropdown-item-cw[href="leadership.html"]', t.navLeader);
    setHtml('.dropdown-item-cw[href="structure.html"]', t.navStruct);
    
    setHtml('#navLinkAct', t.navAct);
    setHtml('.dropdown-item-cw[href="state-program.html"]', t.navStateProg);
    setHtml('.dropdown-item-cw[href="projects.html"]', t.navProjects);
    setHtml('.dropdown-item-cw[href="coordination.html"]', t.navCoord);
    setHtml('.dropdown-item-cw[href="reports.html"]', t.navReports);

    setHtml('#navLinkDocs', t.navDocs);
    setHtml('.dropdown-item-cw[href="documents.html"]', t.navAllDocs);
    setHtml('#navLinkNakh', t.navNakh);
    setHtml('.dropdown-item-cw[href="nakhchivan-history.html"]', t.navHistory);
    setHtml('.dropdown-item-cw[href="districts.html"]', t.navDistricts);
    setHtml('.dropdown-item-cw[href="statistics.html"]', t.navStats);

    setHtml('#navLinkMedia', t.navMedia);
    setHtml('.dropdown-item-cw[href="news.html"]', t.navNews);
    setHtml('.dropdown-item-cw[href="photo-gallery.html"]', t.navPhotos);
    setHtml('.dropdown-item-cw[href="video-gallery.html"]', t.navVideos);

    setHtml('#navLinkCit', t.navCit);
    setHtml('.dropdown-item-cw[href="e-appeal.html"]', t.navAppeal);
    setHtml('.dropdown-item-cw[href="reception-schedule.html"]', t.navSchedule);
    setHtml('.dropdown-item-cw[href="reception-booking.html"]', t.navBooking);
    setHtml('.dropdown-item-cw[href="appeal-status.html"]', t.navStatus);
    setHtml('.dropdown-item-cw[href="faq.html"]', t.navFaq);
    setHtml('#navLinkContact', t.navContact);

    // Hero Tabs
    const v3Fill0 = $('#v3Fill0');
    if (v3Fill0) {
        const tab0 = v3Fill0.closest('.hero-v3-tab-item');
        if (tab0) {
            const meta = tab0.querySelector('.v3-tab-meta'); if (meta) meta.innerHTML = t.heroTabMeta0;
            const lbl = tab0.querySelector('.v3-tab-label'); if (lbl) lbl.textContent = t.heroTabLabel0;
        }
    }
    const v3Fill1 = $('#v3Fill1');
    if (v3Fill1) {
        const tab1 = v3Fill1.closest('.hero-v3-tab-item');
        if (tab1) {
            const meta = tab1.querySelector('.v3-tab-meta'); if (meta) meta.innerHTML = t.heroTabMeta1;
            const lbl = tab1.querySelector('.v3-tab-label'); if (lbl) lbl.textContent = t.heroTabLabel1;
        }
    }
    const v3Fill2 = $('#v3Fill2');
    if (v3Fill2) {
        const tab2 = v3Fill2.closest('.hero-v3-tab-item');
        if (tab2) {
            const meta = tab2.querySelector('.v3-tab-meta'); if (meta) meta.innerHTML = t.heroTabMeta2;
            const lbl = tab2.querySelector('.v3-tab-label'); if (lbl) lbl.textContent = t.heroTabLabel2;
        }
    }
    const v3Fill3 = $('#v3Fill3');
    if (v3Fill3) {
        const tab3 = v3Fill3.closest('.hero-v3-tab-item');
        if (tab3) {
            const meta = tab3.querySelector('.v3-tab-meta'); if (meta) meta.innerHTML = t.heroTabMeta3;
            const lbl = tab3.querySelector('.v3-tab-label'); if (lbl) lbl.textContent = t.heroTabLabel3;
        }
    }

    // Axtarış xanası və formlar
    const searchInp = document.getElementById('citizenSearchQuery');
    if (searchInp && t.searchPlaceholder) {
        searchInp.placeholder = t.searchPlaceholder;
    }

    // Footer Sütun Başlıqları
    const fCols = $$('.footer-col h4');
    if (fCols.length >= 3) {
        fCols[0].textContent = t.footerLinks;
        fCols[1].textContent = t.footerServices;
        fCols[2].textContent = t.footerContact;
    }
    const cpr = $('.bottom-footer p, .footer-bottom-copy, #footerCopy');
    if (cpr) cpr.textContent = t.copyright;

    // Səhifəyə məxsus skriptlər üçün qlobal hadisə
    window.dispatchEvent(new CustomEvent('arpsn:langchange', { detail: { lang, t } }));
}

function initLanguageSwitcher() {
    const langBtns = $$('.top-langs .lang-btn, .langs span, .langs b');
    const savedLang = localStorage.getItem('arpsn_lang') || 'az';

    langBtns.forEach(btn => {
        const lang = (btn.getAttribute('data-lang') || btn.textContent).trim().toLowerCase();
        btn.classList.toggle('active', lang === savedLang);
    });

    applyLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selected = (e.currentTarget.getAttribute('data-lang') || e.currentTarget.textContent).trim().toLowerCase();
            localStorage.setItem('arpsn_lang', selected);
            langBtns.forEach(b => {
                const l = (b.getAttribute('data-lang') || b.textContent).trim().toLowerCase();
                b.classList.toggle('active', l === selected);
            });
            applyLanguage(selected);
        });
    });
}

// 2. Mobil Menyu Tənzimləməsi
function initMobileMenu() {
    const toggler = $('#mainMenuToggle') || $('#menuToggle');
    const navList = $('#mainNavList') || $('#menu');

    if (toggler && navList) {
        toggler.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('open');
            toggler.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Mobil dropdown-lar
    $$('.navbar-details .nav-item').forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu-cw');
        if (link && dropdown && window.innerWidth < 992) {
            link.addEventListener('click', (e) => {
                if (dropdown) {
                    e.preventDefault();
                    dropdown.classList.toggle('show');
                }
            });
        }
    });
}

// 3. Səhifə Yuxarı Sürüşdürmə (SVG Circle Progress)
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

    const updateProgress = () => {
        const scroll = window.pageYOffset || document.documentElement.scrollTop || 0;
        const height = (document.documentElement.scrollHeight - window.innerHeight) || 1;
        const progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
        progressWrap.classList.toggle('active-progress', scroll > 50);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    progressWrap.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 4. Qlobal Axtarış Modalı
function openSearchModal() {
    const modal = $('#citizenSearchModal') || $('#searchModalOverlay');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        const input = modal.querySelector('.citizen-search-input') || modal.querySelector('input');
        if (input) setTimeout(() => input.focus(), 100);
    }
}

function closeSearchModal() {
    const modal = $('#citizenSearchModal') || $('#searchModalOverlay');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// 5. İnstitusional Keçidlər və Səhifə Yönləndirməsi
function openSubView(viewKey) {
    const routeMap = {
        'rep-about': 'about.html',
        'rep-structure': 'structure.html',
        'rep-leadership': 'leadership.html',
        'rep-legal': 'statute.html',
        'act-prog': 'state-program.html',
        'act-proj': 'projects.html',
        'act-coordination': 'coordination.html',
        'act-reports': 'reports.html',
        'cit-appeal': 'e-appeal.html',
        'cit-booking': 'reception-booking.html',
        'cit-schedule': 'reception-schedule.html',
        'cit-status': 'appeal-status.html',
        'cit-faq': 'faq.html',
        'media-news': 'news.html',
        'media-photo': 'photo-gallery.html',
        'media-video': 'video-gallery.html',
        'nakh-history': 'nakhchivan-history.html',
        'nakh-districts': 'districts.html',
        'nakh-stats': 'statistics.html',
        'contact-info': 'contact.html'
    };

    const targetUrl = routeMap[viewKey];
    if (targetUrl) {
        window.location.href = targetUrl;
        return;
    }

    const modal = $('#instSubViewModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeSubView() {
    const modal = $('#instSubViewModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// 6. Yan Tez Keçid Çəkməcəsi (Offcanvas Quick Drawer)
function openQuickDrawer() {
    const drawer = $('#offcanvasDrawer');
    const overlay = $('#drawerOverlay');
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeQuickDrawer() {
    const drawer = $('#offcanvasDrawer');
    const overlay = $('#drawerOverlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Global hadisə dinləyiciləri (ESC və overlay xaric klik)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSearchModal();
        closeSubView();
        closeQuickDrawer();
    }
});

window.addEventListener('click', (e) => {
    const searchModal = $('#citizenSearchModal') || $('#searchModalOverlay');
    const instModal = $('#instSubViewModal');
    const drawerOverlay = $('#drawerOverlay');
    if (e.target === searchModal) closeSearchModal();
    if (e.target === instModal) closeSubView();
    if (e.target === drawerOverlay) closeQuickDrawer();
});

// Qlobal pəncərə funksiyaları kimi qeydiyyat
window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.openSubView = openSubView;
window.closeSubView = closeSubView;
window.openQuickDrawer = openQuickDrawer;
window.closeQuickDrawer = closeQuickDrawer;

// DOMContentLoaded başlatması
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initMobileMenu();
    initScrollProgress();
});

