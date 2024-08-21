import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/StackNavigation';



function App(): React.JSX.Element {


  return (
    <>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
