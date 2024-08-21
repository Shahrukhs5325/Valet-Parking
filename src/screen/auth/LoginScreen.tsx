import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import ZapsIcon from '../../asset/svg/logo.svg'
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';

type Props = {};



const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  // const userContext = React.useContext(UserContext);
  const [text, setText] = React.useState("");



  React.useEffect(() => {

  }, []);





  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />
        <Text variant="titleLarge" style={styles.txtSty}>Login</Text>
        <View style={{ gap: 15 }}>
          <TextInput
            // label="Email"
            placeholder='Email'
            mode='outlined'
            value={text}
            onChangeText={text => setText(text)}
            style={{ borderWidth: 0 }}
          />
          <TextInput
            // label="Email"
            placeholder='Password'
            mode='outlined'
            value={text}
            onChangeText={text => setText(text)}
          />
        </View>
        <View style={{ gap: 30, marginTop: 20 }}>
          <PrimaryButton onPress={() => console.log()}>Sign In</PrimaryButton>
          <Text variant="labelLarge" style={{ textAlign: 'center' }}>Forgot password?</Text>
        </View>
        <View style={styles.containerRegister}>
          <Text variant="labelLarge" style={{ textAlign: 'center', color: palette.txtGray }}>Don’t have an account? <Text variant="labelLarge">Sign up</Text></Text>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //  alignItems: "center",
    backgroundColor: palette.primaryLight,
    margin: 15,
    gap: 15
  },
  txtSty: {
    fontWeight: '800'
  },
  containerRegister: {
    position: 'absolute',
    bottom: 0,
    // alignItems: "center",
    // textAlign: 'center',

  }

});


