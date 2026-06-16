 const answers = { q1: null, q2: null, q3: null, q4: null, q5: null };
    let currentPage = 1;
    const totalPages = 3;

    function showPage(n) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('page' + n);
      if (target) target.classList.add('active');
      document.getElementById('progressBar').style.width = ((n / totalPages) * 100) + '%';
      currentPage = n;
      const scrollContainer = document.getElementById('surveyScroll');
      if (scrollContainer) scrollContainer.scrollTop = 0;
    }

    function showErr(id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 2500);
    }

    function initOptions(containerId, stateKey, otherId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', () => {
          container.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
          item.classList.add('selected');
          const val = item.dataset.val;
          answers[stateKey] = val;
          if (otherId) {
            const otherInput = document.getElementById(otherId);
            if (val && val.startsWith('other-')) {
              otherInput.style.display = 'block';
              otherInput.focus();
            } else {
              otherInput.style.display = 'none';
            }
          }
        });
      });
      if (otherId) {
        const otherInput = document.getElementById(otherId);
        otherInput.addEventListener('input', () => {
          answers[stateKey] = otherInput.value.trim() || ('other-' + stateKey);
        });
      }
    }


    initOptions('q1Options', 'q1', 'q1Other');

    document.getElementById('next1').addEventListener('click', e => {
      e.preventDefault();
      if (!answers.q1) { showErr('err1'); return; }
      if (answers.q1 === 'Tenda') {
        showPage(2);
      } else {
        answers.q2 = 'N/A';
        showPage(3);
      }
    });

 
    document.querySelectorAll('#q2Grid .router-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('#q2Grid .router-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('q2None').classList.remove('selected');
        card.classList.add('selected');
        answers.q2 = card.dataset.val;
      });
    });

    document.getElementById('q2None').addEventListener('click', () => {
      document.querySelectorAll('#q2Grid .router-card').forEach(c => c.classList.remove('selected'));
      document.getElementById('q2None').classList.add('selected');
      answers.q2 = 'None of the above';
    });

    document.getElementById('prev2').addEventListener('click', e => { e.preventDefault(); showPage(1); });
    document.getElementById('next2').addEventListener('click', e => {
      e.preventDefault();
      if (!answers.q2) { showErr('err2'); return; }
      showPage(3);
    });

    initOptions('q3Options', 'q3', 'q3Other');
    initOptions('q4Options', 'q4', 'q4Other');

    document.querySelectorAll('#q5Scale .scale-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#q5Scale .scale-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        answers.q5 = btn.dataset.val;
      });
    });

    document.getElementById('prev3').addEventListener('click', e => {
      e.preventDefault();
      if (answers.q1 === 'Tenda') showPage(2);
      else showPage(1);
    });

    document.getElementById('submitBtn').addEventListener('click', e => {
      e.preventDefault();
      if (!answers.q3) { showErr('err3'); return; }
      if (!answers.q4) { showErr('err4'); return; }
      if (!answers.q5) { showErr('err5'); return; }

      const getVal = (key, otherId) => {
        if (answers[key] && answers[key].startsWith('other-')) {
          return document.getElementById(otherId)?.value.trim() || answers[key];
        }
        return answers[key];
      };

      const payload = {
        "question 1": getVal('q1', 'q1Other'),
        "question 2": answers.q2,
        "question 3": getVal('q3', 'q3Other'),
        "question 4": getVal('q4', 'q4Other'),
        "question 5": answers.q5
      };

      try {
        if (typeof weNotification !== 'undefined' && weNotification.trackEvent) {
          weNotification.trackEvent("Feedback Submitted", JSON.stringify(payload));
        } else {
          console.log("weNotification event payload:", JSON.stringify(payload, null, 2));
        }
      } catch (err) {
        console.error("weNotification error:", err);
      }

      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById('successScreen').classList.add('active');
      document.getElementById('progressBar').style.width = '100%';
      const scrollContainer = document.getElementById('surveyScroll');
      if (scrollContainer) scrollContainer.scrollTop = 0;
    });
