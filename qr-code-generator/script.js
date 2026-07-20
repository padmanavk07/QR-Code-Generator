// DOM Element Selectors
const qrForm = document.getElementById('qr-form');
const qrInput = document.getElementById('qr-input');
const qrcodeContainer = document.getElementById('qrcode-container');
const downloadBtn = document.getElementById('download-btn');

// Global reference for the instance
let qrCodeInstance = null;

/**
 * Handles the generation of the QR code based on user input.
 */
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

    // Briefly wait for library rendering to complete before exposing the download button
    setTimeout(() => {
        const qrImg = qrcodeContainer.querySelector('img');
        if (qrImg) {
            downloadBtn.classList.remove('hidden');
        }
    }, 50);
}

/**
 * Captures image data element and handles downloading file asset
 */
function downloadQRCodeImage() {
    const qrImg = qrcodeContainer.querySelector('img');
    const qrCanvas = qrcodeContainer.querySelector('canvas');
    
    if (!qrImg) return;

    // Use image source fallback, otherwise fall back onto canvas extraction element
    const imageSrc = qrImg.src || qrCanvas.toDataURL("image/png");
    
    // Construct automated localized naming stamp
    const timestamp = Math.floor(Date.now() / 1000);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = imageSrc;
    downloadLink.download = `qrcode_${timestamp}.png`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Event Listeners
qrForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = qrInput.value.trim();

    if (!inputValue) {
        alert("Please enter a valid text or URL!");
        return;
    }

    generateQRCode(inputValue);
});

downloadBtn.addEventListener('click', downloadQRCodeImage);