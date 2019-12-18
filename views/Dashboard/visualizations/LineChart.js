import React, { Component } from 'react'
import { Svg, G, Line, Rect, Path } from 'react-native-svg'
import * as d3 from 'd3'

const width = 650;
const height = 400;
const margin = {top: 20, right: 5, bottom: 20, left: 35};
const red = '#eb6a5b';
const blue = '#52b6ca';

export default class LineChart extends Component {
  state = {
    freqData: null, // svg path command for all the high temps
    // d3 helpers
    xScale: d3.scaleTime().range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
    lineGenerator: d3.line(),
  };
  xAxis = d3.axisBottom().scale(this.state.xScale)
    .tickFormat(d3.timeFormat('%a %d'));
  yAxis = d3.axisLeft().scale(this.state.yScale)
    .tickFormat(d => `${d}`);

static getDerivedStateFromProps(nextProps, prevState) {
  if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
  const {data} = nextProps;
  const {xScale, yScale, lineGenerator} = prevState;

  // data has changed, so recalculate scale domains
  const timeDomain = d3.extent(data, d => d.date);
  const tempMax = d3.max(data, d => d.value);
  xScale.domain(timeDomain);
  yScale.domain([0, tempMax]);

  // calculate line
  lineGenerator.x(d => xScale(d.date));
  lineGenerator.y(d => yScale(d.value));
  const freqData = lineGenerator(data);

  return {freqData};
}

componentDidUpdate() {
  d3.select(this.refs.xAxis).call(this.xAxis);
  d3.select(this.refs.yAxis).call(this.yAxis);
}

  render() {

    return (
      <Svg width={width} height={height}>
      <Path d={this.state.freqData} fill='none' stroke={red} strokeWidth='2' />
      <G>
        <G ref='xAxis' transform={`translate(0, ${height - margin.bottom})`} />
        <G ref='yAxis' transform={`translate(${margin.left}, 0)`} />
      </G>
      </Svg>
    )
  }
}
