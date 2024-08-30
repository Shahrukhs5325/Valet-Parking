import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Dimensions } from 'react-native';
import HeaderTitle from '../../components/header/HeaderTitle';
import ValetIcon from '../../assets/svg/history/ValetParking.svg';
import LeisIcon from '../../assets/svg/privilege/Joystick.svg';
import PldayIcon from '../../assets/svg/privilege/Layers.svg';
import Fandb from '../../assets/svg/privilege/Popcorn.svg';
import EntIcon from '../../assets/svg/privilege/Food.svg';
import AirPort from '../../assets/svg/privilege/Airport.svg';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const PrivilegeScreen = () => {
  const data = [
    {
      id: '1',
      service: 'Valet Services',
      count: '100 Hrs',
      icon: <ValetIcon width={44} height={44} />,
    },
    {
      id: '2',
      service: 'Airport Services',
      count: '12 Packages',
      icon: <AirPort width={44} height={44} />,
    },
    {
      id: '3',
      service: 'Leisure',
      count: '100 Vouchers',
      icon: <LeisIcon width={44} height={44} />,
    },
    {
      id: '4',
      service: 'F&B',
      count: '50 Vouchers',
      icon: <EntIcon width={44} height={44} />,
    },
    {
      id: '5',
      service: 'Entertainment',
      count: '70 Vouchers',
      icon: <Fandb width={44} height={44} />,
    },
    {
      id: '6',
      service: 'Plan your Day',
      count: '20 Packages',
      icon: <PldayIcon width={44} height={44} />,
    },
  ];

  // Use a key that changes when the number of columns changes
  const columnCount = 2; // Change this value to change the number of columns

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['rgba(124, 124, 124, 1)', 'rgba(22, 22, 22, 1)', 'rgba(40, 40, 40, 1)']}
        style={[
          styles.mainItem,
          { borderWidth: 1, borderColor: 'rgba(241, 241, 241, 0.3)' },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.historyIcon}>{item.icon}</View>
        <View style={styles.textContainer}>
          <Text style={styles.serviceText}>{item.service.toUpperCase()}</Text>
          <Text style={styles.countText}>{item.count}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderTitle title={'Profile'} />
      <View>
        <Text style={styles.text}>
          HI, AHMED
        </Text>
        <Text style={styles.text}>
          YOU HAVE THE FOOLING PRIVILEGE
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
  },
  background: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 60,
    resizeMode: 'cover',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 5,
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  text: {
    padding: 10,
  },
  cardContainer: {
    flex: 1,
    margin: 6,
  },
  mainItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    height: 120,
    justifyContent: 'center',
  },
  historyIcon: {
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 12,
    color: '#fff',
  },
  countText: {
    fontSize: 10,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
    width: 120,
    backgroundColor: 'rgba(199, 149, 75, 1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default PrivilegeScreen;
