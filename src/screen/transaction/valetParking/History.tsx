import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
// import {ProgressCircle} from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import ValetIcon from '../../../assets/svg/history/ValetParking.svg';
import CoffeeIcon from '../../../assets/svg/history/Coffee.svg';
import SpaIcon from '../../../assets/svg/history/Spa.svg';
import GolfIcon from '../../../assets/svg/history/GolfHole.svg';
import HeaderTitle from '../../../components/header/HeaderTitle';
const History = () => {
  const historyData = [
    {
      id: '1',
      service: 'Valet Services',
      location: 'Location: Billionaire',
      status: '01:59',
      type: 'timer',
      icon: <ValetIcon width={30} height={30} />,
    },
    {
      id: '2',
      service: 'F&B',
      location: 'Cafe - Starbucks',
      status: 'USED',
      type: 'used',
      icon: <CoffeeIcon width={30} height={30} />,
    },
    {
      id: '3',
      service: 'Airport Services',
      location: 'Meet & Assist',
      status: 'EXPIRED',
      type: 'expired',
      icon: <GolfIcon width={30} height={30} />,
    },
    {
      id: '4',
      service: 'Leisure',
      location: 'Spa - Al Faisaliah Spa by ESPA',
      status: 'USED',
      type: 'used',
      icon: <SpaIcon width={30} height={30} />,
    },
  ];

  const renderItem = ({item}) => (
    <LinearGradient
      colors={['rgba(22, 22, 22, 1)', 'rgba(40, 40, 40, 1)']} // 'rgba(124, 124, 124, 1)'
      style={[
        styles.historyItem,
        {borderWidth: 1, borderColor: 'rgba(241, 241, 241, 0.3)'},
      ]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.historyIcon}>{item.icon}</View>
      <View style={styles.historyDetails}>
        <Text style={styles.historyService}>{item.service}</Text>
        <Text style={styles.historyLocation}>{item.location}</Text>
      </View>
      <View style={styles.historyStatus}>
        <Text style={styles.statusExpired}>{item.status}</Text>
        {/* <ProgressCircle
        progress={1}
        size={100}
        thickness={8}
        color="#00f"
        unfilledColor="#e0e0e0"
      /> */}
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <HeaderTitle title={'History'} />
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
    color: '#F5C518', // Gold color for the title
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    height: 89,
  },
  historyIcon: {
    marginRight: 15,
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'rgba(89, 89, 89, 1)',
  },
  historyDetails: {
    flexGrow: 1,
  },
  historyService: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
  },
  historyLocation: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)', // Lighter color for location text
  },
  historyStatus: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderStyle: 'solid',
    height: 59,
    width: 59,
    borderRadius: 50,
  },
  statusExpired: {
    backgroundColor: 'transparent', // Color for expired status
    padding: 2,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default History;
