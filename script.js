<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KWD Spin · WhatsApp notification</title>
    <!-- Winwheel & GSAP -->
    <script type="text/javascript"
        src="https://cdn.rawgit.com/zarocknz/javascript-winwheel/2.6/Winwheel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    <style>
        @font-face {
            font-family: "DINOT";
            src: url("https://dmq2kle6yj1z5.cloudfront.net/~10a5cb53d/2025-02-18T10%3A24%3A14.604ZDINOT.OTF") format("opentype");
        }

        @font-face {
            font-family: "PlayfairDisplay-VariableFont_wght";
            src: url("https://dmq2kle6yj1z5.cloudfront.net/~134104929/2025-09-15T10%3A27%3A45.943ZPlayfairDisplay-VariableFont_wght.ttf") format("opentype");
        }

        @font-face {
            font-family: "Roboto-Regular";
            src: url("https://dmq2kle6yj1z5.cloudfront.net/~134104929/2025-09-15T10%3A30%3A35.173ZRoboto-Regular.ttf") format("opentype");
        }

        body {
            font-family: "DINOT";
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
            overflow-y: hidden;
            background-position: 100% 100%;
            background-size: cover;
        }

        td.the_wheel,
        canvas#canvas {
            background-size: cover;
            /* background-image: url(https://d3nez31vakvhqn.cloudfront.net/Spin_Wheel/wheel_back.png); */
            background-position: center;
            background-repeat: no-repeat;
            width: 70%;
        }

        h1,
        p {
            margin: 0;
        }

        p {
            font-size: 15px;
        }

        .clickable {
            cursor: pointer;
        }

        .t5 {
            margin-top: 20px;
            font-size: 10px;
            color: #333;
            font-family: "Roboto-Regular";
        }

        .margin_bottom {
            margin-bottom: 5px;
        }

        span.t1 {
            font-size: 21px;
            color: #fcd988;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-family: "PlayfairDisplay-VariableFont_wght";
            line-height: 15px;
            direction: rtl;
        }

        span.t1 span {
            font-size: 13px;
            font-family: "Roboto-Regular";
        }

        .kd1 {
            font-size: 22px;
            color: #ffffff;
            font-weight: bold;
            text-align: center;
            font-family: 'PlayfairDisplay-VariableFont_wght';
            line-height: 16px;
            margin-top: 12px;
            line-height: 1.5;
            margin-bottom: 15px;
            direction: rtl;
        }

        .kd1 span {
            font-size: 11px;
        }

        a.ctaA {
            background-color: black;
            text-decoration: none;
            padding: 5px 34px;
            font-size: 18px;
            color: #fff;
            letter-spacing: 0.5px;
            font-family: "PlayfairDisplay-VariableFont_wght";
        }

        .prize-message {
            margin-top: 15px;
            text-align: center;
        }

        .hidden-data {
            display: none;
        }
    </style>
</head>

