import { API } from 'aws-amplify';
import {createRegistrations, updateRegistrations} from "../graphql/mutations";
import { ListAllRegistrations } from "../graphql/querries";

//list Registrations querry
export const listRegistrations = async() => await API.graphql({
    query: ListAllRegistrations,
    authMode: "AWS_IAM"
});

//create Registration querry
export const createRegistrationsApi = async(bookingId, emailId, name, phoneNumber) => await API.graphql({
    query: createRegistrations,
    authMode: "AWS_IAM",
    variables: {bookingId: bookingId, emailId: emailId, name: name, phoneNumber: phoneNumber}
});


//Update registration
export const updateRegistrationApi = async(bookingId, checkIn, name) => await API.graphql({
    query: updateRegistrations,
    authMode: "AWS_IAM",
    variables: {bookingId: bookingId, checkIn: checkIn, name: name}
});
