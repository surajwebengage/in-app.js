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
            container = svg.append("g").attr("class", "spinner").attr("transform", "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"),
            vis = container.append("g").attr("class", "spi").attr("transition", "transform 3s cubic-bezier(0.4, 0, 0.2, 1);").attr("transform", "rotate(-45)"),
            pie = d3.layout.pie().sort(null).value(function (t) {
                return 1
            }),
            arc = d3.svg.arc().outerRadius(r),
            arcs = vis.selectAll("g.slice").data(pie).enter().append("g").attr("class", "slice");


            function spin(t) {
    container.on("click", null);

    if (oldpick.length != weDATA.length) {

        // build weight object
        var e = {};
        for (var n = 0; n < weDATA.length; n++) {
            e[n] = weDATA[n].wePercWght;
        }

        var i = weightedRandom(e),
            o = 360 / weDATA.length;

        // calculate rotation
        rotation = 1440 + o * (weDATA.length - Number(i()));

        picked = Math.floor((weDATA.length - (rotation % 360) / o)) % weDATA.length;
        if (picked < 0) picked += weDATA.length;

        // check if already picked
        if (oldpick.indexOf(picked) === -1) {

            oldpick.push(picked);
            rotation += 0 - Math.round(o / 2);

            vis.transition()
                .duration(5000)
                .attrTween("transform", rotTween)
                .each("end", function () {

                    document.querySelector("#prize").innerText = weDATA[picked].weName;
                    document.querySelector("code > p").innerText = weDATA[picked].weCode;

                    const img_win = document.getElementById("winImage");
                    const contact_info = document.getElementById("contact_info");
                    img_win.src =
                        weDATA[picked].Image;

                        if (weDATA[picked].Image) {
                            img_win.style.width = "150px";
                            contact_info.innerText = "فريقنا بيتواصل معك خلال 5 أيام عمل لترتيب استلام الجائزة 🚀";
                            document.querySelector("code").style.display = "none";
                        }else {
                            img_win.style.display = "none";
                        }
                    const weWinTxt = document.getElementById("winImage_text");
                    weWinTxt.innerText = weDATA[picked].we_txt;


                    setTimeout(function () {

                        document.querySelector(".spinContainer").classList.add("hide");
                        vis.attr("transform", "rotate(-45)");

                        if (weDATA[picked].weWin === "yes") {

                            try {
                                weNotification.trackEvent(
                                    "In-app Template - Spin Clicked",
                                    JSON.stringify({
                                        Win: weDATA[picked].weWin,
                                        "Coupon Code": weDATA[picked].weCode,
                                        "Respin count": oldpick.length
                                    }),
                                    false
                                );
                            } catch (t) {}

                            document.querySelector(".weWinCont").classList.add("show");

                            let btn = document.querySelector(
                                "dialog > div.weWinCont.show > div:nth-child(2) > button.respin-button"
                            );

                            if (oldpick.length == weDATA.length) {
                                btn.style.display = "none";
                            }

                            btn.addEventListener("click", () => {
                                document.querySelector(".weWinCont.show").classList.remove("show");
                                document.querySelector(".spinContainer").classList.remove("hide");
                                document.querySelector(".spinContainer").classList.add("show");
                            });

                        } else {

                            try {
                                weNotification.trackEvent(
                                    "In-app Template - Spin Clicked",
                                    JSON.stringify({
                                        Win: weDATA[picked].weWin,
                                        "Respin count": oldpick.length
                                    }),
                                    false
                                );
                            } catch (n) {}

                            document.querySelector(".welostCont").classList.add("show");

                            let btn = document.querySelector(
                                "dialog > div.welostCont.show > div:nth-child(2) > button.respin-button"
                            );

                            if (oldpick.length == weDATA.length) {
                                btn.style.display = "none";
                            }

                            btn.addEventListener("click", () => {

                                try {
                                    weNotification.trackEvent(
                                        "In-app Template - Spin Clicked",
                                        JSON.stringify({
                                            Win: weDATA[picked].weWin,
                                            Respin: true,
                                            "Respin count": oldpick.length
                                        }),
                                        false
                                    );
                                } catch (t) {}

                                document.querySelector(".welostCont.show").classList.remove("show");
                                document.querySelector(".spinContainer").classList.remove("hide");
                                document.querySelector(".spinContainer").classList.add("show");
                            });
                        }

                    }, 1500);
                });

        } else {
            d3.select(this).call(spin);
        }

    } else {
        container.on("click", null);
    }
}
     
        function rotTween() {
            var t = d3.interpolate(oldrotation % 360, rotation);
            return function (e) {
                return "rotate(" + t(e) + ")"
            }
        }

        function weightedRandom(t) {
            var e, n, i = [];
            for (e in t)
                for (n = 0; n < 10 * t[e]; n++) i.push(e);
            return function () {
                return i[Math.floor(Math.random() * i.length)]
            }
        }
        async function copyCode() {
            var t = document.querySelector("code > p");
            try {
                await navigator.clipboard.writeText(t.innerText), document.querySelector("code span").style.display = "inline-block", setTimeout(function () {
                    document.querySelector("code span").style.display = "none"
                }, 1e3), weNotification.trackEvent("In-app Template - Copy Clicked", JSON.stringify({
                    "Coupon Code": t.innerText
                }), !1)
            } catch (e) { }
        }
        arcs.append("path").attr("fill", function (t, e) {
            return t.data.color
        }).attr("stroke", "black").attr("stroke-width", "4").attr("d", function (t) {
            return arc(t)
        }), arcs.append("text").attr("transform", function (t) {
            return t.innerRadius = 0, t.outerRadius = r, t.angle = (t.startAngle + t.endAngle) / 2, "rotate(" + (180 * t.angle / Math.PI - 90) + ")translate(" + (t.outerRadius - 30) + ")"
        }).attr("text-anchor", "end").text(function (t, e) {
            return weDATA[e].weName
        }).style({
            fill: "#000000",
            "font-size": "14px",
            "font-weight": "600"
        }), svg.append("g").attr("transform", "translate(139,0)").append("path").attr("d", "M1 1H31V32.615L16 46.6314L1 32.615V1Z").style({
            fill: "white",
            stroke: "#001D34",
            "stroke-width": "2",
            margin: "10px",
            position: "absolute",
            transform: "rotate(0deg)",
            filter: "drop-shadow(0px 4px 0px black)",
            transform: "scale(0.7)"
        }), svg.append("g").attr("transform", "translate(134.5,-5)").append("circle").attr("cx", 16).attr("cy", 20).attr("r", 5).style({
            margin: "10px",
            position: "absolute",
            transform: "rotate(0deg)"
        }), container.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 25).style({
            fill: "#5446BF",
            cursor: "pointer",
            filter: "drop-shadow(0px 4px 0px black)"
        }), container.append("path").attr("d", "M31.2245 29.9704C35.64 22.3158 34.9904 12.4285 27.8065 6.10435C21.5799 0.623753 12.5249 0.640023 6.56619 6.10435C0.452307 11.7101 0.503621 22.1944 6.56619 27.3446C10.4911 30.6788 16.6 31.0267 20.7264 27.3446C24.7276 23.7739 25.1031 17.1306 20.7264 13.1844C18.6726 11.3334 15.665 11.2783 13.6463 13.1844C11.6363 15.0831 11.8052 18.4911 13.6463 20.2645").attr("x", 0).attr("y", 4).attr("text-anchor", "middle").style({
            fill: "none",
            stroke: "white",
            "stroke-width": "3",
            "stroke-lineclap": "round",
            "stroke-linejoin": "round",
            transform: "translate(-13px, -13px) scale(.75)"
        });
