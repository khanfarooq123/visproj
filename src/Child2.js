import React, { Component } from "react";
import * as d3 from "d3";
class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setState({ x_scale: 10 });
  }
  componentDidUpdate() {
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var data = this.props.data2;
    
    var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X axis
    var x_data = data.map(d => d.category);
    var x_scale = d3
      .scaleBand()
      .domain(x_data)
      .range([0, w])
      .padding(0.2);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));
    // Add Y axis
    var y_data = data.map(d => d.x);
    var y_scale = d3
      .scaleBand()
      .domain(y_data)
      .range([h, 0]);

    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left},0)`)

    container
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x_scale(d.category);
      })
      .attr("y", function (d) {
        return y_scale(d.x);
      })
      .attr("width", x_scale.bandwidth())
      .attr("height", function (d) {
        return h - y_scale(d.x);
      })
      .attr("fill", "#69b3a2");
  }
  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}
export default Child2;