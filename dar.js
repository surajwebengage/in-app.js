<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>In-App Spin The Wheel - Webengage</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="stylesheet" href="https://surajwebengage.github.io/in-app.js/dar.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/d3@3" charset="utf-8"></script>
    <style>
       .main::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent !important;
}

#weSpinWheel > svg > g.spinner > circle {
    fill: white !important;
    filter: unset !important;
}

.slice > path {
    stroke: #1C4A3F !important;
}
    </style>

</head>

<body>
    <dialog open class="main">
        <div class="spinContainer">
            <h2 style="color: #ffffff;">جـــــرب حـظـــــك</h2>
            <div id="weSpinWheel">
            </div>
            <div class="wheel-stand-container">
                <img
                    src="https://ofiles.webengage.com/inapp-custom-layouts/966147/2024-02-21T14%3A20%3A45.697ZGroup%2081.svg">
            </div>
            <p class="badge-container">
                <span class="badge-text">الفرض</span>
  <span class="badge-number">2</span>
  <span class="badge-text">المتبقية</span>
            </p>
            <button class="spin-button" onclick="spin();">
                <!-- <img src="https://ofiles.webengage.com/inapp-custom-layouts/966147/2024-02-21T14%3A22%3A17.373ZVector%20%282%29.svg"
               style="align-self: center;width: 17px;"> -->
                <p style="align-self: center;color: #ffffff;font-size: 17px;font-weight: 500;">لفهـــــا الحيــن</p>
            </button>
        </div>
        <!-- This win container will be visible only when the data items have winning condition yes i.e. win: 'yes'. -->
        <div class="weWinCont">
            <div style="display: inline-flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;">
                <h2 style="text-align: center;color: #961A4D;">مبرووووك<span id="prize"
                        style="font-weight: 600;font-family: sans-serif;color: #1C4A3F;"></span></h2>
                <img src="https://ofiles.webengage.com/inapp-custom-layouts/966147/2024-02-21T14%3A19%3A56.308ZGift.svg"
                    alt="win" srcset="" style="display: none;">
                <code><p id = "cp_code"></p>
            <!-- <img src="https://ofiles.webengage.com/inapp-custom-layouts/966147/2024-02-21T14%3A19%3A15.166Zcopy-06.svg" alt="copy-code" srcset="" onclick="copyCode();"> -->
            <span>copied</span></code>
                <p style="color: #3C9079;">KSA96</p>
            </div>
            <div style="display: inline-flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    row-gap: 1em;">
                <a href="app://continue-shopping" class="continue-button">
                    انســخ الكــود</a>
                <button class="respin-button" style="display: none;">
                    <img src="https://ofiles.webengage.com/inapp-custom-layouts/966147/2024-02-21T14%3A22%3A17.373ZVector%20%282%29.svg"
                        style="align-self: center;width: 17px;">
                    <p style="align-self: center;color: #ffffff;font-size: 17px;font-weight: 500;">انســخ الكــود</p>
                </button>
            </div>
        </div>
        <!-- This lost container will be visible only when the data items have winning condition yes i.e. win: 'no'. -->
        <div class="welostCont">
            <div style="display: inline-flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    row-gap: 1em;">
                <h2 style="text-align: center;
                     font-style: normal;
                     font-weight: 600;
                     font-size: 24px;
                     line-height: 140%;
                     color: #1E1E1E;">Better luck next time</h2>
                <h4>We are constantly putting up more offers, check again</h4>
                <img src="https://ofiles.webengage.com/inapp-custom-layouts/966147/2024-02-21T14%3A21%3A08.354Zimage%20217.svg"
                    alt="loser">
            </div>
            <div style="display: inline-flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    row-gap: 1em;">
                <button class="respin-button">
                    <img src="https://ofiles.webengage.com/inapp-custom-layouts/966147/2024-02-21T14%3A22%3A17.373ZVector%20%282%29.svg"
                        style="align-self: center;width: 17px;">
                    <p style="align-self: center;color: #ffffff;font-size: 17px;font-weight: 500;">Respin</p>
                </button><a href="app://continue-shopping"
                    style="border-radius: 6px;color: #001D34;width: 215px;height: 45px;
            display: inline-flex;flex-direction: column;justify-content: center;font-size: 17px;font-weight: 400;background: transparent;text-align: center;border: 1.5px solid #000000;line-height: 32px;box-shadow: 0px 3px 2px 0px #000000;">Continue
                    shopping</a>
            </div>
        </div>
    </dialog>
    <script>
         var weDATA = [
            { "weName": "قسيمة شرائية 100 ريال", "weCode": "توصيـل مجـانـي", "weWin": "yes", "color": "#AFD8C6", "wePercWght": 25 },
            { "weName": "قسيمة شرائية 50 ريال", "weCode": "توصيـل مجـانـي", "weWin": "yes", "color": "#D0C0AE", "wePercWght": 25 },
            { "weName": "شحن مجاني", "weCode": "توصيـل مجـانـي", "weWin": "yes", "color": "#3C9079", "wePercWght": 25 },
            { "weName": "خصم 5%", "weCode": "توصيـل مجـانـي", "weWin": "yes", "color": "#EDE3D9", "wePercWght": 25 },
            { "weName": "خصم 10%", "weCode": "توصيـل مجـانـي", "weWin": "yes", "color": "#3C9079", "wePercWght": 25 },
        ]; </script>
    <!-- <script src="https://surajwebengage.github.io/in-app.js/dar.js"></script> -->
     <script>
        var padding = {
        top: 20,
        right: 0,
        bottom: 0,
        left: 0
    },
    w = 300 - padding.left - padding.right,
    h = 300 - padding.top - padding.bottom,
    r = Math.min(w, h) / 2,
    rotation = 0,
    oldrotation = -45,
    picked = 1e3,
    oldpick = [],
    color = d3.scale.category20(),
    svg = d3.select("#weSpinWheel").append("svg").data([weDATA]),
    container = svg.append("g").attr("class", "spinner").attr(
        "transform", "translate(" + (w / 2 + padding.left) + "," + (
            h / 2 + padding.top) + ")"),
    vis = container.append("g").attr("class", "spi").attr(
        "transition", "transform 3s cubic-bezier(0.4, 0, 0.2, 1);")
    .attr("transform", "rotate(-45)"),
    pie = d3.layout.pie().sort(null).value(function(t) {
        return 1
    }),
    arc = d3.svg.arc().outerRadius(r),
    arcs = vis.selectAll("g.slice").data(pie).enter().append("g")
    .attr("class", "slice");

