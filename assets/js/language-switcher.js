(function () {
    "use strict";

    function initLanguageSwitcher() {
        // Sayfa bilgisini ve dili tespit et (Windows yolları için \ kontrolü eklendi)
        const path = window.location.pathname;
        const isEn = path.includes('/en/') || path.includes('\\en\\');
        const currentPage = path.split(/[\\\/]/).pop() || 'index.html';
        
        // Linkleri ayarla
        const trLink = isEn ? `../${currentPage}` : currentPage;
        const enLink = isEn ? currentPage : `en/${currentPage}`;

        // Switcher HTML şablonu
        const switcherHTML = `
            <div class="th-language-switcher">
                <button class="lang-btn" type="button">
                    <i class="fa-solid fa-globe"></i>
                    <span>Dil / Language</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="lang-dropdown">
                    <a href="${trLink}" class="lang-item ${!isEn ? 'active' : ''}" onclick="localStorage.setItem('lang-selected', 'tr')">
                        <span class="flag-icon-tr"></span>
                        <span>Türkçe</span>
                        <div class="radio-indicator">
                            <div class="radio-circle"></div>
                        </div>
                    </a>
                    <a href="${enLink}" class="lang-item ${isEn ? 'active' : ''}" onclick="localStorage.setItem('lang-selected', 'en')">
                        <span class="flag-icon-en"></span>
                        <span>English</span>
                        <div class="radio-indicator">
                            <div class="radio-circle"></div>
                        </div>
                    </a>
                </div>
            </div>
        `;

        // 1. Üst Bar Enjeksiyonu (Header Top) - .header-links ul içine append
        const topBarLinks = document.querySelector('.header-top .header-links ul');
        if (topBarLinks && !topBarLinks.querySelector('.lang-li-top')) {
            const li = document.createElement('li');
            li.className = 'inline-block lang-li-top';
            li.innerHTML = switcherHTML;
            topBarLinks.appendChild(li);
        }

        // 2. Mobil/Sticky Header Buton Alanı Enjeksiyonu
        const headerButtons = document.querySelectorAll('.header-button');
        headerButtons.forEach(container => {
            if (!container.querySelector('.th-language-switcher')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'th-language-switcher-wrapper d-block d-lg-none me-2';
                wrapper.innerHTML = switcherHTML;
                container.prepend(wrapper);
            }
        });

        // Tıklama Mantığı (Event Delegation)
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('.lang-btn');
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                btn.parentElement.classList.toggle('open');
            } else if (!e.target.closest('.th-language-switcher')) {
                document.querySelectorAll('.th-language-switcher').forEach(el => el.classList.remove('open'));
            }
        });
    }

    // Birden fazla yükleme denemesi (DOM hazır olana kadar)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
    } else {
        initLanguageSwitcher();
    }
    // Temanın sticky header'ı klonlaması durumuna karşı gecikmeli bir kontrol daha yapalım
    setTimeout(initLanguageSwitcher, 1000);
    setTimeout(initLanguageSwitcher, 3000);
})();
