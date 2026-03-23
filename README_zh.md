<div align="center">

# Ctrl Wheel Zoom

**强大的 Obsidian 缩放插件**

*使用 Ctrl + 鼠标滚轮缩放笔记内容*

[![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22ctrl-wheel-zoom%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)](https://obsidian.md/plugins?id=ctrl-wheel-zoom)
[![GitHub release](https://img.shields.io/github/release/AlanAkillove/ctrl-wheel-zoom.svg)](https://github.com/AlanAkillove/ctrl-wheel-zoom/releases)
[![License](https://img.shields.io/github/license/AlanAkillove/ctrl-wheel-zoom.svg)](LICENSE)

[English](README.md) | [简体中文](#功能特性)

</div>

---

## ✨ 功能特性

### 🎯 核心功能
- **Ctrl + 滚轮缩放** - 流畅的缩放体验
- **缩放锁定** - 锁定固定比例，防止误操作
- **分视图独立缩放** - 每个分栏独立记忆缩放
- **自动缩放规则** - 根据文件类型、文件夹或标签自动应用缩放

### 🎨 显示选项
- **状态栏** - 实时显示缩放百分比
- **平滑动画** - 优雅的过渡效果
- **通知提示** - 缩放变化时的视觉反馈
- **记住缩放** - 跨会话保持缩放比例

### ⚡ 高级功能
- **双击重置** - 快速重置到 100%
- **预设缩放级别** - 快速访问预设值
- **缩放历史** - 撤销/重做缩放操作
- **字体大小模式** - 调整字体大小而非页面缩放
- **多语言** - 支持中英文

---

## 📦 安装

### 方式一：手动安装
1. 从 [Releases](https://github.com/AlanAkillove/ctrl-wheel-zoom/releases) 下载 `main.js` 和 `manifest.json`
2. 创建文件夹：`你的库/.obsidian/plugins/ctrl-wheel-zoom/`
3. 将下载的文件放入该文件夹
4. 重启 Obsidian → 设置 → 第三方插件 → 启用 "Ctrl Wheel Zoom"

### 方式二：BRAT 安装（推荐测试版）
1. 安装 [BRAT](https://github.com/TfTHacker/obsidian42-brat)
2. 添加仓库：`AlanAkillove/ctrl-wheel-zoom`
3. 启用插件

---

## 🎮 使用方法

### 基本操作
| 操作 | 结果 |
|------|------|
| `Ctrl + 滚轮` | 放大/缩小 |
| `Ctrl + 0` | 重置为 100% |
| `Ctrl + =` | 放大 |
| `Ctrl + -` | 缩小 |
| 双击编辑区域 | 重置缩放 |

### 状态栏
- **左键点击** - 快速缩放菜单
- **右键点击** - 锁定选项和预设

---

## ⚙️ 配置

### 基础设置
| 设置项 | 说明 |
|--------|------|
| 语言 | English / 中文 |
| 锁定缩放 | 防止 Ctrl+滚轮改变缩放 |
| 锁定的缩放比例 | 锁定时的固定缩放值 |
| 缩放步长 | 每次滚轮的缩放幅度 |
| 最小/最大缩放 | 缩放范围限制 |
| 预设缩放级别 | 自定义预设值 |

### 显示设置
| 设置项 | 说明 |
|--------|------|
| 显示通知 | 缩放时显示当前比例 |
| 显示状态栏 | 显示当前缩放百分比 |
| 记住缩放 | 跨会话保持缩放 |
| 启用动画 | 平滑缩放过渡 |
| 动画时长 | 过渡速度（毫秒） |

### 高级设置
| 设置项 | 说明 |
|--------|------|
| 字体大小模式 | 调整字体大小而非缩放 |
| 基础字体大小 | 100% 缩放时的字体大小 |
| 双击重置 | 双击重置缩放 |
| 独立缩放 | 每个分栏独立缩放 |
| 自动缩放规则 | 自动应用缩放 |

---

## ⌨️ 快捷键

| 命令 | 默认 |
|------|------|
| 重置缩放 | `Ctrl + 0` |
| 放大 | `Ctrl + =` |
| 缩小 | `Ctrl + -` |
| 撤销缩放 | `Ctrl + Shift + Z` |
| 重做缩放 | `Ctrl + Shift + Y` |
| 切换锁定 | 可自定义 |
| 循环预设 | 可自定义 |

---

## 🔄 自动缩放规则

根据文件属性配置自动缩放：

### 文件类型
```
类型: fileType | 模式: canvas | 缩放: 0.8
```
Canvas 文件自动缩放到 80%

### 文件夹
```
类型: folder | 模式: Templates/ | 缩放: 0.9
```
Templates 文件夹下的文件缩放到 90%

### 标签
```
类型: tag | 模式: presentation | 缩放: 1.5
```
带有 `tags: [presentation]` 的文件缩放到 150%

---

## 🤝 贡献

欢迎参与贡献！

- 🐛 [报告 Bug](https://github.com/AlanAkillove/ctrl-wheel-zoom/issues)
- 💡 [功能建议](https://github.com/AlanAkillove/ctrl-wheel-zoom/issues)
- 🔧 提交 Pull Request

---

## 📄 许可证

[MIT License](LICENSE) © AlanAkillove

---

<div align="center">

**如果这个插件对你有帮助，请给个 ⭐ Star 支持一下！**

[![GitHub stars](https://img.shields.io/github/stars/AlanAkillove/ctrl-wheel-zoom?style=social)](https://github.com/AlanAkillove/ctrl-wheel-zoom/stargazers)

</div>
