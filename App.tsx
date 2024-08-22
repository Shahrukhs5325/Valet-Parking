import React from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/StackNavigation';
import { Amplify } from 'aws-amplify';
import { UserContextProvider } from './src/context/user/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = {
  identityPoolId: '',
  region: "me-south-1",
  userPoolId: "me-south-1_tgPFCMubu",
  userPoolWebClientId: "5t0eu88492vcoqv3en8tgcoqh6"
}


function App(): React.JSX.Element {
  Amplify.configure(config);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        retryDelay: 2000,
      }
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {},
});

export default App;
