export const ListAllRegistrations = /* GraphQL */ `
    query MyQuery {
        listRegistrations(limit: 10) {
            registrationss {
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
    }
`;

