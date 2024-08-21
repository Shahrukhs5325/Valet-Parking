import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { palette } from '../../theme/themes';
import Header from '../../components/header/Header';
import TopBanner from '../../components/header/TopBanner';
import CustomRadialGradient from '../../components/RadialGradient/CustomRadialGradient';

type Props = {};



const HomeScreen: React.FC<Props> = () => {
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
 
        <TopBanner />
        {/* <Header /> */}

      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    //  alignItems: "center",
    //padding: 15,
    // gap: 15
  },
  txtSty: {
    fontWeight: '800'
  },
  
   
});


