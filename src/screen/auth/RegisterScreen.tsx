import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, } from 'react-native-paper';
import { palette } from '../../theme/themes';
import PrimaryButton from '../../components/button/PrimaryButton';
import TextInputCust from '../../components/textInput/TextInput';

type Props = {};



const RegisterScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  // const userContext = React.useContext(UserContext);
  const [text, setText] = React.useState("");



  React.useEffect(() => {

  }, []);





  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor={palette.bgGray}
          />

          <Text variant="titleLarge" style={styles.txtSty}>Register</Text>
          <View style={{ gap: 0 }}>
            <TextInputCust
              placeholder='First Name'
              value={text}
              onChangeText={(text: any) => setText(text)}
            />
            <TextInputCust
              placeholder='Last name'
              value={text}
              onChangeText={(text: any) => setText(text)}
            />
            <TextInputCust
              placeholder='Last name'
              value={text}
              onChangeText={(text: any) => setText(text)}
            />
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
            <TextInputCust
              placeholder='Activation code'
              value={text}
              onChangeText={(text: any) => setText(text)}
            />
            <TextInputCust
              placeholder='OTP'
              value={text}
              onChangeText={(text: any) => setText(text)}
            />
          </View>
          <View style={{ gap: 8, marginTop: 10 }}>
            <Text variant="titleLarge"  >Credit card details</Text>

            <View style={{ gap: 4 }}>
              <Text variant="titleSmall"  >Enter last 6 digits</Text>
              <TextInputCust
                placeholder='First Name'
                value={text}
                onChangeText={(text: any) => setText(text)}
              />
            </View>
            <View style={{ gap: 4 }}>
              <Text variant="titleSmall"  >Enter first 4 digits</Text>
              <TextInputCust
                placeholder='First Name'
                value={text}
                onChangeText={(text: any) => setText(text)}
              />
            </View>

          </View>
          <View style={{ marginTop: 20 }}>
            <PrimaryButton onPress={() => navigation.replace("LoginScreen")}>Register</PrimaryButton>
          </View>
          <View style={styles.containerRegister}>
            <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
              <Text variant="labelLarge" style={{ textAlign: 'center', color: palette.txtGray }}>Already have an account? <Text variant="labelLarge">Sign in</Text></Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //  alignItems: "center",
    margin: 15,
    gap: 15,
    paddingBottom: 24
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


