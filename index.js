function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(function(emp) {
    return createEmployeeRecord(emp);
  });
}

function createTimeInEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}

function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.find(function(event) {
    return event.date === date;
  });

  let timeOut = this.timeOutEvents.find(function(event) {
    return event.date === date;
  });

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date);
  return hoursWorked * this.payPerHour;
}

// function allWagesFor() {
//   let dates = this.timeInEvents.map(function(event) {
//     return event.date;
//   });

//   let payable = dates.reduce(function(memo, date) {
//     return memo + wagesEarnedOnDate.call(this, date);
//   }.bind(this), 0);

//   return payable;
//}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function(employee) {
    return employee.firstName === firstName;
  });
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(memo, record) {
    return memo + allWagesFor.call(record);
  }, 0);
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

