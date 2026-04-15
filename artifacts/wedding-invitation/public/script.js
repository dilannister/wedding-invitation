'use strict';
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwsyYqVC-8yuGZEvhxILmxPkEyF42jNUTpi3_pDG4mbhbPYPkvCTzDVZUyMjzDxlr4Ytg/exec";
// ─── HELPERS ───────────────────────────────────────────────────────────────
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function pad(n){ return String(n).padStart(2,'0'); }
function getGuest(){ return new URLSearchParams(window.location.search).get('to') || 'Tamu Undangan'; }

function cornerSVG(size, col){
  col = col||'#C9A46C';
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">'
    +'<path d="M4 4 Q20 4 36 4 Q20 8 4 20 Q4 12 4 4Z" stroke="'+col+'" stroke-width="1.2" fill="none" opacity="0.8"/>'
    +'<path d="M4 36 Q8 20 20 4" stroke="'+col+'" stroke-width="0.8" fill="none" opacity="0.5"/>'
    +'<path d="M4 28 Q8 16 16 8" stroke="'+col+'" stroke-width="0.6" fill="none" opacity="0.4"/>'
    +'<circle cx="4" cy="4" r="2.5" fill="'+col+'" opacity="0.7"/>'
    +'<circle cx="14" cy="14" r="1.5" fill="'+col+'" opacity="0.4"/>'
    +'</svg>';
}

function starSVG(size, col){
  col = col||'#C9A46C';
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 20 20" fill="'+col+'"><path d="M10 0L11.8 6.5H18.5L13.1 10.5L15 17L10 13L5 17L6.9 10.5L1.5 6.5H8.2Z"/></svg>';
}

function sectionTitle(pre, title, theme){
  var col = theme==='light' ? '#4b1f28' : '#C9A46C';
  var lL  = theme==='light' ? 'line left-maroon' : 'line left';
  var lR  = theme==='light' ? 'line right-maroon' : 'line right';
  var pre_html = pre ? '<p class="pre-label '+theme+'">'+pre+'</p>' : '';
  return '<div class="section-title">'
    +pre_html
    +'<div class="title-row">'
    +cornerSVG(28,col)
    +'<h2 class="'+theme+'">'+title+'</h2>'
    +'<svg width="28" height="28" viewBox="0 0 65 65" fill="none" style="opacity:.7;transform:scaleX(-1)">'
    +'<path d="M4 4 Q20 4 36 4 Q20 8 4 20 Q4 12 4 4Z" stroke="'+col+'" stroke-width="1.2" fill="none" opacity="0.8"/>'
    +'<path d="M4 36 Q8 20 20 4" stroke="'+col+'" stroke-width="0.8" fill="none" opacity="0.5"/>'
    +'<circle cx="4" cy="4" r="2.5" fill="'+col+'" opacity="0.7"/>'
    +'</svg></div>'
    +'<div class="gold-divider"><div class="'+lL+'"></div>'+starSVG(14,col)+'<div class="'+lR+'"></div></div>'
    +'</div>';
}

function icoSVG(type){
  if(type==='cal') return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A46C" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  if(type==='time') return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A46C" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
}

function darkCorners(){ return '<div class="section-corners"><div class="corner tl">'+cornerSVG(65)+'</div><div class="corner tr">'+cornerSVG(65)+'</div><div class="corner bl">'+cornerSVG(65)+'</div><div class="corner br">'+cornerSVG(65)+'</div></div>'; }
function lightCorners(){ return '<div class="section-corners"><div class="corner tl">'+cornerSVG(65,'#4b1f28')+'</div><div class="corner tr">'+cornerSVG(65,'#4b1f28')+'</div><div class="corner bl">'+cornerSVG(65,'#4b1f28')+'</div><div class="corner br">'+cornerSVG(65,'#4b1f28')+'</div></div>'; }

// ─── COVER ─────────────────────────────────────────────────────────────────
function buildCover(){
  var g = getGuest();
  document.getElementById('cover').innerHTML =
    '<div class="batik-bg"></div>'
    +'<div class="radial-glow"></div>'
    +'<div class="cover-borders"><div class="line-top"></div><div class="line-bottom"></div><div class="line-left"></div><div class="line-right"></div></div>'
    +'<div class="corner tl">'+cornerSVG(65)+'</div>'
    +'<div class="corner tr">'+cornerSVG(65)+'</div>'
    +'<div class="corner bl">'+cornerSVG(65)+'</div>'
    +'<div class="corner br">'+cornerSVG(65)+'</div>'
    +'<div class="content">'
    +'<img class="gunungan-img" src="images/gunungan.png" alt=""/>'
    +'<p class="sub-label">The Wedding Of</p>'
    +'<h1 class="couple-name">Alman &amp; Terii</h1>'
    +'<p class="event-date">26 April 2026</p>'
    +'<div class="guest-box"><p class="to-label">Kepada Yth.</p><p class="guest-name">'+esc(g)+'</p>'
    +'<button id="btn-open">Buka Undangan</button>'
    +'</div>';
  document.getElementById('btn-open').addEventListener('click', openInvitation);
}

