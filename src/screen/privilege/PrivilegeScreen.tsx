import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Dimensions, TouchableOpacity } from 'react-native';
import HeaderTitle from '../../components/header/HeaderTitle';
import ValetIcon from '../../assets/svg/history/ValetParking.svg';
import LeisIcon from '../../assets/svg/privilege/Joystick.svg';
import PldayIcon from '../../assets/svg/privilege/Layers.svg';
import Fandb from '../../assets/svg/privilege/Popcorn.svg';
import EntIcon from '../../assets/svg/privilege/Food.svg';
import AirPort from '../../assets/svg/privilege/Airport.svg';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import { palette } from '../../theme/themes';
import { FONT } from '../../theme/fonts';
import { UserContext } from '../../context/user/UserContext';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;


const data = [
  {
    id: '1',
    name: 'Valet Services',
    key: "valet_service",
    count: '100 Hrs',
    icon: <ValetIcon width={40} height={40} />,
  },
  {
    id: '2',
    name: 'Airport Services',
    key: "airport_services",
    count: '12 Packages',
    icon: <AirPort width={40} height={40} />,
  },
  {
    id: '3',
    name: 'Leisure',
    key: "leisure",
    count: '100 Vouchers',
    icon: <LeisIcon width={40} height={40} />,
  },
  {
    id: '4',
    name: 'F&B',
    key: "f&b",
    count: '50 Vouchers',
    icon: <EntIcon width={40} height={40} />,
  },
  {
    id: '5',
    name: 'Entertainment',
    key: "entertainment",
    count: '70 Vouchers',
    icon: <Fandb width={40} height={40} />,
  },
  {
    id: '6',
    name: 'Plan your Day',
    key: "plan",
    count: '20 Packages',
    icon: <PldayIcon width={40} height={40} />,
  },
];


const PrivilegeScreen = () => {
  const navigation = useNavigation();

  const userContext = React.useContext(UserContext);
  const user = userContext.user;

  // Use a key that changes when the number of columns changes
  const columnCount = 2; // Change this value to change the number of columns

  const serviceScreenHandler = (item: any) => {
    if (item?.key === "valet_service") {
      navigation.navigate("ServiceScreen", { service: item })
    } else if (item?.key === "airport_services") {
      navigation.navigate("ServiceScreen", { service: item });
    } else if (item?.key === "Meet_Greet") {
      navigation.navigate("CommingSoonScreen");
    } else {
      navigation.navigate("CommingSoonScreen");
    }
  }


  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => serviceScreenHandler(item)}>
        <LinearGradient
          colors={['rgba(124, 124, 124, 1)', 'rgba(22, 22, 22, 1)', 'rgba(40, 40, 40, 1)']}
          style={[
            styles.mainItem,
            { borderWidth: 1, borderColor: palette.borderClr },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.historyIcon}>{item.icon}</View>
          <View style={styles.textContainer}>
            <Text style={styles.serviceText}>{item.name.toUpperCase()}</Text>
            <Text style={styles.countText}>{item.count}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <HeaderTitle title={'PRIVILEGE'} /> */}
      <View style={{ gap: 10 }}>
        <Text style={styles.txtTitleSty}>
          HI, {user?.customerName}
        </Text>
        <Text style={styles.text}>
          YOU HAVE THE FOLLOWING PRIVILEGE
        </Text>
      </View>
      <ImageBackground
        source={require('../../assets/privilege.png')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={columnCount}
            columnWrapperStyle={styles.columnWrapper}
            key={`${columnCount}`} // Key prop to force re-render when columnCount changes
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    paddingTop: 20
  },
  background: {
    flex: 1,
    marginBottom: 60,
    resizeMode: 'cover',
    borderRadius: 17,
    overflow: 'hidden',
    marginTop: 30,
  },
  overlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  txtTitleSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 20,
  },
  text: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    margin: 6,
  },
  mainItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 17,
    height: 120,
    justifyContent: 'center',
  },
  historyIcon: {
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
    gap: 4
  },
  serviceText: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 14,
  },
  countText: {
    textAlign: 'center',
    justifyContent: 'center',
    width: 120,
    backgroundColor: 'rgba(199, 149, 75, 1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 3,
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    fontSize: 14,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default PrivilegeScreen;
