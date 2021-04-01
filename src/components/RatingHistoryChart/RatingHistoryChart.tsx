import React, { useRef, useState, useEffect } from "react"
import * as d3 from "d3"
import { Points, dimentions, minValue, maxValue } from "./utils"

//eslint-disable-next-line max-lines-per-function
export const RatingHistoryChart = ({
  points,
}: {
  points: Points[]
}): JSX.Element => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null)

  const y = d3
    .scaleLinear()
    .domain([minValue(points) - 75, maxValue(points) + 75])
    .range([dimentions.chartHeight, 0])

  const x = d3
    .scaleTime()
    .domain(points.map((d) => d.date))
    .domain([points[0].date, points[points.length - 1].date])
    .rangeRound([0, dimentions.chartWidth])

  const yAxis = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat((d) => `${d} points`)

  const xAxis = d3.axisBottom(x)

  const line = d3
    .line()
    .x((d) => d[0])
    .y((d) => d[1])
    .curve(d3.curveCatmullRom)

  const area = d3
    .area()
    .x((d) => d[0])
    .y0(dimentions.chartHeight)
    .y1((d) => d[1])
    .curve(d3.curveCatmullRom)

  const initialPoints: [number, number][] = points.map((d: Points) => [
    x(new Date(d.date)),
    dimentions.chartHeight,
  ])

  const finalPoints: [number, number][] = points.map((d: Points) => [
    x(new Date(d.date)),
    y(d.points),
  ])

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current))
    } else {
      selection
        .append("g")
        .attr(
          "transform",
          `translate(${dimentions.marginLeft}, ${dimentions.chartHeight})`,
        )
        .call(xAxis)
      selection
        .append("g")
        .attr("transform", `translate(${dimentions.marginLeft}, 0)`)
        .call(yAxis)

      selection
        .append("g")
        .append("path")
        .attr("id", "line")
        .style("fill", "none")
        .style("stroke", "orange")
        .style("stroke-width", "2px")
        .attr("transform", `translate(${dimentions.marginLeft}, 0)`)
        .attr("d", line(initialPoints)!)
        .transition()
        .duration(750)
        .attr("d", line(finalPoints)!)
      selection
        .append("g")
        .append("path")
        .attr("id", "area")
        .style("fill", "#ffa5004d")
        .attr("transform", `translate(${dimentions.marginLeft}, 0)`)
        .attr("d", area(initialPoints)!)
        .transition()
        .duration(750)
        .attr("d", area(finalPoints)!)
    }
  }, [selection, points])

  return (
    <svg ref={svgRef} width={dimentions.width} height={dimentions.height}></svg>
  )
}
