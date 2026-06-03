 var D = [{
        weName: "100 ZingCoins",
        wePercWght: 25,
        type: "image",
        img: "https://afiles.webengage.com/~15ba1dbb5/724d1383-891b-4868-b85a-4420568909a5.png",
        redirect: "https://www.zingoy.com/refer-and-earn?ref=home_earn_section"
      }, {
        weName: "10 ZingCoins",
        wePercWght: 25,
        type: "image",
        img: "https://afiles.webengage.com/~15ba1dbb5/c9b7a897-d518-4540-aa75-a133c1e8c405.png",
        redirect: "https://www.zingoy.com/refer-and-earn?ref=home_earn_section"
      }, {
        weName: "JBL Lucky Draw",
        wePercWght: 25,
        type: "image",
        img: "https://afiles.webengage.com/~15ba1dbb5/1d65299c-e5bb-4803-9f46-23db2efe2d8f.png",
        redirect: "https://www.zingoy.com/refer-and-earn?ref=home_earn_section"
      }, {
        weName: "10% Cashback",
        weCode: "BDAY10",
        wePercWght: 25,
        type: "coupon",
        expiry: "10th June",
        img: "https://static-assets-services.s3.ap-south-1.amazonaws.com/money-stack-with-shield-icon-3d-illustration-background+(1)+1.png",
        redirect: "https://www.zingoy.com/gift-cards/zingoy",
        rewardText: "Flat 10% cashback on your next gift card purchase",
        userText: "( max ₹25 once per user )"
      }, {
        weName: "₹5 Cashback",
        weCode: "ZDAY5",
        wePercWght: 25,
        type: "coupon",
        expiry: "15th June",
        img: "https://static-assets-services.s3.ap-south-1.amazonaws.com/ChatGPT+Image+May+27%2C+2026%2C+09_58_28+AM+1.png",
        redirect: "https://www.zingoy.com/gift-cards/zingoy",
        rewardText: "You won ₹5 cashback on ₹10 Zingoy Voucher",
        userText: "( Once per user )"
      }],
      spinning = 0,
      sCount = 0,
      curRot = 0,
      sTo = null,
      pi = document.getElementById("pi"),
      wheel = document.getElementById("wheel"),
      ro = document.getElementById("ro"),
      rc = document.getElementById("rc"),
      cv = document.getElementById("cc"),
      cx = cv.getContext("2d"),
      cp = [],
      craf = null,
      cols = ["#ffe600", "#ff3b82", "#0a3a91", "#fff", "#ff9800", "#4caf50", "#e91e63", "#00bcd4"];

    function hP() {
      pi && (pi.style.opacity = 0, pi.style.visibility = "hidden")
    }

    function sP() {
      pi && (pi.style.opacity = 1, pi.style.visibility = "visible")
    }

    function rndIdx() {
      var o = [];
      return D.forEach((e, t) => {
        for (var a = 0; a < (e.wePercWght || 0); a++) o.push(t)
      }), o[Math.floor(Math.random() * o.length)]
    }

    function rotFor(e) {
      var t = 360 / D.length;
      return (90 - (e * t + t / 2) + 160 + 360) % 360
    }

    function spin() {
      if (spinning) return showToast("Wait, still spinning!");
      spinning = 1, sCount++;
      var e = document.querySelector(".spin-btn");
      e.style.opacity = .7, e.disabled = 1;
      var t = rndIdx(),
        a = D[t],
        t = rotFor(t) + 360 * (5 + Math.floor(6 * Math.random()));
      wheel.style.transition = "transform 4s cubic-bezier(0.25,0.1,0.15,1)", wheel.style.transform = "rotate(" + t + "deg)", curRot = t;
      try {
        var o = JSON.parse(localStorage.getItem("z_hist") || "[]");
        o.push({
          n: sCount,
          p: a.weName,
          c: a.weCode || "",
          t: (new Date).toISOString()
        }), 20 < o.length && o.shift(), localStorage.setItem("z_hist", JSON.stringify(o))
      } catch (e) {}
      sTo && clearTimeout(sTo), sTo = setTimeout(() => {
        showReward(a), e.style.opacity = 1, e.disabled = 0, spinning = 0, setTimeout(() => {
          wheel.style.transition = ""
        }, 100)
      }, 4e3)
    }

    function trackWebEngageEvent(e) {
      try {
        var t = {
          campaign_id: "311m1r9",
          result_value: e.weName,
          coupon_code: e.weCode || null,
          reward_type: e.type,
          spin_number: sCount
        };
        console.log("WebEngage Event Data:", t), console.log("WebEngage Event Data (Stringified):", JSON.stringify(t)), weNotification.trackEvent("wheel_spin_result", JSON.stringify(t), !1)
      } catch (e) {
        console.error("WebEngage tracking error:", e)
      }
    }

    function launchConfetti() {
      cv.width = innerWidth, cv.height = innerHeight, cv.style.display = "block", cp = [];
      for (var e = 0; e < 120; e++) cp.push({
        x: Math.random() * cv.width,
        y: -10 - 100 * Math.random(),
        w: 6 + 6 * Math.random(),
        h: 3 + 4 * Math.random(),
        color: cols[Math.floor(Math.random() * cols.length)],
        rot: 360 * Math.random(),
        vx: 3 * (Math.random() - .5),
        vy: 2 + 3 * Math.random(),
        vr: 8 * (Math.random() - .5),
        o: 1
      });
      craf && cancelAnimationFrame(craf),
        function e() {
          cx.clearRect(0, 0, cv.width, cv.height);
          var t = 0;
          cp.forEach(e => {
            e.x += e.vx, e.y += e.vy, e.rot += e.vr, e.y > .7 * cv.height && (e.o -= .03), 0 < e.o && e.y < cv.height + 20 && (t = 1, cx.save(), cx.globalAlpha = Math.max(0, e.o), cx.translate(e.x, e.y), cx.rotate(e.rot * Math.PI / 180), cx.fillStyle = e.color, cx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h), cx.restore())
          }), t ? craf = requestAnimationFrame(e) : cv.style.display = "none"
        }()
    }

    function stopConfetti() {
      craf && cancelAnimationFrame(craf), cv.style.display = "none", cp = []
    }

    function showReward(e) {
      if (trackWebEngageEvent(e), launchConfetti(), hP(), "image" === e.type) return rc.innerHTML = `<img src="${e.img}" class="fullReward" onclick="closeOverlay();window.open('${e.redirect}','_blank');weNotification.close();">`, void(ro.style.display = "flex");
      var t = "10% Cashback" === e.weName ? "Buy gift cards and save instantly" : "Won ₹5 cashback coupon";
      rc.innerHTML = `<div class="rewardWrap"><h1 class="rewardHeading">Congratulations!</h1><p class="rewardSubHeading">${t}</p><div class="rewardCard"><img class="rewardImage" src="${e.img}"><div class="rewardText">${e.rewardText}</div><div class="userText">${e.userText||""}</div><div class="couponBox"><span class="couponCode" id="cc2">${e.weCode}</span><span onclick="copyCoupon()"><img src="https://afiles.webengage.com/~15ba1dbb5/5d48edc6-cd21-4d07-8e59-806bb1f57e29.png" style="width:24px"></span></div><div class="expiryText">Expiry - ${e.expiry}</div></div><button class="copyBtn" onclick="copyCoupon()">Copy Coupon Code</button><button class="buyBtn" onclick="window.open('${e.redirect}','_blank');closeOverlay();weNotification.close();">Buy Now</button></div>`, ro.style.display = "flex"
    }

    function closeOverlay() {
      ro.style.display = "none", sP(), stopConfetti()
    }
    async function copyCoupon() {
      var t = document.getElementById("cc2");
      if (t) {
        var a = t.innerText.trim();
        try {
          await navigator.clipboard.writeText(a)
        } catch (e) {
          (t = document.createElement("textarea")).value = a, document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t)
        }
        showToast("✓ " + a + " copied!")
      }
    }

    function showToast(e) {
      var t = document.querySelector(".toast");
      t && t.remove();
      var a = document.createElement("div");
      a.className = "toast", a.innerText = e, document.body.appendChild(a), setTimeout(() => {
        a.style.opacity = 0, setTimeout(() => a.remove(), 300)
      }, 2e3)
    }
    ro.onclick = e => {
      e.target === ro && closeOverlay()
    }, addEventListener("load", () => {
      wheel.style.transform = "rotate(0deg)", curRot = 0, sP()
    })
