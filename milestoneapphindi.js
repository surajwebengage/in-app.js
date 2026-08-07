  (function() {
    // ---- read attributes from hidden payload ----
    function readAttr(id) {
      var el = document.getElementById(id);
      return el ? el.textContent.trim() : '';
    }
    function toBool(v) { return String(v).trim().toLowerCase() === 'true'; }

    var scanCount = parseInt(readAttr('p_scan'), 10);
    if (isNaN(scanCount)) scanCount = 0;

    var milestones = [
      toBool(readAttr('p_m1')),
      toBool(readAttr('p_m2')),
      toBool(readAttr('p_m3')),
      toBool(readAttr('p_m4'))
    ];

    // ---- render function ----
    function render() {
      var earnedCount = milestones.filter(Boolean).length;
      var nextIdx = milestones.findIndex(function (v) { return !v; }); // -1 if all done

      // 1. Headline
      var headline = document.getElementById('headline');
      if (earnedCount === 0) {
        headline.innerHTML = 'जितनी ज़्यादा खरीदारी, उतनी ज़्यादा कमाई<br>' +
          'हर पड़ाव पर <span class="hl">बोनस पक्का</span>!';
      } else if (earnedCount === 4) {
        headline.innerHTML = 'शानदार! आपने सभी पड़ाव पार कर लिए।<br>' +
          '<span class="hl">1000 बोनस पॉइंट्स</span> जीतने पर हार्दिक बधाई!';
      } else {
        headline.innerHTML = 'बस थोड़ा और ज़ोर लगाइए<br>' +
          'अंतिम पड़ाव तक <span class="hl">1000 बोनस पॉइंट्स</span> कमाइए';
      }

      // 2. Stars
      for (var i = 1; i <= 4; i++) {
        var star = document.getElementById('star' + i);
        var earned = milestones[i - 1];
        var isNext = (i - 1) === nextIdx;
        star.classList.toggle('earned', earned);
        star.classList.toggle('next', isNext && !earned);
      }

      // 3. Reward chips
      for (var j = 0; j < 4; j++) {
        var item = document.getElementById('ri' + (j + 1));
        var earned = milestones[j];
        var isNext = j === nextIdx;
        item.classList.toggle('earned', earned);
        item.classList.toggle('next', isNext && !earned);
      }

      // 4. Footer: hidden after first milestone earned
      var footer = document.getElementById('pointsFooter');
      if (earnedCount > 0) {
        footer.classList.add('hidden');
      } else {
        footer.classList.remove('hidden');
      }
    }

    // ---- demo state setter (remove with demo bar) ----
    window.setState = function(step) {
      var counts = [0, 5, 10, 20, 40];
      scanCount = counts[step];
      milestones = [step >= 1, step >= 2, step >= 3, step >= 4];
      render();
      // update active button style
      ['S0', 'S1', 'S2', 'S3', 'S4'].forEach(function (k) {
        var btn = document.getElementById('btn' + k);
        if (btn) btn.classList.remove('active-state');
      });
      var activeBtn = document.getElementById('btnS' + step);
      if (activeBtn) activeBtn.classList.add('active-state');
    };

    // initial render
    render();

    // (optional) sync with hidden payload if you update it dynamically
    // but for demo we rely on setState.
  })();
