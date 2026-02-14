/**
 * SearchableSelect - TypeScript Definitions
 */

declare namespace SearchableSelect {
  interface Config {
    // Colors & Styling
    primaryColor?: string;
    primaryHoverColor?: string;
    borderColor?: string;
    textColor?: string;
    backgroundColor?: string;
    optionHoverBg?: string;
    optionSelectedBg?: string;
    scrollbarColor?: string;
    shadowColor?: string;
    borderRadius?: string;

    // UI Text
    searchPlaceholder?: string;
    noResultsText?: string;

    // Behavior
    maxHeight?: string;
    animationSpeed?: string;
    closeOnSelect?: boolean;
    searchMinLength?: number;

    // Callbacks
    onSelect?: (value: string, text: string) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onSearch?: (term: string) => void;
  }

  interface Option {
    value: string;
    text: string;
  }
}

declare class SearchableSelect {
  constructor(selector: string | HTMLSelectElement, config?: SearchableSelect.Config);

  // Instance Methods
  getValue(): string;
  getText(): string;
  setValue(value: string): void;
  clear(): void;
  enable(): void;
  disable(): void;
  destroy(): void;
  updateOptions(options: SearchableSelect.Option[]): void;
  on(event: 'change' | 'open' | 'close' | 'search', callback: Function): void;
  open(): void;
  close(): void;

  // Properties
  selectElement: HTMLSelectElement;
  config: SearchableSelect.Config;
  isOpen: boolean;
  wrapper: HTMLElement;
  trigger: HTMLButtonElement;
  dropdownWrapper: HTMLElement;
  searchInput: HTMLInputElement;
  optionsList: HTMLUListElement;
}

declare namespace SearchableSelect {
  // Static methods
  function initAll(selector: string, config?: Config): SearchableSelect[];
  function autoInit(config?: Config): SearchableSelect[];
}

// jQuery Plugin Support
interface jQuery {
  searchableSelect(config?: SearchableSelect.Config): SearchableSelect | SearchableSelect[];
}

export = SearchableSelect;