// ─── HERO ──────────────────────────────────────────────────────────────────
function buildHero(){
  document.getElementById('hero').innerHTML =
    '<div class="batik-overlay dark"></div>'
    +'<div class="hero-light"></div>'
    +darkCorners()
    +'<div class="line-gold-h top"></div>'
    +'<div class="inner">'
    +'<img class="gunungan-hero reveal" src="images/gunungan.png" alt=""/>'
    +'<p class="the-wedding reveal">The Wedding Of</p>'
    +'<h1 class="couple-name-hero reveal">Alman &amp; Terii</h1>'
    +'<p class="date-hero reveal">26 April 2026</p>'
    +'<p class="intro-text reveal">Dengan penuh rasa syukur kepada Allah SWT, kami bermaksud menyelenggarakan pernikahan kami dan mengundang Bapak/Ibu/Saudara/i untuk hadir serta memberikan doa restu.</p>'
}

// ─── QURAN ─────────────────────────────────────────────────────────────────
function buildQuran(){
  document.getElementById('quran').innerHTML =
    '<div class="batik-overlay dark"></div>'
    +'<div class="section-glow"></div>'
    +darkCorners()
    +'<div class="line-gold-h top"></div>'
    +'<div class="line-gold-h bottom"></div>'
    +'<div class="inner">'
    +'<p class="source reveal">QS. Adz-Dzariyat : 49</p>'
    +'<p class="verse reveal">"Segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)"</p>'
    +'<div class="gold-divider reveal"><div class="line left"></div>'+starSVG(14)+'<div class="line right"></div></div>'
    +'<p class="blessing reveal">Semoga dengan bersatunya kami dalam ikatan suci pernikahan ini, menjadi awal perjalanan hidup yang penuh keberkahan, kasih sayang, dan kebahagiaan.</p>'
    +'</div>';
}

// ─── COUPLE ────────────────────────────────────────────────────────────────
function buildCouple(){
  document.getElementById('couple').innerHTML =
    '<div class="batik-overlay light"></div>'
    +'<div class="section-glow"></div>'
    +lightCorners()
    +'<div class="line-maroon-h top"></div>'
    +'<div class="line-maroon-h bottom"></div>'
    +'<div class="inner">'
    +'<div class="couple-card-wrap reveal">'
    +sectionTitle('Bismillahirrahmanirrahim','Groom &amp; Bride','light')
    +'<div class="couple-person reveal">'
    +'<div class="couple-photo-ring"><img src="images/groom.png" alt="D. Sukma Almansyah"/></div>'
    +'<p class="name">D. Sukma Almansyah</p>'
    +'<p class="role">Mempelai Pria</p>'
    +'<p class="birthdate">25 Desember 1990</p>'
    +'<p class="parents">(Alm) Ade Ibrahim &amp; Ibu Yani Riyani</p>'
    +'</div>'
    +'<div class="couple-divider"><div class="vline"></div><p class="amp">&amp;</p><div class="vline"></div></div>'
    +'<div class="couple-person reveal">'
    +'<div class="couple-photo-ring"><img src="images/bride.png" alt="Tri Andini"/></div>'
    +'<p class="name">Tri Andini</p>'
    +'<p class="role">Mempelai Wanita</p>'
    +'<p class="birthdate">04 Maret 2002</p>'
    +'<p class="parents">Bapak Nurohmat &amp; Ibu Siti Mulyani</p>'
    +'</div>'
    +'<p class="couple-footer reveal">Kami berharap kehadiran serta doa restu dari keluarga dan sahabat tercinta untuk menyempurnakan kebahagiaan kami.</p>'
    +'</div></div>';
}

// ─── SAVE THE DATE / COUNTDOWN ─────────────────────────────────────────────
var TARGET = new Date('2026-04-26T09:00:00');

