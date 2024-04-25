import React, { Component } from "react";
import * as d3 from "d3";
import AAPL from './data/AAPL.csv';
import AMZN from './data/AMZN.csv';
import GOOGL from './data/GOOGL.csv';
import META from './data/META.csv';
import MSFT from './data/MSFT.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_data: {}, selected_company: "Google"
    };
  }

  componentDidMount() {
    Promise.all([d3.csv(AAPL), d3.csv(AMZN), d3.csv(GOOGL), d3.csv(META), d3.csv(MSFT)]).then(resolved_data => {
      var temp_data={Apple: resolved_data[0], Amazon: resolved_data[1], Google: resolved_data[2], Meta: resolved_data[3], Microsoft: resolved_data[4]}
      this.setState({all_data: temp_data});
    }).catch(error => console.error('Error loading the data: ', error));
  }
  componentDidUpdate(){
    var data=this.state.all_data[this.state.selected_company].map(item=>{
      var parseDate=d3.timeParse("%Y-%m-%d")
      item.Date=parseDate(item.Date)
      item.Open=parseFloat(item.Open)
      item.Close=parseFloat(item.Close)
      return item

    })

    var x_axis_data=data.map(item=>item.Date)
    var open_data=data.map(item=>item.Open)
    var close_data=data.map(item=>item.Close)
    var open_close_combined=[...open_data,...close_data]

    var x_scale=d3.scaleTime().domain(d3.extent(x_axis_data)).range([0,400])
    var y_scale=d3.scaleLinear().domain(d3.extent(open_close_combined)).range([300,0])
    var colormap = {"open": "green", "close": "red"}
    
    d3.select("#demo2").selectAll('.lines_g').data([data,data]).join('g').attr('class', "lines_g").attr("add_line", function(area_chart_data,i){
    if(i===0){
      const line=d3.line().x(d=>x_scale(d.Date)).y(d=>y_scale(d.Open))
      d3.select(this).selectAll('.line').data([area_chart_data]).join('path').attr("class","line").attr("d",line).attr("fill",'none').attr('stroke','green').attr('stroke-width',1)
    }
    else{
      const line=d3.line().x(d=>x_scale(d.Date)).y(d=>y_scale(d.Close))
      d3.select(this).selectAll('.line').data([area_chart_data]).join('path').attr("class","line").attr("d",line).attr("fill",'none').attr('stroke','red').attr('stroke-width',1)
    }
      

    })

    d3.select("#demo2").selectAll(".legend_g").data([0]).join("g").attr("class", "legend_g").attr("transform", "translate(420,20)")
    .selectAll(".item").data(["open","close"]).join("g").attr("class","item").attr('transform', (d,i)=>`translate(0,${i*25})`)
    .attr('add_items', function(dd){
      d3.select(this).selectAll("rect").data([0]).join("rect").attr("x",0).attr("width",10).attr("height", 10).attr("fill",d=>colormap[dd])
      d3.select(this).selectAll("text").data([0]).join("text").attr("x",20).attr("y",10).text(d=>dd)
    })
  }

  render() {
    return (
      <div>
        <select onChange={(event)=>this.setState({selected_company:event.target.value})}>  
          <option> Amazon</option>
          <option> Apple</option>    
        </select>
        <svg id="demo2" width="500" height="300"></svg>
      </div>
      
    );
  }
}

export default App;