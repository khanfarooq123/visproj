import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data1);
  }

  componentDidUpdate() {
    var data = this.props.data1;

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 30, left: 20 };
    var w = 500 - margin.left - margin.right;
    var h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    var x_data = data.map(d => d.x);
    var x_scale = d3
      .scaleLinear()
      .range([0, w])

    container.selectAll(".x_axis_g")
      .data(x_data)
      .join('g')
      .attr("class", 'x_axis_g')
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_data = data.map(d => d.y);
    const y_scale = d3.scaleLinear()
      .domain(y_data)
      .range([h, 0]);

    container.selectAll(".y_axis_g")
      .data(y_data)
      .join('g')
      .attr("class", 'x_axis_g')
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y_scale));

    container.selectAll('g')
      .data(data)
      .selectAll("dot")
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x_scale(d.x);})
        .attr("cy", function (d) { return y_scale(d.y);})
        .attr("r", 1.5)
        .style("fill", "#69b3a2")
  }

  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
