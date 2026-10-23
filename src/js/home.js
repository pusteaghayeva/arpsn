/**
 * ARPSN - Rəsmi İnternet Portalı
 * Ana Səhifə İnteraktiv Skriptləri (src/js/home.js)
 * 
 * Məzmun:
 *  1. Hero Slider v3 (Video & Foto, Timer, Pauza, Səs, Proqress)
 *  2. Karusellər (Xidmətlər, Görüşlər və İnkişaf Layihələri - Drag & Scroll)
 *  3. İnteraktiv Xəbər Vitrini (Seçim və Keçid)
 *  4. İnteraktiv Naxçıvan Xəritəsi (Rayon Məlumatları və Çiplər)
 *  5. Statistik Sayğaclar (Scroll IntersectionObserver Count-Up)
 *  6. Səlahiyyətli Nümayəndə / İnzibati Bina Vizuallıq Dəyişdiricisi
 *  7. Müraciət Statusunu Yoxlama
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================================================
    // 01. HERO SLIDER V3 İDARƏETMƏSİ (İnstitusional Model: Foto & Video)
    // ========================================================================
    const v3Data = [
        {
            type: 'photo',
            img: 'src/images/bayraq-meydani-naxcivan.jpg',
            title: 'Dayanıqlı regional inkişaf və güclü dövlətçilik naminə',
            desc: 'Azərbaycan Respublikası Prezidentinin 22 dekabr 2022-ci il tarixli Fərmanı ilə müəyyən edilmiş fəaliyyət istiqamətləri və 2023–2027-ci illər sosial-iqtisadi inkişaf Dövlət Proqramının icrası.',
            btnTxt: 'Ətraflı məlumat <i class="bi bi-arrow-right"></i>',
            btnAction: () => { if (typeof openSubView === 'function') openSubView('rep-about'); }
        },
        {
            type: 'video',
            videoSrc: '',
            poster: 'src/images/elinceqala-naxcivan.jpg',
            title: 'Tarixi İrs və Əlincəqala Əzəməti',
            desc: 'Naxçıvanın minillik zəngin tarixi irsi, bərpa edilən memarlıq inciləri və Əlincə qalasının əzəmətli mənzərəsini əks etdirən rəsmi video icmal.',
            btnTxt: 'Ətraflı məlumat <i class="bi bi-arrow-right"></i>',
            btnAction: () => { if (typeof openSubView === 'function') openSubView('rep-about'); }
        },
        {
            type: 'photo',
            img: 'src/images/ilandag-naxcivan.jpg',
            title: 'Bərpa olunan təmiz enerji və regional layihələr',
            desc: 'Bərpa olunan təmiz enerji stansiyaları, sənaye zonaları və Naxçıvanın regional "Yaşıl Enerji Qovşağı"na çevrilməsi istiqamətində strateji layihələr.',
            btnTxt: 'Ətraflı məlumat <i class="bi bi-arrow-right"></i>',
            btnAction: () => { if (typeof openSubView === 'function') openSubView('act-proj'); }
        },
        {
            type: 'photo',
            img: 'src/images/ali-meclis-bina.jpg',
            title: 'Operativ elektron müraciət və şəffaf dövlət idarəçiliyi',
            desc: 'Vətəndaş müraciətlərinin dərhal qeydiyyatı, Səlahiyyətli Nümayəndənin qəbuluna elektron növbə və real vaxt rejimində icra statusunun izlənməsi.',
            btnTxt: 'Ətraflı məlumat <i class="bi bi-arrow-right"></i>',
            btnAction: () => { if (typeof openSubView === 'function') openSubView('cit-appeal'); }
        }
    ];

    let v3Current = 0;
    let v3Paused = false;
    let v3Progress = 0;
    let v3Interval = null;
    const v3Duration = 6500; // 6.5 saniyə
    const v3Step = 50; // hər 50ms-də yeniləmə

    const v3Img = document.getElementById('v3MainImg');
    const v3Video = document.getElementById('v3MainVideo');
    const v3VideoToggleBtn = document.getElementById('v3VideoToggleBtn');
    const v3VideoSoundIcon = document.getElementById('v3VideoSoundIcon');
    const v3VideoSoundTxt = document.getElementById('v3VideoSoundTxt');
    const v3Title = document.getElementById('v3Title');
    const v3Desc = document.getElementById('v3Desc');
    const v3Btn1 = document.getElementById('v3BtnPrimary');
    const v3PauseBtn = document.getElementById('v3PauseBtn');
    const v3PauseIcon = document.getElementById('v3PauseIcon');
    const v3Tabs = document.querySelectorAll('.hero-v3-tab-item');

    // Canlı video ehtiyat axını (Fallback canvas)
    let v3CanvasStreamActive = false;
    function initCanvasVideoFallback() {
        if (v3CanvasStreamActive || !v3Video) return;
        try {
            const cv = document.createElement('canvas');
            cv.width = 1280; cv.height = 720;
            const ctx = cv.getContext('2d');
            let t = 0;
            function drawAnim() {
                t += 0.015;
                const grad = ctx.createLinearGradient(0, 0, 0, cv.height);
                grad.addColorStop(0, '#0a233a');
                grad.addColorStop(0.5, '#1e3f5a');
                grad.addColorStop(0.8, '#b99755');
                grad.addColorStop(1, '#061828');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, cv.width, cv.height);

                // Dağ silsiləsi (Əlincə relyefi)
                ctx.fillStyle = '#0e2b44';
                ctx.beginPath();
                ctx.moveTo(0, cv.height);
                for (let x = 0; x <= cv.width; x += 30) {
                    const y = cv.height * 0.52 + Math.sin(x * 0.003 + t * 0.15) * 50 + Math.cos(x * 0.007) * 35;
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(cv.width, cv.height);
                ctx.closePath();
                ctx.fill();

                // Ön relyef
                ctx.fillStyle = '#061626';
                ctx.beginPath();
                ctx.moveTo(0, cv.height);
                for (let x = 0; x <= cv.width; x += 25) {
                    const y = cv.height * 0.65 + Math.sin(x * 0.004 - t * 0.25) * 40;
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(cv.width, cv.height);
                ctx.closePath();
                ctx.fill();

                requestAnimationFrame(drawAnim);
            }
            drawAnim();
            if (cv.captureStream) {
                const stream = cv.captureStream(25);
                v3Video.srcObject = stream;
                v3CanvasStreamActive = true;
                v3Video.play().catch(() => {});
            }
        } catch (e) {}
    }

    function setV3Slide(idx) {
        v3Current = (idx + v3Data.length) % v3Data.length;
        const item = v3Data[v3Current];
        v3Progress = 0;

        if (item.type === 'video') {
            if (v3Img) v3Img.style.display = 'none';
            if (v3Video) {
                v3Video.style.display = 'block';
                v3Video.muted = true;
                v3Video.defaultMuted = true;
                if (!v3Video.srcObject && (!v3Video.src || v3Video.src === window.location.href)) {
                    v3Video.src = item.videoSrc || '';
                }
                try {
                    if (v3Video.readyState >= 1) {
                        v3Video.currentTime = 0;
                    }
                } catch (e) {}
                const playPromise = v3Video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(function (err) {
                        v3Video.muted = true;
                        v3Video.play().catch(() => {
                            initCanvasVideoFallback();
                        });
                    });
                }
                setTimeout(() => {
                    if (v3Data[v3Current].type === 'video' && v3Video.currentTime === 0 && !v3Video.srcObject) {
                        initCanvasVideoFallback();
                    }
                }, 2000);
            }
            if (v3VideoToggleBtn) v3VideoToggleBtn.style.display = 'inline-flex';
            if (v3PauseBtn) {
                v3PauseBtn.style.display = 'inline-flex';
                v3Paused = false;
                if (v3PauseIcon) v3PauseIcon.className = 'bi bi-pause-fill';
                v3PauseBtn.title = 'Pauza';
                v3PauseBtn.setAttribute('aria-label', 'Pauza');
            }
        } else {
            if (v3Video) {
                v3Video.pause();
                v3Video.style.display = 'none';
            }
            if (v3VideoToggleBtn) v3VideoToggleBtn.style.display = 'none';
            if (v3PauseBtn) v3PauseBtn.style.display = 'none';
            v3Paused = false;

            if (v3Img) {
                v3Img.style.display = 'block';
                v3Img.style.opacity = '0.80';
                setTimeout(() => {
                    v3Img.src = item.img;
                    v3Img.alt = item.title.replace(/<[^>]+>/g, ' ');
                    v3Img.style.opacity = '1';
                }, 120);
            }
        }

        if (v3Title) {
            v3Title.style.opacity = '0';
            setTimeout(() => {
                v3Title.textContent = item.title;
                v3Title.style.opacity = '1';
            }, 100);
        }
        if (v3Desc) {
            v3Desc.style.opacity = '0';
            setTimeout(() => {
                v3Desc.textContent = item.desc;
                v3Desc.style.opacity = '1';
            }, 100);
        }
        if (v3Btn1) {
            v3Btn1.innerHTML = item.btnTxt;
            v3Btn1.onclick = () => { item.btnAction(); return false; };
        }

        v3Tabs.forEach((tab, i) => {
            const fillEl = document.getElementById(`v3Fill${i}`);
            if (i === v3Current) {
                tab.classList.add('active');
                if (fillEl) fillEl.style.width = '0%';
            } else {
                tab.classList.remove('active');
                if (fillEl) fillEl.style.width = '0%';
            }
        });
    }

    function toggleV3VideoSound() {
        if (!v3Video) return;
        v3Video.muted = !v3Video.muted;
        if (v3VideoSoundIcon && v3VideoSoundTxt) {
            v3VideoSoundIcon.className = v3Video.muted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill';
            v3VideoSoundTxt.textContent = v3Video.muted ? 'Səs' : 'Səssiz';
        }
    }

    function nextV3Slide() { setV3Slide(v3Current + 1); }
    function prevV3Slide() { setV3Slide(v3Current - 1); }

    function toggleV3Pause() {
        v3Paused = !v3Paused;
        if (v3Video && v3Data[v3Current].type === 'video') {
            if (v3Paused) v3Video.pause();
            else v3Video.play().catch(() => {});
        }
        if (v3PauseIcon) {
            v3PauseIcon.className = v3Paused ? 'bi bi-play-fill' : 'bi bi-pause-fill';
        }
        if (v3PauseBtn) {
            v3PauseBtn.title = v3Paused ? 'Davam et' : 'Pauza';
            v3PauseBtn.setAttribute('aria-label', v3Paused ? 'Davam et' : 'Pauza');
        }
    }

    // Prefers-reduced-motion aşkar edildikdə avtomatik pauza
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        v3Paused = true;
    }

    function runV3Timer() {
        if (v3Interval) clearInterval(v3Interval);
        v3Interval = setInterval(() => {
            if (!v3Paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                v3Progress += (v3Step / v3Duration) * 100;
                const activeFill = document.getElementById(`v3Fill${v3Current}`);
                if (activeFill) {
                    activeFill.style.width = `${Math.min(100, v3Progress)}%`;
                }
                if (v3Progress >= 100) {
                    nextV3Slide();
                }
            }
        }, v3Step);
    }

    runV3Timer();

    // Slayder tablarına birbaşa klik
    v3Tabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
            setV3Slide(idx);
        });
    });

    // Qlobal funksiyaları pəncərəyə bağlamaq (HTML inline onclick üçün)
    window.setV3Slide = setV3Slide;
    window.nextV3Slide = nextV3Slide;
    window.prevV3Slide = prevV3Slide;
    window.toggleV3Pause = toggleV3Pause;
    window.toggleV3VideoSound = toggleV3VideoSound;


    // ========================================================================
    // 02. SÜRƏTLİ KEÇİD XİDMƏTLƏRİ KARUSELİ (Drag & Pagination)
    // ========================================================================
    const srvTrack = document.getElementById('servicesCarouselTrack');
    const srvDots = document.querySelectorAll('#servicesCarouselPagination .cw-carousel-dot');

    function updateServicesPagination() {
        if (!srvTrack || !srvDots.length) return;
        const maxScroll = srvTrack.scrollWidth - srvTrack.clientWidth;
        if (maxScroll <= 5) return;
        const scrollRatio = srvTrack.scrollLeft / maxScroll;
        const activePage = scrollRatio > 0.45 ? 1 : 0;
        srvDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activePage);
        });
    }

    function scrollServicesToPage(pageIdx) {
        if (!srvTrack) return;
        const maxScroll = srvTrack.scrollWidth - srvTrack.clientWidth;
        const targetLeft = pageIdx === 0 ? 0 : maxScroll;
        srvTrack.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
    window.scrollServicesToPage = scrollServicesToPage;

    if (srvTrack) {
        let srvPointerId = null;
        let srvStartX = 0;
        let srvScrollLeft = 0;
        let srvHasDragged = false;
        let srvSuppressClickUntil = 0;

        srvTrack.addEventListener('pointerdown', (e) => {
            if (e.pointerType !== 'mouse' || e.button !== 0) return;
            srvPointerId = e.pointerId;
            srvStartX = e.clientX;
            srvScrollLeft = srvTrack.scrollLeft;
            srvHasDragged = false;
            srvTrack.setPointerCapture(srvPointerId);
            srvTrack.classList.add('is-dragging');
        });

        srvTrack.addEventListener('pointermove', (e) => {
            if (e.pointerId !== srvPointerId) return;
            const distance = e.clientX - srvStartX;
            if (Math.abs(distance) > 6) {
                srvHasDragged = true;
                e.preventDefault();
                srvTrack.scrollLeft = srvScrollLeft - distance;
            }
        });

        function finishServicesDrag(e) {
            if (e.pointerId !== srvPointerId) return;
            if (srvHasDragged) srvSuppressClickUntil = performance.now() + 400;
            if (srvTrack.hasPointerCapture(srvPointerId)) srvTrack.releasePointerCapture(srvPointerId);
            srvPointerId = null;
            srvTrack.classList.remove('is-dragging');
        }

        srvTrack.addEventListener('pointerup', finishServicesDrag);
        srvTrack.addEventListener('pointercancel', finishServicesDrag);
        srvTrack.addEventListener('dragstart', (e) => e.preventDefault());

        srvTrack.addEventListener('click', (e) => {
            if (performance.now() < srvSuppressClickUntil) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }, true);

        srvTrack.addEventListener('scroll', updateServicesPagination, { passive: true });
    }


    // ========================================================================
    // 03. RƏSMİ GÖRÜŞLƏR VƏ TƏDBİRLƏR KARUSELİ
    // ========================================================================
    function initEventsCarousel() {
        const track = document.getElementById('eventsCarouselTrack');
        const prevBtn = document.getElementById('eventsPrevBtn');
        const nextBtn = document.getElementById('eventsNextBtn');
        if (!track) return;

        const cards = track.querySelectorAll('.events-slide-card');
        if (!cards.length) return;

        const getStepWidth = () => (cards[0].offsetWidth || 320) + 22;

        function updateEventsControls() {
            if (prevBtn) prevBtn.style.opacity = track.scrollLeft <= 8 ? '0.45' : '1';
            if (nextBtn) {
                const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 12;
                nextBtn.style.opacity = atEnd ? '0.45' : '1';
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
            });
        }

        let isMouseDown = false;
        let mouseStartX = 0;
        let mouseStartScrollLeft = 0;
        let mouseHasDragged = false;

        track.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            isMouseDown = true;
            mouseHasDragged = false;
            mouseStartX = e.pageX - track.offsetLeft;
            mouseStartScrollLeft = track.scrollLeft;
            track.classList.add('is-dragging');
        });

        window.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            const x = e.pageX - track.offsetLeft;
            const walk = (x - mouseStartX);
            if (Math.abs(walk) > 5) {
                mouseHasDragged = true;
                e.preventDefault();
            }
            track.scrollLeft = mouseStartScrollLeft - walk;
        });

        window.addEventListener('mouseup', () => {
            if (!isMouseDown) return;
            isMouseDown = false;
            track.classList.remove('is-dragging');
            setTimeout(() => { mouseHasDragged = false; }, 80);
        });

        track.addEventListener('click', (e) => {
            if (mouseHasDragged) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        track.addEventListener('scroll', updateEventsControls, { passive: true });
        window.addEventListener('resize', updateEventsControls, { passive: true });
        updateEventsControls();
    }
    initEventsCarousel();


    // ========================================================================
    // 04. İNKİŞAF LAYİHƏLƏRİ KARUSELİ
    // ========================================================================
    function initProjectsCarousel() {
        const track = document.getElementById('projectsCarouselTrack');
        const prevBtn = document.getElementById('projectsPrevBtn');
        const nextBtn = document.getElementById('projectsNextBtn');
        if (!track) return;

        const cards = track.querySelectorAll('.pres-project-card');
        if (!cards.length) return;

        const getStepWidth = () => (cards[0].offsetWidth || 320) + 22;

        function updateProjectsControls() {
            if (prevBtn) {
                prevBtn.style.opacity = track.scrollLeft <= 8 ? '0.45' : '1';
                prevBtn.style.pointerEvents = track.scrollLeft <= 8 ? 'none' : 'auto';
            }
            if (nextBtn) {
                const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 12;
                nextBtn.style.opacity = atEnd ? '0.45' : '1';
                nextBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
            });
        }

        let pointerId = null;
        let startX = 0;
        let startScrollLeft = 0;
        let hasDragged = false;
        let suppressClickUntil = 0;

        track.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            pointerId = e.pointerId;
            startX = e.clientX;
            startScrollLeft = track.scrollLeft;
            hasDragged = false;
            track.setPointerCapture(pointerId);
            track.classList.add('is-dragging');
            track.style.scrollBehavior = 'auto';
        });

        track.addEventListener('pointermove', (e) => {
            if (e.pointerId !== pointerId) return;
            const distance = e.clientX - startX;
            if (Math.abs(distance) > 6) {
                hasDragged = true;
                e.preventDefault();
                track.scrollLeft = startScrollLeft - distance;
            }
        });

        function finishProjectDrag(e) {
            if (e.pointerId !== pointerId) return;
            if (hasDragged) suppressClickUntil = performance.now() + 400;
            if (track.hasPointerCapture(pointerId)) track.releasePointerCapture(pointerId);
            pointerId = null;
            track.classList.remove('is-dragging');
            track.style.scrollBehavior = '';
        }

        track.addEventListener('pointerup', finishProjectDrag);
        track.addEventListener('pointercancel', finishProjectDrag);
        track.addEventListener('dragstart', (e) => e.preventDefault());

        track.addEventListener('click', (e) => {
            if (performance.now() < suppressClickUntil) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }, true);

        track.addEventListener('scroll', updateProjectsControls, { passive: true });
        window.addEventListener('resize', updateProjectsControls, { passive: true });
        updateProjectsControls();
    }
    initProjectsCarousel();


    // ========================================================================
    // 05. İNTERAKTİV XƏBƏRLƏR BÖLMƏSİ (Sağ Siyahıdan Sol Vitrinə Keçid)
    // ========================================================================
    const newsArticlesList = [
        {
            img: 'src/images/naxcivan-seher-menzeresi.jpg',
            badge: 'ƏSAS XƏBƏR',
            date: '21 OKTYABR 2026',
            title: 'Naxçıvanın sosial-iqtisadi inkişafı və strateji layihələrin icrası',
            desc: 'Azərbaycan Respublikası Prezidentinin Səlahiyyətli Nümayəndəliyinin koordinasiyası ilə regional inkişaf, 2023–2027 Dövlət Proqramının icrası və təsdiq olunmuş prioritet layihələr üzrə həyata keçirilən tədbirlər barədə ictimai məlumat.'
        },
        {
            img: 'src/images/bayraq-meydani-naxcivan.jpg',
            badge: 'VƏTƏNDAŞ MÜRACİƏTİ',
            date: '20 OKTYABR 2026',
            title: 'Prezidentin Səlahiyyətli Nümayəndəliyində vətəndaşların qəbulu keçirilib',
            desc: 'Səlahiyyətli Nümayəndə Ceyhun Cəlilov tərəfindən vətəndaşlar qəbul edilmiş, ərizə və müraciətlər operativ nəzarətə götürülüb.'
        },
        {
            img: 'src/images/ilandag-naxcivan.jpg',
            badge: 'İQTİSADİ TƏHLİL',
            date: '18 OKTYABR 2026',
            title: 'Naxçıvan Muxtar Respublikasının sosial-iqtisadi göstəriciləri təhlil olunub',
            desc: '2023–2027-ci illər Dövlət Proqramının icra dinamikası və statistik nəticələr müzakirə edilib.'
        },
        {
            img: 'src/images/elinceqala-naxcivan.jpg',
            badge: 'DAYANIQLI İNKİŞAF',
            date: '15 OKTYABR 2026',
            title: 'Yaşıl enerji və dayanıqlı regional infrastruktur layihələrinə baxış keçirilib',
            desc: 'Bərpa olunan enerji gücləri və yeni logistika magistrallarının inşası üzrə monitorinq aparılıb.'
        }
    ];

    let currentActiveNewsIdx = 0;

    function selectNewsArticle(idx) {
        const rightItems = document.querySelectorAll('.news-list-item');
        const targetIdx = (currentActiveNewsIdx === idx) ? 0 : idx;
        const article = newsArticlesList[targetIdx] || newsArticlesList[0];
        currentActiveNewsIdx = targetIdx;

        rightItems.forEach(item => {
            const itemIdx = parseInt(item.getAttribute('data-news-idx'), 10);
            item.classList.toggle('active', itemIdx === targetIdx);
        });

        const mainCard = document.getElementById('featuredNewsCard');
        const mainImg = document.getElementById('newsMainImg');
        const mainBadge = document.getElementById('badgeFeaturedNews');
        const mainDate = document.getElementById('newsMainDate');
        const mainTitle = document.getElementById('newsMainTitle');
        const mainDesc = document.getElementById('newsMainDesc');

        if (mainCard) {
            mainCard.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            mainCard.style.opacity = '0.35';
            mainCard.style.transform = 'scale(0.99)';

            setTimeout(() => {
                if (mainImg) {
                    mainImg.src = article.img;
                    mainImg.alt = article.title;
                }
                if (mainBadge) mainBadge.textContent = article.badge;
                if (mainDate) mainDate.innerHTML = '<i class="bi bi-calendar3 me-1"></i> ' + article.date;
                if (mainTitle) mainTitle.textContent = article.title;
                if (mainDesc) mainDesc.textContent = article.desc;

                mainCard.style.opacity = '1';
                mainCard.style.transform = 'scale(1)';
            }, 180);
        }
    }
    window.selectNewsArticle = selectNewsArticle;

    document.querySelectorAll('.news-list-item').forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const idx = parseInt(item.getAttribute('data-news-idx'), 10);
                selectNewsArticle(idx);
            }
        });
    });


    // ========================================================================
    // 06. İNTERAKTİV NAXÇIVAN RAYON XƏRİTƏSİ (SVG + Rayon Çipləri)
    // ========================================================================
    const mapPaths = document.querySelectorAll('.map-region-path');
    const mapChips = document.querySelectorAll('.map-chip-btn');
    const distTitle = document.getElementById('distTitle');
    const distDesc = document.getElementById('distDesc');
    const distArea = document.getElementById('distArea');
    const distPop = document.getElementById('distPop');
    const distProjects = document.getElementById('distProjects');
    const distStatus = document.getElementById('distStatus');

    const districtTranslations = {
        az: {
            'reg-nakhchivan': { name: 'Naxçıvan şəhəri', area: '191.57 km²', pop: '96 000+ nəfər', projects: '14 layihə', status: 'Plan üzrə davam edir', desc: 'Naxçıvan Muxtar Respublikasının paytaxtı və mühüm inzibati, elmi, sənaye, ali təhsil və mədəniyyət mərkəzidir.' },
            'reg-babek': { name: 'Babək rayonu', area: '828.4 km²', pop: '77 000+ nəfər', projects: '18 layihə', status: 'Aktiv tikinti mərhələsi', desc: 'Aqrar sənaye kompleksləri, intensiv bağçılıq, Sirab suları və müasir suvarma sistemlərinin mühüm mərkəzidir.' },
            'reg-shahbuz': { name: 'Şahbuz rayonu', area: '815 km²', pop: '25 000+ nəfər', projects: '9 layihə', status: 'Plan üzrə davam edir', desc: 'Zəngin mineral su ehtiyatları (Badamlı), Batabat yaylağı, göllər və dağ-ekoturizm klasteridir.' },
            'reg-julfa': { name: 'Culfa rayonu', area: '995 km²', pop: '47 000+ nəfər', projects: '15 layihə', status: 'İcra prosesindədir', desc: 'Beynəlxalq dəmiryol tranzit şəbəkəsi, Dərnəgül sənaye qovşağı, tarixi Əlincə qalası və Gülustan türbəsi yerləşir.' },
            'reg-ordubad': { name: 'Ordubad rayonu', area: '972 km²', pop: '50 000+ nəfər', projects: '12 layihə', status: 'İrs və turizm hədəfi', desc: 'Meyvəçilik, ipəkçilik, zəngin qoruqlar, əsrlik çinarlar və YUNESKO səviyyəli tarixi memarlıq mərkəzidir.' },
            'reg-sharur': { name: 'Şərur rayonu', area: '872 km²', pop: '118 000+ nəfər', projects: '22 layihə', status: 'Yüksək məhsuldarlıq', desc: 'Muxtar respublikanın ən böyük kənd təsərrüfatı, aqrar emal, taxılçılıq və suvarma şəbəkəsinə malik rayonudur.' },
            'reg-kangarli': { name: 'Kəngərli rayonu', area: '682 km²', pop: '33 000+ nəfər', projects: '11 layihə', status: 'İnvestisiya cəlb olunur', desc: 'Bərpa olunan günəş enerjisi stansiyaları, travertin yataqları, aqrar təsərrüfatlar və logistika qovşaqları yerləşir.' },
            'reg-sederek': { name: 'Sədərək rayonu', area: '151.3 km²', pop: '16 000+ nəfər', projects: '7 layihə', status: 'Strateji sərhəd zonası', desc: 'Türkiyə Respublikası ilə həmsərhəd mühüm beynəlxalq tranzit, logistika və gömrük qapısıdır (Sədərək-Dilucu körpüsü).' }
        },
        en: {
            'reg-nakhchivan': { name: 'Nakhchivan City', area: '191.57 km²', pop: '96,000+ residents', projects: '14 projects', status: 'Ongoing on schedule', desc: 'Capital of the Nakhchivan Autonomous Republic and an important administrative, scientific, industrial, higher education and cultural center.' },
            'reg-babek': { name: 'Babek District', area: '828.4 km²', pop: '77,000+ residents', projects: '18 projects', status: 'Active construction stage', desc: 'Major hub of agro-industrial complexes, intensive gardening, Sirab mineral waters and modern irrigation systems.' },
            'reg-shahbuz': { name: 'Shahbuz District', area: '815 km²', pop: '25,000+ residents', projects: '9 projects', status: 'Ongoing on schedule', desc: 'Rich in mineral water resources (Badamli), Batabat alpine plateau, picturesque lakes and mountain ecotourism cluster.' },
            'reg-julfa': { name: 'Julfa District', area: '995 km²', pop: '47,000+ residents', projects: '15 projects', status: 'In implementation process', desc: 'International railway transit hub, Darandag industrial park, historical Alinja Castle and Gulustan mausoleum.' },
            'reg-ordubad': { name: 'Ordubad District', area: '972 km²', pop: '50,000+ residents', projects: '12 projects', status: 'Heritage & tourism focus', desc: 'Horticulture, sericulture, national nature reserves, centuries-old plane trees and UNESCO-caliber historical architecture.' },
            'reg-sharur': { name: 'Sharur District', area: '872 km²', pop: '118,000+ residents', projects: '22 projects', status: 'High agricultural yield', desc: 'The largest agricultural, agro-processing, grain farming and extensive irrigation district in the autonomous republic.' },
            'reg-kangarli': { name: 'Kangarli District', area: '682 km²', pop: '33,000+ residents', projects: '11 projects', status: 'Attracting investment', desc: 'Renewable solar energy power stations, travertine quarries, agro-farms and regional logistics hubs.' },
            'reg-sederek': { name: 'Sadarak District', area: '151.3 km²', pop: '16,000+ residents', projects: '7 projects', status: 'Strategic border zone', desc: 'Bordering the Republic of Turkey, serving as a vital international transit, customs, and transport gate (Sadarak-Diluju bridge).' }
        },
        ru: {
            'reg-nakhchivan': { name: 'Город Нахчыван', area: '191.57 км²', pop: '96 000+ чел.', projects: '14 проектов', status: 'По плану', desc: 'Столица Нахчыванской Автономной Республики, крупный административный, научный, промышленный, университетский и культурный центр.' },
            'reg-babek': { name: 'Бабекский район', area: '828.4 км²', pop: '77 000+ чел.', projects: '18 проектов', status: 'Активное строительство', desc: 'Крупный агропромышленный центр, интенсивное садоводство, минеральные воды Сираб и современные оросительные системы.' },
            'reg-shahbuz': { name: 'Шахбузский район', area: '815 км²', pop: '25 000+ чел.', projects: '9 проектов', status: 'По плану', desc: 'Богатые запасы минеральных вод (Бадамлы), высокогорное плато Батабат, озера и горный экотуристический кластер.' },
            'reg-julfa': { name: 'Джульфинский район', area: '995 км²', pop: '47 000+ чел.', projects: '15 проектов', status: 'В процессе реализации', desc: 'Международный железнодорожный транзитный узел, промышленная зона, историческая крепость Алинджа и мавзолей Гюлистан.' },
            'reg-ordubad': { name: 'Ордубадский район', area: '972 км²', pop: '50 000+ чел.', projects: '12 проектов', status: 'Наследие и туризм', desc: 'Плодоводство, шелководство, заповедники, многовековые чинары и историческая архитектура мирового значения.' },
            'reg-sharur': { name: 'Шарурский район', area: '872 км²', pop: '118 000+ чел.', projects: '22 проекта', status: 'Высокая урожайность', desc: 'Крупнейший аграрный район автономной республики, переработка зерновых культур и обширная оросительная сеть.' },
            'reg-kangarli': { name: 'Кенгерлинский район', area: '682 км²', pop: '33 000+ чел.', projects: '11 проектов', status: 'Привлечение инвестиций', desc: 'Солнечные электростанции, месторождения травертина, агропредприятия и логистические узлы.' },
            'reg-sederek': { name: 'Садаракский район', area: '151.3 km²', pop: '16 000+ чел.', projects: '7 проектов', status: 'Стратегическая граница', desc: 'Граничит с Турецкой Республикой, является важнейшим международным транзитным, таможенным и логистическим коридором.' }
        }
    };

    function activateDistrict(path) {
        if (!path) return;
        mapPaths.forEach(p => p.classList.remove('active'));
        path.classList.add('active');

        const pathId = path.id;
        mapChips.forEach(chip => {
            chip.classList.toggle('active', chip.getAttribute('data-target') === pathId);
        });

        const activeLang = localStorage.getItem('arpsn_lang') || 'az';
        const langData = districtTranslations[activeLang] || districtTranslations.az;
        const distInfo = langData[pathId] || {
            name: path.getAttribute('data-name'),
            desc: path.getAttribute('data-desc'),
            area: path.getAttribute('data-area'),
            pop: path.getAttribute('data-pop'),
            projects: path.getAttribute('data-projects'),
            status: path.getAttribute('data-status')
        };

        if (distTitle) distTitle.textContent = distInfo.name;
        if (distDesc) distDesc.textContent = distInfo.desc;
        if (distArea) distArea.textContent = distInfo.area;
        if (distPop) distPop.textContent = distInfo.pop;
        if (distProjects) distProjects.textContent = distInfo.projects;
        if (distStatus) distStatus.textContent = distInfo.status;
    }
    window.activateDistrict = activateDistrict;

    mapPaths.forEach(path => {
        path.addEventListener('click', () => activateDistrict(path));
        path.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateDistrict(path);
            }
        });
    });

    mapChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const targetId = chip.getAttribute('data-target');
            const targetPath = document.getElementById(targetId);
            if (targetPath) activateDistrict(targetPath);
        });
    });

    // Varsayılan olaraq Naxçıvan şəhərini aktiv et
    const defaultDistrict = document.getElementById('reg-nakhchivan');
    if (defaultDistrict) activateDistrict(defaultDistrict);


    // ========================================================================
    // 07. RƏSMİ STATİSTİK GÖSTƏRİCİLƏR (Scroll Count-Up Animasiyası)
    // ========================================================================
    function initStatCounters() {
        const counterElements = document.querySelectorAll('.stat-counter');
        if (!counterElements.length) return;

        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const formatValue = (val, decimals, separator) => {
            let formatted = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
            if (separator === 'comma') {
                const parts = formatted.split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                formatted = parts.join('.');
            } else if (separator === 'space') {
                formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
            return formatted;
        };

        if (prefersReducedMotion) {
            counterElements.forEach(el => {
                const target = parseFloat(el.getAttribute('data-target'));
                const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
                const separator = el.getAttribute('data-separator') || '';
                el.textContent = formatValue(target, decimals, separator);
            });
            return;
        }

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.getAttribute('data-target'));
                    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
                    const separator = el.getAttribute('data-separator') || '';
                    const duration = 1800; // 1.8 saniyə
                    let startTime = null;

                    function step(currentTime) {
                        if (!startTime) startTime = currentTime;
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3);
                        const currentVal = target * ease;

                        el.textContent = formatValue(currentVal, decimals, separator);

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            el.textContent = formatValue(target, decimals, separator);
                        }
                    }

                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        });

        counterElements.forEach(el => counterObserver.observe(el));
    }
    initStatCounters();


    // ========================================================================
    // 08. SƏLAHİYYƏTLİ NÜMAYƏNDƏ & İNZİBATİ BİNA VİZUALLIQ DƏYİŞDİRİCİSİ
    // ========================================================================
    function setRepVisual(type) {
        const img = document.getElementById('repMainVisualImg');
        const cap = document.getElementById('repMainVisualCap');
        const btnLeader = document.getElementById('btnVisLeader');
        const btnBuilding = document.getElementById('btnVisBuilding');

        if (!img) return;
        img.style.opacity = '0';
        setTimeout(() => {
            if (type === 'leader') {
                img.src = 'src/images/ceyhun-calilov-official.png';
                img.alt = 'Ceyhun Cəlilov - Azərbaycan Respublikası Prezidentinin Səlahiyyətli Nümayəndəsi';
                if (cap) cap.innerHTML = '<i class="bi bi-shield-check text-warning"></i> Ceyhun Cəlilov · Prezidentin Səlahiyyətli Nümayəndəsi';
                if (btnLeader) btnLeader.classList.add('active');
                if (btnBuilding) btnBuilding.classList.remove('active');
            } else {
                img.src = 'src/images/ali-meclis-bina.jpg';
                img.alt = 'Nümayəndəliyin İnzibati Mərkəzi - Ali Məclis Binası';
                if (cap) cap.innerHTML = '<i class="bi bi-geo-alt-fill text-warning"></i> Naxçıvan şəhəri · Rəsmi İnzibati İqamətgah (Ali Məclis)';
                if (btnBuilding) btnBuilding.classList.add('active');
                if (btnLeader) btnLeader.classList.remove('active');
            }
            img.style.opacity = '1';
        }, 180);
    }
    window.setRepVisual = setRepVisual;


    // ========================================================================
    // 09. MÜRACİƏT STATUSUNU YOXLA
    // ========================================================================
    function checkStatusQuery() {
        const input = document.getElementById('statusTrackInput');
        const output = document.getElementById('statusResultOutput');
        if (!input || !output) return;
        const val = (input.value || '').trim();
        if (!val) {
            output.innerHTML = '<div class="alert alert-warning small">Zəhmət olmasa qeydiyyat kodunu daxil edin.</div>';
            return;
        }
        output.innerHTML = `
            <div class="card p-3 border text-start bg-white shadow-sm">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <strong class="text-navy">${val}</strong>
                    <span class="badge bg-success">İCRADADIR</span>
                </div>
                <p class="small text-muted mb-1"><strong>Müraciət tarixi:</strong> 18 Oktyabr 2026</p>
                <p class="small text-muted mb-1"><strong>İcraçı struktur:</strong> Sosial-iqtisadi inkişaf şöbəsi</p>
                <p class="small text-muted mb-0"><strong>Status xülasəsi:</strong> Müraciət qeydiyyata alınmış və aidiyyəti üzrə baxılma mərhələsindədir. Qanunvericilik müddətində yekun cavab bildiriləcəkdir.</p>
            </div>
        `;
    }
    window.checkStatusQuery = checkStatusQuery;

});
