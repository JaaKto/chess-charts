import React, { FC, useRef, useState, useEffect } from "react"
import { select, Selection } from "d3-selection"
import { scaleLinear, scaleBand } from "d3-scale"
import { max } from "d3-array"
import { useD3 } from "common/hooks"

const data = [
  { name: "foo", number: 9000 },
  { name: "foo2", number: 2345 },
  { name: "foo3", number: 5555 },
  { name: "foo4", number: 1111 },
  { name: "foo5", number: 6666 },
  { name: "foo6", number: 8888 },
]

export const RatingHistoryChart: FC = (): JSX.Element => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null)

  const maxValue = max(data, (d) => d.number)
  const y = scaleLinear().domain([0, maxValue!]).range([0, 500])

  const x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, 800])
    .padding(0.05)

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current))
    } else {
      selection
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", x.bandwidth)
        // .attr("x", (d) => x(d.name)!)
        .attr("x", (d) => {
          const xValue = x(d.name)
          if (xValue) {
            return xValue
          }
          return null
        })
        .attr("fill", "orange")
        .attr("height", (d) => y(d.number))
    }
  }, [selection])

  return (
    <div>
      <svg ref={svgRef} width={800} height={500} />
    </div>
  )
}
