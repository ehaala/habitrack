import React, { Component } from 'react';
import Main from './Main';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';
import './RadarChart.css';

class ResponsiveRadarChart extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  render() {

    const datesArr = [
    {date: "01/01/2017"},
    {date: "01/02/2017"},
    {date: "01/03/2017"},
    {date: "01/23/2017"},
    {date: "01/05/2017"},
    {date: "01/24/2017"},
    {date: "01/07/2017"},
    {date: "01/26/2017"},
    {date: "01/09/2017"},
    {date: "01/10/2017"},
    {date: "01/21/2017"},
    {date: "01/12/2017"},
    {date: "01/13/2017"},
    {date: "02/16/2017"},
    {date: "03/05/2017"},
    {date: "04/14/2017"},
    {date: "05/25/2017"},
    {date: "06/08/2017"},
    {date: "07/09/2017"},
    {date: "08/23/2017"},
    {date: "09/11/2017"},
    {date: "10/12/2017"},
    {date: "11/13/2017"}
    ];

    const dayArr = datesArr.map((day) => {
      var eachDay = day.date
      var d = new Date(eachDay);
      var n = d.getDay(d);
      return n;
    })

    const dayObj = {};
    for(var i = 0; i < dayArr.length; i++){
      if(dayObj[dayArr[i]]){
        dayObj[dayArr[i]]+=1;
      }else{
        dayObj[dayArr[i]] = 1;
      }
    }

    const data = [
    { weekday: 'Sunday', A: dayObj[0], fullMark: 21 },
    { weekday: 'Monday', A: dayObj[1], fullMark: 21 },
    { weekday: 'Tuesday', A: dayObj[2], fullMark: 21 },
    { weekday: 'Wednesday', A: dayObj[3], fullMark: 21 },
    { weekday: 'Thursday', A: dayObj[4], fullMark: 21 },
    { weekday: 'Friday', A: dayObj[5], fullMark: 21 },
    { weekday: 'Saturday', A: dayObj[6], fullMark: 21 },
    ];

    return(
        <ResponsiveContainer width='100%' height={550}>
          <RadarChart className='radar-chart' margin={{top: 20, right: 40, bottom: 20, left: 40}} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="weekday" />
            <PolarRadiusAxis/>
            <Radar name="Habit" dataKey="A" stroke="#FFA726" fill="#FFB74D" fillOpacity={0.5}/>
          </RadarChart>
        </ResponsiveContainer>

    )
  }
}

export default ResponsiveRadarChart;
