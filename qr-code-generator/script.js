const qrForm = document.getElementById('qr-form');
const qrInput = document.getElementById('qr-input');
const qrcodeContainer = document.getElementById('qrcode-container');

let qrCodeInstance = null;

function generateQRCode(inputValue) {
    qrcodeContainer.innerHTML = '';

    // Create a new QRCode instance dynamically
    qrCodeInstance = new QRCode(qrcodeContainer, {
        text: inputValue,
        width: 250,      
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });
}

qrForm.addEventListener('submit', (event) => {
    // Prevent default form page refresh
    event.preventDefault();

    const inputValue = qrInput.value.trim();

    if (!inputValue) {
        alert("Please enter a valid text or URL!");
        return;
    }

    generateQRCode(inputValue);
});