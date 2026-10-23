/**
 * RƏSMİ ƏLAQƏ VƏ NAVİQASİYA — İNTERAKTİV LOGİKA
 * ARPSN Rəsmi İnternet Portalı
 */

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('officialFeedbackForm');
    const feedbackSuccess = document.getElementById('feedbackSuccessAlert');

    if (feedbackForm && feedbackSuccess) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('fbName').value.trim();
            const email = document.getElementById('fbEmail').value.trim();
            const subject = document.getElementById('fbSubject').value.trim();
            const message = document.getElementById('fbMessage').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Zəhmət olmasa bütün tələb olunan sahələri doldurun!');
                return;
            }

            // Simulyasiya: Məktub göndərildi
            feedbackSuccess.style.display = 'block';
            feedbackForm.reset();
            feedbackSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
});
