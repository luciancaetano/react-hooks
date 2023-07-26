# useMediaQuery Hook

The `useMediaQuery` hook is a custom React hook that allows you to detect changes in a media query and provides a boolean value indicating whether the media query matches the current screen conditions.

## Usage

```tsx
import React from 'react';
import useMediaQuery from './useMediaQuery';

// Assuming you have imported the useMediaQuery hook here...

const MyComponent: React.FC = () => {
  // Define your media query
  const mediaQuery = '(max-width: 768px)';

  // Use the useMediaQuery hook
  const isMobile = useMediaQuery(mediaQuery);

  // ... Rest of your component logic ...

  return (
    <div>
      {isMobile ? <p>Mobile view</p> : <p>Desktop view</p>}
    </div>
  );
};
```

## API

### `useMediaQuery(query: string): boolean`

#### Parameters

- `query: string`: A media query string that you want to monitor. It should follow the standard CSS media query syntax (e.g., '(max-width: 768px)', '(min-width: 1024px)', etc.).

#### Returns

- A boolean value indicating whether the specified media query matches the current screen conditions.
