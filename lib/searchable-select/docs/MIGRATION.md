# Migration Guide - Using SearchableSelect Library in Your Plugin

This guide shows how to replace your existing searchable select code with the new reusable library while keeping your plugin untouched.

## Current Code in Your Plugin

Your plugin currently has inline searchable select code in `assets/js/base/form.js`. This code handles search, filtering, and dropdown opening/closing.

## New Library Approach

The library extracts this functionality into a standalone, reusable component that you can use in any project.

## Migration Steps

### Step 1: Load Library Files in WordPress

In your plugin's main PHP file or form rendering, enqueue the library assets:

```php
// In your Form.php or Plugin.php

public function enqueue_assets() {
    // Enqueue the SearchableSelect library CSS
    wp_enqueue_style(
        'searchable-select',
        plugin_dir_url(__FILE__) . 'lib/searchable-select/src/searchable-select.css',
        [],
        '1.0.0'
    );

    // Enqueue the SearchableSelect library JS
    wp_enqueue_script(
        'searchable-select',
        plugin_dir_url(__FILE__) . 'lib/searchable-select/src/searchable-select.js',
        [],
        '1.0.0',
        true
    );
}
```

### Step 2: Initialize on Select Elements

**Before (Your Current Approach - Inline):**
```javascript
// Large amount of code mixed with form logic
function initSearchableSelects() {
    var selects = document.querySelectorAll('select');
    // ... 500+ lines of custom code
}
```

**After (Using Library):**
```javascript
// Much cleaner! All select logic is now in the library
SearchableSelect.initAll('select', {
    primaryColor: '#1a9b8e'
});
```

### Step 3: Remove Your Inline Code (Optional)

Once you're confident the library works, you can remove the large `initSearchableSelects()` function from your form.js and replace it with:

```javascript
// This is all you need!
SearchableSelect.initAll('select');
```

## Complete WordPress Integration Example

```php
<?php
// In your Plugin.php or Admin.php class

class Plugin {
    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
    }

    public function enqueue_frontend_assets() {
        // Enqueue SearchableSelect library
        wp_enqueue_style(
            'searchable-select-lib',
            plugin_dir_url(__FILE__) . '../lib/searchable-select/src/searchable-select.css',
            [],
            '1.0.0'
        );

        wp_enqueue_script(
            'searchable-select-lib',
            plugin_dir_url(__FILE__) . '../lib/searchable-select/src/searchable-select.js',
            [],
            '1.0.0',
            true
        );

        // Your plugin's main form script
        wp_enqueue_script(
            'dsf-form',
            plugin_dir_url(__FILE__) . '../assets/js/admin.js',
            ['searchable-select-lib'],
            '1.0.0',
            true
        );
    }
}
```

Then in your form.js:

```javascript
// Much simpler initialization!
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all selects with the library
    SearchableSelect.initAll('select', {
        primaryColor: '#1a9b8e',
        borderRadius: '6px',
        searchPlaceholder: 'Search...',
        onSelect: function(value, text) {
            // Your custom logic here
            updateServicePricing(value);
        }
    });
});
```

## Customization in Your Plugin

### Per-Service Select Customization

```javascript
// Different colors for different select purposes
const serviceSelect = new SearchableSelect('#dsf-service-select', {
    primaryColor: '#1a9b8e',
    fontSize: '14px'
});

const locationSelect = new SearchableSelect('#dsf-location', {
    primaryColor: '#0277bd',
    fontSize: '14px'
});

const portalSelect = new SearchableSelect('#dsf-portal', {
    primaryColor: '#00897b',
    fontSize: '14px'
});
```

### Using CSS Variables for Theming

In your form.css:

```css
/* Default theme for all SearchableSelect instances */
:root {
    --ss-primary-color: #1a9b8e;
    --ss-border-radius: 6px;
    --ss-text-color: #2c3e50;
}

/* Service-specific override */
#dsf-service-select {
    --ss-primary-color: #c62828;
}
```

## Your Plugin Can Continue Working Unchanged

The beauty of this approach is that **your existing Form.php and form.js do NOT need to change**. 

You can:
1. ✅ Keep all your form logic exactly as-is
2. ✅ Keep your inline searchable select code
3. ✅ Gradually migrate to the library when ready
4. ✅ Use the library in other projects immediately

## Example: Progressive Enhancement

**Current State (Your Plugin):**
- Form works with inline searchable select code

**Step 1 - Add Library:**
- Load library CSS/JS
- Keep existing code working

**Step 2 - Hybrid Approach (Optional):**
- Use library for simple cases
- Keep custom code for complex cases

**Step 3 - Full Migration (Optional):**
- Replace all inline code with library
- Remove 500+ lines of code
- Maintain same functionality

## Testing Checklist

After implementing the library:

- [ ] Dropdowns open/close correctly
- [ ] Search functionality works
- [ ] Keyboard navigation works (arrow keys, enter)
- [ ] Colors match your design
- [ ] Mobile responsive
- [ ] No JavaScript console errors
- [ ] Form submission still works

## Common Integration Points

### In Form Submission

```javascript
const serviceSelect = new SearchableSelect('#dsf-service-select');

// ... later in form submit handler
const selectedService = serviceSelect.getValue();
const selectedText = serviceSelect.getText();
```

### With Form Validation

```javascript
const select = new SearchableSelect('#required-field', {
    onSelect: function(value, text) {
        if (value === '') {
            // Validation failed
            return false;
        }
        // Valid selection
    }
});
```

### Dynamic Option Updates

```javascript
const select = new SearchableSelect('#products');

// Update options from API
async function loadProducts() {
    const response = await fetch('/api/products');
    const data = await response.json();
    
    select.updateOptions(
        data.map(p => ({ value: p.id, text: p.name }))
    );
}
```

## Version Control

When you're ready to publish the library separately or use in other projects:

1. The library is now in `lib/searchable-select/`
2. It's completely independent from your plugin
3. You can extract it to its own repository
4. You can publish to npm if needed
5. Other projects can just copy the `lib/searchable-select/` folder

## Questions?

Refer to the main [README.md](../README.md) and [USAGE.md](./USAGE.md) for complete documentation and examples.

