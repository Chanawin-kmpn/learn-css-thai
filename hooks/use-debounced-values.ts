import React from "react";

function useDebouncedValues<T extends Record<string, unknown>>(
  debounceBy: number,
  props: T,
): T {
  const [propsInState, setPropsInState] = React.useState<T>(props);

  // Copy the props into a ref, so that I can access it in the effect without adding it as a dependency.
  const propsRef = React.useRef<T>(props);
  propsRef.current = props;

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPropsInState(propsRef.current);
    }, debounceBy);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // We want to re-run the effect whenever one of the props changes. React doesn't like it, since it can't statically verify it, but I believe it should be fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceBy, ...Object.values(props)]);

  return propsInState;
}

export default useDebouncedValues;
