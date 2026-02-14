# SearchableSelect - Usage Guide

## Table of Contents
1. [Basic Usage](#basic-usage)
2. [Initialization Methods](#initialization-methods)
3. [Configuration](#configuration)
4. [API Reference](#api-reference)
5. [Examples](#examples)
6. [Styling & Theming](#styling--theming)

---

## Basic Usage

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="path/to/searchable-select.css">
</head>
<body>

<select id="my-select">
  <option value="">-- Select Option --</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>

<script src="path/to/searchable-select.js"></script>
<script>
  // Initialize
  const select = new SearchableSelect('#my-select');
</script>

</body>
</html>
```

### jQuery

```javascript
$('#my-select').searchableSelect({
  primaryColor: '#3f51b5'
});
```

---

## Initialization Methods

### Method 1: Direct Instantiation

```javascript
const select = new SearchableSelect('#my-select', {
  primaryColor: '#FF6B6B'
});
```

### Method 2: Initialize All (Class Selector)

```javascript
// Initialize all selects with class 'searchable'
SearchableSelect.initAll('.searchable', {
  primaryColor: '#1a9b8e'
});
```

### Method 3: Auto-Init (HTML Attribute)

```html
<select class="my-select" data-searchable data-config="{'primaryColor': '#FF6B6B'}">
  <option value="">Select...</option>
  <option value="1">Option 1</option>
</select>

<script>
  // Auto-initializes all [data-searchable] elements
  SearchableSelect.autoInit();

  // Or with default config
  SearchableSelect.autoInit({ maxHeight: '500px' });
</script>
```

### Method 4: jQuery Plugin

```javascript
$('#my-select').searchableSelect({
  primaryColor: '#1a9b8e',
  searchPlaceholder: 'Search items...'
});
```

---

## Configuration

### Color Options

```javascript
new SearchableSelect('#select', {
  // Main theme color
  primaryColor: '#1a9b8e',
  
  // Hover state for primary color
  primaryHoverColor: '#158076',
  
  // Border color of trigger button
  borderColor: '#1a9b8e',
  
  // Text color
  textColor: '#2c3e50',
  
  // Background color of dropdown
  backgroundColor: '#ffffff',
  
  // Option hover background
  optionHoverBg: '#f0f8f6',
  
  // Selected option background
  optionSelectedBg: '#e8f5f3',
  
  // Scrollbar color
  scrollbarColor: '#1a9b8e',
  
  // Shadow color
  shadowColor: 'rgba(0, 0, 0, 0.12)',
  
  // Border radius
  borderRadius: '6px'
});
```

### Text & UI Options

```javascript
new SearchableSelect('#select', {
  // Search input placeholder
  searchPlaceholder: 'Search here...',
  
  // Message when no results found
  noResultsText: 'No items found'
});
```

### Behavior Options

```javascript
new SearchableSelect('#select', {
  // Maximum height of dropdown
  maxHeight: '400px',
  
  // Animation speed
  animationSpeed: '0.2s',
  
  // Close dropdown after selection
  closeOnSelect: true,
  
  // Minimum characters to trigger search
  searchMinLength: 1
});
```

### Callback Functions

```javascript
new SearchableSelect('#select', {
  onSelect: function(value, text) {
    console.log('Selected:', value, text);
  },
  
  onOpen: function() {
    console.log('Dropdown opened');
  },
  
  onClose: function() {
    console.log('Dropdown closed');
  },
  
  onSearch: function(term) {
    console.log('Search term:', term);
  }
});
```

---

## API Reference

### Methods

#### `getValue()`
Get currently selected value
```javascript
const value = select.getValue();
// Returns: string
```

#### `getText()`
Get currently selected option text
```javascript
const text = select.getText();
// Returns: string
```

#### `setValue(value)`
Set value programmatically
```javascript
select.setValue('option-2');
```

#### `clear()`
Clear selection
```javascript
select.clear();
```

#### `enable()`
Enable the select
```javascript
select.enable();
```

#### `disable()`
Disable the select
```javascript
select.disable();
```

#### `open()`
Programmatically open dropdown
```javascript
select.open();
```

#### `close()`
Programmatically close dropdown
```javascript
select.close();
```

#### `destroy()`
Destroy instance and cleanup
```javascript
select.destroy();
```

#### `updateOptions(options)`
Dynamically update options
```javascript
select.updateOptions([
  { value: '1', text: 'New Option 1' },
  { value: '2', text: 'New Option 2' }
]);
```

#### `on(event, callback)`
Listen to events
```javascript
select.on('change', function(value, text) {
  console.log('Changed to:', value, text);
});

select.on('open', function() {
  console.log('Opened');
});
```

---

## Examples

### Example 1: Multiple Selects with Different Colors

```javascript
// Service select - Green theme
new SearchableSelect('#service-select', {
  primaryColor: '#4CAF50',
  primaryHoverColor: '#45a049'
});

// Priority select - Red theme
new SearchableSelect('#priority-select', {
  primaryColor: '#f44336',
  primaryHoverColor: '#da190b'
});

// Status select - Blue theme
new SearchableSelect('#status-select', {
  primaryColor: '#2196F3',
  primaryHoverColor: '#0b7dda'
});
```

### Example 2: With Form Validation

```javascript
const select = new SearchableSelect('#country', {
  primaryColor: '#1a9b8e',
  onSelect: function(value, text) {
    if (value === '') {
      console.warn('Please select a country');
      return;
    }
    console.log('Selected:', text);
  }
});

// Validate before submit
document.querySelector('form').addEventListener('submit', (e) => {
  if (!select.getValue()) {
    e.preventDefault();
    alert('Please select a country');
  }
});
```

### Example 3: Dynamic Options Loading

```javascript
const select = new SearchableSelect('#products', {
  primaryColor: '#1a9b8e'
});

// Load options from API
async function loadProducts(category) {
  const response = await fetch(`/api/products?category=${category}`);
  const products = await response.json();
  
  const options = products.map(p => ({
    value: p.id,
    text: p.name
  }));
  
  select.updateOptions(options);
}
```

### Example 4: Custom Styling with CSS Variables

```html
<style>
  /* Global theme */
  :root {
    --ss-primary-color: #3f51b5;
    --ss-border-radius: 8px;
  }

  /* Component-specific override */
  #urgent-select {
    --ss-primary-color: #f44336;
  }

  /* Another component */
  #archive-select {
    --ss-primary-color: #9e9e9e;
  }
</style>

<select id="normal-select"><!-- Uses global theme --></select>
<select id="urgent-select"><!-- Uses red theme --></select>
<select id="archive-select"><!-- Uses gray theme --></select>

<script>
  SearchableSelect.autoInit();
</script>
```

### Example 5: Event Handling

```javascript
const select = new SearchableSelect('#notifications', {
  primaryColor: '#ff9800',
  onOpen: function() {
    console.log('User opened dropdown');
    // Track analytics
  },
  
  onClose: function() {
    console.log('User closed dropdown');
  },
  
  onSelect: function(value, text) {
    console.log('User selected:', value);
    // Update other UI elements
    updateNotificationPreview(value);
  },
  
  onSearch: function(term) {
    console.log('User searching for:', term);
    // Live search feedback
  }
});
```

### Example 6: Chained Configuration + Vanilla CSS

```html
<style>
  /* Light mode */
  .light-theme {
    --ss-primary-color: #1a9b8e;
    --ss-text-color: #333;
    --ss-bg-color: #fff;
  }

  /* Dark mode */
  .dark-theme {
    --ss-primary-color: #4dd0e1;
    --ss-text-color: #e0e0e0;
    --ss-bg-color: #424242;
  }
</style>

<div class="light-theme">
  <select id="light-select"></select>
</div>

<div class="dark-theme">
  <select id="dark-select"></select>
</div>

<script>
  new SearchableSelect('#light-select');
  new SearchableSelect('#dark-select');
</script>
```

---

## Styling & Theming

### Using CSS Variables

The library uses CSS custom properties for full theming control:

```css
/* Override all instances globally */
:root {
  --ss-primary-color: #your-color;
  --ss-border-radius: 8px;
  --ss-animation-speed: 0.3s;
}

/* Override specific instance */
#my-select {
  --ss-primary-color: #ff6b6b;
  --ss-text-color: #333;
}
```

### Using JavaScript Config

Override colors via JavaScript:

```javascript
new SearchableSelect('#select', {
  primaryColor: '#ff6b6b',
  textColor: '#333',
  borderRadius: '8px'
});
```

### Priority Order (CSS Variables win over JS config)

1. **Highest**: Inline CSS variable on element
2. **Medium**: JavaScript config
3. **Lowest**: Default CSS variables in stylesheet

### Predefined Themes

```javascript
// Professional Blue
new SearchableSelect('#select', {
  primaryColor: '#2c3e50',
  borderRadius: '4px',
  animationSpeed: '0.3s'
});

// Vibrant Green
new SearchableSelect('#select', {
  primaryColor: '#27ae60',
  primaryHoverColor: '#229954',
  borderRadius: '8px'
});

// Minimal Gray
new SearchableSelect('#select', {
  primaryColor: '#7f8c8d',
  textColor: '#2c3e50',
  borderRadius: '2px'
});
```

---

## Keyboard Navigation

- **Arrow Down** - Navigate to next option
- **Arrow Up** - Navigate to previous option
- **Enter** - Select highlighted option
- **Escape** - Close dropdown

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ IE 11+ (with polyfills)

---

## Tips & Best Practices

1. **Always include both CSS and JS files**
2. **Use unique IDs or classes for each select**
3. **Initialize after DOM is ready**
4. **Destroy instances when removing from DOM to avoid memory leaks**
5. **Use CSS variables for consistent theming**
6. **Test keyboard navigation for accessibility**

