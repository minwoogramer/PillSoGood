import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getAPIHost from './src/utils/GetApiHost'
const httpLink = new HttpLink({
  uri: `${getAPIHost()}/graphql`,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
export default client
