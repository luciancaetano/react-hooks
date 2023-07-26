# useProgressiveTimeout Hook

The `useProgressiveTimeout` hook is a custom React hook that provides a way to start and stop a progressive timeout that progresses over time. It allows you to define callbacks to be called on each step of the timeout and when the timeout is complete.

## Usage

```tsx
import React, { useState } from 'react';
import useProgressiveTimeout, { IUseProgressiveTimeoutConfig } from './useProgressiveTimeout';

// Assuming you have imported the useProgressiveTimeout hook here...

const MyComponent: React.FC = () => {
  // State to keep track of the timeout progress
  const [progress, setProgress] = useState<number>(0);

  // Configuration for useProgressiveTimeout
  const config: IUseProgressiveTimeoutConfig = {
    onStep: (percent: number) => {
      setProgress(percent);
    },
    perStep: 100, // Time interval between each step (in milliseconds)
  };

  // Use the useProgressiveTimeout hook
  const [startTimeout, stopTimeout, inProgress] = useProgressiveTimeout(config);

  // ... Rest of your component logic ...

  return (
    <div>
      <button onClick={() => startTimeout(5000)}>Start Timeout</button>
      <button onClick={stopTimeout}>Stop Timeout</button>
      <p>Progress: {progress}%</p>
      {inProgress && <p>Timeout in progress...</p>}
    </div>
  );
};
```

## API

### `useProgressiveTimeout(config: IUseProgressiveTimeoutConfig): [(ms: number) => void, () => void, boolean]`

#### Parameters

- `config: IUseProgressiveTimeoutConfig`: An object containing configuration options for the progressive timeout:

  - `onStep?: (percent: number) => void`: An optional callback function that will be called on each step of the timeout. It receives the percentage of completion as its argument (a number between 0 and 100).

  - `perStep?: number`: The number of milliseconds between each step of the timeout. It determines how frequently the `onStep` callback is called. The default value is `100` milliseconds.

#### Returns

- A tuple containing three elements:

  - `startTimeout: (ms: number) => void`: A function that can be used to start the progressive timeout. It takes the duration of the timeout in milliseconds as its argument.

  - `stopTimeout: () => void`: A function that can be used to stop the progressive timeout if it is currently in progress.

  - `inProgress: boolean`: A boolean value indicating whether the progressive timeout is currently in progress (`true`) or not (`false`).
