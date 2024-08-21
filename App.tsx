import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import PrimaryButton from './src/components/button/PrimaryButton';



function App(): React.JSX.Element {


  return (
    <>
      <PaperProvider>

        <View style={{ margin: 10 }}>
          <PrimaryButton icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </PrimaryButton>
        </View>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
