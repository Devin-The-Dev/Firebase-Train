// * Make sure that your app suits this basic spec:
//   * When adding trains, administrators should be able to submit the following:
//     * Train Name
//     * Destination 
//     * First Train Time -- in military time
//     * Frequency -- in minutes
//   * Code this app to calculate when the next train will arrive; this should be relative to the current time.
//   * Users from many different machines must be able to view same train times.
//   * Styling and theme are completely up to you. Get Creative!

//Moment API
var tFrequencey = 15;
var firstTime = '5:00';
//First Time (Pushing back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, 'HH:mm').subtract(1, 'years');
console.log(firstTimeConverted);
//Current Time
var currentTime = moment();
console.log('CURRENT TIME: ' + moment(currentTime).format('HH:mm'));
//Time difference
var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
console.log('Difference in time: ' + diffTime);
//Time apart
var tRemainder = diffTime % tFrequencey;
console.log(tRemainder);
//Minutes Until Train
var tMinutesTillTrain = tFrequencey - tRemainder;
console.log('Minutes till Train: ' + tMinutesTillTrain);
//Next Train
var nextTrain = moment().add(tMinutesTillTrain, 'minutes');
console.log('Arrival Time: ' + moment(nextTrain).format('HH:mm'));