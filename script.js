 let selectedRating = "";
    let reasons = [];
    let otherFeedbackText = "";

    const btnSubmit = document.getElementById("btn__submit");
    const unhappyReasons = document.getElementById("unhappy-reasons");
    const neutralFeedback = document.getElementById("neutral-feedback");
    const awesomeReasons = document.getElementById("awesome-reasons");
    const reason_cont = document.getElementById("unhappy-reasons"); // For compatibility with your original code
    const other_feed = document.getElementById("neutral-textarea"); // For compatibility with your original code

    // Initialize submit button as disabled
    btnSubmit.disabled = true;
    btnSubmit.style.backgroundColor = "#b7b7bb";
    btnSubmit.style.color = "#FFFFFF";

    function enableSubmitButton() {
        btnSubmit.disabled = false;
        btnSubmit.style.backgroundColor = "#273F55";
    }

    function disableSubmitButton() {
        btnSubmit.disabled = true;
        btnSubmit.style.backgroundColor = "#b7b7bb";
    }

    function clearAllCheckboxes() {
        // Clear all checkboxes in unhappy reasons
        document.querySelectorAll('#unhappy-reasons input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Clear all checkboxes in awesome reasons
        document.querySelectorAll('#awesome-reasons input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Hide all other feedback containers
        document.getElementById("unhappy-other-feedback").style.display = "none";
        document.getElementById("awesome-other-feedback").style.display = "none";

        // Clear other feedback text
        document.getElementById("unhappy-other-text").value = "";
        document.getElementById("awesome-other-text").value = "";

        // Clear reasons array
        reasons = [];
    }

    function selectRating(rating) {
        const photoDefault = {
            unhappy: "https://tinyurl.com/3rbyxmbn",
            neutral: "https://tinyurl.com/mu6yxe75",
            awesome: "https://tinyurl.com/3fp4yh8x",
        };
        const photoSelected = {
            unhappy: "https://i.postimg.cc/yNg9dgL5/Screenshot-2025-07-03-at-12-18-02-PM-removebg-preview.png",
            neutral: "https://tinyurl.com/y35ej7yt",
            awesome: "https://tinyurl.com/52ahwfku",
        };

        document.querySelectorAll(".checkbox-label").forEach((label) => {
            const labelRating = label.classList[1];
            const img = label.querySelector("img");
            if (img) {
                img.src = photoDefault[labelRating];
            }
            label.classList.remove("checked");
        });

        const selectedLabel = document.querySelector(`.checkbox-label.${rating}`);
        if (selectedLabel) {
            const selectedImg = selectedLabel.querySelector("img");
            if (selectedImg) {
                selectedImg.src = photoSelected[rating];
            }
            selectedLabel.classList.add("checked");
        }

        selectedRating = rating;

        // Clear all checkboxes and feedback when switching ratings
        clearAllCheckboxes();

        // Hide all feedback sections first
        unhappyReasons.style.display = "none";
        neutralFeedback.style.display = "none";
        awesomeReasons.style.display = "none";

        // Show appropriate section based on rating
        switch (rating) {
            case "unhappy":
                unhappyReasons.style.display = "block";
                break;
            case "neutral":
                neutralFeedback.style.display = "block";
                // Clear neutral textarea
                document.getElementById("neutral-textarea").value = "";
                break;
            case "awesome":
                awesomeReasons.style.display = "block";
                break;
        }

        // Enable submit button when rating is selected
        enableSubmitButton();
    }

    // Handle checkbox changes for unhappy reasons
    document.querySelectorAll('#unhappy-reasons input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (this.value === "Other Reason") {
                document.getElementById("unhappy-other-feedback").style.display = this.checked ? "block" : "none";
            }
            updateReasons();
        });
    });

    // Handle checkbox changes for awesome reasons
    document.querySelectorAll('#awesome-reasons input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            if (this.value === "Other Reason") {
                document.getElementById("awesome-other-feedback").style.display = this.checked ? "block" : "none";
            }
            updateReasons();
        });
    });

    // Handle neutral feedback input
    document.getElementById("neutral-textarea").addEventListener("input", function () {
        otherFeedbackText = this.value.trim();
        if (otherFeedbackText) {
            enableSubmitButton();
        } else {
            disableSubmitButton();
        }
    });

    // Handle unhappy other feedback input
    document.getElementById("unhappy-other-text").addEventListener("input", function () {
        updateReasons();
    });

    // Handle awesome other feedback input
    document.getElementById("awesome-other-text").addEventListener("input", function () {
        updateReasons();
    });

    function updateReasons() {
        reasons = [];

        // Get selected reasons based on current rating
        if (selectedRating === "unhappy") {
            document.querySelectorAll('#unhappy-reasons input[type="checkbox"]:checked').forEach((checkbox) => {
                reasons.push(checkbox.value);
            });

            // If "Other Reason" is selected, include the feedback text
            if (reasons.includes("Other Reason")) {
                otherFeedbackText = document.getElementById("unhappy-other-text").value.trim();
            }
        } else if (selectedRating === "awesome") {
            document.querySelectorAll('#awesome-reasons input[type="checkbox"]:checked').forEach((checkbox) => {
                reasons.push(checkbox.value);
            });

            // If "Other Reason" is selected, include the feedback text
            if (reasons.includes("Other Reason")) {
                otherFeedbackText = document.getElementById("awesome-other-text").value.trim();
            }
        }

        // Enable/disable submit button based on whether reasons are selected
        if (selectedRating === "neutral") {
            // For neutral, we only care about the textarea content
            return;
        } else if (reasons.length === 0) {
            disableSubmitButton();
        } else {
            enableSubmitButton();
        }
    }

    function submitSurvey() {
        if (!selectedRating) {
            showErrorMessage("Please select a rating.");
            return;
        }

        // Validation based on rating type
        if (selectedRating === "neutral") {
            if (!document.getElementById("neutral-textarea").value.trim()) {
                showErrorMessage("Please provide your feedback.");
                return;
            }
        } else {
            if (reasons.length === 0) {
                showErrorMessage("Please select at least one reason for your rating.");
                return;
            }

            // Check if "Other Reason" is selected but no feedback provided
            if (reasons.includes("Other Reason")) {
                const otherFeedback = selectedRating === "unhappy" ? document.getElementById("unhappy-other-text").value.trim() : document.getElementById("awesome-other-text").value.trim();

                if (!otherFeedback) {
                    showErrorMessage("Please provide your feedback for 'Other Reason'.");
                    return;
                }
            }
        }

        document.getElementById("error-message").style.display = "none";

        const surveyData = {
            rating: selectedRating,
            reasons: reasons,
            feedback: selectedRating === "neutral" ? document.getElementById("neutral-textarea").value.trim() : otherFeedbackText,
        };

        console.log("Survey Data:", surveyData);
    }

    function showErrorMessage(message) {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.innerText = message;
        errorMessageElement.style.display = "block";
    }
