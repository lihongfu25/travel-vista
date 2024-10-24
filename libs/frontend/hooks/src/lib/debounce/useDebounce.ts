import React from 'react';

export const useDebounce = (valueOrCallback: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(
    typeof valueOrCallback === 'function'
      ? () => valueOrCallback
      : valueOrCallback
  );
  const callbackRef = React.useRef(valueOrCallback);

  React.useEffect(() => {
    callbackRef.current = valueOrCallback;
  }, [valueOrCallback]);

  React.useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      const handler = setTimeout(() => {
        setDebouncedValue(() => callbackRef.current);
      }, delay);

      return () => clearTimeout(handler);
    } else {
      const handler = setTimeout(() => {
        setDebouncedValue(callbackRef.current);
      }, delay);

      return () => clearTimeout(handler);
    }
  }, [valueOrCallback, delay]);

  return debouncedValue;
};
