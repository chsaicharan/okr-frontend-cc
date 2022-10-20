import moment from 'moment';
export const DateFormatter = {
    setFormatter: function(date) {
      var offset = new Date().getTimezoneOffset();
      var d = new Date(date * 1000);
      var utc = d.getTime() + d.getTimezoneOffset() * 60000;
      var nd = new Date(utc + 3600000 * -(offset / 60));
      var datee = nd.getDate();
      const month = nd.toLocaleDateString("default", { month: "long" });
      var year = nd.getFullYear();
      var finaldate = month.substring(0, 3) + " " + datee + ", " + year;
      return finaldate;
    },
  
    timeFormatter: function(date) {
      var hours = new Date(date * 1000).getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      var minutes = new Date(date).getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      var time = hours + ":" + minutes;
      return time;
    },
  
    getQuarter(startDate) {
      let date = new Date(startDate * 1000);
      console.log(date, "date", startDate);
      let month = date.getMonth() + 1;
      var year = date.getFullYear();
      var quarter = Math.ceil(month / 3);
      // let quarter = moment(startDate).quarter();
      let Quarter;
      Quarter = "Quarter " + quarter + ", " + year;
      console.log(quarter,'Quarter');
      return Quarter;
    }
  };
  export default DateFormatter;
  