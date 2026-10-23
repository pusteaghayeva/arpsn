/**
 * VƏTƏNDAŞLAR ÜÇÜN ELEKTRON XİDMƏTLƏR — İNTERAKTİV LOGİKA
 * ARPSN Rəsmi İnternet Portalı
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Elektron Müraciət Formunun İdarə Edilməsi
    const appealForm = document.getElementById('citizenAppealForm');
    const appealReceipt = document.getElementById('appealReceiptBox');
    const receiptCode = document.getElementById('receiptTrackingCode');
    const fileInput = document.getElementById('appealFileInput');
    const fileNameDisplay = document.getElementById('uploadFileNameDisplay');

    // Fayl seçildikdə adını göstər
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.size > 10 * 1024 * 1024) {
                    alert('Faylın həcmi 10 MB-dan artıq ola bilməz!');
                    fileInput.value = '';
                    fileNameDisplay.innerText = 'Fayl seçilməyib';
                    return;
                }
                fileNameDisplay.innerHTML = `<i class="bi bi-file-earmark-check text-success"></i> <strong>${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
            } else {
                fileNameDisplay.innerText = 'Fayl seçilməyib';
            }
        });
    }

    if (appealForm) {
        appealForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fin = document.getElementById('appealFin').value.trim().toUpperCase();
            const fullName = document.getElementById('appealName').value.trim();
            const phone = document.getElementById('appealPhone').value.trim();
            const email = document.getElementById('appealEmail').value.trim();
            const district = document.getElementById('appealDistrict').value;
            const type = document.getElementById('appealType').value;
            const message = document.getElementById('appealMessage').value.trim();
            const consent = document.getElementById('appealConsent').checked;

            // Sadə validasiyalar
            if (fin.length !== 7) {
                alert('FİN kod 7 simvoldan ibarət olmalıdır!');
                return;
            }
            if (message.length < 20) {
                alert('Müraciətin mətni ən azı 20 simvoldan ibarət olmalıdır!');
                return;
            }
            if (!consent) {
                alert('Fərdi məlumatların emalına razılıq verməlisiniz!');
                return;
            }

            // Unikal qeydiyyat nömrəsi generasiyası (Bənd 8)
            const randomNum = Math.floor(10000 + Math.random() * 90000);
            const trackingNum = `ARPSN-2026-${randomNum}`;

            // Məlumatı lokal bazada saxla (Status yoxlaması üçün)
            const newRecord = {
                trackingCode: trackingNum,
                date: new Date().toLocaleDateString('az-AZ'),
                fullName: fullName,
                fin: fin,
                type: type,
                district: district,
                status: 'Qəbul edildi və icraya yönləndirildi',
                department: 'Sənədlərlə və vətəndaşların müraciətləri ilə iş şöbəsi'
            };

            try {
                let savedAppeals = JSON.parse(localStorage.getItem('arpsn_appeals') || '[]');
                savedAppeals.push(newRecord);
                localStorage.setItem('arpsn_appeals', JSON.stringify(savedAppeals));
            } catch (err) {
                console.error(err);
            }

            // Qəbz pəncərəsini göstər
            if (receiptCode) receiptCode.innerText = trackingNum;
            if (appealReceipt) appealReceipt.style.display = 'block';

            // Formanı təmizlə və qəbzə sürüşdür
            appealForm.reset();
            if (fileNameDisplay) fileNameDisplay.innerText = 'Fayl seçilməyib';
            appealReceipt.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // 2. Müraciət Statusunun Yoxlanması
    const statusForm = document.getElementById('statusCheckForm');
    const statusResultBox = document.getElementById('statusResultBox');

    if (statusForm && statusResultBox) {
        statusForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const queryCode = document.getElementById('statusQueryCode').value.trim().toUpperCase();

            if (!queryCode) {
                alert('Zəhmət olmasa qeydiyyat nömrəsini daxil edin!');
                return;
            }

            // İlkin nümunələr və lokal yaddaşdan axtarış
            let saved = [];
            try {
                saved = JSON.parse(localStorage.getItem('arpsn_appeals') || '[]');
            } catch (err) {}

            const dummyRecords = [
                {
                    trackingCode: 'ARPSN-2026-84920',
                    date: '14.10.2026',
                    fullName: 'Məmmədov Əli Hüseyn oğlu',
                    type: 'Ərizə',
                    district: 'Babək rayonu',
                    status: 'İcrada (Müvafiq quruma sorğu göndərilib)',
                    department: 'Sosial-iqtisadi inkişaf və investisiyalar şöbəsi'
                },
                {
                    trackingCode: 'ARPSN-2026-51204',
                    date: '02.10.2026',
                    fullName: 'Qasımova Nərgiz Kamil qızı',
                    type: 'Təklif',
                    district: 'Naxçıvan şəhəri',
                    status: 'Müsbət həll edildi (Rəsmi cavab göndərildi)',
                    department: 'Hüquq və təhlil şöbəsi'
                }
            ];

            const allRecords = [...saved, ...dummyRecords];
            const found = allRecords.find(item => item.trackingCode === queryCode);

            if (found) {
                statusResultBox.innerHTML = `
                    <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <div>
                            <span class="badge" style="background: var(--arpsn-navy, #082B48); color: var(--arpsn-gold, #B99755); font-size: 13px;">${found.trackingCode}</span>
                            <strong style="margin-left: 10px; color: var(--arpsn-navy, #082B48);">${found.type}</strong>
                        </div>
                        <span style="font-size: 13px; color: #6a7d90;"><i class="bi bi-calendar3"></i> ${found.date}</span>
                    </div>
                    <div style="font-size: 14px; line-height: 1.8; color: #3e5062;">
                        <div><strong>Vətəndaş:</strong> ${found.fullName}</div>
                        <div><strong>İnzibati Ərazi:</strong> ${found.district}</div>
                        <div><strong>Məsul Şöbə:</strong> ${found.department}</div>
                        <div style="margin-top: 10px; padding: 10px 14px; background: #eef7f2; border-left: 4px solid #1a6b47; border-radius: 4px; color: #1a6b47; font-weight: 700;">
                            <i class="bi bi-clock-history me-1"></i> Status: ${found.status}
                        </div>
                    </div>
                `;
                statusResultBox.style.display = 'block';
            } else {
                statusResultBox.innerHTML = `
                    <div style="padding: 16px; background: #fdf2f2; border-left: 4px solid #c93b2b; color: #9c2b1e; font-size: 14px;">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        <strong>"${queryCode}"</strong> nömrəli müraciət tapılmadı. Zəhmət olmasa qeydiyyat nömrəsini düzgün daxil etdiyinizdən əmin olun. (Məsələn: <em>ARPSN-2026-84920</em>)
                    </div>
                `;
                statusResultBox.style.display = 'block';
            }
        });
    }

    // 3. Qəbula Onlayn Yazılma Formu
    const receptionForm = document.getElementById('receptionBookingForm');
    const receptionSuccess = document.getElementById('receptionSuccessBox');

    if (receptionForm) {
        receptionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (receptionSuccess) {
                receptionSuccess.style.display = 'block';
                receptionForm.reset();
                receptionSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // 4. FAQ Accordion İdarəsi
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isOpen = header.classList.contains('active');

            // Bütün digərlərini bağla
            faqHeaders.forEach(h => {
                h.classList.remove('active');
                if (h.nextElementSibling) h.nextElementSibling.style.display = 'none';
            });

            if (!isOpen && body) {
                header.classList.add('active');
                body.style.display = 'block';
            }
        });
    });
});
