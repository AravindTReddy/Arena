import React, {Component} from 'react';
import LineChart from './visualizations/LineChart';

export default class Frequency extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
    }
  }
  fetchData = async()=>{
    console.log('function in componentDidMount');
      this.interval = setInterval(() => {
      const data = [];
      fetch('http://ec2-18-204-252-137.compute-1.amazonaws.com:3009/normal/10002')
      .then(response => response.json())
          .then(d => {
            d.forEach(function (vol) {
              data.push({
                value: vol.frequency,
                date: new Date(vol.time),
              });
              });
            this.setState({
                data: data,
            });
          });
        }, 2000);
    }
componentDidMount(){
  this.fetchData();
}
render(){
  const data = this.state.data
  return (
  <LineChart data={data} title={"LineChart"}/>
  );
  }
};
