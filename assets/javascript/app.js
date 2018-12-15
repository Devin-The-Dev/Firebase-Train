// * Make sure that your app suits this basic spec:
//   * When adding trains, administrators should be able to submit the following:
//     * Train Name
//     * Destination 
//     * First Train Time -- in military time
//     * Frequency -- in minutes
//   * Code this app to calculate when the next train will arrive; this should be relative to the current time.
//   * Users from many different machines must be able to view same train times.
//   * Styling and theme are completely up to you. Get Creative!

//Firebase Database
var config = {
    apiKey: "AIzaSyCAEOQLqfveoVVGitiarFJCAwxH9NmqTxE",
    authDomain: "trainproject-4c54b.firebaseapp.com",
    databaseURL: "https://trainproject-4c54b.firebaseio.com",
    projectId: "trainproject-4c54b",
    storageBucket: "trainproject-4c54b.appspot.com",
    messagingSenderId: "127536845307"
};
firebase.initializeApp(config);
var dataRef = firebase.database();
var trainName = '';
var destination = '';
var firstTrainTime = 0;
var frequency = 0;

//Moment API
var tFrequencey = $('.frequency').val().trim();
var firstTime = $('.time-start').val().trim();
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
//Now display next train arrival and minutes away
$('.next-train').html(nextTrain.format('HH:mm'));
$('.minutes-away').html(tMinutesTillTrain);
//Sweet! Now lets add a new train to the list, using the "Add Train" section
//Site is not auto updating. Need to add a listener somewhere
//When Firebase is added, information for next train and minutes until next train are not visible on page

//Submit Button
$('#submit').on('click', function (event) {
    event.preventDefault();
    trainName = $('#add-train').val().trim();
    destination = $('#add-destination').val().trim();
    firstTrainTime = $('#add-time-start').val().trim();
    frequency = $('#add-frequency').val().trim();

    //Now push the code to the database
    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        nextTrain: nextTrain.format("HH:mm"),
        tMinutesTillTrain: tMinutesTillTrain
    });
    console.log(nextTrain);
    console.log(tMinutesTillTrain);
});

dataRef.ref().orderByChild('dateAdded').on('child_added', function (childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);
    $('#schedule').append("<tr><td class = 'train'>" +
        childSnapshot.val().trainName +
        "</td><td class = 'destination'>" + childSnapshot.val().destination +
        "</td><td class = 'time-start'>" + childSnapshot.val().firstTrainTime +
        "</td><td class = 'frequency'>" + childSnapshot.val().frequency +
        "</td><td class = 'next-train'>" + childSnapshot.val().nextTrain +
        "</td><td class = 'minutes-away'>" + childSnapshot.val().tMinutesTillTrain +
        "</td></tr>");
    //Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});