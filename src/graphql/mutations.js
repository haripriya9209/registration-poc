export const createRegistrations = /* GraphQL */ `
mutation createRegistrations($bookingId: String!, $emailId: String, $name: String!, $phoneNumber: String!) {
    createRegistrations(newRegistration: 
        {bookingId: $bookingId, emailId: $emailId, name: $name, phoneNumber: $phoneNumber}) 
    {
        bookingId
        checkIn
        createdAt
        emailId
        id
        name
        phoneNumber
        updatedAt
    }
}
`;

export const updateRegistrations = /* GraphQL */ `
mutation MyMutation($bookingId: String!, $checkIn: Boolean, $name: String!) {
    updateRegistrations(bookingId: $bookingId, checkIn: $checkIn, name: $name) {
        checkIn
    }
}
`;