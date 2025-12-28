// See: https://github.com/radix-ui/primitives/pull/2229
"use client"

import * as React from "react"

// This is a simplified version of the use-id package (https://github.com/radix-ui/primitives/tree/main/packages/react/id)
// We need to use a client-safe `useId` to ensure that the id is stable during the component's lifecycle.
// `React.useId()` is not stable between server and client renders.

let count = 0;
const useId =
  (React as any)['useId'.toString()] ||
  function useId() {
    const [id, setId] = React.useState<string | undefined>();
    React.useEffect(() => {
      if (!id) {
        setId('radix-' + count++);
      }
    }, [id]);
    return id;
  };

export function useStableId(providedId?: string) {
  const id = useId();
  return providedId || id;
}
