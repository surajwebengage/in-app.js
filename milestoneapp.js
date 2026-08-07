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

  function render() {
    var earnedCount = milestones.filter(Boolean).length;
    var nextIdx = milestones.findIndex(function (v) { return !v; }); // -1 if all done

    // ---- Headline ----
    var headline = document.getElementById('headline');
    if (earnedCount === 0) {
      headline.innerHTML = 'MORE YOU BUY, MORE YOU EARN<br>' +
        '<span class="hl">GUARANTEED BONUS</span> REWARDS AT EVERY MILESTONE';
    } else if (earnedCount === 4) {
      headline.innerHTML = "WELL DONE! YOU'VE CROSSED EVERY MILESTONE.<br>" +
        'ENJOY YOUR <span class="hl">1,000 BONUS POINTS</span>!';
    } else {
      headline.innerHTML = "YOU'RE ALMOST THERE! REACH THE NEXT MILESTONE<br>" +
        'AND EARN <span class="hl">1,000 BONUS POINTS</span>';
    }

    // ---- Stars ----
    for (var i = 1; i <= 4; i++) {
      var star = document.getElementById('star' + i);
      star.classList.toggle('earned', milestones[i - 1]);
      star.classList.toggle('next', (i - 1) === nextIdx);
    }

    // ---- Reward chips ----
    for (var j = 0; j < 4; j++) {
      var item = document.getElementById('ri' + (j + 1));
      item.classList.toggle('earned', milestones[j]);
      item.classList.toggle('next', j === nextIdx);
    }

    // ---- Footer points block: only shown before the first milestone ----
    document.getElementById('pointsFooter').classList.toggle('hidden', earnedCount > 0);
  }

  // ---- Demo state simulator (delete along with .demo-bar before shipping) ----
  function setState(step) {
    var counts = [0, 5, 10, 20, 40];
    scanCount = counts[step];
    milestones = [step >= 1, step >= 2, step >= 3, step >= 4];
    render();
    ['S0', 'S1', 'S2', 'S3', 'S4'].forEach(function (k) {
      document.getElementById('btn' + k).classList.remove('active-state');
    });
    document.getElementById('btnS' + step).classList.add('active-state');
  }

  render();
