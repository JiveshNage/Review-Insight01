// See: https://github.com/radix-ui/primitives/pull/2229
"use client"

import * as React from "react"

let count = 0
function genId() {
  return (count++).toString()
}

// We need to use `useMemo` to ensure that the id is stable during the component's lifecycle
export function useStableId(providedId?: string) {
  return React.useMemo(() => {
    if (providedId) {
      return providedId
    }
    // Why not use `React.useId()`?
    //
    // `React.useId()` is not stable between server and client.
    //
    // In our case, the rendered html needs to be the same to avoid hydration errors.
    //
    // `React.useId()` is not a good solution for this problem, as it's not designed to be stable across server and client renders.
    //
    // This is a simple and effective solution for our use case.
    return genId()
  }, [providedId])
}

    