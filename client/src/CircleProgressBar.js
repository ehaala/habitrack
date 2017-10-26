import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';
import moment from 'moment';

(function() {
   var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    Date.prototype.getDayName = function() {
      return days[ this.getDay() ];
    };
})();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
     if(dd<10) {dd = '0'+dd}
     if(mm<10) {mm = '0'+mm}
     today = mm + '/' + dd + '/' + yyyy;
     var currentWeekNumber = moment(today, "MMDDYYYY").isoWeek();

     function getSum(total, num) {
         return total + num;
     }

class CircleProgressBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      weeklyGoal: this.props.weeklyGoal
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.weeklyGoal > this.state.weeklyGoal){
    axios.post('habit/weeklyGoal', {
      user: this.props.user,
      weeklyGoal: this.state.weeklyGoal,
      weekNumber: currentWeekNumber
    }).then(result => {
        let score = 0;
        let scoreArr = []
        for(let i=0; i< result.data.length; i++){
          if(result.data[i].difficulty === 'easy'){
            score =  10;
            scoreArr.push(score)
          }else if(result.data[i].difficulty === 'medium'){
            score =  20;
            scoreArr.push(score)
          }else if(result.data[i].difficulty === 'hard'){
            score =  30;
            scoreArr.push(score)
        }
        let newTotal = scoreArr.reduce(getSum);
        this.setState({
          completed: newTotal
        })
    }})
  }
}

  render() {

    return (
      <div>
        <p> Your weekly progress: </p>
        <CircularProgress
          mode="determinate"
          value={this.state.completed}
          size={80}
          thickness={5}
        />
      </div>
    );
  }
}

export default CircleProgressBar;
