import React, { useState } from 'react';
import useCallbackRef from './use-callback-ref';

/**
 * A hook that returns a stateful value, and a function to update it.
 */
export interface IUseControllableStateConfig<T> {
  /**
   * The value to use when the state is not controlled.
   */
  defaultValue?: T | (() => T);
  /**
   * A callback that is called when the state changes.
   */
  onChange?: (value: T) => void;
  /**
   * A function that determines whether or not the state should be updated.
   */
  shouldUpdate?: (prev: T, next: T) => boolean;
}

/**
 * A hook that returns a stateful value, and a function to update it.
 * @param valueProp The value to use when the state is controlled.
 * @param config The configuration for the state.
 * @returns A tuple containing the stateful value, a function to update it, and
 * a boolean indicating whether or not the state is controlled.
 */
function useControllableState<T>(valueProp: T | undefined, {
  defaultValue,
  onChange,
  shouldUpdate = (prev, next) => prev !== next,
}: IUseControllableStateConfig<T>) {
  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue as T);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledState;

  const setValue = useCallbackRef(
    (next: React.SetStateAction<T>) => {
      const setter = next as (prevState?: T) => T;
      const nextValue = typeof next === 'function' ? setter(value) : next;

      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }

      if (!isControlled) {
        setUncontrolledState(nextValue);
      }

      onChangeProp(nextValue);
    },
    [isControlled, onChangeProp, value, shouldUpdateProp],
  );

  return [value, setValue, isControlled] as [T, React.Dispatch<React.SetStateAction<T>>, boolean];
}

export default useControllableState;
