import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const getApolloClient = () => {
    const baseUrl = process.env.SPACEX_URL
    return new ApolloClient({
        uri: `${baseUrl}/graphql/`,
        cache: new InMemoryCache
    })
}

export const getLaunchesPast = async() => {
    const client = getApolloClient()
    const {data} = await client.query({
        query: gql`
            query Query {
                launchesPast {
                    mission_name
                    launch_date_local
                    launch_site {
                        site_name_long
                    }
                    links {
                        video_link
                        mission_patch_small
                    }
                    id
                }
            }
        `
    })
    return data
}

export const getMissionsResult = async() => {
    const client = getApolloClient()
    const {data} = await client.query({
        query: gql`
            query Query {
                missionsResult {
                    result {
                        totalCount
                    }
                }
            }
        `
    })
    return data
}






