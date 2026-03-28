/* ============================================
   WEDDING INVITATION — Pure Vanilla JS
   Alman & Terii • 26 April 2026
   ============================================ */

/* ---------- GUEST NAME FROM URL ---------- */
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get('to') || 'Tamu Undangan';
}

/* ---------- CORNER SVG ---------- */
function cornerSVG(size, color) {
  color = color || '#C9A46C';
  return `<svg width="${size}" height="${size}" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:.7">
    <path d="M4 4 Q20 4 36 4 Q20 8 4 20 Q4 12 4 4Z" stroke="${color}" stroke-width="1.2" fill="none" opacity="0.8"/>
    <path d="M4 36 Q8 20 20 4" stroke="${color}" stroke-width="0.8" fill="none" opacity="0.5"/>
    <path d="M4 28 Q8 16 16 8" stroke="${color}" stroke-width="0.6" fill="none" opacity="0.4"/>
    <circle cx="4" cy="4" r="2.5" fill="${color}" opacity="0.7"/>
    <circle cx="14" cy="14" r="1.5" fill="${color}" opacity="0.4"/>
    <circle cx="8" cy="8" r="1" fill="${color}" opacity="0.3"/>
  </svg>`;
}

function starSVG(size, color) {
  color = color || '#C9A46C';
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="${color}">
        <ellipse cx="12" cy="6" rx="2.2" ry="3.6"/>
        <ellipse cx="17" cy="9" rx="2.2" ry="3.6" transform="rotate(60 17 9)"/>
        <ellipse cx="17" cy="15" rx="2.2" ry="3.6" transform="rotate(120 17 15)"/>
        <ellipse cx="12" cy="18" rx="2.2" ry="3.6"/>
        <ellipse cx="7" cy="15" rx="2.2" ry="3.6" transform="rotate(60 7 15)"/>
        <ellipse cx="7" cy="9" rx="2.2" ry="3.6" transform="rotate(120 7 9)"/>
        <circle cx="12" cy="12" r="2.2"/>
      </g>
    </svg>
  `;
}

function calSVG()  { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A46C" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`; }
function timeSVG() { return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A46C" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`; }
function mapSVG(s) { s=s||15; return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`; }
function arrowSVG(){ return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A46C" stroke-width="2" opacity="0.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`; }

/* ---------- BUILD COVER ---------- */
function buildCover() {
  const guestName = getGuestName();
  const cover = document.getElementById('cover');
  cover.innerHTML = `
    <div class="batik-bg"></div>
    <div class="radial-glow"></div>
    <div class="cover-borders">
      <div class="line-top"></div><div class="line-bottom"></div>
      <div class="line-left"></div><div class="line-right"></div>
    </div>
    <div class="corner tl">${cornerSVG(65)}</div>
    <div class="corner tr">${cornerSVG(65)}</div>
    <div class="corner bl">${cornerSVG(65)}</div>
    <div class="corner br">${cornerSVG(65)}</div>

    <div class="content">
      <img
        class="gunungan-img"
        src="images/gunungan.webp"
        alt=""
        width="180"
        height="180"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <p class="sub-label">The Wedding Of</p>
      <h1 class="couple-name">Alman &amp; Terii</h1>
      <p class="event-date">26 April 2026</p>
      <div class="guest-box">
        <p class="to-label">Kepada Yth.</p>
        <p class="guest-name">${escapeHtml(guestName)}</p>
        <p class="sub-guest">Bapak / Ibu / Saudara / i</p>
      </div>
      <button id="btn-open">Buka Undangan</button>
    </div>
  `;

  document.getElementById('btn-open').addEventListener('click', openInvitation);
}

/* ---------- BUILD HERO ---------- */
function buildHero() {
  const el = document.getElementById('hero');
  el.innerHTML = `
    <div class="batik-overlay dark"></div>
    <div class="hero-light"></div>
    <div class="hero-side-l"></div>
    <div class="hero-side-r"></div>
    <div class="section-corners">
      <div class="corner tl">${cornerSVG(65)}</div>
      <div class="corner tr">${cornerSVG(65)}</div>
      <div class="corner bl">${cornerSVG(65)}</div>
      <div class="corner br">${cornerSVG(65)}</div>
    </div>
    <div class="line-gold-h top"></div>
    <div class="inner">
      <img class="gunungan-hero reveal" src="/images/gunungan.webp" alt=""/>
      <p class="the-wedding reveal">The Wedding Of</p>
      <h1 class="couple-name-hero reveal">Alman &amp; Terii</h1>
      <p class="date-hero reveal">26 April 2026</p>
      <p class="intro-text reveal">
        Dengan penuh rasa syukur kepada Allah SWT, kami bermaksud menyelenggarakan
        pernikahan kami dan mengundang Bapak/Ibu/Saudara/i untuk hadir serta
        memberikan doa restu.
      </p>
      <button id="btn-scroll" class="reveal">Lihat Undangan</button>
      <div class="scroll-arrow reveal">${arrowSVG()}</div>
    </div>
  `;
  document.getElementById('btn-scroll').addEventListener('click', function() {
    document.getElementById('quran').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------- BUILD QURAN VERSE ---------- */
function buildQuran() {
  const el = document.getElementById('quran');
  el.innerHTML = `
    <div class="batik-overlay dark"></div>
    <div class="section-glow"></div>
    <div class="section-corners">
      <div class="corner tl">${cornerSVG(65)}</div>
      <div class="corner tr">${cornerSVG(65)}</div>
      <div class="corner bl">${cornerSVG(65)}</div>
      <div class="corner br">${cornerSVG(65)}</div>
    </div>
    <div class="line-gold-h top"></div>
    <div class="line-gold-h bottom"></div>
    <div class="inner">
      <p class="source reveal">QS. Adz-Dzariyat : 49</p>
      <p class="verse reveal">
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
        pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
        dan merasa tenteram kepadanya."
      </p>
      <div class="gold-divider reveal">
        <div class="line left"></div>
        ${starSVG(14)}
        <div class="line right"></div>
      </div>
      <p class="blessing reveal">
        Semoga dengan bersatunya kami dalam ikatan suci pernikahan ini,
        menjadi awal perjalanan hidup yang penuh keberkahan, kasih sayang,
        dan kebahagiaan.
      </p>
    </div>
  `;
}

/* ---------- BUILD COUPLE ---------- */
function buildCouple() {
  const el = document.getElementById('couple');
  el.innerHTML = `
    <div class="batik-overlay light"></div>
    <div class="section-glow"></div>
    <div class="section-corners">
      <div class="corner tl">${cornerSVG(65, '#4b1f28')}</div>
      <div class="corner tr">${cornerSVG(65, '#4b1f28')}</div>
      <div class="corner bl">${cornerSVG(65, '#4b1f28')}</div>
      <div class="corner br">${cornerSVG(65, '#4b1f28')}</div>
    </div>
    <div class="line-maroon-h top"></div>
    <div class="line-maroon-h bottom"></div>
    <div class="inner">
      <div class="couple-card-wrap reveal">
        ${sectionTitleHTML('Bismillahirrahmanirrahim', 'Groom &amp; Bride', 'light')}

        <div class="couple-person reveal">
          <div class="couple-photo-ring">
            <img src="/images/groom.png" alt="D. Sukma Almansyah"/>
          </div>
          <p class="name">D. Sukma Almansyah</p>
          <p class="role">Mempelai Pria</p>
          <p class="birthdate">25 Desember 1990</p>
          <p class="parents">(Alm) Ade Ibrahim &amp; Ibu Yani Riyani</p>
        </div>

        <div class="couple-divider">
          <div class="vline"></div>
          <p class="amp">&amp;</p>
          <div class="vline"></div>
        </div>

        <div class="couple-person reveal">
          <div class="couple-photo-ring">
            <img src="/images/bride.png" alt="Tri Andini"/>
          </div>
          <p class="name">Tri Andini</p>
          <p class="role">Mempelai Wanita</p>
          <p class="birthdate">04 Maret 2002</p>
          <p class="parents">Bapak Nurohmat &amp; Ibu Siti Mulyani</p>
        </div>

        <p class="couple-footer reveal">
          Kami berharap kehadiran serta doa restu dari keluarga dan sahabat
          tercinta untuk menyempurnakan kebahagiaan kami.
        </p>
      </div>
    </div>
  `;
}

/* ---------- BUILD SAVE THE DATE ---------- */
function buildSaveTheDate() {
  const el = document.getElementById('save-the-date');
  el.innerHTML = `
    <div class="section-corners">
      <div class="corner tl" style="top:14px;left:14px;"><img src="/ornaments/kawung.png" style="width:65px;opacity:.8;" alt=""/></div>
      <div class="corner tr" style="top:14px;right:14px;transform:scaleX(-1);"><img src="/ornaments/kawung.png" style="width:65px;opacity:.8;" alt=""/></div>
      <div class="corner bl" style="bottom:14px;left:14px;transform:rotate(180deg) scaleX(-1);"><img src="/ornaments/kawung.png" style="width:65px;opacity:.8;" alt=""/></div>
      <div class="corner br" style="bottom:14px;right:14px;transform:rotate(180deg);"><img src="/ornaments/kawung.png" style="width:65px;opacity:.8;" alt=""/></div>
    </div>
    <div class="line-maroon-h top"></div>
    <div class="line-maroon-h bottom"></div>
    <div class="inner">
      ${sectionTitleHTML('Save The Date', '26 April 2026', 'light')}
      <p class="intro-text reveal" style="font-family:var(--font-body);font-size:clamp(14px,2.2vw,16px);color:var(--maroon);opacity:.72;font-style:italic;line-height:1.85;margin-bottom:40px;text-align:center;">
        Kami akan memulai perjalanan baru sebagai suami dan istri pada hari yang berbahagia:
      </p>
      <div class="countdown-row reveal" id="countdown-row">
        <div class="cd-box"><span class="cd-num" id="cd-days">00</span><span class="cd-label">Hari</span></div>
        <div class="cd-box"><span class="cd-num" id="cd-hours">00</span><span class="cd-label">Jam</span></div>
        <div class="cd-box"><span class="cd-num" id="cd-mins">00</span><span class="cd-label">Menit</span></div>
        <div class="cd-box"><span class="cd-num" id="cd-secs">00</span><span class="cd-label">Detik</span></div>
      </div>
      <p class="footer-text reveal">
        Kami berharap kehadiran serta doa restu dari keluarga dan sahabat
        tercinta untuk menyempurnakan kebahagiaan kami.
      </p>
    </div>
  `;
  startCountdown();
}

/* ---------- BUILD EVENTS ---------- */
var EVENTS = [
  {
    type: 'akad', title: 'Akad Nikah', subtitle: 'Ijab Kabul',
    date: 'Minggu, 26 April 2026', time: '09.00 WIB',
    address: 'JL Al-Innayah Karang Ampel RT003/RW004 No.15\nKp Rawa Kalong\nDesa Karang Satria\nKecamatan Tambun Utara\nKabupaten Bekasi',
    mapsLink: 'https://share.google/rB1z28aq7zzRBFh7p',
    revealClass: 'from-left'
  },
  {
    type: 'resepsi', title: 'Resepsi Pernikahan', subtitle: 'Wedding Reception',
    date: 'Minggu, 26 April 2026', time: '10.00 WIB \u2013 Selesai',
    address: 'JL Al-Innayah Karang Ampel RT003/RW004 No.15\nKp Rawa Kalong\nDesa Karang Satria\nKecamatan Tambun Utara\nKabupaten Bekasi',
    mapsLink: 'https://share.google/rB1z28aq7zzRBFh7p',
    revealClass: 'from-right'
  }
];

function buildEvents() {
  var el = document.getElementById('events');
  var cards = EVENTS.map(function(ev) {
    return `
      <div class="event-card reveal ${ev.revealClass}">
        <div class="event-header">
          <img class="ev-icon" src="/ornaments/gunungann.png" alt=""/>
          <h3>${escapeHtml(ev.title)}</h3>
        </div>
        <p class="event-subtitle">${escapeHtml(ev.subtitle)}</p>
        <div class="event-sep"></div>
        <div class="event-details">
          <div class="event-row">
            <div class="event-icon-circle">${calSVG()}</div>
            <div>
              <p class="ev-sub">Tanggal</p>
              <p class="ev-val">${escapeHtml(ev.date)}</p>
            </div>
          </div>
          <div class="event-row">
            <div class="event-icon-circle">${timeSVG()}</div>
            <div>
              <p class="ev-sub">Waktu</p>
              <p class="ev-val">${escapeHtml(ev.time)}</p>
            </div>
          </div>
          <div class="event-row">
            <div class="event-icon-circle">${mapSVG()}</div>
            <div>
              <p class="ev-sub">Lokasi</p>
              <p class="ev-val address">${escapeHtml(ev.address)}</p>
            </div>
          </div>
        </div>
        <a href="${ev.mapsLink}" target="_blank" rel="noopener noreferrer" class="event-maps-btn">
          ${mapSVG(13)} Lihat Maps
        </a>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="batik-overlay mid"></div>
    <div class="line-gold-h top"></div>
    <div class="line-gold-h bottom"></div>
    <div class="inner">
      ${sectionTitleHTML('Waktu &amp; Tempat', 'Detail Acara', 'dark')}
      <div class="events-list">${cards}</div>
    </div>
  `;
}

/* ---------- BUILD RSVP ---------- */
function buildRsvp() {
  var el = document.getElementById('rsvp');
  el.innerHTML = `
    <div class="batik-overlay light" style="opacity:.2;"></div>
    <div class="section-glow-light"></div>
    <div class="section-corners">
      <div class="corner tl">${cornerSVG(65, '#4b1f28')}</div>
      <div class="corner tr">${cornerSVG(65, '#4b1f28')}</div>
      <div class="corner bl">${cornerSVG(65, '#4b1f28')}</div>
      <div class="corner br">${cornerSVG(65, '#4b1f28')}</div>
    </div>
    <div class="line-maroon-h top"></div>
    <div class="line-maroon-h bottom"></div>
    <div class="inner">
      ${sectionTitleHTML(null, 'KONFIRMASI KEHADIRAN', 'light')}
      <p class="intro reveal">
        Kehadiran dan doa restu Anda merupakan kebahagiaan yang sangat berarti bagi kami.
      </p>
      <p class="intro2 reveal">
        Silakan konfirmasi kehadiran Anda melalui form RSVP yang tersedia.
        Kami sangat menantikan kehadiran Anda di hari bahagia kami.
      </p>
      <div id="rsvp-content" class="reveal">
        <form class="rsvp-form" id="rsvp-form">
          <div>
            <label class="form-label" for="rsvp-name">Nama Lengkap</label>
            <input class="form-input" type="text" id="rsvp-name" name="name" required
              placeholder="${escapeHtml(getGuestName() !== 'Tamu Undangan' ? getGuestName() : 'Masukkan nama Anda...')}"/>
          </div>
          <div>
            <label class="form-label" for="rsvp-attendance">Kehadiran</label>
            <div class="form-select-wrap">
              <select class="form-select" id="rsvp-attendance" name="attendance">
                <option value="hadir">Ya, saya akan hadir</option>
                <option value="tidak">Maaf, saya tidak bisa hadir</option>
                <option value="mungkin">Mungkin hadir</option>
              </select>
            </div>
          </div>
          <div>
            <label class="form-label" for="rsvp-message">Pesan &amp; Doa</label>
            <textarea class="form-textarea" id="rsvp-message" name="message" rows="4"
              placeholder="Tuliskan ucapan dan doa terbaik Anda..."></textarea>
          </div>
          <button type="submit" id="btn-submit">Kirim Konfirmasi</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('rsvp-form').addEventListener('submit', handleRsvpSubmit);
}

function handleRsvpSubmit(e) {
  e.preventDefault();
  var btn = document.getElementById('btn-submit');
  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  var name       = document.getElementById('rsvp-name').value;
  var attendance = document.getElementById('rsvp-attendance').value;
  var message    = document.getElementById('rsvp-message').value;

  var existing = [];
  try { existing = JSON.parse(localStorage.getItem('rsvp_responses') || '[]'); } catch(ex) {}
  existing.push({ name: name, attendance: attendance, message: message, submittedAt: new Date().toISOString() });
  try { localStorage.setItem('rsvp_responses', JSON.stringify(existing)); } catch(ex) {}

  setTimeout(function() {
    document.getElementById('rsvp-content').innerHTML = `
      <div class="rsvp-success">
        <div class="emoji">🎊</div>
        <h3>Terima Kasih!</h3>
        <p class="thank-you">Konfirmasi kehadiran Anda telah kami terima.</p>
        <p class="joy-msg">Kami menantikan kehadiran Anda dengan penuh sukacita.</p>
      </div>`;
  }, 1500);
}

/* ---------- BUILD GIFT ---------- */
var GIFTS = [
  { type: 'Transfer Bank', title: 'Bank BCA', name: 'Tri Andini', number: '7391383778' },
  { type: 'E-Wallet',      title: 'GoPay',    name: 'Tri Andini', number: '0857-1533-3423' }
];

function buildGift() {
  var el = document.getElementById('gift');
  var cards = GIFTS.map(function(g, i) {
    return `
      <div class="gift-card reveal">
        <p class="gift-type">${escapeHtml(g.type)}</p>
        <p class="gift-bank">${escapeHtml(g.title)}</p>
        <div class="gift-sep"></div>
        <div>
          <p class="gift-name-label">Atas Nama</p>
          <p class="gift-owner">${escapeHtml(g.name)}</p>
        </div>
        <div class="gift-number-row">
          <span class="gift-number">${escapeHtml(g.number)}</span>
          <button class="btn-copy" data-number="${escapeHtml(g.number)}">📋 Salin</button>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="batik-overlay dark" style="opacity:.4;"></div>
    <div class="line-gold-h top"></div>
    <div class="line-gold-h bottom"></div>
    <div class="inner">
      ${sectionTitleHTML('Wedding Gift', 'Hadiah Pernikahan', 'dark')}
      <p class="gift-intro reveal">
        Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila
        ingin memberikan tanda kasih:
      </p>
      <div class="gift-list">${cards}</div>
      <p class="gift-footer reveal">Terima kasih atas doa dan perhatian Anda.</p>
    </div>
  `;

  el.querySelectorAll('.btn-copy').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var num = this.dataset.number;
      navigator.clipboard.writeText(num).then(function() {
        btn.textContent = '✓ Tersalin';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.textContent = '📋 Salin';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        btn.textContent = '✓ Tersalin';
        setTimeout(function() { btn.textContent = '📋 Salin'; }, 2000);
      });
    });
  });
}

/* ---------- BUILD CLOSING ---------- */
function buildClosing() {
  var el = document.getElementById('closing');
  el.innerHTML = `
    <div class="batik-overlay dark"></div>
    <div class="section-glow"></div>
    <div class="section-corners">
      <div class="corner tl">${cornerSVG(65)}</div>
      <div class="corner tr">${cornerSVG(65)}</div>
      <div class="corner bl">${cornerSVG(65)}</div>
      <div class="corner br">${cornerSVG(65)}</div>
    </div>
    <div class="line-gold-h top"></div>
    <div class="line-gold-h bottom"></div>
    <div class="inner">
      <img class="gunungan-close reveal" src="/images/gunungan.webp" alt=""/>
      <p class="final-text reveal">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
        kepada kedua mempelai.
      </p>
      <div class="gold-divider reveal">
        <div class="line left"></div>
        ${starSVG(14)}
        <div class="line right"></div>
      </div>
      <p class="thanks-text reveal">
        Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
      </p>
      <p class="from-label reveal">Kami yang berbahagia</p>
      <h2 class="closing-name reveal">Alman &amp; Terii</h2>
      <p class="closing-date reveal">26 April 2026</p>
    </div>
  `;
}

/* ---------- SECTION TITLE HELPER ---------- */
function sectionTitleHTML(pre, title, theme) {
  var preHtml = pre ? `<p class="pre-label ${theme}">${pre}</p>` : '';
  var dividerLeft  = theme === 'light' ? 'line left-maroon' : 'line left';
  var dividerRight = theme === 'light' ? 'line right-maroon' : 'line right';
  return `
    <div class="section-title">
      ${preHtml}
      <div class="title-row">
        ${cornerSVG(28, theme === 'light' ? '#4b1f28' : '#C9A46C')}
        <h2 class="${theme}">${title}</h2>
        <svg width="28" height="28" viewBox="0 0 65 65" fill="none" style="opacity:.7;transform:scaleX(-1)">
          <path d="M4 4 Q20 4 36 4 Q20 8 4 20 Q4 12 4 4Z" stroke="${theme === 'light' ? '#4b1f28' : '#C9A46C'}" stroke-width="1.2" fill="none" opacity="0.8"/>
          <path d="M4 36 Q8 20 20 4" stroke="${theme === 'light' ? '#4b1f28' : '#C9A46C'}" stroke-width="0.8" fill="none" opacity="0.5"/>
          <circle cx="4" cy="4" r="2.5" fill="${theme === 'light' ? '#4b1f28' : '#C9A46C'}" opacity="0.7"/>
        </svg>
      </div>
      <div class="gold-divider">
        <div class="${dividerLeft}"></div>
        ${starSVG(14, theme === 'light' ? '#4b1f28' : '#C9A46C')}
        <div class="${dividerRight}"></div>
      </div>
    </div>`;
}

/* ---------- COUNTDOWN ---------- */
var TARGET_DATE = new Date('2026-04-26T09:00:00');

function calcCountdown() {
  var diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000)
  };
}

function pad(n) { return String(n).padStart(2, '0'); }

function startCountdown() {
  function tick() {
    var t = calcCountdown();
    var d = document.getElementById('cd-days');
    var h = document.getElementById('cd-hours');
    var m = document.getElementById('cd-mins');
    var s = document.getElementById('cd-secs');
    if (d) d.textContent = pad(t.days);
    if (h) h.textContent = pad(t.hours);
    if (m) m.textContent = pad(t.minutes);
    if (s) s.textContent = pad(t.seconds);
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- FLOATING ORNAMENTS ---------- */
function buildFloaters() {
  var container = document.getElementById('floaters');
  for (var i = 0; i < 8; i++) {
    var div = document.createElement('div');
    div.className = 'floater';
    var x      = Math.random() * 100;
    var drift  = (Math.random() - 0.5) * 80;
    var dur    = 8 + Math.random() * 6;
    var delay  = Math.random() * 10;
    var size   = 12 + Math.random() * 12;
    var alpha  = (0.2 + Math.random() * 0.3).toFixed(2);
    div.style.cssText = `left:${x}vw; --dur:${dur}s; --delay:${delay}s; --drift:${drift}px; animation-delay:${delay}s; animation-duration:${dur}s;`;
    div.innerHTML = starSVG(size, `rgba(201,164,108,${alpha})`);
    container.appendChild(div);
  }
}

/* ---------- MUSIC WIDGET ---------- */
var audio = null;
var musicPlaying = false;

function buildMusicWidget() {
  var widget = document.getElementById('music-widget');
  widget.innerHTML = `
    <div id="music-panel">
      <p class="panel-title">🎵 Lana Del Rey - Young and Beautiful</p>
      <div class="panel-btns">
        <button class="panel-btn" id="btn-play-pause" title="Play/Pause">⏸</button>
        <button class="panel-btn" id="btn-mute" title="Mute/Unmute">🔊</button>
      </div>
    </div>
    <button id="btn-music" class="playing" title="Musik">🎵</button>
  `;

  document.getElementById('btn-music').addEventListener('click', function() {
    var panel = document.getElementById('music-panel');
    panel.classList.toggle('open');
  });

  document.getElementById('btn-play-pause').addEventListener('click', function() {
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      this.textContent = '▶';
      document.getElementById('btn-music').classList.remove('playing');
    } else {
      audio.play().catch(function(){});
      this.textContent = '⏸';
      document.getElementById('btn-music').classList.add('playing');
    }
    musicPlaying = !musicPlaying;
  });

  document.getElementById('btn-mute').addEventListener('click', function() {
    if (!audio) return;
    audio.muted = !audio.muted;
    this.textContent = audio.muted ? '🔇' : '🔊';
  });
}

/* ---------- SCROLL REVEAL ---------- */
function initReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '-40px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}

/* ---------- OPEN INVITATION ---------- */
function openInvitation() {
  var cover = document.getElementById('cover');
  var main  = document.getElementById('main');

  cover.classList.add('closing');

  audio = document.getElementById('wedding-audio');
  if (audio) {
    audio.play().catch(function(){});
    musicPlaying = true;
  }

  setTimeout(function() {
    cover.classList.add('gone');
    main.classList.add('visible');
    initReveal();
    buildFloaters();
  }, 800);
}

/* ---------- ESCAPE HTML ---------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', function() {
  buildCover();
  buildHero();
  buildQuran();
  buildCouple();
  buildSaveTheDate();
  buildEvents();
  buildRsvp();
  buildGift();
  buildClosing();
  buildMusicWidget();
});
