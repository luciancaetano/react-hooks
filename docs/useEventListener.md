# useEventListener Hook

The `useEventListener` hook is a custom React hook that allows you to conveniently add and remove event listeners to a specified target element or the global document and window objects. It abstracts away the complexity of adding and removing event listeners while handling the cleanup automatically.

## Usage

```tsx
import React from 'react';
import useEventListener from './useEventListener';

// Assuming you have imported the useEventListener hook here...

const MyComponent: React.FC = () => {
  // Define your event handler function
  const handleClick = (event: MouseEvent) => {
    console.log('Button clicked!', event);
  };

  // Use the useEventListener hook
  useEventListener(document, 'click', handleClick);

  return (
    <div>
      {/* Some JSX */}
    </div>
  );
};
```

## API

### `useEventListener(target: TargetType, event: string, handler?: (event: Event) => void, options?: OptionsType): VoidFunction`

The `useEventListener` hook provides multiple function signatures with different event types to cover events from `DocumentEventMap`, `WindowEventMap`, and `GlobalEventHandlersEventMap`.

#### Parameters

- `target: TargetType`: The target element or a function that returns the target element. It can be a DOM element, `null`, or a function returning a DOM element. If `null`, no event listener will be attached.

- `event: string`: The event type (e.g., 'click', 'keydown', 'mouseenter', etc.).

- `handler?: (event: Event) => void`: An optional event handler function to be called when the event is triggered. It receives the event object as its argument.

- `options?: OptionsType`: An optional parameter to specify additional options for the event listener. It can be a boolean or an object of type `AddEventListenerOptions` with properties like `capture`, `once`, and `passive`.

#### Returns

- A function (`VoidFunction`) that can be used to manually remove the event listener. When this function is called, the event listener attached using the `useEffect` cleanup mechanism will be removed.