function buildSaveTheDate(){
  document.getElementById('save-the-date').innerHTML =
    '<div class="line-maroon-h top"></div>'
    +'<div class="line-maroon-h bottom"></div>'
    +'<div class="inner">'
    +sectionTitle('Save The Date','26 April 2026','light')
    +'<p class="intro-text reveal" style="font-family:var(--font-body);font-size:clamp(14px,2.2vw,16px);color:var(--maroon);opacity:.72;font-style:italic;line-height:1.85;margin-bottom:40px;text-align:center;">Kami akan memulai perjalanan baru sebagai suami dan istri pada hari yang berbahagia:</p>'
    +'<div class="countdown-row reveal" id="cd-row">'
    +'<div class="cd-box"><span class="cd-num" id="cd-d">00</span><span class="cd-label">Hari</span></div>'
    +'<div class="cd-box"><span class="cd-num" id="cd-h">00</span><span class="cd-label">Jam</span></div>'
    +'<div class="cd-box"><span class="cd-num" id="cd-m">00</span><span class="cd-label">Menit</span></div>'
    +'<div class="cd-box"><span class="cd-num" id="cd-s">00</span><span class="cd-label">Detik</span></div>'
    +'</div>'
    +'<p class="footer-text reveal">Kami berharap kehadiran serta doa restu dari keluarga dan sahabat tercinta untuk menyempurnakan kebahagiaan kami.</p>'
    +'</div>';
  startCountdown();
}

function startCountdown(){
  function tick(){
    var diff = TARGET - Date.now();
    if(diff < 0) diff = 0;
    var d = document.getElementById('cd-d');
    var h = document.getElementById('cd-h');
    var m = document.getElementById('cd-m');
    var s = document.getElementById('cd-s');
    if(!d) return;
    d.textContent = pad(Math.floor(diff/86400000));
    h.textContent = pad(Math.floor((diff%86400000)/3600000));
    m.textContent = pad(Math.floor((diff%3600000)/60000));
    s.textContent = pad(Math.floor((diff%60000)/1000));
  }
  tick();
  setInterval(tick, 1000);
}

// ─── EVENTS ────────────────────────────────────────────────────────────────
var ADDR = 'JL Al-Innayah Karang Ampel RT003/RW004 No.15\nKp Rawa Kalong\nDesa Karang Satria\nKecamatan Tambun Utara\nKabupaten Bekasi';
var MAPS = 'https://share.google/rB1z28aq7zzRBFh7p';

function eventCard(title, sub, date, time, revClass){
  return '<div class="event-card reveal '+revClass+'">'
    +'<div class="event-header"><img class="ev-icon" src="ornaments/gunungann.png" alt=""/><h3>'+esc(title)+'</h3></div>'
    +'<p class="event-subtitle">'+esc(sub)+'</p>'
    +'<div class="event-sep"></div>'
    +'<div class="event-details">'
    +'<div class="event-row"><div class="event-icon-circle">'+icoSVG('cal')+'</div><div><p class="ev-sub">Tanggal</p><p class="ev-val">'+esc(date)+'</p></div></div>'
    +'<div class="event-row"><div class="event-icon-circle">'+icoSVG('time')+'</div><div><p class="ev-sub">Waktu</p><p class="ev-val">'+esc(time)+'</p></div></div>'
    +'<div class="event-row"><div class="event-icon-circle">'+icoSVG('map')+'</div><div><p class="ev-sub">Lokasi</p><p class="ev-val address">'+esc(ADDR)+'</p></div></div>'
    +'</div>'
    +'<a href="'+MAPS+'" target="_blank" rel="noopener noreferrer" class="event-maps-btn">'+icoSVG('map')+' Lihat Maps</a>'
    +'</div>';
}

function buildEvents(){
  document.getElementById('events').innerHTML =
    '<div class="batik-overlay mid"></div>'
    +'<div class="line-gold-h top"></div>'
    +'<div class="line-gold-h bottom"></div>'
    +'<div class="inner">'
    +sectionTitle('Waktu &amp; Tempat','Detail Acara','dark')
    +'<div class="events-list">'
    +eventCard('Akad Nikah','Ijab Kabul','Minggu, 26 April 2026','09.00 WIB','from-left')
    +eventCard('Resepsi Pernikahan','Wedding Reception','Minggu, 26 April 2026','10.00 WIB \u2013 16.00 WIB','from-right')
    +'</div></div>';
}

