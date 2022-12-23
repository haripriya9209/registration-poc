import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Amplify } from "aws-amplify";

const root = ReactDOM.createRoot(document.getElementById("root"));

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",
    aws_appsync_apiKey: "da2-ifgqrfgf4vgxzhattjaidbekx4",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_gwyXds7ER",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    identityPoolId: "ap-southeast-1:527ce5e8-8152-495d-9e52-79d33fd669c9",
    userPoolWebClientId: "44ta1mflvasr44aupus4lmk390",
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
});

const myAppConfig = {
  // ...
  aws_appsync_graphqlEndpoint:
    "https://ybcv7fwozrdshcimb5inb43k4q.appsync-api.ap-southeast-1.amazonaws.com/graphql",
  aws_appsync_apiKey: "da2-ifgqrfgf4vgxzhattjaidbekx4",
  aws_appsync_region: "ap-southeast-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS", // You have configured Auth with Amazon Cognito User Pool ID and Web Client Id
  // ...
};
Amplify.configure(myAppConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
