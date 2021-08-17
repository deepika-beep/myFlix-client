 React App (myFlix)

 Objective:

Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database).This React SPA represents the frontend of a MERN stack application. The backend is hosted using "Heroku", and all the data is hosted on MongoDB Atlas.

User Stories:

● As a user, I want to be able to access information on movies, directors, and genres so
that I can learn more about movies I’ve watched or am interested in.

Feature:

A user must create an account to log in and use the app.

The form validation will guide you to introduce only accepted data in all of the forms.

Once logged in, the main page will display a list of 10 movie cards with an input at the very top of the cards. 

The movies can be filtered based on the title and the list will update as the user type.
There are separate components diplaying data about each individual movie, director and genre.

The user has the option to add or remove a movie to a list of favorite movies. The button for add/remove a movie will update its text accordingly, similar to a like/dislike button.

The list of favorite movies is accessible in the Profile component

In the Profile component, the user has the option to delete his account or update his credentials.

Get the app running:

To start the app run in the terminal 'npm start'.

This app uses Parcel and Babel for bundling and transpiling.

Dependencies:

"dependencies": {
    "axios": "^0.21.1",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-bootstrap": "^1.6.1",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "redux": "^4.1.0",
    "redux-devtools-extension": "^2.13.9"
    }

"devDependencies": {
    "@babel/core": "^7.14.3",
    "@babel/plugin-proposal-class-properties": "^7.13.0",
    "@babel/preset-env": "^7.14.4",
    "@babel/preset-react": "^7.13.13",
    "parcel-bundler": "^1.12.5",
    "sass": "^1.34.0"
    }

