
 // let scanCount = 5;

  let scanCount = parseInt(document.querySelector('#winback_scan_count p').textContent.trim(), 10) || 0;

  function renderMilestone(scans) {
    // ── Status heading ──
    const heading = document.getElementById('statusHeading');
    if (scans === 0) {
      heading.innerHTML = 'आपने अभी तक <span class="hl">कोई स्कैन नहीं किया है</span>';
    } else if (scans >= 10) {
      heading.innerHTML = '<span class="hl">10 स्कैन</span> पूरे !';
    } else {
      heading.innerHTML = 'आपने <span class="hl">' + scans + ' स्कैन</span> पूरे किए!';
    }

    // ── Tracker nodes ──
    const node1  = document.getElementById('node1');
    const node5  = document.getElementById('node5');
    const node10 = document.getElementById('node10');
    const line1  = document.getElementById('line1');
    const line2  = document.getElementById('line2');
    const lbl1   = document.getElementById('label1');
    const lbl5   = document.getElementById('label5');
    const lbl10  = document.getElementById('label10');

    // reset
    [node1,node5,node10].forEach(n => n.className = 'node-circle');
    [lbl1,lbl5,lbl10].forEach(l => l.className = 'node-label');
    line1.classList.remove('active');
    line2.classList.remove('active');

    if (scans >= 1)  { node1.classList.add('done');  lbl1.classList.add('active-label');  line1.classList.add('active'); }
    else if (scans > 0) { node1.classList.add('next');  lbl1.classList.add('active-label'); }

    if (scans >= 5)  { node5.classList.add('done');  lbl5.classList.add('active-label');  line2.classList.add('active'); }
    else if (scans >= 1) { node5.classList.add('next'); lbl5.classList.add('active-label'); }

    if (scans >= 10) { node10.classList.add('done'); lbl10.classList.add('active-label'); }
    else if (scans >= 5) { node10.classList.add('next'); lbl10.classList.add('active-label'); }

    // ── Milestone cards ──
    setCard('ms1',  'ms1h',  'ms1icon',  '1<sup>st</sup> स्कैन पर',  scans >= 1,  false,              scans === 0);
    setCard('ms5',  'ms5h',  'ms5icon',  '5<sup>th</sup> स्कैन पर',  scans >= 5,  scans >= 1 && scans < 5, scans < 1);
    setCard('ms10', 'ms10h', 'ms10icon', '10<sup>th</sup> स्कैन पर', scans >= 10, scans >= 5 && scans < 10, scans < 5);

    // ── Coins ──
    const coinRow = document.getElementById('coinRow');
    coinRow.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const c = document.createElement('div');
      c.className = 'coin' + (i <= scans ? ' filled' : '');
      c.textContent = i <= scans ? '₹' : '';
      coinRow.appendChild(c);
    }

    // ── CTA ──
    const ctaMain = document.getElementById('ctaMain');
    const ctaSub  = document.getElementById('ctaSub');
    const ctaBtn  = document.getElementById('ctaBtn');

    if (scans >= 10) {
      ctaMain.innerHTML = '<span class="cta-white">🎉 बधाई हो! </span>150 पॉइंट्स प्राप्त।';
      ctaSub.textContent = 'मैक्सिमम बोनस अनलॉक हो गए।';
      ctaBtn.textContent = 'और पॉइंट्स कमाएं';
      ctaBtn.className = 'cta-btn orange-btn';
    } else if (scans >= 5) {
      const left = 10 - scans;
      ctaMain.innerHTML = 'बस <span class="cta-white">' + left + ' और स्कैन</span> – अगला रिवॉर्ड अनलॉक करें!';
      ctaSub.textContent = 'बिरला व्हाइट प्रोडक्ट्स स्कैन करते रहें।';
      ctaBtn.textContent = 'अभी स्कैन करें';
      ctaBtn.className = 'cta-btn';
    } else if (scans >= 1) {
      const left = 5 - scans;
      ctaMain.innerHTML = 'बस <span class="cta-white">' + left + ' और स्कैन</span> – अगला रिवॉर्ड अनलॉक करें!';
      ctaSub.textContent = 'बिरला व्हाइट प्रोडक्ट्स स्कैन करते रहें।';
      ctaBtn.textContent = 'अभी स्कैन करें';
      ctaBtn.className = 'cta-btn';
    } else {
      ctaMain.innerHTML = 'अपने पहले पैक को स्कैन करें – <span class="cta-white">पाएँ 50 पॉइंट्स!</span>';
      ctaSub.textContent = 'शुरुआत के लिए बिरला व्हाइट के किसी भी प्रोडक्ट को स्कैन करें।';
      ctaBtn.textContent = 'अभी स्कैन करें';
      ctaBtn.className = 'cta-btn';
    }
  }

  function setCard(cardId, headerId, iconId, labelHtml, earned, nextUp, locked) {
    const card   = document.getElementById(cardId);
    const header = document.getElementById(headerId);
    const icon   = document.getElementById(iconId);

    card.className = 'ms-card ' + (earned ? 'earned' : nextUp ? 'next-up' : 'locked');
    icon.textContent = earned ? '✅' : nextUp ? '🎯' : '🔒';
    header.innerHTML = '<span class="lock-icon" id="' + iconId + '">' + icon.textContent + '</span> ' + labelHtml;
  }

  function showMilestone(scans) {
    scanCount = scans;
    renderMilestone(scanCount);
    if (scans === 1 || scans === 5 || scans === 10) {
      weNotification.trackEvent("milestoneReached", JSON.stringify({
        "milestoneReach": scans,
        "points": 50,
        "Campaign ID": "37hh97o"
      }));
    }
    document.getElementById('overlay').classList.add('active');
    ['0','3','5','10'].forEach(s => {
      document.getElementById('btn'+s).classList.remove('active-state');
    });
    const key = scans === 0 ? '0' : scans === 3 ? '3' : scans === 5 ? '5' : '10';
    const el = document.getElementById('btn' + key);
    if (el) el.classList.add('active-state');
  }

  function closeOverlay() {
    document.getElementById('overlay').classList.remove('active');
  }

  // Initial render
  renderMilestone(scanCount);
