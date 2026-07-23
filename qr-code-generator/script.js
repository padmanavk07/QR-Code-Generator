const qrForm = document.getElementById('qr-form');
const qrInput = document.getElementById('qr-input');
const standardInputGroup = document.getElementById('standard-input-group');
const wifiInputGroup = document.getElementById('wifi-input-group');

const wifiSSID = document.getElementById('wifi-ssid');
const wifiPassword = document.getElementById('wifi-password');
const wifiEncryption = document.getElementById('wifi-encryption');
const wifiHidden = document.getElementById('wifi-hidden');

const qrcodeContainer = document.getElementById('qrcode-container');
const downloadBtn = document.getElementById('download-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const inputLabel = document.getElementById('input-label');
const errorMessage = document.getElementById('error-message');

let qrCodeInstance = null;
let currentMode = 'text'; // 'text', 'url', or 'wifi'

function isValidURL(string) {
    try {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ 
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
            '(\\#[-a-z\\d_]*)?$','i');
        return !!pattern.test(string);
    } catch (e) {
        return false;
    }
}

function clearError() {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
    qrInput.classList.remove('invalid-input');
    wifiSSID.classList.remove('invalid-input');
}

function showError(message, inputElement = qrInput) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    inputElement.classList.add('invalid-input');
}

function generateQRCode(inputValue) {
    qrcodeContainer.innerHTML = '';

    qrCodeInstance = new QRCode(qrcodeContainer, {
        text: inputValue,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });

    setTimeout(() => {
        const qrImg = qrcodeContainer.querySelector('img');
        if (qrImg) {
            downloadBtn.classList.remove('hidden');
        }
    }, 50);
}

// Mode Tab Selection Logic
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentMode = btn.getAttribute('data-mode');
        clearError();

        if (currentMode === 'wifi') {
            standardInputGroup.classList.add('hidden');
            wifiInputGroup.classList.remove('hidden');
        } else {
            wifiInputGroup.classList.add('hidden');
            standardInputGroup.classList.remove('hidden');

            if (currentMode === 'url') {
                inputLabel.textContent = "Enter URL";
                qrInput.placeholder = "https://example.com";
            } else {
                inputLabel.textContent = "Enter Text";
                qrInput.placeholder = "Type something here...";
            }
        }
    });
});

qrForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    let finalDataString = '';

    if (currentMode === 'wifi') {
        const ssid = wifiSSID.value.trim();
        const password = wifiPassword.value;
        const encryption = wifiEncryption.value;
        const isHidden = wifiHidden.checked;

        if (!ssid) {
            showError("Please enter network SSID (Name).", wifiSSID);
            return;
        }

        finalDataString = `WIFI:S:${ssid};T:${encryption};P:${password};H:${isHidden};;`;
    } else {
        const inputValue = qrInput.value.trim();

        if (!inputValue) {
            showError("Input cannot be blank.", qrInput);
            return;
        }

        if (currentMode === 'url' && !isValidURL(inputValue)) {
            showError("Please enter a valid URL layout configuration format.", qrInput);
            return;
        }

        finalDataString = inputValue;
    }

    generateQRCode(finalDataString);
});

downloadBtn.addEventListener('click', downloadQRCodeImage);

function downloadQRCodeImage() {
    const qrImg = qrcodeContainer.querySelector('img');
    const qrCanvas = qrcodeContainer.querySelector('canvas');
    if (!qrImg) return;
    const imageSrc = qrImg.src || qrCanvas.toDataURL("image/png");
    const timestamp = Math.floor(Date.now() / 1000);
    const downloadLink = document.createElement('a');
    downloadLink.href = imageSrc;
    downloadLink.download = `qrcode_${timestamp}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}