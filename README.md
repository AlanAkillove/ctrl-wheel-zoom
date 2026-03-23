<div align="center">

# Ctrl Wheel Zoom

**A powerful zoom plugin for Obsidian**

*Zoom your notes with Ctrl + Mouse Wheel*

[![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22ctrl-wheel-zoom%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)](https://obsidian.md/plugins?id=ctrl-wheel-zoom)
[![GitHub release](https://img.shields.io/github/release/AlanAkillove/ctrl-wheel-zoom.svg)](https://github.com/AlanAkillove/ctrl-wheel-zoom/releases)
[![License](https://img.shields.io/github/license/AlanAkillove/ctrl-wheel-zoom.svg)](LICENSE)

[English](#features) | [简体中文](README_zh.md)

</div>

---

## ✨ Features

### 🎯 Core
- **Ctrl + Wheel Zoom** - Smoothly zoom in/out with Ctrl key + mouse wheel
- **Zoom Lock** - Lock to a fixed zoom level to prevent accidental changes
- **Independent Split View Zoom** - Each split pane remembers its own zoom level
- **Auto Zoom Rules** - Automatically apply zoom based on file type, folder, or tags

### 🎨 Display
- **Status Bar** - Real-time zoom percentage display
- **Smooth Animations** - Elegant transition effects
- **Notifications** - Visual feedback on zoom changes
- **Persistent Zoom** - Remember your zoom level across sessions

### ⚡ Advanced
- **Double-click Reset** - Quickly reset to 100%
- **Preset Zoom Levels** - Quick access to predefined zoom values
- **Zoom History** - Undo/redo zoom operations
- **Font Size Mode** - Adjust font size instead of page zoom
- **Multi-language** - English & Chinese support

---

## 📦 Installation

### Option 1: Manual Installation
1. Download `main.js` and `manifest.json` from [Releases](https://github.com/AlanAkillove/ctrl-wheel-zoom/releases)
2. Create folder: `your-vault/.obsidian/plugins/ctrl-wheel-zoom/`
3. Move downloaded files into the folder
4. Restart Obsidian → Settings → Community plugins → Enable "Ctrl Wheel Zoom"

### Option 2: BRAT (Recommended for Beta)
1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat)
2. Add repository: `AlanAkillove/ctrl-wheel-zoom`
3. Enable the plugin

---

## 🎮 Usage

### Basic Controls
| Action | Result |
|--------|--------|
| `Ctrl + Wheel` | Zoom in/out |
| `Ctrl + 0` | Reset to 100% |
| `Ctrl + =` | Zoom in |
| `Ctrl + -` | Zoom out |
| Double-click editor | Reset zoom |

### Status Bar
- **Left click** - Quick zoom menu
- **Right click** - Lock options & presets

---

## ⚙️ Configuration

### General
| Setting | Description |
|---------|-------------|
| Language | English / 中文 |
| Lock Zoom | Prevent Ctrl+wheel from changing zoom |
| Locked Zoom Level | Fixed zoom value when locked |
| Zoom Step | Increment per wheel scroll |
| Min/Max Zoom | Zoom range limits |
| Presets | Customizable preset zoom levels |

### Display
| Setting | Description |
|---------|-------------|
| Show Notifications | Display zoom level on change |
| Show Status Bar | Display current zoom percentage |
| Remember Zoom | Persist zoom across sessions |
| Enable Animation | Smooth zoom transitions |
| Animation Duration | Transition speed (ms) |

### Advanced
| Setting | Description |
|---------|-------------|
| Font Size Mode | Adjust font size instead of zoom |
| Base Font Size | Font size at 100% zoom |
| Double-click Reset | Reset zoom on double-click |
| Independent Zoom | Each split view has own zoom |
| Auto Zoom Rules | Apply zoom automatically |

---

## ⌨️ Keyboard Shortcuts

| Command | Default |
|---------|---------|
| Reset Zoom | `Ctrl + 0` |
| Zoom In | `Ctrl + =` |
| Zoom Out | `Ctrl + -` |
| Undo Zoom | `Ctrl + Shift + Z` |
| Redo Zoom | `Ctrl + Shift + Y` |
| Toggle Lock | Customizable |
| Cycle Presets | Customizable |

---

## 🔄 Auto Zoom Rules

Configure automatic zoom based on file properties:

### File Type
```
Type: fileType | Pattern: canvas | Zoom: 0.8
```
Canvas files automatically zoom to 80%

### Folder
```
Type: folder | Pattern: Templates/ | Zoom: 0.9
```
Files in Templates folder zoom to 90%

### Tag
```
Type: tag | Pattern: presentation | Zoom: 1.5
```
Files with `tags: [presentation]` zoom to 150%

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 [Report bugs](https://github.com/AlanAkillove/ctrl-wheel-zoom/issues)
- 💡 [Request features](https://github.com/AlanAkillove/ctrl-wheel-zoom/issues)
- 🔧 Submit pull requests

---

## 📄 License

[MIT License](LICENSE) © AlanAkillove

---

<div align="center">

**If this plugin helps you, consider giving it a ⭐ star!**

[![GitHub stars](https://img.shields.io/github/stars/AlanAkillove/ctrl-wheel-zoom?style=social)](https://github.com/AlanAkillove/ctrl-wheel-zoom/stargazers)

</div>
