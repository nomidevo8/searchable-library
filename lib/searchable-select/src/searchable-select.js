/**
 * SearchableSelect - A beautiful, fully customizable searchable select dropdown
 * Version: 1.0.0
 * 
 * Features:
 * - Works with vanilla JavaScript and jQuery
 * - Fully customizable via CSS variables and JS config
 * - Keyboard navigation support
 * - Search functionality
 * - Smooth animations
 * - No external dependencies
 * 
 * @author Your Name
 * @license MIT
 */

(function(global, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // Node/CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else {
    // Global
    global.SearchableSelect = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {

  'use strict';

  /**
   * Default configuration
   */
  const DEFAULT_CONFIG = {
    // Colors & Styling
    primaryColor: '#1a9b8e',
    primaryHoverColor: '#158076',
    borderColor: '#1a9b8e',
    textColor: '#2c3e50',
    backgroundColor: '#ffffff',
    optionHoverBg: '#f0f8f6',
    optionSelectedBg: '#e8f5f3',
    scrollbarColor: '#1a9b8e',
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: '6px',
    
    // UI Text
    searchPlaceholder: 'Search...',
    noResultsText: 'No results found',
    
    // Behavior
    maxHeight: '400px',
    animationSpeed: '0.2s',
    closeOnSelect: true,
    searchMinLength: 1,
    
    // Callbacks (for config users)
    onSelect: null,
    onOpen: null,
    onClose: null,
    onSearch: null
  };

  /**
   * SearchableSelect Class
   */
  class SearchableSelect {
    /**
     * Constructor
     * @param {string|HTMLElement} selector - CSS selector or DOM element
     * @param {Object} config - Configuration object
     */
    constructor(selector, config = {}) {
      this.selectElement = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector;

      if (!this.selectElement) {
        console.error('SearchableSelect: Element not found', selector);
        return;
      }

      if (this.selectElement.tagName !== 'SELECT') {
        console.error('SearchableSelect: Element must be a SELECT element');
        return;
      }

      // Merge config with defaults
      this.config = this._mergeConfig(config);

      // Instance state
      this.isOpen = false;
      this.currentIndex = -1;
      this.searchTerm = '';
      this.dropdownWrapper = null;
      this.searchInput = null;
      this.optionsList = null;
      this.eventListeners = [];

      // Mark as initialized
      this.selectElement.dataset.searchableInit = 'true';

      // Initialize
      this._init();
    }

    /**
     * Merge user config with defaults and CSS variables
     */
    _mergeConfig(userConfig) {
      const config = { ...DEFAULT_CONFIG, ...userConfig };
      console.log('userconfig', userConfig);
      const element = this.selectElement;
      const style = getComputedStyle(element);
    
      // Read CSS variables if available
      const getCSSVar = (varName, fallback) => {
        const value = style.getPropertyValue(`--ss-${varName}`).trim();
        return value || fallback;
      };

      // Override with CSS variables if present
      if (style.getPropertyValue('--ss-primary-color').trim()) {
        config.primaryColor = getCSSVar('primary-color', config.primaryColor);
      }
      if (style.getPropertyValue('--ss-border-color').trim()) {
        config.borderColor = getCSSVar('border-color', config.borderColor);
      }
      if (style.getPropertyValue('--ss-text-color').trim()) {
        config.textColor = getCSSVar('text-color', config.textColor);
      }
      console.log('mergedConfig', config);
      return config;
    }

    /**
     * Initialize the searchable select
     */
    _init() {
      this._injectStyles();
      this._setupDOM();
      this._attachEventListeners();
    }

    /**
     * Inject CSS variables based on config
     */
    _injectStyles() {
      const selectId = this.selectElement.id || `ss-${Math.random().toString(36).substr(2, 9)}`;
      if (!this.selectElement.id) {
        this.selectElement.id = selectId;
      }

      const style = document.createElement('style');
      const conf = this.config;

      style.textContent = `
        #${selectId} {
          --ss-primary-color: ${conf.primaryColor};
          --ss-primary-hover: ${conf.primaryHoverColor};
          --ss-border-color: ${conf.borderColor};
          --ss-text-color: ${conf.textColor};
          --ss-bg-color: ${conf.backgroundColor};
          --ss-option-hover-bg: ${conf.optionHoverBg};
          --ss-option-selected-bg: ${conf.optionSelectedBg};
          --ss-scrollbar-color: ${conf.scrollbarColor};
          --ss-shadow-color: ${conf.shadowColor};
          --ss-border-radius: ${conf.borderRadius};
          --ss-transition-speed: ${conf.animationSpeed};
        }
      `;

      document.head.appendChild(style);
    }

    /**
     * Setup DOM wrapper
     */
    _setupDOM() {
      // Hide original select
      this.selectElement.style.display = 'none';

      // Create wrapper if not exists
      const wrapper = this.selectElement.parentElement;
      if (!wrapper.classList.contains('ss-wrapper')) {
        const newWrapper = document.createElement('div');
        newWrapper.className = 'ss-wrapper';
        this.selectElement.parentNode.insertBefore(newWrapper, this.selectElement);
        newWrapper.appendChild(this.selectElement);
        this.wrapper = newWrapper;
      } else {
        this.wrapper = wrapper;
      }

      // Create trigger button
      const trigger = document.createElement('button');
      trigger.className = 'ss-trigger';
      trigger.type = 'button';
      trigger.innerHTML = this._getTriggerHTML();
      this.wrapper.appendChild(trigger);
      this.trigger = trigger;

      // Create dropdown
      this.dropdownWrapper = document.createElement('div');
      this.dropdownWrapper.className = 'ss-dropdown-wrapper';
      this.wrapper.appendChild(this.dropdownWrapper);
    }

    /**
     * Get trigger button HTML
     */
    _getTriggerHTML() {
      const selectedText = this.selectElement.options[this.selectElement.selectedIndex]?.text || '';
      return `
        <span class="ss-trigger-text">${this._escapeHtml(selectedText || 'Select...')}</span>
        <span class="ss-trigger-icon">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      `;
    }

    /**
     * Attach event listeners
     */
    _attachEventListeners() {
      const self = this;

      // Store listeners for cleanup
      this._triggerClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        self.isOpen ? self.close() : self.open();
      };

      this.trigger.addEventListener('click', this._triggerClick);

      // Close on outside click
      this._outsideClick = (e) => {
        if (!self.wrapper.contains(e.target)) {
          self.close();
        }
      };

      // Close on escape
      this._escapeKey = (e) => {
        if (e.key === 'Escape') {
          self.close();
        }
      };

      // Change event on original select
      this._selectChange = () => {
        self._updateTrigger();
      };

      this.selectElement.addEventListener('change', this._selectChange);
    }

    /**
     * Open dropdown
     */
    open() {
      if (this.isOpen) return;

      this.isOpen = true;
      this._renderDropdown();

      // Add event listeners
      document.addEventListener('click', this._outsideClick);
      document.addEventListener('keydown', this._escapeKey);

      // Focus search
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }, 50);

      // Call callback
      if (this.config.onOpen) {
        this.config.onOpen.call(this);
      }
    }

    /**
     * Close dropdown
     */
    close() {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.dropdownWrapper.classList.remove('ss-active');

      // Remove event listeners
      document.removeEventListener('click', this._outsideClick);
      document.removeEventListener('keydown', this._escapeKey);

      setTimeout(() => {
        this.dropdownWrapper.innerHTML = '';
      }, 200);

      // Call callback
      if (this.config.onClose) {
        this.config.onClose.call(this);
      }
    }

    /**
     * Render dropdown content
     */
    _renderDropdown() {
      const options = this.selectElement.querySelectorAll('option');
      
      const searchDiv = document.createElement('div');
      searchDiv.className = 'ss-search';
      
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.className = 'ss-search-input';
      searchInput.placeholder = this.config.searchPlaceholder;
      searchDiv.appendChild(searchInput);
      this.searchInput = searchInput;

      const optionsList = document.createElement('ul');
      optionsList.className = 'ss-options';
      this.optionsList = optionsList;

      this.dropdownWrapper.innerHTML = '';
      this.dropdownWrapper.appendChild(searchDiv);
      this.dropdownWrapper.appendChild(optionsList);

      // Render options
      options.forEach((option, index) => {
        if (!option.value && option.text) {
          // Skip placeholder
          return;
        }

        if (option.value) {
          const li = document.createElement('li');
          li.className = 'ss-option';
          li.textContent = option.text;
          li.dataset.value = option.value;
          li.dataset.index = index;

          if (this.selectElement.value === option.value) {
            li.classList.add('ss-selected');
          }

          li.addEventListener('click', (e) => {
            e.stopPropagation();
            this._selectOption(option.value, option.text);
          });

          optionsList.appendChild(li);
        }
      });

      // Search functionality
      searchInput.addEventListener('input', (e) => {
        this._filterOptions(e.target.value);
      });

      // Keyboard navigation
      searchInput.addEventListener('keydown', (e) => {
        this._handleKeyboard(e);
      });

      // Activate dropdown with animation
      setTimeout(() => {
        this.dropdownWrapper.classList.add('ss-active');
      }, 10);
    }

    /**
     * Filter options by search term
     */
    _filterOptions(term) {
      this.searchTerm = term.toLowerCase();
      const items = this.optionsList.querySelectorAll('.ss-option');
      let visibleCount = 0;

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(this.searchTerm)) {
          item.classList.remove('ss-hidden');
          visibleCount++;
        } else {
          item.classList.add('ss-hidden');
        }
      });

      // Show/hide no results message
      let noResults = this.optionsList.querySelector('.ss-no-results');
      if (visibleCount === 0) {
        if (!noResults) {
          noResults = document.createElement('li');
          noResults.className = 'ss-no-results';
          noResults.textContent = this.config.noResultsText;
          this.optionsList.appendChild(noResults);
        }
      } else if (noResults) {
        noResults.remove();
      }

      // Call callback
      if (this.config.onSearch) {
        this.config.onSearch.call(this, term);
      }
    }

    /**
     * Handle keyboard navigation
     */
    _handleKeyboard(e) {
      const items = Array.from(this.optionsList.querySelectorAll('.ss-option:not(.ss-hidden)'));
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          this.currentIndex = Math.min(this.currentIndex + 1, items.length - 1);
          this._highlightOption(items[this.currentIndex]);
          break;

        case 'ArrowUp':
          e.preventDefault();
          this.currentIndex = Math.max(this.currentIndex - 1, 0);
          this._highlightOption(items[this.currentIndex]);
          break;

        case 'Enter':
          e.preventDefault();
          if (items[this.currentIndex]) {
            const option = items[this.currentIndex];
            this._selectOption(option.dataset.value, option.textContent);
          }
          break;

        case 'Escape':
          e.preventDefault();
          this.close();
          break;
      }
    }

    /**
     * Highlight option visually
     */
    _highlightOption(option) {
      if (!option) return;

      // Remove previous highlight
      this.optionsList.querySelectorAll('.ss-option').forEach(opt => {
        opt.classList.remove('ss-highlighted');
      });

      // Add highlight
      option.classList.add('ss-highlighted');
      option.scrollIntoView({ block: 'nearest' });
    }

    /**
     * Select an option
     */
    _selectOption(value, text) {
      this.selectElement.value = value;
      
      // Trigger change event
      const event = new Event('change', { bubbles: true });
      this.selectElement.dispatchEvent(event);

      this._updateTrigger();
      
      if (this.config.closeOnSelect) {
        this.close();
      }

      // Call callback
      if (this.config.onSelect) {
        this.config.onSelect.call(this, value, text);
      }
    }

    /**
     * Update trigger button text
     */
    _updateTrigger() {
      const selectedText = this.selectElement.options[this.selectElement.selectedIndex]?.text || '';
      this.trigger.innerHTML = this._getTriggerHTML();
    }

    /**
     * Escape HTML entities
     */
    _escapeHtml(text) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return String(text).replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * Public API Methods
     */

    getValue() {
      return this.selectElement.value;
    }

    getText() {
      return this.selectElement.options[this.selectElement.selectedIndex]?.text || '';
    }

    setValue(value) {
      this.selectElement.value = value;
      const event = new Event('change', { bubbles: true });
      this.selectElement.dispatchEvent(event);
    }

    clear() {
      this.selectElement.value = '';
      this._updateTrigger();
    }

    enable() {
      this.selectElement.disabled = false;
      this.trigger.disabled = false;
    }

    disable() {
      this.selectElement.disabled = true;
      this.trigger.disabled = true;
    }

    destroy() {
      // Remove event listeners
      this.trigger.removeEventListener('click', this._triggerClick);
      this.selectElement.removeEventListener('change', this._selectChange);
      document.removeEventListener('click', this._outsideClick);
      document.removeEventListener('keydown', this._escapeKey);

      // Remove DOM elements
      this.trigger.remove();
      this.dropdownWrapper.remove();

      // Show original select
      this.selectElement.style.display = '';
      this.selectElement.dataset.searchableInit = 'false';
    }

    updateOptions(options) {
      // Clear current options
      while (this.selectElement.options.length > 0) {
        this.selectElement.remove(0);
      }

      // Add new options
      options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.text = opt.text;
        this.selectElement.appendChild(option);
      });

      this._updateTrigger();
      if (this.isOpen) {
        this._renderDropdown();
      }
    }

    on(event, callback) {
      if (event === 'change') {
        this.config.onSelect = callback;
      } else if (event === 'open') {
        this.config.onOpen = callback;
      } else if (event === 'close') {
        this.config.onClose = callback;
      } else if (event === 'search') {
        this.config.onSearch = callback;
      }
    }
  }

  /**
   * Static methods
   */

  SearchableSelect.initAll = function(selector, config) {
    const elements = document.querySelectorAll(selector);
    const instances = [];
    elements.forEach(el => {
      if (el.dataset.searchableInit !== 'true') {
        instances.push(new SearchableSelect(el, config));
      }
    });
    return instances;
  };

  SearchableSelect.autoInit = function(config) {
    const elements = document.querySelectorAll('[data-searchable]');
    const instances = [];
    
    elements.forEach(el => {
      if (el.dataset.searchableInit !== 'true') {
        let elConfig = config || {};
        
        // Parse data-config if present
        if (el.dataset.config) {
          try {
            elConfig = { ...elConfig, ...JSON.parse(el.dataset.config) };
          } catch (e) {
            console.error('Invalid config JSON:', el.dataset.config);
          }
        }
        
        instances.push(new SearchableSelect(el, elConfig));
      }
    });
    
    return instances;
  };

  /**
   * jQuery Plugin Support
   */
  if (typeof jQuery !== 'undefined') {
    jQuery.fn.searchableSelect = function(config) {
      const instances = [];
      this.each(function() {
        if (!this.dataset.searchableInit || this.dataset.searchableInit !== 'true') {
          instances.push(new SearchableSelect(this, config));
        }
      });
      return instances.length === 1 ? instances[0] : instances;
    };
  }

  return SearchableSelect;

}));
