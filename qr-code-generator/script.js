// DOM Element Selectors
const qrForm = document.getElementById('qr-form');
const qrInput = document.getElementById('qr-input');
const qrcodeContainer = document.getElementById('qrcode-container');

// Global reference for the instance
let qrCodeInstance = null;

/**
 * Initializes the library container by replacing the placeholder text 
 * with a clean target element for the canvas/image generation.
 */
function initQRCodeLibrary() {
    // Clear the placeholder text inside the container
    qrcodeContainer.innerHTML = '';
    
    // Create an instance and pass the target container element
    qrCodeInstance = new QRCode(qrcodeContainer, {
        text: "Test Initial Setup",
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    console.log("QR Code Library initialized successfully:", qrCodeInstance);
}

// Execute initial load check
window.addEventListener('DOMContentLoaded', () => {
    initQRCodeLibrary();
});