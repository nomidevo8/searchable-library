# Searchable Select Library

A beautiful, fully customizable searchable select dropdown library for modern web applications. Works with vanilla JavaScript and jQuery. Pure CSS styling with unlimited customization options.

## Features

✨ **Fully Customizable**
- CSS Custom Properties (variables) for quick theming
- JavaScript configuration object for advanced control
- Supports all HTML select features
- Keyboard navigation (arrow keys, enter, escape)

🎯 **Lightweight & Fast**
- No external dependencies
- Works with vanilla JavaScript AND jQuery
- ~8KB minified
- Smooth animations and transitions

🔧 **Easy to Use**
- Simple API
- Multiple initialization methods
- Works with both ID and class selectors
- Automatic event delegation

## Installation

### Option 1: Direct Script Include
```html
<link rel="stylesheet" href="dist/searchable-select.css">
<script src="dist/searchable-select.js"></script>
```

### Option 2: ES6 Module
```bash
npm install searchable-select
```

```javascript
import SearchableSelect from 'searchable-select';
```

## Quick Start

### Vanilla JavaScript

```html
<!-- HTML -->
<select id="my-select">
  <option value="">-- Select Option --</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>

<!-- Script -->
<script>
  const select = new SearchableSelect('#my-select', {
    primaryColor: '#1a9b8e',
    searchPlaceholder: 'Search...'
  });
</script>
```

### jQuery

```javascript
$('#my-select').searchableSelect({
  primaryColor: '#1a9b8e',
  searchPlaceholder: 'Search...'
});
```

### Auto-Initialize (HTML attribute)

```html
<select class="searchable-select" data-config="{'primaryColor': '#1a9b8e'}">
  <option value="">Select...</option>
  <option value="1">Option 1</option>
</select>

<script>
  // Auto-initializes all selects with data-config attribute
  SearchableSelect.autoInit();
</script>
```

## CSS Variables (Theming)

Customize colors using CSS variables:

```css
:root {
  --ss-primary-color: #1a9b8e;
  --ss-primary-hover: #158076;
  --ss-border-color: #1a9b8e;
  --ss-text-color: #2c3e50;
  --ss-bg-color: white;
  --ss-option-hover-bg: #f0f8f6;
  --ss-option-selected-bg: #e8f5f3;
  --ss-scrollbar-color: #1a9b8e;
  --ss-shadow-color: rgba(0, 0, 0, 0.12);
  --ss-border-radius: 6px;
  --ss-transition-speed: 0.2s;
}
```

Or override on specific elements:

```html
<select id="red-select" style="--ss-primary-color: #d32f2f;">
  <!-- options -->
</select>
```

## Configuration Options

### JavaScript Config Object

```javascript
{
  // Colors & Styling
  primaryColor: '#1a9b8e',           // Main theme color
  primaryHoverColor: '#158076',      // Hover state color
  borderColor: '#1a9b8e',            // Border color
  textColor: '#2c3e50',              // Text color
  backgroundColor: '#ffffff',        // Dropdown background
  optionHoverBg: '#f0f8f6',         // Option hover background
  optionSelectedBg: '#e8f5f3',       // Selected option background
  scrollbarColor: '#1a9b8e',         // Scrollbar color
  shadowColor: 'rgba(0, 0, 0, 0.12)', // Shadow color
  borderRadius: '6px',               // Border radius
  
  // UI Text
  searchPlaceholder: 'Search...',    // Search input placeholder
  noResultsText: 'No results found', // No results message
  
  // Behavior
  maxHeight: '400px',                // Dropdown max height
  animationSpeed: '0.2s',            // Animation duration
  closeOnSelect: true,               // Close dropdown on selection
  searchMinLength: 1,                // Minimum chars to search
  
  // Callbacks
  onSelect: function(value, text) {}, // Selection callback
  onOpen: function() {},              // Dropdown open callback
  onClose: function() {},             // Dropdown close callback
  onSearch: function(term) {}         // Search callback
}
```

## Usage Examples

### Multiple Selects on Same Page

```javascript
// Initialize all with one call
SearchableSelect.initAll('.my-select', {
  primaryColor: '#1a9b8e'
});

// Or initialize individually
const select1 = new SearchableSelect('#select1');
const select2 = new SearchableSelect('#select2');
```

### Custom Styling Per Instance

```javascript
const select = new SearchableSelect('#my-select', {
  primaryColor: '#3f51b5',
  borderRadius: '8px',
  maxHeight: '500px',
  onSelect: function(value, text) {
    console.log('Selected:', value, text);
    // Do something when user selects an option
  }
});
```

### Combining CSS Variables + JS Config

CSS variables are base theme, JS config can override:

```css
/* Global theme */
:root {
  --ss-primary-color: #1a9b8e;
  --ss-text-color: #333;
}

/* Component-specific override */
#urgent-select {
  --ss-primary-color: #d32f2f; /* Red for urgent */
}
```

```javascript
new SearchableSelect('#urgent-select', {
  borderRadius: '4px'
  /* primaryColor will use CSS variable #d32f2f */
});
```

## API Methods

```javascript
const select = new SearchableSelect('#my-select');

// Get selected value
select.getValue();

// Get selected text
select.getText();

// Set value programmatically
select.setValue('option-value');

// Clear selection
select.clear();

// Enable/Disable
select.enable();
select.disable();

// Destroy instance and cleanup
select.destroy();

// Update options dynamically
select.updateOptions([
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' }
]);
```

## Events

```javascript
const select = new SearchableSelect('#my-select');

// Listen to change event
select.on('change', function(value, text) {
  console.log('Changed to:', value, text);
});

// Listen to custom events
select.on('open', function() {
  console.log('Dropdown opened');
});

select.on('close', function() {
  console.log('Dropdown closed');
});
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- IE 11+ (with polyfills)

## License

MIT © Your Name

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
