document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const colorPicker = document.getElementById('colorPicker');
    const colorHex = document.getElementById('colorHex');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewArea = document.getElementById('previewArea');
    const previewSize = document.getElementById('previewSize');
    const presetBtns = document.querySelectorAll('.preset-btn');

    // State
    let state = {
        color: '#6B73FF',
        width: 1920,
        height: 1080
    };

    // Initialize
    updatePreview();

    // Event Listeners
    colorPicker.addEventListener('input', (e) => {
        state.color = e.target.value;
        colorHex.value = state.color;
        updatePreview();
    });

    colorHex.addEventListener('input', (e) => {
        const val = e.target.value;
        if (isValidHex(val)) {
            state.color = val;
            colorPicker.value = val;
            updatePreview();
        }
    });

    widthInput.addEventListener('input', (e) => {
        state.width = parseInt(e.target.value) || 0;
        updatePreviewSizeText();
    });

    heightInput.addEventListener('input', (e) => {
        state.height = parseInt(e.target.value) || 0;
        updatePreviewSizeText();
    });

    // Presets
    const deviceSizeBtn = document.getElementById('deviceSizeBtn');

    deviceSizeBtn.addEventListener('click', () => {
        const ratio = window.devicePixelRatio || 1;
        const w = Math.floor(window.screen.width * ratio);
        const h = Math.floor(window.screen.height * ratio);

        widthInput.value = w;
        heightInput.value = h;

        state.width = w;
        state.height = h;

        updatePreviewSizeText();
    });

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.dataset.w || !btn.dataset.h) return;

            const w = btn.dataset.w;
            const h = btn.dataset.h;

            widthInput.value = w;
            heightInput.value = h;

            state.width = parseInt(w);
            state.height = parseInt(h);

            updatePreviewSizeText();
        });
    });

    // Download Logic
    downloadBtn.addEventListener('click', () => {
        generateAndDownload();
    });

    // Validations
    function isValidHex(hex) {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }

    // Updates
    function updatePreview() {
        previewArea.style.backgroundColor = state.color;
    }

    function updatePreviewSizeText() {
        previewSize.textContent = `${state.width} x ${state.height}`;
    }

    // Canvas Generation
    function generateAndDownload() {
        const canvas = document.createElement('canvas');
        canvas.width = state.width;
        canvas.height = state.height;
        const ctx = canvas.getContext('2d');

        // Draw background
        ctx.fillStyle = state.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Download
        const link = document.createElement('a');
        const filename = `wallpaper-${state.color.replace('#', '')}-${state.width}x${state.height}.png`;

        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
});
