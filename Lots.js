const formData = {
    store: "",
    rating: "",
    reasons: []
};

const feedbackConfig = {

    low: {

        heading:
        "Oh no! We're sorry to hear that. Please help us understand the reasons for the poor rating.",

        options: [
            "Didn't get desired product(s)",
            "Product quality issue",
            "Poor checkout process",
            "Delay in delivery",
            "Difficulty in using LOTS App",
            "Difficulty in using LOTS Website",
            "Prices are not satisfactory",
            "Incomplete delivery",
            "Product(s) out of stock",
            "Not happy with offers & promotions",
            "Return and Refund policy issue",
            "Complaint resolution/customer support not satisfactory",
            "Others"
        ]
    },

    medium: {

        heading:
        "We understand we could not meet your expectations fully. Please let us know where can improve further.",

        options: [
            "Product range can be improved",
            "Noticed product quality issues",
            "Checkout process can be better",
            "Delivery should be faster",
            "LOTS App should be more user friendly",
            "LOTS Website be more user friendly",
            "Prices can be better",
            "Complete order delivery",
            "Product availability can be better",
            "Offers & promotions can be better",
            "Return and Refund policy should be better",
            "Complaint resolution/customer support should be faster",
            "Others"
        ]
    },

    high: {

        heading:
        "We are extremely delighted to hear that! Please let us know the reasons for your positive rating.",

        options: [
            "Product range",
            "Product quality",
            "Fast checkout/billing",
            "Timely delivery",
            "LOTS App is easy to use",
            "LOTS Website is easy to use",
            "Product Prices",
            "Product availability",
            "Offers & promotions",
            "Return and Refund policy",
            "Complaint resolution/Customer support",
            "Others"
        ]
    }
};


function renderOptions(options) {

    const reasonOptions = document.getElementById("reasonOptions");

    let html = "";

    options.forEach((option, index) => {

        html += `
            <input id="reason${index}" type="checkbox" value="${option}">
            <label for="reason${index}">${option}</label>
        `;
    });

    html += `
        <div id="otherReasonBox" style="display:none;margin-top:.5rem">
            <textarea
                id="otherReasonText"
                placeholder="Please specify..."
                rows="4"
                style="width:100%;padding:.5rem;border-radius:6px;border:1px solid #ccc">
            </textarea>
        </div>
    `;

    reasonOptions.innerHTML = html;

    const allCheckboxes = document.querySelectorAll(
        '#reasonOptions input[type="checkbox"]'
    );

    allCheckboxes.forEach((checkbox) => {

        checkbox.addEventListener("change", function () {

            const otherReasonBox =
                document.getElementById("otherReasonBox");

            if (
                this.value === "Others" ||
                this.value === "Other"
            ) {
                otherReasonBox.style.display =
                    this.checked ? "block" : "none";
            }

        });

    });

}


function nextPage() {

    const store =
        document.querySelector('input[name="store"]:checked');

    const rating =
        document.querySelector('input[name="rating"]:checked');

    if (!store || !rating) {
        return;
    }

    formData.store = store.value;
    formData.rating = rating.value;

    const ratingValue = parseInt(formData.rating, 10);

    let selectedConfig = null;

    if (ratingValue >= 1 && ratingValue <= 6) {

        selectedConfig = feedbackConfig.low;

    } else if (ratingValue === 7 || ratingValue === 8) {

        selectedConfig = feedbackConfig.medium;

    } else if (ratingValue === 9 || ratingValue === 10) {

        selectedConfig = feedbackConfig.high;
    }

    document.getElementById("page2Heading").innerText =
        selectedConfig.heading;

    renderOptions(selectedConfig.options);

    document.getElementById("page1").classList.remove("active");

    document.getElementById("page2").classList.add("active");
}


function previousPage() {

    document.getElementById("page2").classList.remove("active");

    document.getElementById("page1").classList.add("active");
}


function submitForm() {

    const selectedCheckboxes = document.querySelectorAll(
        '#reasonOptions input[type="checkbox"]:checked'
    );

    formData.reasons = Array.from(selectedCheckboxes).map(
        (cb) => cb.value
    );

    const otherTextElement =
        document.getElementById("otherReasonText");

    if (otherTextElement) {

        const otherText =
            otherTextElement.value.trim();

        if (otherText) {

            formData.reasons.push(
                "Other: " + otherText
            );
        }
    }

    console.log("Submitted Data:", formData);

    try {

        weNotification.trackEvent(
            "Feedback_response",

            JSON.stringify({

                "Question 1": formData.store,

                "Question 2": formData.rating,

                "Question 3": formData.reasons,

                "Campaign ID": "~qd4mab",

            })
        );

    } catch (err) {

        console.log(
            "Error at selected options",
            err
        );
    }

    document.getElementById("page2").classList.remove("active");

    document.getElementById("page3").classList.add("active");
}
