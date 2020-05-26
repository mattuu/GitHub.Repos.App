import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const token = process.env.GITHUB_AUTH_TOKEN;
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
            test: 'blah!'
        }
    }
});

const apolloClient = new ApolloClient({
    // Provide required constructor fields
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),

    // Provide some optional constructor fields
    name: 'react-web-client',
    version: '1.3',
    queryDeduplication: false,
    credentials: 'include',
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    }
});

// const x = new ApolloClient({
//     request: (operation) => {
//         // const token = localStorage.getItem('token')
//         operation.setContext({
//             uri: GITHUB_BASE_URL,
//             headers: {
//                 Authorization: 'Bearer 575267bf8a0aca306a90f34b157a6c16a4cc2703',
//                 'Test': 'blah!'
//             },
//             credentials: 'include',
//             fetchOptions: {
//                 mode: 'no-cors',
//             }
//         })
//     }
//     // headers: { authorization: 'bearer 575267bf8a0aca306a90f34b157a6c16a4cc2703' },
//     // headers: {
//     //     authorization: 'Bearer 575267bf8a0aca306a90f34b157a6c16a4cc2703',
//     // },
//     // fetchOptions: {
//     //     mode: 'no-cors',
//     // }
// });

export default apolloClient;