function spin(t) {
    if (container.on("click", null), oldpick.length != weDATA
        .length) {
        for (var e = {}, n = 0; n < weDATA.length; n++) e[n] = weDATA[
            n].wePercWght;
        var i = weightedRandom(e),
            o = 360 / weDATA.length;
        weDATA.length, rotation = 1440 + o * (weDATA.length - Number(
                i())), picked = (picked = Math.round(weDATA.length -
                rotation % 360 / o)) >= weDATA.length ? picked %
            weDATA.length : picked, -1 === oldpick.indexOf(picked) ? (
                oldpick.push(picked), rotation += 0 - Math.round(o /
                    2), vis.transition().duration(5e3).attrTween(
                    "transform", rotTween).each("end", function() {
                    document.querySelector("span#prize")
                        .innerText = weDATA[picked].weName,
                        document.querySelector("code > p")
                        .innerText = weDATA[picked].weCode,
                        setTimeout(function() {
                            if (document.querySelector(
                                    ".spinContainer")
                                .classList.add("hide"), vis
                                .attr("transform",
                                    "rotate(-45)"), "yes" ===
                                weDATA[picked].weWin) {
                                try {
                                    weNotification.trackEvent(
                                        "In-app Template - Spin Clicked",
                                        JSON.stringify({
                                            Win: weDATA[
                                                    picked
                                                    ]
                                                .weWin,
                                            "Coupon Code": weDATA[
                                                    picked
                                                    ]
                                                .weCode,
                                            "Respin count": oldpick
                                                .length
                                        }), !1)
                                } catch (t) {}
                                document.querySelector(
                                        ".weWinCont")
                                    .classList.add("show");
                                document.querySelector("#wrapper > div > div > div > dialog").style.setProperty('justify-content', 'end');
                                let e = document
                                    .querySelector(
                                        "dialog > div.weWinCont.show > div:nth-child(2) > button.respin-button"
                                        );
                                oldpick.length == weDATA
                                    .length && (e.style
                                        .display = "none"), e
                                    .addEventListener("click",
                                        () => {
                                            document
                                                .querySelector(
                                                    ".weWinCont.show"
                                                    )
                                                .classList
                                                .remove(
                                                    "show"),
                                                document
                                                .querySelector(
                                                    " dialog > div.spinContainer.hide"
                                                    )
                                                .classList
                                                .remove(
                                                    "hide"),
                                                document
                                                .querySelector(
                                                    "dialog > div.spinContainer.hide"
                                                    )
                                                .classList
                                                .add("show")
                                        })
                            } else if ("no" === weDATA[picked]
                                .weWin) {
                                try {
                                    weNotification.trackEvent(
                                        "In-app Template - Spin Clicked",
                                        JSON.stringify({
                                            Win: weDATA[
                                                    picked
                                                    ]
                                                .weWin,
                                            "Respin count": oldpick
                                                .length
                                        }), !1)
                                } catch (n) {}
                                document.querySelector(
                                        ".welostCont")
                                    .classList.add("show");
                                let i = document
                                    .querySelector(
                                        "dialog > div.welostCont.show > div:nth-child(2) > button.respin-button"
                                        );
                                oldpick.length == weDATA
                                    .length && (i.style
                                        .display = "none"), i
                                    .addEventListener("click",
                                        () => {
                                            try {
                                                weNotification
                                                    .trackEvent(
                                                        "In-app Template - Spin Clicked",
                                                        JSON
                                                        .stringify({
                                                            Win: weDATA[
                                                                    picked
                                                                    ]
                                                                .weWin,
                                                            Respin:
                                                                !
                                                                0,
                                                            "Respin count": oldpick
                                                                .length
                                                        }), !1
                                                        )
                                            } catch (t) {}
                                            document
                                                .querySelector(
                                                    ".welostCont.show"
                                                    )
                                                .classList
                                                .remove(
                                                    "show"),
                                                document
                                                .querySelector(
                                                    "dialog > div.spinContainer.hide"
                                                    )
                                                .classList
                                                .remove(
                                                    "hide"),
                                                document
                                                .querySelector(
                                                    "dialog > div.spinContainer.hide"
                                                    )
                                                .classList
                                                .add("show")
                                        })
                            }
                        }, 1500)
                })) : d3.select(this).call(spin)
    } else container.on("click", null)
}

