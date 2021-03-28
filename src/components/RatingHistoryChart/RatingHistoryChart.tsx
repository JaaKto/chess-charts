import React, { FC, useRef, useState, useEffect } from "react"
import { select, Selection } from "d3-selection"
import { scaleLinear, scaleTime } from "d3-scale"
import { max, min } from "d3-array"
import { axisLeft, axisBottom } from "d3-axis"
import { useD3 } from "common/hooks"
import { fakeData } from "./fake-data"
import * as d3 from "d3"

/* eslint-disable */
interface PlayerStats {
  name: string
  points: Points[]
}

type Points = number[]

const parsePoints = ([y, m, d, p]: Points) => {
  return { date: new Date(`${y}-${m}-${d}`), points: p }
}

const parseData = (data: PlayerStats[]) => {
  const { name, points } = data[0]
  return { name: name, points: points.map((item) => parsePoints(item)) }
}

const dimentions = {
  width: 1000,
  height: 450,
  chartWidth: 900,
  chartHeight: 400,
  marginLeft: 100,
}

export const RatingHistoryChart: FC = (): JSX.Element => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null)
  const [data, setData] = useState(parseData(fakeData).points)

  const maxValue = max(data, (d) => d.points)
  const minValue = min(data, (d) => d.points)

  const y = scaleLinear()
    .domain([minValue! - 75, maxValue! + 75])
    .range([dimentions.chartHeight, 0])

  const x = scaleTime()
    .domain(data.map((d) => d.date))
    .domain([data[0].date, data[data.length - 1].date])
    .rangeRound([0, dimentions.chartWidth])

  const yAxis = axisLeft(y)
    .ticks(3)
    .tickFormat((d) => `${d} units`)
  const xAxis = axisBottom(x)

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

  const points: [number, number][] = data.map((d) => [
    x(new Date(d.date)),
    y(d.points),
  ])

  const points1: [number, number][] = data.map((d) => [
    x(new Date(d.date)),
    dimentions.chartHeight,
  ])

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current))
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
        .attr("d", line(points1)!)
        .transition()
        .duration(750)
        .attr("d", line(points)!)

      selection
        .append("g")
        .append("path")
        .attr("id", "area")
        .style("fill", "#ffa5004d")
        .attr("transform", `translate(${dimentions.marginLeft}, 0)`)
        .attr("d", area(points1)!)
        .transition()
        .duration(750)
        .attr("d", area(points)!)
    }
  }, [selection, data])

  return (
    <div>
      <br></br>
      <svg
        ref={svgRef}
        width={dimentions.width}
        height={dimentions.height}
      ></svg>
    </div>
  )
}
