import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, timeout: number): T => {
  // Save a local copy of `value` in this state which is local to our hook
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    // Set timeout to run after delay
    const handler = setTimeout(() => setState(value), timeout);

    return (): void => {
      // clear the setTimeout listener on unMount
      clearTimeout(handler);
    };
  }, [value, timeout]);

  return state;
};

export default useDebounce;
