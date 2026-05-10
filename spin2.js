(function () {
    const formContainer = document.getElementById('userFormContainer');
    const startBtn = document.getElementById('startSpinBtn');
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const phoneInput = document.getElementById('userPhone');
    document.querySelector('.spin-button').style.display = 'none';
    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 12);
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    startBtn.addEventListener('click', function () {
        let isValid = true;
        document.querySelector("#wrapper > div > div > div > dialog > div.spinContainer").style.height = "auto";
        [nameInput, emailInput, phoneInput].forEach(input => {
            input.classList.remove('form-error');
        });
        if (!nameInput.value.trim()) {
            nameInput.classList.add('form-error');
            isValid = false;
        }
        if (!validateEmail(emailInput.value.trim())) {
            emailInput.classList.add('form-error');
            isValid = false;
        }
        if (
            !phoneInput.value.trim() ||
            phoneInput.value.trim().length > 12
        ) {
            phoneInput.classList.add('form-error');
            isValid = false;
        }
        if (!isValid) return;
        const userData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: '+965' + phoneInput.value.trim()
        };
        try {
            weNotification.trackEvent(
                'In-app Template submitted',
                JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone
                })
            );
        } catch (e) {
            console.log(e);
        }

        formContainer.style.display = 'none';
        document.querySelector('.spin-button').style.display = 'inline-flex';
    });
})();
