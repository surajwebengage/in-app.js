 (function () {
        var weSpinWheel = document.getElementById("weSpinWheel");
        var face = weSpinWheel.querySelector(".face");
        var n = weDATA.length;
        var slice = 360 / n;

        // Build the wheel face (conic-gradient slices + labels) from weDATA, so any
        // number of prizes / colors keeps working, not just a fixed set of slices.
        var stops = weDATA
          .map(function (d, i) {
            return d.color + " " + i * slice + "deg " + (i + 1) * slice + "deg";
          })
          .join(", ");
        face.style.background = "conic-gradient(from " + -slice / 2 + "deg, " + stops + ")";

        weDATA.forEach(function (d, i) {
          var label = document.createElement("div");
          label.className = "l";
          label.textContent = d.weName;
          label.style.color = contrastColor(d.color);
          var angle = i * slice;
          label.style.transform = "translate(-50%,-50%) rotate(" + angle + "deg) translateY(-62px)";
          face.appendChild(label);
        });

        function contrastColor(hex) {
          var c = hex.replace("#", "");
          if (c.length === 3) c = c.split("").map(function (ch) { return ch + ch; }).join("");
          var r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
          var yiq = (r * 299 + g * 587 + b * 114) / 1000;
          return yiq >= 150 ? "#1c4a3f" : "#ffffff";
        }

        // ---- spin logic (weighted pick + "don't repeat a slice until every
        // slice has been shown" behaviour, ported from the previous version) ----

        var rotation = 0;
        var oldpick = [];
        var busy = false;
        var spinBtn = document.getElementById("spinBtn");

        function pickWeighted() {
          var total = weDATA.reduce(function (s, d) { return s + d.wePercWght; }, 0);
          var r = Math.random() * total;
          for (var i = 0; i < weDATA.length; i++) {
            r -= weDATA[i].wePercWght;
            if (r <= 0) return i;
          }
          return weDATA.length - 1;
        }

        function pickIndex() {
          var idx = pickWeighted();
          var guard = 0;
          while (oldpick.indexOf(idx) !== -1 && guard < 1000) {
            idx = pickWeighted();
            guard++;
          }
          return idx;
        }

        window.spin = function () {
          if (busy || oldpick.length === weDATA.length) return;
          busy = true;
          spinBtn.disabled = true;

          var idx = pickIndex();
          oldpick.push(idx);

          var target = idx * slice;
          var current = ((rotation % 360) + 360) % 360;
          var desiredMod = (((360 - target) % 360) + 360) % 360;
          var delta = desiredMod - current;
          if (delta < 0) delta += 360;
          rotation += 1440 + delta;
          weSpinWheel.style.transform = "rotate(" + rotation + "deg)";

          setTimeout(function () {
            reveal(idx);
            busy = false;
            spinBtn.disabled = oldpick.length === weDATA.length;
          }, 5300);
        };

        function reveal(idx) {
          var d = weDATA[idx];
          document.getElementById("wS").classList.remove("on");
          var exhausted = oldpick.length === weDATA.length;

          if (d.weWin === "yes") {
            document.querySelector("#prize").textContent = d.weName;
            document.querySelector("#cp_code").textContent = d.weCode;
            try {
              weNotification.trackEvent(
                "In-app Template - Spin Clicked",
                JSON.stringify({ Win: d.weWin, "Coupon Code": d.weCode, "Respin count": oldpick.length }),
                false
              );
            } catch (e) {}
            document.getElementById("winRespin").style.display = exhausted ? "none" : "";
            document.getElementById("rS").classList.add("on");
          } else {
            try {
              weNotification.trackEvent(
                "In-app Template - Spin Clicked",
                JSON.stringify({ Win: d.weWin, "Respin count": oldpick.length }),
                false
              );
            } catch (e) {}
            document.getElementById("loseRespin").style.display = exhausted ? "none" : "";
            document.getElementById("lS").classList.add("on");
          }
        }

        function backToWheel() {
          document.getElementById("rS").classList.remove("on");
          document.getElementById("lS").classList.remove("on");
          document.getElementById("wS").classList.add("on");
        }

        // Wired once (not inside reveal()) so repeated respins don't stack up
        // duplicate click listeners on the same button.
        document.getElementById("winRespin").addEventListener("click", function () {
          backToWheel();
        });
        document.getElementById("loseRespin").addEventListener("click", function () {
          try {
            weNotification.trackEvent(
              "In-app Template - Spin Clicked",
              JSON.stringify({ Win: "no", Respin: true, "Respin count": oldpick.length }),
              false
            );
          } catch (e) {}
          backToWheel();
        });

        window.copyCode = async function () {
          var codeEl = document.querySelector("#cp_code");
          var text = codeEl.textContent;
          try {
            if (navigator.clipboard) {
              await navigator.clipboard.writeText(text);
            } else {
              var ta = document.createElement("textarea");
              ta.value = text;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              ta.remove();
            }
            var ok = document.querySelector("#ok");
            ok.classList.add("on");
            setTimeout(function () { ok.classList.remove("on"); }, 1000);
            try {
              weNotification.trackEvent("In-app Template - Copy Clicked", JSON.stringify({ "Coupon Code": text }), false);
            } catch (e) {}
          } catch (e) {}
        };
      })();
