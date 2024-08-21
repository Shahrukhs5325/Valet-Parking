import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import ZapsIcon from '../../asset/svg/logo.svg'
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';
import TextInputCust from '../../components/textInput/TextInput';

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
          backgroundColor={palette.primaryLight}
        />
        <Text variant="titleLarge" style={styles.txtSty}>Login</Text>
        <View style={{ gap: 0 }}>
          <TextInputCust
            placeholder='Email'
            value={text}
            onChangeText={(text: any) => setText(text)}
          />
          <TextInputCust
            placeholder='Password'
            value={text}
            onChangeText={(text: any) => setText(text)}
            secureTextEntry={false}
            right={<TextInputCust.Icon icon="eye" />}
          />
        </View>
        <View style={{ gap: 30, marginTop: 20 }}>
          <PrimaryButton onPress={() => navigation.replace("RegisterScreen")}>Sign In</PrimaryButton>
          <Text variant="labelLarge" style={{ textAlign: 'center' }}>Forgot password?</Text>
        </View>
        <View style={styles.containerRegister}>
          <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
            <Text variant="labelLarge" style={{ textAlign: 'center', color: palette.txtGray }}>Don’t have an account? <Text variant="labelLarge">Sign up</Text></Text>
          </TouchableOpacity>
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


