import {ApolloServer} from "apollo-server-micro"
import {typeDefs} from "../../src/graphql/squema"
import {resolvers} from "../../src/graphql/resolvers"
import Cors from 'micro-cors'

const cors = Cors()
const apolloServer = new ApolloServer({typeDefs, resolvers})
const startServer = apolloServer.start()

/**
 * apollo server 3, use apollo studio hosted at studio.apollographql.com, cors need to access withou cors issue.
 */
export default cors(async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }
    await startServer
    await apolloServer.createHandler({
        path: '/api/graphql'
    })(req, res)
})

/**
 * disable body parse because we are using graphql
 */
export const config = {
    api: {
        bodyParser: false
    }
}