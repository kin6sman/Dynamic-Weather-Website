const currDate = document.getElementById("date");
let weatherCondition = document.getElementById("weathercon");

const tempStatus = "Clouds";

const getCurrentDay = () => {
  const weekday = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const d = new Date();
  

  let currTime = new Date();
  let day = weekday[d.getDay()];
  return day;
};
getCurrentDay();

const getCurrentTime = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // let name = month[now.getMonth()];

  var now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();
  
  let hr = now.getHours();
  let min = now.getMinutes();

  let period = 'AM';

  if(hr > 11){
    period = 'PM';

    if(hr > 12) hr -= 12;
  }
  if(min < 10){
     min = '0' + min;
  }
  return `${month} ${date} | ${hr}:${min} ${period}`
};
currDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();
