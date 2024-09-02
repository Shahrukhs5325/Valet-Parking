import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ValetIcon from '../../../assets/svg/history/ValetParking.svg';
import CoffeeIcon from '../../../assets/svg/history/Coffee.svg';
import SpaIcon from '../../../assets/svg/history/Spa.svg';
import GolfIcon from '../../../assets/svg/history/GolfHole.svg';
import HeaderTitle from '../../../components/header/HeaderTitle';
import { palette } from '../../../theme/themes';
import { FONT } from '../../../theme/fonts';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../../context/user/UserContext';
import { getTransactionByCustomerId } from '../../../api/common/commonApi';
import { ActivityIndicator } from 'react-native-paper';

const historyData = [
  // {
  //   id: '1',
  //   service: 'Valet Services',
  //   location: 'Location: Billionaire',
  //   status: 'USED',
  //   type: 'timer',
  //   icon: <ValetIcon width={30} height={30} />,
  // },
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
    location: 'Meet & Assist + Airport transfer',
    status: 'Confirmed',
    type: 'Confirmed',
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

const History = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();  // useIsFocused as shown   


  const userContext = React.useContext(UserContext);
  const [transList, setTransList] = React.useState([]);

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['Transaction_List', userContext?.user],
    queryFn: () => getTransactionByCustomerId(userContext?.user),
  });


  React.useEffect(() => {
    focus && refetch();
  }, [focus]);


  React.useEffect(() => {
    const arr: any[] = []
    if (data?.data?.data?.cTransaction?.length > 0) {
      data?.data?.data?.cTransaction?.map((item) => {
        item["service"] = 'Valet Services',
          item["location"] = 'Billionaire',
          item["status"] = '01:59',
          arr.push(item)
      })
      setTransList(arr);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={[styles.containerLoader, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
        <ActivityIndicator size="small" color="#FFF" />
      </View>
    )
  }


  const detailsScreenHandler = (item) => {
    if (item.templateName) {
      navigation.navigate("TransactionDetailsScreen", { coupon: item })
    } else {
      navigation.navigate("TransactionDetailsScreen", { coupon: item })
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => detailsScreenHandler(item)}>
      <LinearGradient
        colors={['rgba(22, 22, 22, 1)', 'rgba(40, 40, 40, 1)']} // 'rgba(124, 124, 124, 1)'
        style={[
          styles.historyItem,
          { borderWidth: 1.2, borderColor: palette.borderClr },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>

        <View style={styles.historyIcon}>{item.service === "Valet Services" ? <ValetIcon width={30} height={30} /> : item.icon}</View>
        <View style={styles.historyDetails}>
          <Text style={styles.historyService}>{item.service}</Text>
          <Text style={styles.historyLocation}>{item.location}</Text>
        </View>
        <View style={styles.historyStatus}>
          <Text style={styles.statusExpired}>{item.status}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={palette.primaryDark}
      />
      <HeaderTitle title={'History'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[...transList, ...historyData]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContents}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    paddingHorizontal: 16,
    gap: 20,
  },
  listContents: {
    gap: 8,
    paddingBottom: 50,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
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
    gap: 2
  },
  historyService: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 14,
  },
  historyLocation: {
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    fontSize: 10,
    fontWeight: '400'
  },
  historyStatus: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.txtWhite,
    height: 62,
    width: 62,
    borderRadius: 50,
  },
  statusExpired: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default History;
