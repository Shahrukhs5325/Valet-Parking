import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { palette } from '../../theme/themes';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';


type Props = {};


const CommingSoonScreen: React.FC<Props> = () => {
  const userContext = React.useContext(UserContext);

  return (
    <>
      <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />
        <View style={styles.compView}>
          <View style={{ gap: 8, marginVertical: 6, alignItems: 'center' }}>
            <Text style={styles.txtTitleSty}>Comming Soon</Text>
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
    //   backgroundColor: palette.primaryDark
  },
  compView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    textAlign: 'center'
  },


});


