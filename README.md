* This app displays a train schedule, and the user can add new train lines to the list. 

* app.js
 - First section is Firebase database
    - this creates the link between the JS file and the Firebase database
 - 2nd section: Moment API
    - this is a time API used for users to add trains to the schedule and automatically predict when the next train will arrive
 - 3rd section is the submit button
    - an onclick method is created to send user input to Firebase
    - Database then sends information back to user, displaying the data in the appropriate sections