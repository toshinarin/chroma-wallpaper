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
    // Color Catalog Logic
    const categoryTabs = document.getElementById('categoryTabs');
    const catalogGrid = document.getElementById('catalogGrid');

    // Determine language (default to en, switch to ja if browser is ja)
    const lang = navigator.language.startsWith('ja') ? 'ja' : 'en';

    fetch('colors.json')
        .then(response => response.json())
        .then(data => {
            initCatalog(data);
        })
        .catch(err => {
            catalogGrid.innerHTML = '<div class="loading-spinner">Failed to load colors.</div>';
            console.error('Error loading colors:', err);
        });

    function initCatalog(data) {
        const structure = data.structure;
        const content = data.content[lang];
        let activeCategory = structure.categories[0].id;

        // Render Tabs
        renderTabs(structure.categories, content.categories, activeCategory);
        renderCards(structure.categories, content.colors, activeCategory);

        // Tab Switching Logic
        window.switchCategory = (categoryId) => {
            activeCategory = categoryId;
            renderTabs(structure.categories, content.categories, activeCategory);
            renderCards(structure.categories, content.colors, activeCategory);
        };
    }

    function renderTabs(categories, contentCategories, activeId) {
        categoryTabs.innerHTML = categories.map(cat => {
            const info = contentCategories[cat.id];
            const isActive = cat.id === activeId ? 'active' : '';
            return `<button class="tab-btn ${isActive}" onclick="switchCategory('${cat.id}')">${info.name}</button>`;
        }).join('');
    }

    function renderCards(categories, contentColors, activeId) {
        const category = categories.find(c => c.id === activeId);
        if (!category) return;

        catalogGrid.innerHTML = category.colors.map(color => {
            const info = contentColors[color.id];
            return `
                <div class="color-card" onclick="selectColor('${color.hex}')">
                    <div class="card-swatch" style="background-color: ${color.hex}"></div>
                    <div class="card-content">
                        <h3>${info.name}</h3>
                        <p>${info.reason}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Global selector function
    window.selectColor = (hex) => {
        state.color = hex;
        colorPicker.value = hex;
        colorHex.value = hex;
        updatePreview();

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});
