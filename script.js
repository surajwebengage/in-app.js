 document.getElementById("userPhone").addEventListener("focus", function () {
    if (this.value.trim() === "") {
        this.value = "+965";
    }
});

        let userData = {};
        var weDATA = [
            { "weName": "5 KWD", "weWin": "yes", "color": "#ffffff", "wePercWght": 30 },
            { "weName": "7 KWD", "weWin": "yes", "color": "#ffffff", "wePercWght": 30 },
            { "weName": "10 KWD", "weWin": "yes", "color": "#f6d487", "wePercWght": 20 },
            { "weName": "TRY AGAIN", "weWin": "no", "color": "#ffffff", "wePercWght": 20 }
        ];
        var w = 260, h = 260, r = 130;
        var rotation = 0, oldrotation = -45;
        var currentPrize = "";

        var svg = d3.select("#weSpinWheel").append("svg").attr("width", w).attr("height", h);
        var container = svg.append("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
        var vis = container.append("g").attr("transform", "rotate(-45)");

        var pie = d3.layout.pie().sort(null).value(function() { return 1; });
        var arc = d3.svg.arc().outerRadius(r);

        var arcs = vis.selectAll("g.slice").data(pie(weDATA)).enter().append("g");

        arcs.append("path")
            .attr("fill", function(d, i) { return weDATA[i].color; })
            .attr("stroke", "#000")
            .attr("stroke-width", 2)
            .attr("d", arc);

        arcs.append("text")
            .attr("transform", function(d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle) / 2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 20) + ")";
            })
            .attr("text-anchor", "end")
            .text(function(d, i) { return weDATA[i].weName; })
            .style({ fill: "#000", "font-size": "13px", "font-weight": "600" });

            document.getElementById("userPhone").addEventListener("focus", function () {
    if (this.value.trim() === "") {
        this.value = "+965 ";
    }
});
            
        function handleFormSubmit() {
            var name = document.getElementById("userName").value.trim();
            var email = document.getElementById("userEmail").value.trim();
            var phone = document.getElementById("userPhone").value.trim();
            
 // clear old errors
document.getElementById("nameError").innerText = "";
document.getElementById("emailError").innerText = "";
document.getElementById("phoneError").innerText = "";

let isValid = true;

if (!name) {
    document.getElementById("nameError").innerText = "Please enter your name";
    isValid = false;
}

// email validation
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email) {
    document.getElementById("emailError").innerText = "Please enter your email";
    isValid = false;
} else if (!emailRegex.test(email)) {
    document.getElementById("emailError").innerText = "Please enter a valid email";
    isValid = false;
}

// phone validation
var phoneRegex = /^\+965\s?[0-9]{8}$/;

if (!phone) {
    document.getElementById("phoneError").innerText = "Please enter your phone number";
    isValid = false;
} else if (!phoneRegex.test(phone)) {
    document.getElementById("phoneError").innerText = "Phone must be +965 followed by 8 digits";
    isValid = false;
}

if (!isValid) return;



            userData = { name, email, phone };
            
            document.getElementById("formScreen").classList.add("hide");
            document.getElementById("spinScreen").classList.add("show");
            
            try {
                if (typeof weNotification !== 'undefined') {
                    weNotification.trackEvent("Spin_Form_Submitted", JSON.stringify(userData), false);
                }
            } catch (e) {
                console.log("Form submitted:", userData);
            }
        }

        function weightedRandom(obj) {
            var arr = [];
            for (var key in obj) {
                for (var i = 0; i < obj[key]; i++) {
                    arr.push(key);
                }
            }
            return function() { return arr[Math.floor(Math.random() * arr.length)]; };
        }
        
        function spinWheel() {
            var weights = {};
            for (var i = 0; i < weDATA.length; i++) {
                weights[i] = weDATA[i].wePercWght;
            }

            var index = weightedRandom(weights)();
            var ps = 360 / weDATA.length;
            rotation = 1440 + (weDATA.length - index) * ps;

            vis.transition().duration(4000).attrTween("transform", function() {
                var i = d3.interpolate(oldrotation, rotation);
                return function(t) { return "rotate(" + i(t) + ")"; };
            }).each("end", function() {
                oldrotation = rotation;
                var result = weDATA[index];
                currentPrize = result.weName;
                
                showResult(result);
                
                try {
                    if (typeof weNotification !== 'undefined') {
                        weNotification.trackEvent("kw_in-app-spin the wheel", JSON.stringify({
                            name: userData.name,
                            email: userData.email,
                            phone: userData.phone,
                            prize: result.weName,
                            win: result.weWin
                        }), false);
                    }
                } catch (e) {
                    console.log("Spin result:", { user: userData, prize: result.weName, win: result.weWin });
                }
            });
        }
        
        function showResult(result) {
            var resultContainer = document.getElementById("resultContainer");
            var spinWheel = document.getElementById("weSpinWheel");
            var spinBtn = document.querySelector("#spinScreen .btn");
            var instruction = document.querySelector("#spinScreen p");
            
            // Hide wheel, button, and instruction
            spinWheel.style.display = "none";
            spinBtn.style.display = "none";
            instruction.style.display = "none";
            
            if (result.weWin === "yes") {
                // Show winning message with no buttons - exactly like screenshot
                resultContainer.innerHTML = `
                    <div style="animation: fadeIn 0.5s; text-align: center;">
                        <h2 style="color: #f6d487; font-size: 28px; margin-bottom: 15px;">CONGRATULATIONS! 🎉</h2>
                        <div style="font-size: 32px; font-weight: bold; color: white; margin: 20px 0;">YOU'VE WON ${result.weName}</div>
                        <p style="margin: 20px 0; font-size: 16px; color: rgba(255,255,255,0.9);">You will receive the code via WhatsApp/Email shortly.</p>
                        <p style="margin: 20px 0;font-size: 16px;color: rgba(255,255,255,0.9);">Make sure to log in to activate the code!</p>
                    </div>
                `;
            } else {
                // Show try again message
                resultContainer.innerHTML = `
                    <div style="animation: fadeIn 0.5s; text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #f6d487; margin: 20px 0;">TRY AGAIN</div>
                        <p style="margin: 20px 0; font-size: 16px; color: rgba(255,255,255,0.9);">Better luck next time!</p>
                    </div>
                `;
            }
            
            // Auto-close after 5 seconds for win, 3 seconds for try again
            setTimeout(function() {
                closeInApp();
            }, result.weWin === "yes" ? 5000 : 3000);
        }

        function closeInApp() {
            try {
                if (typeof weNotification !== 'undefined') {
                    weNotification.close();
                }
            } catch (e) {
                console.log("Closing in-app");
                // Fallback for testing
                document.getElementById("formScreen").classList.remove("hide");
                document.getElementById("spinScreen").classList.remove("show");
                resetDisplay();
            }
        }
        
        function resetDisplay() {
            var resultContainer = document.getElementById("resultContainer");
            var spinWheel = document.getElementById("weSpinWheel");
            var spinBtn = document.querySelector("#spinScreen .btn");
            var instruction = document.querySelector("#spinScreen p");
            
            resultContainer.innerHTML = "";
            spinWheel.style.display = "block";
            spinBtn.style.display = "block";
            instruction.style.display = "block";
        }

        // Add fade animation
        var style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
       document.head.appendChild(style);
