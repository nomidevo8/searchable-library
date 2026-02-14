# Quick Start Guide

Get SearchableSelect up and running in 5 minutes!

## 📥 Installation

### Option 1: Direct Copy (Recommended for Projects)

```bash
# Copy the entire lib/searchable-select folder to your project
cp -r lib/searchable-select /path/to/your/project/
```

### Option 2: NPM (When Published)

```bash
npm install searchable-select
```

---

## ⚡ 30-Second Setup

### 1. Include Files

```html
<!DOCTYPE html>
<html>
<head>
    <!-- CSS -->
    <link rel="stylesheet" href="searchable-select.css">
</head>
<body>

    <!-- HTML Select -->
    <select id="my-select">
        <option value="">Select...</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>

    <!-- JavaScript -->
    <script src="searchable-select.js"></script>
    <script>
        // Initialize
        new SearchableSelect('#my-select');
    </script>
</body>
</html>
```

**That's it!** Your select now has:
✅ Search functionality
✅ Beautiful styling
✅ Smooth animations
✅ Keyboard navigation

---

## 🎨 Quick Styling

### Change Colors

```javascript
new SearchableSelect('#my-select', {
    primaryColor: '#FF6B6B'
});
```

### Use CSS Variables

```css
#my-select {
    --ss-primary-color: #FF6B6B;
    --ss-border-radius: 8px;
}
```

### Inline Styling

```html
<select id="red-select" style="--ss-primary-color: #FF6B6B;">
    <option value="1">Option 1</option>
</select>
```

---

## 🚀 Common Patterns

### Multiple Selects

```javascript
// Initialize all at once
SearchableSelect.initAll('.my-select', {
    primaryColor: '#1a9b8e'
});
```

### With jQuery

```javascript
$('#my-select').searchableSelect({
    primaryColor: '#1a9b8e'
});
```

### Get Selected Value

```javascript
const select = new SearchableSelect('#my-select');
const value = select.getValue();
const text = select.getText();
```

### Listen to Changes

```javascript
const select = new SearchableSelect('#my-select', {
    onSelect: function(value, text) {
        console.log('Selected:', value, text);
    }
});
```

### Update Options Dynamically

```javascript
const select = new SearchableSelect('#my-select');

select.updateOptions([
    { value: '1', text: 'New Option 1' },
    { value: '2', text: 'New Option 2' }
]);
```

---

## 📱 Responsive & Mobile

The component automatically adapts to:
- ✅ Mobile screens
- ✅ Touch devices
- ✅ Keyboard navigation
- ✅ Dark mode (CSS media query support)

---

## ♿ Accessibility

Features:
- Keyboard navigation (arrows, enter, escape)
- ARIA-compatible
- Works with screen readers
- Semantic HTML

---

## 🎯 WordPress Integration

```php
// In your plugin's enqueue function
wp_enqueue_style('searchable-select', 
    plugin_dir_url(__FILE__) . 'lib/searchable-select/src/searchable-select.css'
);

wp_enqueue_script('searchable-select',
    plugin_dir_url(__FILE__) . 'lib/searchable-select/src/searchable-select.js',
    [],
    '1.0.0',
    true
);
```

Then in your form template:

```html
<select id="service-select">
    <option value="">Select Service...</option>
    <option value="service1">Service 1</option>
    <option value="service2">Service 2</option>
</select>

<script>
    new SearchableSelect('#service-select', {
        primaryColor: '#1a9b8e'
    });
</script>
```

---

## 🎓 Full Documentation

- **[README.md](../README.md)** - Features & overview
- **[USAGE.md](./USAGE.md)** - Complete API reference
- **[EXAMPLES.html](./EXAMPLES.html)** - Live interactive examples
- **[MIGRATION.md](./MIGRATION.md)** - Migrate from custom code

---

## 🐛 Troubleshooting

### Dropdown not opening?
```javascript
// Make sure you loaded the library before initializing
// 1. Load CSS: <link rel="stylesheet" href="searchable-select.css">
// 2. Load JS: <script src="searchable-select.js"></script>
// 3. Initialize: new SearchableSelect('#my-select');
```

### Colors not changing?
```javascript
// CSS variables take priority over JS config
// Make sure CSS is loaded and no conflicting styles

// Priority order:
// 1. Inline CSS variable (highest)
// 2. JavaScript config
// 3. CSS file defaults (lowest)
```

### Selecting not working?
```javascript
// Make sure your select has proper option values
<select>
    <option value="">Not this one</option>
    <option value="actual-value">Actual option</option>
</select>
```

---

## 💡 Pro Tips

1. **Initialize once per select** - Don't reinitialize the same select multiple times

2. **Use data-searchable for auto-init**
```html
<select class="my-select" data-searchable>
    <option value="1">Option 1</option>
</select>
<script>
    SearchableSelect.autoInit();
</script>
```

3. **Combine CSS variables + JS config** for maximum flexibility
```javascript
// CSS sets base theme
// JS config overrides for specific component
```

4. **Clean up in SPAs**
```javascript
// Before removing from DOM
select.destroy();
```

5. **Use callbacks for validation**
```javascript
const select = new SearchableSelect('#my-select', {
    onSelect: function(value, text) {
        if (!value) return;
        // Do validation or trigger events
    }
});
```

---

## 📦 File Structure

```
searchable-select/
├── src/
│   ├── searchable-select.js          ← Main library
│   └── searchable-select.css         ← Styling
├── dist/                             ← Minified versions
├── docs/
│   ├── README.md                     ← Features
│   ├── USAGE.md                      ← Full API
│   ├── MIGRATION.md                  ← Migration guide
│   ├── EXAMPLES.html                 ← Live examples
│   └── QUICKSTART.md                 ← This file
└── package.json                      ← Package info
```

---

## 🌟 That's All!

You now have everything you need to use SearchableSelect. 

For advanced usage, check out the [Full Documentation](./USAGE.md).

Happy coding! 🚀
