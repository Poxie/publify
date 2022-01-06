const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// Getting access token
const getAccessToken = () => {
    if(typeof window === 'undefined') return;
    return window.localStorage.accessToken;
}

// Accessing the root query property name from GraphQL
const getRootQuery = (query: string) => {
    const rootQuery = query.split('{')[1].split('(')[0].trim();
    return rootQuery;
}

// GraphQL get request
export const get = async (query: string) => {
    // Adding query {} here so we dont have to add it when we use the function
    query = `query {
        ${query}
    }`
    return await fetch(`${API_ENDPOINT}`, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        }
    }).then(res => res.json()).then(response => {
        if(response.errors) {
            console.error(response.errors);
        }
        // Returning the data without graphql's 'data' and root query properties
        // Essentially returning pure data
        return response.data[getRootQuery(query)]
    });
}