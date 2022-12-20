export const OnCreateUsers = /* GraphQL */ `
subscription MySubscription {
    onCreateRegistrations {
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