// ─── RSVP ──────────────────────────────────────────────────────────────────
function buildRsvp(){
  var g = getGuest();
  var ph = (g !== 'Tamu Undangan') ? esc(g) : 'Masukkan nama Anda...';

  var html = '';

  html += '<div class="batik-overlay light" style="opacity:.2;"></div>';
  html += '<div class="section-glow-light"></div>';
  html += lightCorners();
  html += '<div class="line-maroon-h top"></div>';
  html += '<div class="line-maroon-h bottom"></div>';

  html += '<div class="inner">';
  html += sectionTitle(null,'KONFIRMASI KEHADIRAN','light');

  html += '<p class="intro reveal">Kehadiran dan doa restu Anda merupakan kebahagiaan yang sangat berarti bagi kami.</p>';
  html += '<p class="intro2 reveal">Silakan konfirmasi kehadiran Anda melalui form RSVP yang tersedia. Kami sangat menantikan kehadiran Anda di hari bahagia kami.</p>';

  html += '<div id="rsvp-content" class="reveal">';

  html += '<form class="rsvp-form" id="rsvp-form">';

  html += '<div>';
  html += '<label class="form-label" for="ri-name">Nama Lengkap</label>';
  html += '<input class="form-input" type="text" id="ri-name" required placeholder="'+ph+'"/>';
  html += '</div>';

  html += '<div>';
  html += '<label class="form-label" for="ri-att">Kehadiran</label>';
  html += '<div class="form-select-wrap">';
  html += '<select class="form-select" id="ri-att">';
  html += '<option value="hadir">Ya, saya akan hadir</option>';
  html += '<option value="tidak">Maaf, saya tidak bisa hadir</option>';
  html += '<option value="mungkin">Mungkin hadir</option>';
  html += '</select>';
  html += '</div>';
  html += '</div>';

  html += '<div>';
  html += '<label class="form-label" for="ri-msg">Pesan & Doa</label>';
  html += '<textarea class="form-textarea" id="ri-msg" rows="4" placeholder="Tuliskan ucapan dan doa terbaik Anda..."></textarea>';
  html += '</div>';

  html += '<button type="submit" id="btn-submit">Kirim Konfirmasi</button>';

  html += '</form>';
  html += '</div>';

  html += '<div class="guest-messages reveal">';
  html += '<h3 class="guest-title">Ucapan & Doa</h3>';
  html += '<div id="ucapan-list">Memuat ucapan...</div>';
  html += '</div>';

  html += '</div>';

  document.getElementById('rsvp').innerHTML = html;

  document.getElementById('rsvp-form').addEventListener('submit', submitRsvp);

  loadUcapan();
}

