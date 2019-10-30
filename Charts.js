import React, { Component } from 'react';
import chroma from 'chroma-js';
import * as d3 from 'd3';

const width = 650;
const height = 400;
const margin = {top:20, right:5, bottom:20, left:35};
const red = '#eb6a5b';
const blue = '#52b6ca';
const green = '#b6e86f';
const colors = chroma.scale([blue, green, red]);

class Chart extends Component {
  state = {
    highs: null,
    lows: null,
  };

xScale = d3.scaleTime().range([margin.left, width = margin.right]);
yScale = d3.scaleLinear().range([0, width/2]);

xAxis = d3.axisBottom().scale(this.xScale)
  .tickFormat(d3.timeFormat('%b'));
yAxis = d3.axisLeft().scale(this.yScale)
  .tickFormat(d => '${d}F');

componentWillReceiveProps(nextProps){
  const {data} = nextProps;
  if (!data) return;

  //update scaless

  const timeDomain = d3.extent(data, d => d.date);
  const tempMax = d3.max(data, d => d.high);
   this.xScale.domain(timeDomain);
   this.yScale.domain([0, tempMax]);

   this.lineGenerator.x(d => this.xScale(d.date));
   this.lineGenerator.y(d => this.yScale(d.high));

   const highs = this.lineGenerator(data);

     

}


  render(){
    return(
      <svg width={width} height={height}>
      </svg>
    );

  }
}

export default Chart;
