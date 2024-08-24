import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { palette } from '../../theme/themes';


type Props = {};


const CommingSoonScreen: React.FC<Props> = () => {

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />
        <View style={styles.compView}>
          <View style={{ gap: 8, marginVertical: 6, alignItems: 'center' }}>
            <Text variant="titleLarge" style={styles.txtTitleSty}>Comming Soon</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default CommingSoonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.primaryDark
  },
  compView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleSty: {
    fontWeight: '700',
    color: palette.primaryLight,
    textTransform: 'capitalize',
    textAlign: 'center'

  },


});


