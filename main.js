'use strict';

var obsidian = require('obsidian');

const DEFAULT_SETTINGS = {
  language: 'zh',
  zoomLocked: false,
  lockedZoomLevel: 1.0,
  step: 0.1,
  minZoom: 0.5,
  maxZoom: 2.0,
  showNotice: true,
  rememberZoom: true,
  showStatusBar: true,
  enableAnimation: true,
  animationDuration: 150,
  doubleClickReset: true,
  zoomHistory: [],
  maxHistorySize: 20,
  presets: [0.75, 1.0, 1.25, 1.5],
  independentZoom: false,
  leafZoomLevels: {},
  useFontSize: false,
  baseFontSize: 16,
  autoZoomRules: [],
  enableAutoZoom: false
};

const LANGUAGES = {
  zh: {
    pluginName: 'Ctrl Wheel Zoom',
    settingsTitle: 'Ctrl Wheel Zoom 设置',
    language: '语言',
    languageDesc: '选择提示信息的语言',
    languageZh: '中文',
    languageEn: 'English',
    zoomLocked: '锁定缩放比例',
    zoomLockedDesc: '开启后，Ctrl+滚轮将不再调节缩放比例',
    lockedZoomLevel: '锁定的缩放比例',
    lockedZoomLevelDesc: '锁定时的固定缩放比例（0.5 = 50%, 1.0 = 100%, 2.0 = 200%）',
    step: '缩放步长',
    stepDesc: '每次滚轮调整的缩放幅度',
    minZoom: '最小缩放比例',
    minZoomDesc: '允许的最小缩放比例',
    maxZoom: '最大缩放比例',
    maxZoomDesc: '允许的最大缩放比例',
    showNotice: '显示通知',
    showNoticeDesc: '缩放时显示当前比例的通知',
    rememberZoom: '记住缩放比例',
    rememberZoomDesc: '重启 Obsidian 后保持上次的缩放比例',
    showStatusBar: '显示状态栏',
    showStatusBarDesc: '在底部状态栏显示当前缩放百分比',
    enableAnimation: '启用动画',
    enableAnimationDesc: '缩放时显示平滑过渡动画',
    animationDuration: '动画时长',
    animationDurationDesc: '动画持续时间（毫秒）',
    doubleClickReset: '双击重置',
    doubleClickResetDesc: '双击编辑区域重置缩放为100%',
    independentZoom: '分视图独立缩放',
    independentZoomDesc: '每个分栏独立记忆缩放比例',
    presets: '预设缩放级别',
    presetsDesc: '快捷键快速切换的预设比例（用逗号分隔，如 0.75,1.0,1.25,1.5）',
    useFontSize: '使用字体大小调整',
    useFontSizeDesc: '调整字体大小而非整体缩放（更精细的控制）',
    baseFontSize: '基础字体大小',
    baseFontSizeDesc: '100%缩放时的字体大小（像素）',
    autoZoomRules: '自动缩放规则',
    autoZoomRulesDesc: '根据文件类型/标签自动应用缩放比例',
    enableAutoZoom: '启用自动缩放',
    enableAutoZoomDesc: '打开文件时自动应用匹配的缩放规则',
    addRule: '添加规则',
    removeRule: '删除',
    ruleType: '类型',
    rulePattern: '匹配模式',
    ruleZoom: '缩放比例',
    fileType: '文件类型',
    tag: '标签',
    folder: '文件夹',
    resetZoom: '重置缩放为100%',
    zoomIn: '放大',
    zoomOut: '缩小',
    toggleLock: '切换缩放锁定',
    currentZoom: '当前缩放',
    zoomReset: '缩放已重置为 100%',
    zoomLockedNotice: '缩放已锁定',
    zoomUnlockedNotice: '缩放已解锁',
    zoomLockedAt: '缩放已锁定在',
    presetZoom: '预设缩放',
    zoomTo: '缩放到',
    undoZoom: '撤销缩放',
    redoZoom: '重做缩放',
    noUndo: '没有可撤销的缩放',
    noRedo: '没有可重做的缩放',
    cyclePresets: '循环预设缩放',
    statusBarTooltip: '点击调整缩放，右键显示选项',
    autoZoomApplied: '自动缩放已应用'
  },
  en: {
    pluginName: 'Ctrl Wheel Zoom',
    settingsTitle: 'Ctrl Wheel Zoom Settings',
    language: 'Language',
    languageDesc: 'Select the language for notifications',
    languageZh: '中文',
    languageEn: 'English',
    zoomLocked: 'Lock Zoom Level',
    zoomLockedDesc: 'When enabled, Ctrl+wheel will not change zoom level',
    lockedZoomLevel: 'Locked Zoom Level',
    lockedZoomLevelDesc: 'Fixed zoom level when locked (0.5 = 50%, 1.0 = 100%, 2.0 = 200%)',
    step: 'Zoom Step',
    stepDesc: 'Zoom increment for each wheel scroll',
    minZoom: 'Minimum Zoom',
    minZoomDesc: 'Minimum allowed zoom level',
    maxZoom: 'Maximum Zoom',
    maxZoomDesc: 'Maximum allowed zoom level',
    showNotice: 'Show Notifications',
    showNoticeDesc: 'Show current zoom level notification when zooming',
    rememberZoom: 'Remember Zoom Level',
    rememberZoomDesc: 'Keep the zoom level after restarting Obsidian',
    showStatusBar: 'Show Status Bar',
    showStatusBarDesc: 'Display current zoom percentage in status bar',
    enableAnimation: 'Enable Animation',
    enableAnimationDesc: 'Show smooth transition animation when zooming',
    animationDuration: 'Animation Duration',
    animationDurationDesc: 'Animation duration in milliseconds',
    doubleClickReset: 'Double Click Reset',
    doubleClickResetDesc: 'Double click on editor area to reset zoom to 100%',
    independentZoom: 'Independent View Zoom',
    independentZoomDesc: 'Each split view remembers its own zoom level',
    presets: 'Preset Zoom Levels',
    presetsDesc: 'Preset levels for quick switching (comma separated, e.g. 0.75,1.0,1.25,1.5)',
    useFontSize: 'Use Font Size Adjustment',
    useFontSizeDesc: 'Adjust font size instead of zoom (more precise control)',
    baseFontSize: 'Base Font Size',
    baseFontSizeDesc: 'Font size at 100% zoom (pixels)',
    autoZoomRules: 'Auto Zoom Rules',
    autoZoomRulesDesc: 'Automatically apply zoom based on file type/tags',
    enableAutoZoom: 'Enable Auto Zoom',
    enableAutoZoomDesc: 'Apply matching zoom rules when opening files',
    addRule: 'Add Rule',
    removeRule: 'Remove',
    ruleType: 'Type',
    rulePattern: 'Pattern',
    ruleZoom: 'Zoom Level',
    fileType: 'File Type',
    tag: 'Tag',
    folder: 'Folder',
    resetZoom: 'Reset Zoom to 100%',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    toggleLock: 'Toggle Zoom Lock',
    currentZoom: 'Current Zoom',
    zoomReset: 'Zoom reset to 100%',
    zoomLockedNotice: 'Zoom locked',
    zoomUnlockedNotice: 'Zoom unlocked',
    zoomLockedAt: 'Zoom locked at',
    presetZoom: 'Preset Zoom',
    zoomTo: 'Zoom to',
    undoZoom: 'Undo Zoom',
    redoZoom: 'Redo Zoom',
    noUndo: 'No zoom to undo',
    noRedo: 'No zoom to redo',
    cyclePresets: 'Cycle Preset Zoom',
    statusBarTooltip: 'Click to adjust zoom, right-click for options',
    autoZoomApplied: 'Auto zoom applied'
  }
};