function submitRsvp(e){
  e.preventDefault();

  var btn = document.getElementById('btn-submit');
  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  var data = {
    name: document.getElementById('ri-name').value,
    attendance: document.getElementById('ri-att').value,
    message: document.getElementById('ri-msg').value
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(() => {

    document.getElementById('rsvp-content').innerHTML =
      '<div class="rsvp-success">'
      +'<div class="emoji">🎊</div>'
      +'<h3>Terima Kasih!</h3>'
      +'<p class="thank-you">Konfirmasi kehadiran Anda telah kami terima.</p>'
      +'<p class="joy-msg">Kami menantikan kehadiran Anda dengan penuh sukacita.</p>'
      +'</div>';

  })
  .catch(() => {

    btn.disabled = false;
    btn.textContent = 'Kirim Konfirmasi';
    alert("Gagal mengirim RSVP");

  });
}

function loadUcapan(){

  fetch(SCRIPT_URL)
  .then(res => res.json())
  .then(data => {

    let html = "";

    data.reverse().forEach(function(item){

      html += `
        <div class="ucapan-item">
          <b>${item.name}</b><br>
          ${item.attendance}<br>
          ${item.message}
        </div>
      `;

    });

    document.getElementById("ucapan-list").innerHTML = html;

  });

}

window.onload = loadUcapan;
// ─── GIFT ──────────────────────────────────────────────────────────────────
function giftCard(type, bank, owner, num){
  return '<div class="gift-card reveal">'
    +'<p class="gift-type">'+esc(type)+'</p>'
    +'<p class="gift-bank">'+esc(bank)+'</p>'
    +'<div class="gift-sep"></div>'
    +'<div><p class="gift-name-label">Atas Nama</p><p class="gift-owner">'+esc(owner)+'</p></div>'
    +'<div class="gift-number-row">'
    +'<span class="gift-number">'+esc(num)+'</span>'
    +'<button class="btn-copy" data-n="'+esc(num)+'">📋 Salin</button>'
    +'</div></div>';
}

function buildGift(){
  document.getElementById('gift').innerHTML =
    '<div class="batik-overlay dark" style="opacity:.4;"></div>'
    +'<div class="line-gold-h top"></div>'
    +'<div class="line-gold-h bottom"></div>'
    +'<div class="inner">'
    +sectionTitle('Wedding Gift','Hadiah Pernikahan','dark')
    +'<p class="gift-intro reveal">Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila ingin memberikan tanda kasih:</p>'
    +'<div class="gift-list">'
    +giftCard('Transfer Bank','Bank BCA','Tri Andini','7391383778')
    +giftCard('E-Wallet','GoPay','Tri Andini','0857-1533-3423')
    +'</div>'
    +'<p class="gift-footer reveal">Terima kasih atas doa dan perhatian Anda.</p>'
    +'</div>';
  document.getElementById('gift').querySelectorAll('.btn-copy').forEach(function(btn){
    btn.addEventListener('click', function(){
      var num = this.dataset.n;
      navigator.clipboard.writeText(num).then(function(){
        btn.textContent = '✓ Tersalin'; btn.classList.add('copied');
        setTimeout(function(){ btn.textContent = '📋 Salin'; btn.classList.remove('copied'); }, 2000);
      }).catch(function(){
        btn.textContent = '✓ Tersalin';
        setTimeout(function(){ btn.textContent = '📋 Salin'; }, 2000);
      });
    });
  });
}

// ─── CLOSING ───────────────────────────────────────────────────────────────
function buildClosing(){
  document.getElementById('closing').innerHTML =
    '<div class="batik-overlay dark"></div>'
    +'<div class="section-glow"></div>'
    +darkCorners()
    +'<div class="line-gold-h top"></div>'
    +'<div class="line-gold-h bottom"></div>'
    +'<div class="inner">'
    +'<img class="gunungan-close reveal" src="images/gunungan.png" alt=""/>'
    +'<p class="final-text reveal">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.</p>'
    +'<div class="gold-divider reveal"><div class="line left"></div>'+starSVG(14)+'<div class="line right"></div></div>'
    +'<p class="thanks-text reveal">Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.</p>'
    +'<p class="from-label reveal">Kami yang berbahagia</p>'
    +'<h2 class="closing-name reveal">Alman &amp; Terii</h2>'
    +'<p class="closing-date reveal">26 April 2026</p>'
    +'</div>';
}

// ─── MUSIC ─────────────────────────────────────────────────────────────────
var audio = null;
var playing = false;

function buildMusicWidget(){
  document.getElementById('music-widget').innerHTML =
    '<div id="music-panel">'
    +'<p class="panel-title">🎵 Lana Del Rey - Young and Beautiful</p>'
    +'<div class="panel-btns">'
    +'<button class="panel-btn" id="btn-pp" title="Play/Pause">⏸</button>'
    +'<button class="panel-btn" id="btn-mute" title="Mute">🔊</button>'
    +'</div></div>'
    +'<button id="btn-music" class="playing" title="Musik">🎵</button>';

  document.getElementById('btn-music').addEventListener('click', function(){
    document.getElementById('music-panel').classList.toggle('open');
  });
  document.getElementById('btn-pp').addEventListener('click', function(){
    if(!audio) return;
    if(playing){ audio.pause(); this.textContent='▶'; document.getElementById('btn-music').classList.remove('playing'); }
    else       { audio.play().catch(function(){}); this.textContent='⏸'; document.getElementById('btn-music').classList.add('playing'); }
    playing = !playing;
  });
  document.getElementById('btn-mute').addEventListener('click', function(){
    if(!audio) return;
    audio.muted = !audio.muted;
    this.textContent = audio.muted ? '🔇' : '🔊';
  });
}

// ─── FLOATERS ──────────────────────────────────────────────────────────────
function buildFloaters(){
  var c = document.getElementById('floaters');
  for(var i=0;i<8;i++){
    var div = document.createElement('div');
    div.className = 'floater';
    var x = Math.random()*100;
    var drift = (Math.random()-.5)*80;
    var dur   = 8+Math.random()*6;
    var delay = Math.random()*10;
    var size  = 12+Math.random()*12;
    var alpha = (0.2+Math.random()*0.3).toFixed(2);
    div.style.cssText = 'left:'+x+'vw;--dur:'+dur+'s;--delay:'+delay+'s;--drift:'+drift+'px;animation-delay:'+delay+'s;animation-duration:'+dur+'s;';
    div.innerHTML = starSVG(size,'rgba(201,164,108,'+alpha+')');
    c.appendChild(div);
  }
}

// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────
function initReveal(){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold:0.1, rootMargin:'-40px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
}

// ─── OPEN INVITATION ───────────────────────────────────────────────────────
function openInvitation(){
  var cover = document.getElementById('cover');
  var main  = document.getElementById('main');
  cover.classList.add('closing');
  audio = document.getElementById('wedding-audio');
  if(audio){ audio.play().catch(function(){}); playing = true; }
  setTimeout(function(){
    cover.classList.add('gone');
    main.classList.add('visible');
    initReveal();
    buildFloaters();
  }, 800);
}

// ─── INIT ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function(){
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
