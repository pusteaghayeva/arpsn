/**
 * NAXÇIVAN MUXTAR RESPUBLİKASI — İNTERAKTİV LOGİKA
 * ARPSN Rəsmi İnternet Portalı
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. İnzibati Rayonlar İnteraktiv Məlumat Bazası
    const districtData = {
        'naxcivan': {
            name: 'Naxçıvan Şəhəri (Paytaxt)',
            area: '191.57 km²',
            population: '96,200 nəfər',
            settlements: '5 şəhərətrafı qəsəbə və kənd',
            center: 'Naxçıvan şəhəri (Muxtar Respublikanın İnzibati Paytaxtı)',
            economy: 'İnzibati idarəetmə, sənaye müəssisələri, ali təhsil və səhiyyə ocaqları, logistika mərkəzi',
            desc: 'Naxçıvan Muxtar Respublikasının qədim paytaxtı, Şərqin ən möhtəşəm mədəniyyət, təhsil və elm ocaqlarından biridir. Möminə Xatun, Nuh Peyğəmbərin türbəsi, Cümə məscidi və Hüseyn Cavidin məqbərəsi bu şəhərdə ucalır.'
        },
        'serur': {
            name: 'Şərur Rayonu',
            area: '872.26 km²',
            population: '118,500 nəfər',
            settlements: '1 şəhər (Şərur), 65 kənd',
            center: 'Şərur şəhəri',
            economy: 'Aqrar sektor, taxılçılıq, tərəvəzçilik, çəltikçilik, qida sənayesi emalı',
            desc: 'Naxçıvanın ən böyük kənd təsərrüfatı rayonu və qədim yaşayış məskənlərindən biridir. Arpaçay su anbarı və suvarma şəbəkəsi vasitəsilə ərzaq təhlükəsizliyində strateji çəkiyə malikdir.'
        },
        'babek': {
            name: 'Babək Rayonu',
            area: '828.42 km²',
            population: '76,800 nəfər',
            settlements: '1 şəhər (Babək), 2 qəsəbə, 33 kənd',
            center: 'Babək şəhəri',
            economy: 'Müasir aqroparklar, mineral su istehsalı (Sirab müəssisəsi), taxılçılıq və bağçılıq',
            desc: 'Paytaxt Naxçıvan şəhərini dövrələyən strateji rayon. Dünyaca məşhur təbii müalicəvi Sirab mineral su yataqları və Naxçıvan Beynəlxalq Hava Limanının aerodrom zolağının bir hissəsi burada yerləşir.'
        },
        'ordubad': {
            name: 'Ordubad Rayonu',
            area: '978.99 km²',
            population: '51,400 nəfər',
            settlements: '1 şəhər (Ordubad), 3 qəsəbə, 43 kənd',
            center: 'Ordubad şəhəri (Qoruq-Şəhər)',
            economy: 'Meyvəçilik (limon, qoz, qaysı), ipəkçilik, arıçılıq, zəngin mis-molibden və qızıl yataqları',
            desc: 'Azərbaycanın qorunan tarixi incisi. Gəmiqaya qayaüstü rəsmləri, qədim kəhrizlər sistemi, Çinar meydanı və zəngin bio-müxtəlifliyi ilə UNESCO səviyyəsində irs dəyərinə malikdir.'
        },
        'culfa': {
            name: 'Culfa Rayonu',
            area: '993.84 km²',
            population: '47,500 nəfər',
            settlements: '1 şəhər (Culfa), 22 kənd',
            center: 'Culfa şəhəri',
            economy: 'Dəmir yolu və beynəlxalq tranzit kəsişməsi, təbii mineral ehtiyatlar (Darıdağ mədəni), heyvandarlıq',
            desc: 'Naxçıvanın əfsanəvi Əlincə qalası, Xanəgah memarlıq kompleksi və tarixi İpək Yolu karvan yollarının kəsişdiyi strateji nəqliyyat qovşağıdır. Zəngəzur dəhlizinin açılması ilə beynəlxalq tranzit logistik mərkəzə çevrilir.'
        },
        'kengerli': {
            name: 'Kəngərli Rayonu',
            area: '682.00 km²',
            population: '33,200 nəfər',
            settlements: '1 qəsəbə (Qıvraq), 10 kənd',
            center: 'Qıvraq qəsəbəsi',
            economy: 'Günəş fotoelektrik stansiyaları, travertin və mərmər daş karxanaları, heyvandarlıq',
            desc: 'Qarabağlar türbə kompleksi kimi şah memarlıq abidəsini qoynunda saxlayan, yüksək günəş radiasiyası hesabına Naxçıvanın "Yaşıl Enerji Zonası" təşəbbüslərinin əsas mərkəzlərindəndir.'
        },
        'sahbuz': {
            name: 'Şahbuz Rayonu',
            area: '814.97 km²',
            population: '25,800 nəfər',
            settlements: '1 şəhər (Şahbuz), 1 qəsəbə, 22 kənd',
            center: 'Şahbuz şəhəri',
            economy: 'Təbii mineral sular (Badamlı fabriki), Batabat dağ turizmi, arıçılıq və heyvandarlıq',
            desc: 'Naxçıvanın ən uca dağlıq rayonu. Batabat yaylağı, "Üzən Ada" təbii gölü, Zorbulaq və bənzərsiz alp çəmənlikləri ilə ekoturizm və müalicəvi kurort potensialına sahibdir.'
        },
        'sederek': {
            name: 'Sədərək Rayonu',
            area: '151.34 km²',
            population: '16,300 nəfər',
            settlements: '1 qəsəbə (Heydərabad), 3 kənd',
            center: 'Heydərabad qəsəbəsi',
            economy: 'Sərhəd ticarəti və logistika (Sədərək-Dilucu gömrük keçid məntəqəsi), üzümçülük, taxılçılıq',
            desc: 'Türkiyə Cümhuriyyəti ilə quru sərhədinə malik olan və "Ümid körpüsü" vasitəsilə qardaş ölkəyə bağlanan qəhrəman sərhəd qalası. Tarixən Naxçıvanın müdafiə sipəri olmuşdur.'
        }
    };

    const tabButtons = document.querySelectorAll('.district-tab-btn');
    const districtCard = document.getElementById('districtDetailCard');

    if (tabButtons.length > 0 && districtCard) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const districtKey = btn.getAttribute('data-district');
                if (!districtData[districtKey]) return;

                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const data = districtData[districtKey];

                districtCard.innerHTML = `
                    <div class="district-info">
                        <h3>${data.name}</h3>
                        <p style="font-size: 14.5px; line-height: 1.7; color: #445566; margin-bottom: 18px;">
                            ${data.desc}
                        </p>
                        <ul class="district-meta-list">
                            <li><strong>Ərazisi:</strong> <span>${data.area}</span></li>
                            <li><strong>Əhalisi:</strong> <span>${data.population}</span></li>
                            <li><strong>İnzibati Mərkəzi:</strong> <span>${data.center}</span></li>
                            <li><strong>Yaşayış Məntəqələri:</strong> <span>${data.settlements}</span></li>
                        </ul>
                    </div>
                    <div class="district-economy" style="background: #fbf9f6; padding: 22px; border-radius: 8px; border-left: 3px solid var(--arpsn-gold, #B99755);">
                        <h4 style="font-size: 16px; font-weight: 700; color: var(--arpsn-navy, #082B48); margin-bottom: 12px;">
                            <i class="bi bi-graph-up-arrow me-2 text-gold"></i> Əsas İqtisadi İstiqamətlər
                        </h4>
                        <p style="font-size: 13.5px; line-height: 1.65; color: #4a5c6d; margin: 0;">
                            ${data.economy}
                        </p>
                        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e0d8; font-size: 12.5px; color: #6c7f93;">
                            <i class="bi bi-shield-check me-1"></i> Rəsmi Statistika Komitəsi və Nümayəndəliyin təsdiqlənmiş reyestri əsasında
                        </div>
                    </div>
                `;
            });
        });
    }
});
