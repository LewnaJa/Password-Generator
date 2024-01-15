function generatePassword() {
    const length = document.getElementById('length').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useDigits = document.getElementById('digits').checked;
    const useSpecialChars = document.getElementById('specialChars').checked;

    const characters = (
        (useUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') +
        (useLowercase ? 'abcdefghijklmnopqrstuvwxyz' : '') +
        (useDigits ? '0123456789' : '') +
        (useSpecialChars ? '!@#$%^&*()-_=+[]{}|;:,.<>?/' : '')
    );

    if (!characters) {
        alert('Nie wybrano żadnych rodzajów znaków do użycia.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    document.getElementById('password-output').textContent = `Generowane hasło: ${password}`;
}

function savePassword() {
    const password = document.getElementById('password-output').textContent.split(': ')[1];
    if (!password) {
        alert('Najpierw wygeneruj hasło.');
        return;
    }

    const saveOption = confirm('Czy chcesz zapisać to hasło?');
    if (saveOption) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert('Hasło zostało zapisane!');
            }
        };
        xhr.open('POST', 'save_password.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`password=${encodeURIComponent(password)}`);
    }
}