class CtrlWheelZoomPlugin extends obsidian.Plugin {
  constructor(app, manifest) {
    super(app, manifest);
    this.settings = Object.assign({}, DEFAULT_SETTINGS);
    this.zoomLevel = 1.0;
    this.historyIndex = -1;
    this.statusBarItem = null;
    this.currentLeafId = null;
    this.currentLeaf = null;
  }

  async onload() {
    await this.loadSettings();
    
    const lang = LANGUAGES[this.settings.language];
    console.log(`${lang.pluginName} plugin loaded`);

    if (this.settings.rememberZoom && this.settings.savedZoomLevel) {
      this.zoomLevel = this.settings.savedZoomLevel;
    }

    this.historyIndex = this.settings.zoomHistory ? this.settings.zoomHistory.length - 1 : -1;

    this.handleWheel = this.handleWheel.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleLeafChange = this.handleLeafChange.bind(this);

    document.addEventListener('wheel', this.handleWheel, {
      passive: false,
      capture: true
    });

    if (this.settings.doubleClickReset) {
      document.addEventListener('dblclick', this.handleDoubleClick, true);
    }

    this.registerEvent(
      this.app.workspace.on('active-leaf-change', this.handleLeafChange)
    );

    this.registerCommands();
    this.addSettingTab(new CtrlWheelZoomSettingTab(this.app, this));

    if (this.settings.showStatusBar) {
      this.createStatusBar();
    }

    this.app.workspace.onLayoutReady(() => {
      this.currentLeaf = this.app.workspace.activeLeaf;
      this.currentLeafId = this.getLeafId(this.currentLeaf);
      
      if (this.settings.independentZoom) {
        this.applyAllLeafZooms();
      } else if (this.settings.rememberZoom) {
        this.applyZoom();
      }
    });
  }