function rotTween() {
    var t = d3.interpolate(oldrotation % 360, rotation);
    return function(e) {
        return "rotate(" + t(e) + ")"
    }
}

function weightedRandom(t) {
    var e, n, i = [];
    for (e in t)
        for (n = 0; n < 10 * t[e]; n++) i.push(e);
    return function() {
        return i[Math.floor(Math.random() * i.length)]
    }
}
async function copyCode() {
    var t = document.querySelector("code > p");
    try {
        await navigator.clipboard.writeText(t.innerText), document
            .querySelector("code span").style.display =
            "inline-block", setTimeout(function() {
                document.querySelector("code span").style
                    .display = "none"
            }, 1e3), weNotification.trackEvent(
                "In-app Template - Copy Clicked", JSON.stringify({
                    "Coupon Code": t.innerText
                }), !1)
    } catch (e) {}
}
arcs.append("path").attr("fill", function(t, e) {
        return t.data.color
    }).attr("stroke", "black").attr("stroke-width", "4").attr("d",
        function(t) {
            return arc(t)
        }), arcs.append("text").attr("transform", function(t) {
        return t.innerRadius = 0, t.outerRadius = r, t.angle = (t
            .startAngle + t.endAngle) / 2, "rotate(" + (180 *
            t.angle / Math.PI - 90) + ")translate(" + (t
            .outerRadius - 30) + ")"
    }).attr("text-anchor", "end").text(function(t, e) {
        return weDATA[e].weName
    }).style({
        fill: "#000000",
        "font-size": "14px",
        "font-weight": "600"
    }), svg.append("g").attr("transform", "translate(139,0)").append(
        "path").attr("d", "M1 1H31V32.615L16 46.6314L1 32.615V1Z")
    .style({
        fill: "white",
        stroke: "#001D34",
        "stroke-width": "2",
        margin: "10px",
        position: "absolute",
        transform: "rotate(0deg)",
        filter: "drop-shadow(0px 4px 0px black)",
        transform: "scale(0.7)"
    }), svg.append("g").attr("transform", "translate(134.5,-5)")
    .append("circle").attr("cx", 16).attr("cy", 20).attr("r", 5)
    .style({
        margin: "10px",
        position: "absolute",
        transform: "rotate(0deg)"
    }), container.append("circle").attr("cx", 0).attr("cy", 0).attr(
        "r", 25).style({
        fill: "#5446BF",
        cursor: "pointer",
        filter: "drop-shadow(0px 4px 0px black)"
    }), container.append("path").attr("d",
        "M31.2245 29.9704C35.64 22.3158 34.9904 12.4285 27.8065 6.10435C21.5799 0.623753 12.5249 0.640023 6.56619 6.10435C0.452307 11.7101 0.503621 22.1944 6.56619 27.3446C10.4911 30.6788 16.6 31.0267 20.7264 27.3446C24.7276 23.7739 25.1031 17.1306 20.7264 13.1844C18.6726 11.3334 15.665 11.2783 13.6463 13.1844C11.6363 15.0831 11.8052 18.4911 13.6463 20.2645"
        ).attr("x", 0).attr("y", 4).attr("text-anchor", "middle")
    .style({
        fill: "none",
        stroke: "white",
        "stroke-width": "3",
        "stroke-lineclap": "round",
        "stroke-linejoin": "round",
        transform: "translate(-13px, -13px) scale(.75)"
    });
     </script>
<script>
const circle = document.querySelector(
    '#weSpinWheel > svg > g.spinner > circle'
);

if (circle) {
    const svg = circle.ownerSVGElement;

    const image = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'image'
    );

    image.setAttribute(
        'href',
        'https://afiles.webengage.com/11b564b63/bda89826-dabe-49d6-aa74-899850f4b6f2.png'
    );

    image.setAttribute('x', '-25');
    image.setAttribute('y', '-25');
    image.setAttribute('width', '50');
    image.setAttribute('height', '50');

    // Make the image circular
    image.setAttribute('clip-path', 'circle(25px at 25px 25px)');

    circle.replaceWith(image);
}
const path = document.querySelector(
  '#weSpinWheel > svg > g.spinner > path'
);

if (path) {
  path.remove();
}
</script>
</body>
</html>
