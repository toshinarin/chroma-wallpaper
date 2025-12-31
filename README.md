# Chroma Wallpaper

**Chroma Wallpaper** is a web-based tool designed to generate solid-color wallpapers for any device. With a modern glassmorphism UI, it allows you to create the perfect minimalist background in seconds.

## Features

- **🎨 Custom Color Selection**: precise control with a color picker and HEX code input.
- **🎨 Color Catalog**: Browse a curated selection of colors powered by `colors.json`, complete with names and mood descriptions.
- **📱 PWA Support**: Installable on Android and iOS devices. Works offline!
- **🖥️ Auto-Detect Device Size**: One-click configuration to match your screen's resolution perfectly.
- **📏 Custom Dimensions**: Set any width and height for your wallpaper.
- **⚡ Quick Presets**: One-tap configuration for FHD, 4K, and Mobile resolutions.
- **✨ UI**: Beautiful, responsive interface with smooth animations and glassmorphism effects.
- **📥 Instant Download**: Generates PNG images locally in your browser.

## How to Use

1.  **Select a Color**: 
    - Use the color picker or HEX input.
    - Or click **"Open Color Catalog"** to browse categorized recommendations.
2.  **Set Size**:
    - The app automatically detects your screen size on load.
    - You can also manually type dimensions or use the preset buttons.
3.  **Download**: Click **"Download Wallpaper"** to save your PNG.

## Installation (PWA)

- **Android**: Tap "Add to Home Screen" when prompted, or select it from the browser menu.
- **iOS**: Tap the Share button -> "Add to Home Screen".

## Setup for Developers

No build step required! This is a vanilla HTML/CSS/JS project.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/toshinarin/chroma-wallpaper.git
    cd chroma-wallpaper
    ```

2.  **Run locally**:
    Because modern browsers restrict `fetch` from local files (for `colors.json`), you need a local server:
    ```bash
    python3 -m http.server 8080
    # Then open http://localhost:8080
    ```

## Technologies

- HTML5
- CSS3 (Variables, Flexbox, Grid, Glassmorphism)
- Vanilla JavaScript (Canvas API, Fetch API)
- PWA (Manifest, Service Worker)

## License

MIT License