  registerCommands() {
    const lang = LANGUAGES[this.settings.language];

    this.addCommand({
      id: 'reset-zoom',
      name: lang.resetZoom,
      hotkeys: [{ modifiers: ['Mod'], key: '0' }],
      callback: () => this.setZoom(1.0)
    });

    this.addCommand({
      id: 'zoom-in',
      name: lang.zoomIn,
      hotkeys: [{ modifiers: ['Mod'], key: '=' }],
      callback: () => {
        if (this.settings.zoomLocked) return;
        this.setZoom(Math.min(this.zoomLevel + this.settings.step, this.settings.maxZoom));
      }
    });

    this.addCommand({
      id: 'zoom-out',
      name: lang.zoomOut,
      hotkeys: [{ modifiers: ['Mod'], key: '-' }],
      callback: () => {
        if (this.settings.zoomLocked) return;
        this.setZoom(Math.max(this.zoomLevel - this.settings.step, this.settings.minZoom));
      }
    });

    this.addCommand({
      id: 'toggle-lock',
      name: lang.toggleLock,
      callback: () => {
        this.settings.zoomLocked = !this.settings.zoomLocked;
        if (this.settings.zoomLocked) {
          this.setZoom(this.settings.lockedZoomLevel);
          this.showNotice(`${lang.zoomLockedAt} ${Math.round(this.zoomLevel * 100)}%`);
        } else {
          this.showNotice(lang.zoomUnlockedNotice);
        }
        this.saveSettings();
      }
    });

    this.addCommand({
      id: 'undo-zoom',
      name: lang.undoZoom,
      hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'z' }],
      callback: () => this.undoZoom()
    });

    this.addCommand({
      id: 'redo-zoom',
      name: lang.redoZoom,
      hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'y' }],
      callback: () => this.redoZoom()
    });

    this.addCommand({
      id: 'cycle-presets',
      name: lang.cyclePresets,
      callback: () => this.cyclePresets()
    });

    this.settings.presets.forEach((preset, index) => {
      this.addCommand({
        id: `preset-${index + 1}`,
        name: `${lang.presetZoom} ${Math.round(preset * 100)}%`,
        callback: () => this.setZoom(preset)
      });
    });
  }

  async onunload() {
    const lang = LANGUAGES[this.settings.language];
    console.log(`${lang.pluginName} plugin unloaded`);
    
    document.removeEventListener('wheel', this.handleWheel, true);
    document.removeEventListener('dblclick', this.handleDoubleClick, true);
    
    if (this.settings.rememberZoom) {
      this.settings.savedZoomLevel = this.zoomLevel;
      await this.saveSettings();
    }
    
    if (this.statusBarItem) {
      this.statusBarItem.remove();
    }
    
    this.resetAllZoom();
  }

  async loadSettings() {
    const data = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
    if (typeof this.settings.presets === 'string') {
      this.settings.presets = this.settings.presets.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    }
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  showNotice(message) {
    if (this.settings.showNotice) {
      new obsidian.Notice(message);
    }
  }

  handleLeafChange(leaf) {
    if (!leaf) return;
    
    const leafId = this.getLeafId(leaf);
    this.currentLeaf = leaf;
    this.currentLeafId = leafId;
    
    if (this.settings.enableAutoZoom && leaf.view && leaf.view.file) {
      const autoZoom = this.getAutoZoomLevel(leaf.view.file);
      if (autoZoom !== null) {
        this.setZoom(autoZoom, false);
        const lang = LANGUAGES[this.settings.language];
        this.showNotice(`${lang.autoZoomApplied}: ${Math.round(autoZoom * 100)}%`);
        return;
      }
    }
    
    if (this.settings.independentZoom && leafId) {
      if (this.settings.leafZoomLevels[leafId] !== undefined) {
        this.zoomLevel = this.settings.leafZoomLevels[leafId];
      } else {
        this.zoomLevel = 1.0;
        this.settings.leafZoomLevels[leafId] = 1.0;
      }
      this.applyZoomToLeaf(leaf, this.zoomLevel);
      this.updateStatusBar();
    }
  }

  getLeafId(leaf) {
    if (!leaf) return null;
    const view = leaf.view;
    if (view && view.file) {
      return view.file.path;
    }
    return `leaf-${leaf.id || Date.now()}`;
  }

  getAutoZoomLevel(file) {
    if (!this.settings.autoZoomRules || this.settings.autoZoomRules.length === 0) {
      return null;
    }

    for (const rule of this.settings.autoZoomRules) {
      if (rule.type === 'fileType') {
        const ext = file.extension;
        if (rule.pattern && ext === rule.pattern.replace('.', '')) {
          return rule.zoom;
        }
      } else if (rule.type === 'folder') {
        if (file.path.startsWith(rule.pattern)) {
          return rule.zoom;
        }
      } else if (rule.type === 'tag') {
        const cache = this.app.metadataCache.getFileCache(file);
        if (cache && cache.frontmatter && cache.frontmatter.tags) {
          const tags = Array.isArray(cache.frontmatter.tags) 
            ? cache.frontmatter.tags 
            : [cache.frontmatter.tags];
          if (tags.includes(rule.pattern)) {
            return rule.zoom;
          }
        }
      }
    }
    return null;
  }

  handleWheel(e) {
    if (!e.ctrlKey) return;
    
    e.preventDefault();
    e.stopPropagation();

    if (this.settings.zoomLocked) {
      return;
    }

    const newZoom = e.deltaY < 0 
      ? Math.min(this.zoomLevel + this.settings.step, this.settings.maxZoom)
      : Math.max(this.zoomLevel - this.settings.step, this.settings.minZoom);

    this.setZoom(newZoom);
  }

  handleDoubleClick(e) {
    const target = e.target;
    const isEditor = target.closest('.markdown-source-view, .markdown-preview-view, .cm-editor, .cm-content');
    
    if (isEditor && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      this.setZoom(1.0);
    }
  }

  setZoom(level, addToHistory = true) {
    const lang = LANGUAGES[this.settings.language];
    const oldZoom = this.zoomLevel;
    this.zoomLevel = level;

    if (addToHistory && oldZoom !== level) {
      if (this.historyIndex < this.settings.zoomHistory.length - 1) {
        this.settings.zoomHistory = this.settings.zoomHistory.slice(0, this.historyIndex + 1);
      }
      this.settings.zoomHistory.push(oldZoom);
      if (this.settings.zoomHistory.length > this.settings.maxHistorySize) {
        this.settings.zoomHistory.shift();
      }
      this.historyIndex = this.settings.zoomHistory.length - 1;
    }

    if (this.settings.independentZoom && this.currentLeafId) {
      this.settings.leafZoomLevels[this.currentLeafId] = level;
      if (this.currentLeaf) {
        this.applyZoomToLeaf(this.currentLeaf, level);
      }
    } else {
      this.applyZoom();
    }
    
    this.updateStatusBar();
    this.showNotice(`${lang.currentZoom}: ${Math.round(this.zoomLevel * 100)}%`);
  }

  undoZoom() {
    const lang = LANGUAGES[this.settings.language];
    if (this.historyIndex < 0) {
      this.showNotice(lang.noUndo);
      return;
    }
    const prevZoom = this.settings.zoomHistory[this.historyIndex];
    this.historyIndex--;
    this.zoomLevel = prevZoom;
    
    if (this.settings.independentZoom && this.currentLeafId) {
      this.settings.leafZoomLevels[this.currentLeafId] = prevZoom;
      if (this.currentLeaf) {
        this.applyZoomToLeaf(this.currentLeaf, prevZoom);
      }
    } else {
      this.applyZoom();
    }
    
    this.updateStatusBar();
    this.showNotice(`${lang.currentZoom}: ${Math.round(this.zoomLevel * 100)}%`);
  }

  redoZoom() {
    const lang = LANGUAGES[this.settings.language];
    if (this.historyIndex >= this.settings.zoomHistory.length - 1) {
      this.showNotice(lang.noRedo);
      return;
    }
    this.historyIndex++;
    const nextZoom = this.settings.zoomHistory[this.historyIndex];
    this.zoomLevel = nextZoom;
    
    if (this.settings.independentZoom && this.currentLeafId) {
      this.settings.leafZoomLevels[this.currentLeafId] = nextZoom;
      if (this.currentLeaf) {
        this.applyZoomToLeaf(this.currentLeaf, nextZoom);
      }
    } else {
      this.applyZoom();
    }
    
    this.updateStatusBar();
    this.showNotice(`${lang.currentZoom}: ${Math.round(this.zoomLevel * 100)}%`);
  }

  cyclePresets() {
    const currentIndex = this.settings.presets.findIndex(p => Math.abs(p - this.zoomLevel) < 0.01);
    const nextIndex = (currentIndex + 1) % this.settings.presets.length;
    this.setZoom(this.settings.presets[nextIndex]);
  }

  applyZoom() {
    if (this.settings.useFontSize) {
      this.applyFontSizeZoom();
    } else {
      this.applyZoomCSS();
    }
  }

  applyZoomToLeaf(leaf, zoomLevel) {
    if (!leaf || !leaf.containerEl) return;
    
    const container = leaf.containerEl;
    
    if (this.settings.useFontSize) {
      this.applyFontSizeZoomToElement(container, zoomLevel);
    } else {
      this.applyZoomCSSToElement(container, zoomLevel);
    }
  }

  applyAllLeafZooms() {
    const leaves = this.app.workspace.getLeavesOfType('markdown');
    leaves.forEach(leaf => {
      const leafId = this.getLeafId(leaf);
      const zoomLevel = this.settings.leafZoomLevels[leafId] || 1.0;
      this.applyZoomToLeaf(leaf, zoomLevel);
    });
    
    const activeLeaf = this.app.workspace.activeLeaf;
    if (activeLeaf) {
      const activeLeafId = this.getLeafId(activeLeaf);
      if (this.settings.leafZoomLevels[activeLeafId] !== undefined) {
        this.zoomLevel = this.settings.leafZoomLevels[activeLeafId];
      }
    }
    
    this.updateStatusBar();
  }

  applyZoomCSSToElement(container, zoomLevel) {
    const selectors = [
      '.markdown-source-view',
      '.markdown-preview-view',
      '.markdown-reading-view',
      '.workspace-leaf-content',
      '.cm-content',
      '.cm-editor',
      '.markdown-preview-sizer',
      '.markdown-preview-pusher',
      'img',
      '.internal-embed',
      '.image-embed'
    ];

    const transition = this.settings.enableAnimation 
      ? `zoom ${this.settings.animationDuration}ms ease-out, transform ${this.settings.animationDuration}ms ease-out` 
      : '';

    selectors.forEach(selector => {
      const elements = container.querySelectorAll(selector);
      elements.forEach(el => {
        if (this.settings.enableAnimation) {
          el.style.transition = transition;
        }
        el.style.zoom = zoomLevel;
      });
    });
  }

  applyZoomCSS() {
    const selectors = [
      '.markdown-source-view',
      '.markdown-preview-view',
      '.markdown-reading-view',
      '.workspace-leaf-content',
      '.cm-content',
      '.cm-editor',
      '.markdown-preview-sizer',
      '.markdown-preview-pusher',
      'img',
      '.internal-embed',
      '.image-embed'
    ];

    const transition = this.settings.enableAnimation 
      ? `zoom ${this.settings.animationDuration}ms ease-out, transform ${this.settings.animationDuration}ms ease-out` 
      : '';

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (this.settings.enableAnimation) {
          el.style.transition = transition;
        }
        el.style.zoom = this.zoomLevel;
      });
    });

    console.log(`Zoom level: ${Math.round(this.zoomLevel * 100)}%`);
  }

  applyFontSizeZoomToElement(container, zoomLevel) {
    const fontSize = Math.round(this.settings.baseFontSize * zoomLevel);
    
    const textSelectors = [
      '.markdown-source-view',
      '.markdown-preview-view',
      '.markdown-reading-view',
      '.cm-content',
      '.cm-editor .cm-line',
      '.markdown-preview-sizer',
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'li', 'span', 'div'
    ];

    const imageSelectors = [
      'img',
      '.internal-embed img',
      '.image-embed img'
    ];

    const transition = this.settings.enableAnimation 
      ? `font-size ${this.settings.animationDuration}ms ease-out, transform ${this.settings.animationDuration}ms ease-out` 
      : '';

    textSelectors.forEach(selector => {
      const elements = container.querySelectorAll(selector);
      elements.forEach(el => {
        if (this.settings.enableAnimation) {
          el.style.transition = transition;
        }
        el.style.fontSize = `${fontSize}px`;
      });
    });

    imageSelectors.forEach(selector => {
      const elements = container.querySelectorAll(selector);
      elements.forEach(el => {
        if (this.settings.enableAnimation) {
          el.style.transition = transition;
        }
        el.style.transform = `scale(${zoomLevel})`;
        el.style.transformOrigin = 'center top';
      });
    });
  }

  applyFontSizeZoom() {
    const fontSize = Math.round(this.settings.baseFontSize * this.zoomLevel);
    
    const textSelectors = [
      '.markdown-source-view',
      '.markdown-preview-view',
      '.markdown-reading-view',
      '.cm-content',
      '.cm-editor .cm-line',
      '.markdown-preview-sizer',
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'li', 'span', 'div'
    ];

    const imageSelectors = [
      'img',
      '.internal-embed img',
      '.image-embed img'
    ];

    const transition = this.settings.enableAnimation 
      ? `font-size ${this.settings.animationDuration}ms ease-out, transform ${this.settings.animationDuration}ms ease-out` 
      : '';

    textSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (this.settings.enableAnimation) {
          el.style.transition = transition;
        }
        el.style.fontSize = `${fontSize}px`;
      });
    });

    imageSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (this.settings.enableAnimation) {
          el.style.transition = transition;
        }
        el.style.transform = `scale(${this.zoomLevel})`;
        el.style.transformOrigin = 'center top';
      });
    });

    console.log(`Font size: ${fontSize}px (zoom: ${Math.round(this.zoomLevel * 100)}%)`);
  }

  resetAllZoom() {
    const selectors = [
      '.markdown-source-view',
      '.markdown-preview-view',
      '.markdown-reading-view',
      '.workspace-leaf-content',
      '.cm-content',
      '.cm-editor',
      '.markdown-preview-sizer',
      '.markdown-preview-pusher',
      'img',
      '.internal-embed',
      '.image-embed'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.zoom = '';
        el.style.fontSize = '';
        el.style.transition = '';
        el.style.transform = '';
        el.style.transformOrigin = '';
      });
    });
  }

  createStatusBar() {
    this.statusBarItem = this.addStatusBarItem();
    this.statusBarItem.addClass('ctrl-wheel-zoom-status');
    this.statusBarItem.createEl('span', { cls: 'zoom-percentage' });
    
    const lang = LANGUAGES[this.settings.language];
    this.statusBarItem.setAttribute('aria-label', lang.statusBarTooltip);
    
    this.statusBarItem.addEventListener('click', (e) => {
      if (e.button === 0) {
        this.showZoomQuickPicker();
      }
    });

    this.statusBarItem.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showContextMenu(e);
    });

    this.updateStatusBar();
  }

  updateStatusBar() {
    if (!this.statusBarItem) return;
    const percentage = this.statusBarItem.querySelector('.zoom-percentage');
    if (percentage) {
      percentage.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  }

  showZoomQuickPicker() {
    const lang = LANGUAGES[this.settings.language];
    const quickLevels = [0.5, 0.75, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0];
    
    const menu = new obsidian.Menu();
    quickLevels.forEach(level => {
      menu.addItem((item) => {
        item.setTitle(`${Math.round(level * 100)}%`)
          .setChecked(Math.abs(this.zoomLevel - level) < 0.01)
          .onClick(() => this.setZoom(level));
      });
    });
    
    menu.addSeparator();
    menu.addItem((item) => {
      item.setTitle(lang.resetZoom)
        .onClick(() => this.setZoom(1.0));
    });
    
    menu.showAtMouseEvent({ clientX: window.innerWidth / 2, clientY: window.innerHeight - 50 });
  }

  showContextMenu(e) {
    const lang = LANGUAGES[this.settings.language];
    
    const menu = new obsidian.Menu();
    menu.addItem((item) => {
      item.setTitle(lang.zoomLocked ? lang.zoomUnlockedNotice : lang.zoomLockedNotice)
        .setChecked(this.settings.zoomLocked)
        .onClick(() => {
          this.settings.zoomLocked = !this.settings.zoomLocked;
          if (this.settings.zoomLocked) {
            this.setZoom(this.settings.lockedZoomLevel);
          }
          this.saveSettings();
        });
    });
    
    menu.addSeparator();
    
    this.settings.presets.forEach((preset) => {
      menu.addItem((item) => {
        item.setTitle(`${lang.zoomTo} ${Math.round(preset * 100)}%`)
          .onClick(() => this.setZoom(preset));
      });
    });
    
    menu.showAtMouseEvent(e);
  }
}

class CtrlWheelZoomSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    const lang = LANGUAGES[this.plugin.settings.language];

    containerEl.createEl('h2', { text: lang.settingsTitle });

    new obsidian.Setting(containerEl)
      .setName(lang.language)
      .setDesc(lang.languageDesc)
      .addDropdown(dropdown => dropdown
        .addOption('zh', lang.languageZh)
        .addOption('en', lang.languageEn)
        .setValue(this.plugin.settings.language)
        .onChange(async (value) => {
          this.plugin.settings.language = value;
          await this.plugin.saveSettings();
          this.display();
        }));

    containerEl.createEl('h3', { text: '---' });

    new obsidian.Setting(containerEl)
      .setName(lang.zoomLocked)
      .setDesc(lang.zoomLockedDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.zoomLocked)
        .onChange(async (value) => {
          this.plugin.settings.zoomLocked = value;
          if (value) {
            this.plugin.setZoom(this.plugin.settings.lockedZoomLevel);
          }
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.lockedZoomLevel)
      .setDesc(lang.lockedZoomLevelDesc)
      .addText(text => text
        .setPlaceholder('1.0')
        .setValue(String(this.plugin.settings.lockedZoomLevel))
        .onChange(async (value) => {
          const num = parseFloat(value);
          if (!isNaN(num) && num >= this.plugin.settings.minZoom && num <= this.plugin.settings.maxZoom) {
            this.plugin.settings.lockedZoomLevel = num;
            if (this.plugin.settings.zoomLocked) {
              this.plugin.setZoom(num);
            }
            await this.plugin.saveSettings();
          }
        }));

    containerEl.createEl('h3', { text: '---' });

    new obsidian.Setting(containerEl)
      .setName(lang.step)
      .setDesc(lang.stepDesc)
      .addSlider(slider => slider
        .setLimits(0.05, 0.5, 0.05)
        .setValue(this.plugin.settings.step)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.step = value;
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.minZoom)
      .setDesc(lang.minZoomDesc)
      .addText(text => text
        .setPlaceholder('0.5')
        .setValue(String(this.plugin.settings.minZoom))
        .onChange(async (value) => {
          const num = parseFloat(value);
          if (!isNaN(num) && num > 0 && num < this.plugin.settings.maxZoom) {
            this.plugin.settings.minZoom = num;
            await this.plugin.saveSettings();
          }
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.maxZoom)
      .setDesc(lang.maxZoomDesc)
      .addText(text => text
        .setPlaceholder('2.0')
        .setValue(String(this.plugin.settings.maxZoom))
        .onChange(async (value) => {
          const num = parseFloat(value);
          if (!isNaN(num) && num > this.plugin.settings.minZoom) {
            this.plugin.settings.maxZoom = num;
            await this.plugin.saveSettings();
          }
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.presets)
      .setDesc(lang.presetsDesc)
      .addText(text => text
        .setPlaceholder('0.75,1.0,1.25,1.5')
        .setValue(this.plugin.settings.presets.join(','))
        .onChange(async (value) => {
          const presets = value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          if (presets.length > 0) {
            this.plugin.settings.presets = presets;
            await this.plugin.saveSettings();
          }
        }));

    containerEl.createEl('h3', { text: '---' });

    new obsidian.Setting(containerEl)
      .setName(lang.useFontSize)
      .setDesc(lang.useFontSizeDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.useFontSize)
        .onChange(async (value) => {
          this.plugin.settings.useFontSize = value;
          this.plugin.applyZoom();
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.baseFontSize)
      .setDesc(lang.baseFontSizeDesc)
      .addText(text => text
        .setPlaceholder('16')
        .setValue(String(this.plugin.settings.baseFontSize))
        .onChange(async (value) => {
          const num = parseInt(value);
          if (!isNaN(num) && num > 8 && num < 32) {
            this.plugin.settings.baseFontSize = num;
            this.plugin.applyZoom();
            await this.plugin.saveSettings();
          }
        }));

    containerEl.createEl('h3', { text: '---' });

    new obsidian.Setting(containerEl)
      .setName(lang.showNotice)
      .setDesc(lang.showNoticeDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showNotice)
        .onChange(async (value) => {
          this.plugin.settings.showNotice = value;
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.showStatusBar)
      .setDesc(lang.showStatusBarDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showStatusBar)
        .onChange(async (value) => {
          this.plugin.settings.showStatusBar = value;
          if (value) {
            this.plugin.createStatusBar();
          } else if (this.plugin.statusBarItem) {
            this.plugin.statusBarItem.remove();
            this.plugin.statusBarItem = null;
          }
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.rememberZoom)
      .setDesc(lang.rememberZoomDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.rememberZoom)
        .onChange(async (value) => {
          this.plugin.settings.rememberZoom = value;
          await this.plugin.saveSettings();
        }));

    containerEl.createEl('h3', { text: '---' });

    new obsidian.Setting(containerEl)
      .setName(lang.enableAnimation)
      .setDesc(lang.enableAnimationDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableAnimation)
        .onChange(async (value) => {
          this.plugin.settings.enableAnimation = value;
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.animationDuration)
      .setDesc(lang.animationDurationDesc)
      .addSlider(slider => slider
        .setLimits(50, 500, 10)
        .setValue(this.plugin.settings.animationDuration)
        .setDynamicTooltip()
        .onChange(async (value) => {
          this.plugin.settings.animationDuration = value;
          await this.plugin.saveSettings();
        }));

    containerEl.createEl('h3', { text: '---' });

    new obsidian.Setting(containerEl)
      .setName(lang.doubleClickReset)
      .setDesc(lang.doubleClickResetDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.doubleClickReset)
        .onChange(async (value) => {
          this.plugin.settings.doubleClickReset = value;
          if (value) {
            document.addEventListener('dblclick', this.plugin.handleDoubleClick, true);
          } else {
            document.removeEventListener('dblclick', this.plugin.handleDoubleClick, true);
          }
          await this.plugin.saveSettings();
        }));

    new obsidian.Setting(containerEl)
      .setName(lang.independentZoom)
      .setDesc(lang.independentZoomDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.independentZoom)
        .onChange(async (value) => {
          this.plugin.settings.independentZoom = value;
          if (value) {
            this.plugin.applyAllLeafZooms();
          } else {
            this.plugin.applyZoom();
          }
          await this.plugin.saveSettings();
        }));

    containerEl.createEl('h3', { text: '---' });

    new obsidian.Setting(containerEl)
      .setName(lang.enableAutoZoom)
      .setDesc(lang.enableAutoZoomDesc)
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableAutoZoom)
        .onChange(async (value) => {
          this.plugin.settings.enableAutoZoom = value;
          await this.plugin.saveSettings();
        }));

    this.displayAutoZoomRules(containerEl, lang);
  }

  displayAutoZoomRules(containerEl, lang) {
    const rulesContainer = containerEl.createDiv({ cls: 'auto-zoom-rules' });
    
    new obsidian.Setting(rulesContainer)
      .setName(lang.autoZoomRules)
      .setDesc(lang.autoZoomRulesDesc)
      .addButton(btn => btn
        .setButtonText(lang.addRule)
        .onClick(() => {
          if (!this.plugin.settings.autoZoomRules) {
            this.plugin.settings.autoZoomRules = [];
          }
          this.plugin.settings.autoZoomRules.push({
            type: 'fileType',
            pattern: '',
            zoom: 1.0
          });
          this.plugin.saveSettings();
          this.display();
        }));

    if (this.plugin.settings.autoZoomRules && this.plugin.settings.autoZoomRules.length > 0) {
      this.plugin.settings.autoZoomRules.forEach((rule, index) => {
        const ruleEl = containerEl.createDiv({ cls: 'auto-zoom-rule' });
        
        new obsidian.Setting(ruleEl)
          .addDropdown(dropdown => dropdown
            .addOption('fileType', lang.fileType)
            .addOption('folder', lang.folder)
            .addOption('tag', lang.tag)
            .setValue(rule.type)
            .onChange(async (value) => {
              this.plugin.settings.autoZoomRules[index].type = value;
              await this.plugin.saveSettings();
            }))
          .addText(text => text
            .setPlaceholder(rule.type === 'fileType' ? 'md' : rule.type === 'folder' ? 'folder/' : 'tag')
            .setValue(rule.pattern)
            .onChange(async (value) => {
              this.plugin.settings.autoZoomRules[index].pattern = value;
              await this.plugin.saveSettings();
            }))
          .addText(text => text
            .setPlaceholder('1.0')
            .setValue(String(rule.zoom))
            .onChange(async (value) => {
              const num = parseFloat(value);
              if (!isNaN(num)) {
                this.plugin.settings.autoZoomRules[index].zoom = num;
                await this.plugin.saveSettings();
              }
            }))
          .addButton(btn => btn
            .setButtonText(lang.removeRule)
            .onClick(async () => {
              this.plugin.settings.autoZoomRules.splice(index, 1);
              await this.plugin.saveSettings();
              this.display();
            }));
      });
    }
  }
}

module.exports = CtrlWheelZoomPlugin;
