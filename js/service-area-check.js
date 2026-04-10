/* Service Area Check — Carolina Blinds
   Uses IP geolocation to detect visitors outside the WNC service area.
   Shows a friendly modal with contact info if outside ~50-mile radius. */

(function () {
  if (sessionStorage.getItem('cb_area_checked')) return;

  // Center of service area (roughly between Hendersonville & Weaverville)
  var CENTER_LAT = 35.51;
  var CENTER_LON = -82.50;
  var MAX_MILES = 55;

  function haversine(lat1, lon1, lat2, lon2) {
    var R = 3959; // Earth radius in miles
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function showModal() {
    var overlay = document.createElement('div');
    overlay.id = 'cb-area-overlay';
    overlay.innerHTML =
      '<div id="cb-area-modal">' +
        '<button id="cb-area-close" aria-label="Close">&times;</button>' +
        '<h2>Looks Like You\u2019re Outside Our Service Area</h2>' +
        '<p>Carolina Blinds serves Western North Carolina. If you\u2019re nearby or planning a project in our area, we\u2019d still love to help \u2014 give us a call!</p>' +
        '<div class="cb-area-phones">' +
          '<a href="tel:8286978525"><strong>Hendersonville Gallery</strong><br>828-697-8525</a>' +
          '<a href="tel:8286810210"><strong>Weaverville Gallery</strong><br>828-681-0210</a>' +
        '</div>' +
        '<button id="cb-area-continue">Continue to Website</button>' +
      '</div>';

    var style = document.createElement('style');
    style.textContent =
      '#cb-area-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;animation:cbFadeIn .3s}' +
      '@keyframes cbFadeIn{from{opacity:0}to{opacity:1}}' +
      '#cb-area-modal{background:#FAF8F5;border-radius:12px;max-width:480px;width:100%;padding:36px 32px 28px;position:relative;text-align:center;font-family:"Source Sans 3",sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.18)}' +
      '#cb-area-modal h2{font-family:"Playfair Display",serif;color:#003B73;font-size:1.4rem;margin:0 0 12px;line-height:1.3}' +
      '#cb-area-modal p{color:#5A5A5A;font-size:15px;line-height:1.6;margin:0 0 20px}' +
      '.cb-area-phones{display:flex;gap:16px;justify-content:center;margin-bottom:24px;flex-wrap:wrap}' +
      '.cb-area-phones a{background:#003B73;color:#fff;text-decoration:none;padding:14px 20px;border-radius:8px;font-size:15px;line-height:1.4;flex:1;min-width:180px;transition:background .2s}' +
      '.cb-area-phones a:hover{background:#002347}' +
      '.cb-area-phones a strong{display:block;font-size:13px;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;color:#FFD700}' +
      '#cb-area-continue{background:none;border:none;color:#5A5A5A;font-size:14px;cursor:pointer;text-decoration:underline;padding:6px}' +
      '#cb-area-continue:hover{color:#003B73}' +
      '#cb-area-close{position:absolute;top:10px;right:14px;background:none;border:none;font-size:24px;color:#8A8A8A;cursor:pointer;line-height:1}' +
      '#cb-area-close:hover{color:#2C2C2C}';

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    function close() {
      overlay.remove();
      style.remove();
    }
    document.getElementById('cb-area-close').onclick = close;
    document.getElementById('cb-area-continue').onclick = close;
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
  }

  fetch('https://ipapi.co/json/')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      sessionStorage.setItem('cb_area_checked', '1');
      if (data && data.latitude && data.longitude) {
        var dist = haversine(CENTER_LAT, CENTER_LON, data.latitude, data.longitude);
        if (dist > MAX_MILES) {
          showModal();
        }
      }
    })
    .catch(function () {
      // Silently fail — don't block the site if API is down
      sessionStorage.setItem('cb_area_checked', '1');
    });
})();
