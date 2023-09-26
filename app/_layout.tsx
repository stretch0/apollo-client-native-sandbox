import { ApolloProvider, ApolloClient, gql, useQuery, useLazyQuery } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

const TEST_QUERY = gql`
  query Launches($find: LaunchFind) {
    launches(find: $find) {
      id
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {

  return (
    <ApolloProvider client={client}>
      <RootLayoutNav />
    </ApolloProvider>
  );
}

function RootLayoutNav() {

  const [login, { 
    loading, 
    error,
    data
  }] = useLazyQuery(TEST_QUERY);

  const onLogin = () => {
    login({
      variables: {
        "find": {
          "block": 31394872987498
        }
      }
    });
  };

  // const {
  //   data,
  //   loading,
  //   error
  // } = useQuery(TEST_QUERY, {
  //   variables: {
  //     "find": {
  //       "block": 31394872987498
  //     }
  //   }
  // })

  console.log("data:", data)
  console.log("error:", error)
  console.log("loading:", loading)

  return (
    <SafeAreaView>
      <Button onPress={() => onLogin()} title="login" />
    </SafeAreaView>
  );
}
