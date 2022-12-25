import { API } from "aws-amplify";
import { createRegistrations, updateRegistrations } from "../graphql/mutations";
import { ListAllRegistrations } from "../graphql/querries";

//list Registrations querry
export const listRegistrations = async () =>
  await API.graphql({
    query: ListAllRegistrations,
    authMode: "API_KEY",
  });

//create Registration querry
export const createRegistrationsApi = async (
  bookingId,
  emailId,
  name,
  phoneNumber
) =>
  await API.graphql({
    query: createRegistrations,
    authMode: "API_KEY",
    variables: {
      bookingId: bookingId,
      emailId: emailId,
      name: name,
      phoneNumber: phoneNumber,
    },
  });

//Update registration
export const updateRegistrationApi = async (bookingId, checkIn, name) =>
  await API.graphql({
    query: updateRegistrations,
    authMode: "API_KEY",
    variables: { bookingId: bookingId, checkIn: checkIn, name: name },
  });
