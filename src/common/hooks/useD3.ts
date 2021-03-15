import React, { RefObject, useRef } from "react"
import { select, Selection } from "d3-selection"

export const useD3 = (
  renderChartFn: (
    node: Selection<SVGSVGElement | null, unknown, null, undefined>,
  ) => void,
  dependencies: unknown[],
): RefObject<SVGSVGElement> => {
  const ref = useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    renderChartFn(select(ref.current))
    return
  }, dependencies)
  return ref
}