<body>
    <canvas id="canvas" width="700" height="850"></canvas>
    <div id="myList" style="padding: 10px; text-align: center; margin-top: 5px"></div>

    <!-- Hidden spans to hold coupon code and prize name for postMessage -->
    <div class="hidden-data">
        <span id="couponCode"></span>
        <span id="offerWon"></span>
    </div>

    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; text-align: center">
        <tbody>
            <tr>
                <td>
                    <div class="power_controls">
                        <div style="display: flex; justify-content: center" id="spin_button" alt="Spin">
                            <p style="padding: 9px 1px; cursor: pointer; width: 68% !important; background-color: #fcd987; border: 1px solid #fdd987; font-size: 26px; font-weight: 900; color: #fff;direction: rtl;"
                                onclick="calculatePrize();">
                                العب الان
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <script>

        const SEGMENT_TEXTS = [
            "Try again",      // index 0
            "Try again",      // index 1
            "5KWD",           // index 2
            "5KWD",           // index 3
            "5KWD",           // index 4
            "7KWD",           // index 5
            "7KWD",           // index 6
            "10KWD"           // index 7
        ];

        const PRIZE_CODES = {
            "5KWD": "Ramadan5",
            "7KWD": "Ramadan7",
            "10KWD": "Ramadan10"
        };

        const PRIZE_INDEXES = {
            "Try again": [0, 1],
            "5KWD": [2, 3, 4],
            "7KWD": [5, 6],
            "10KWD": [7]
        };

        const PROB_TABLE = [
            { prize: "Try again", prob: 0.20 },
            { prize: "5KWD", prob: 0.30 },
            { prize: "7KWD", prob: 0.30 },
            { prize: "10KWD", prob: 0.20 }
        ];


        let theWheel = new Winwheel({
            numSegments: 8,
            outerRadius: 160,
            drawMode: "image",
            rotationAngle: -14,
            segments: SEGMENT_TEXTS.map(text => ({ text: text })),
            animation: {
                type: "spinToStop",
                duration: 5,
                spins: 6,
                callbackFinished: "logChore()"
            }
        });

        let wheelSpinning = false;

        function calculatePrize() {
            if (wheelSpinning) return;

            let rnd = Math.random();
            let cumulative = 0;
            let selectedPrize = null;
            for (let entry of PROB_TABLE) {
                cumulative += entry.prob;
                if (rnd < cumulative) {
                    selectedPrize = entry.prize;
                    break;
                }
            }
            if (!selectedPrize) selectedPrize = "حاول مره اخرى";

            let possibleIndexes = PRIZE_INDEXES[selectedPrize];
            let chosenIndex = possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];

            let stopAt = chosenIndex * 45 + 60;
            theWheel.animation.stopAngle = stopAt;
            theWheel.startAnimation();
            wheelSpinning = true;
            addCSSAfterSpin();
        }

        let loadedImg = new Image();
        loadedImg.onload = function () {
            theWheel.wheelImage = loadedImg;
            theWheel.draw();
        };
        loadedImg.src = "https://afiles.webengage.com/~15ba1dbb5/c0a1a5cb-5794-4861-91f0-a3f8fe640179.png";

        function logChore() {
            let winningSegment = theWheel.getIndicatedSegment();
            let prizeText = winningSegment.text;
            let code = PRIZE_CODES[prizeText] || '';

            // --- Set hidden elements for the event data ---
            document.getElementById('couponCode').textContent = code;
            document.getElementById('offerWon').textContent = prizeText;

            // --- PostMessage exactly as in the reference snippet (with setTimeout) ---
            setTimeout(() => {
                const couponEl = document.getElementById('couponCode');
                const offerWon = document.getElementById('offerWon');
                if (couponEl && offerWon) {
                    const couponValue = couponEl.textContent.trim();
                    const offerWonVal = offerWon.textContent.trim();
                    window.parent.parent.postMessage(
                        {
                            type: "couponCode",
                            value: couponValue,
                            offerWon: offerWonVal,
                        },
                        "*"
                    );
                }
            }, 100);

            // --- Display simple message (no code shown, no copy) ---
            let existingMsg = document.querySelector(".prize-message");
            if (existingMsg) existingMsg.remove();

            let prizeMessage = document.createElement("div");
            prizeMessage.classList.add("prize-message");

            let congrats = document.createElement("span");
            congrats.className = "t1";

            let prizeDiv = document.createElement("div");
            prizeDiv.className = "kd1";

            if (code) {
              congrats.innerHTML = "مبروك!<br><span>" + prizeText + " لقد ربحت قسيمة بقيمة</span>";
                prizeDiv.innerHTML = "ستصلك القسيمة عبر الواتس اب خلال دقائق";
                prizeMessage.appendChild(congrats);
                prizeMessage.appendChild(document.createElement("br"));
                prizeMessage.appendChild(prizeDiv);
            } else {
                congrats.textContent = "حظا أوفر!";
                prizeDiv.innerHTML = prizeText;
                prizeMessage.appendChild(congrats);
                prizeMessage.appendChild(document.createElement("br"));
                prizeMessage.appendChild(prizeDiv);
            }

            document.getElementById("myList").appendChild(prizeMessage);

            // Hide spin button
            document.getElementById("spin_button").style.display = "none";

            // Reset wheelSpinning flag if you want to allow another spin (optional)
            // wheelSpinning = false;
        }

        function addCSSAfterSpin() {
            // style already included inline
        }

        // All analytics (dataLayer, custom events) have been removed.
        // Only the required postMessage remains.
    </script>
</body>

</html>
