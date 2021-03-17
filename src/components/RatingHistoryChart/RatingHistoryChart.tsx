import React, { FC, useRef, useState, useEffect } from "react"
import { select, Selection } from "d3-selection"
import { scaleLinear, scaleBand } from "d3-scale"
import { max } from "d3-array"
import { axisLeft, axisBottom } from "d3-axis"
import "d3-transition"
import { easeElastic } from "d3-ease"
import { useD3 } from "common/hooks"

/* eslint-disable */

const initialData = [
  { name: "foo", number: 9000 },
  { name: "foo2", number: 2345 },
  { name: "foo3", number: 5555 },
  { name: "foo4", number: 1111 },
  { name: "foo5", number: 6666 },
  { name: "foo6", number: 8888 },
]

const dimentions = {
  width: 800,
  height: 600,
  chartWidth: 700,
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
  const [data, setData] = useState(initialData)

  const maxValue = max(data, (d) => d.number)
  let y = scaleLinear()
    .domain([0, maxValue!])
    .range([dimentions.chartHeight, 0])

  let x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dimentions.chartWidth])
    .padding(0.05)
    .paddingInner(0.2)

  const yAxis = axisLeft(y)
    .ticks(3)
    .tickFormat((d) => `${d} units`)
  const xAxis = axisBottom(x)

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
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("transform", `translate(${dimentions.marginLeft}, 0)`)
        .attr("fill", "orange")
        .attr("x", (d) => x(d.name)!)
        .attr("y", dimentions.chartHeight)
        .attr("width", x.bandwidth)
        .attr("height", 0)
        .transition()
        .duration(500)
        .delay((_, i) => i * 100)
        .ease(easeElastic)
        .attr("y", (d) => y(d.number))
        .attr("height", (d) => dimentions.chartHeight - y(d.number))
    }
  }, [selection])

  useEffect(() => {
    if (selection) {
      y = scaleLinear()
        .domain([0, maxValue!])
        .range([dimentions.chartHeight, 0])

      x = scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, dimentions.chartWidth])
        .padding(0.05)
        .paddingInner(0.2)

      const rects = selection.selectAll("rect").data(data)

      rects
        .exit()
        .transition()
        .duration(300)
        .attr("y", dimentions.height)
        .attr("height", dimentions.chartHeight)
        .remove()

      rects
        .transition()
        .duration(300)
        .attr("transform", `translate(${dimentions.marginLeft}, 0)`)
        .attr("x", (d) => x(d.name)!)
        .attr("y", (d) => y(d.number))
        .attr("width", x.bandwidth)
        .delay(100)
        .attr("height", (d) => dimentions.chartHeight - y(d.number))
        .attr("fill", "orange")

      rects
        .enter()
        .append("rect")
        .attr("transform", `translate(${dimentions.marginLeft}, 0)`)
        .attr("x", (d) => x(d.name)!)
        .attr("y", dimentions.chartHeight)
        .attr("width", x.bandwidth)
        .attr("height", 0)
        .attr("fill", "orange")
        .transition()
        .duration(500)
        .delay(250)
        .ease(easeElastic)
        .attr("y", (d) => y(d.number))
        .attr("height", (d) => dimentions.chartHeight - y(d.number))
    }
  }, [data])

  const addRandom = () => {
    const dataToBeAdded = {
      name: `${Math.random()}`,
      number: Math.floor(Math.random() * 7000) + 1000,
    }
    setData([...data, dataToBeAdded])
  }

  const removeLast = () => {
    if (data.length === 0) {
      return
    }
    const slicedData = data.slice(0, data.length - 1)
    setData(slicedData)
  }

  return (
    <div>
      <br></br>
      <svg
        ref={svgRef}
        width={dimentions.width}
        height={dimentions.height}
      ></svg>
      <button onClick={addRandom}>Add random</button>
      <button onClick={removeLast}>Remove last</button>
    </div>
  )
}
