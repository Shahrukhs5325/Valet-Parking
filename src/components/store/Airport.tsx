import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { getNearByStores } from '../../api/common/commonApi';
import Arrow from '../../assets/svg/arrow_forward.svg';
import LocationIcon from '../../assets/svg/Location.svg';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';
import { useNavigation } from '@react-navigation/native';
import { FONT } from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { calculateDistance } from '../../constant/constFunction';
import PaginationDot from '../pagination/PaginationDot';

const WIDTH = Math.round(Dimensions.get('window').width);

interface StoreItem {
  storeName: string;
  address: string;
}

interface Props {
  location?: any;
}

const Airport: React.FC<Props> = ({ location }) => {
  const userContext = React.useContext(UserContext);
  const [storeList, setStoreList] = React.useState<StoreItem[]>([]);
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['Near_Store_List', userContext?.user],
    queryFn: () => getNearByStores(userContext?.user, location),
  });

  React.useEffect(() => {
    refetch();
  }, [location, refetch]);

  React.useEffect(() => {
    const arr: any[] = []
    if (data?.data?.data?.length > 0) {
      data?.data?.data.map((item) => {
        item["distance"] = calculateDistance(userContext, item);
        arr.push(item)
      })
      setStoreList(arr);
    }
  }, [data]);

  const renderItem = ({ item }: { item: StoreItem }) => (
    <LinearGradient
      colors={[
        'rgba(124, 124, 124, 1)',
        'rgba(22, 22, 22, 1)',
        'rgba(40, 40, 40, 1)',
      ]}
      style={[
        styles.mainItem,
        { borderWidth: 1, borderColor: palette.borderClr }]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <View style={[styles.card]}>
        <View style={{ paddingVertical: 14 }}>
          <Text style={styles.txtServiceSty}>Airport Services</Text>
        </View>
        <View style={styles.cardContaint}>
          <Image
            source={require('../../assets/airport-img.png')}
            style={styles.img}
          />
          <View style={{ width: '100%', gap: 2, paddingLeft: 10 }}>
            <Text style={styles.txtTitleSty}>Dubai</Text>

            <Text style={styles.txtSty} numberOfLines={1}>
              Silver bundle:
            </Text>
            <Text style={styles.txtSty} numberOfLines={1}>
              Meet & Assist + Airport transfer
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}>
                <LocationIcon />
                <Text style={styles.kmTxt}>{item?.distance} Km away</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AirportServiceScreen', { city: { "cityId": 1, "cityName": "Dubai" } })}
              >
                <View style={styles.viewTirdArrBtn}>
                  <View style={styles.viewSecArrBtn}>
                    <View style={styles.viewFristArrBtn}>
                      <Arrow width={10} height={11} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: userContext?.customTheme?.primaryDark },
        ]}>
        <ActivityIndicator size="small" color="#FFF" />
      </View>
    );
  }
  return storeList && storeList.length > 0 ? (
    <><View style={styles.container}>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          data={storeList.sort((a, b) => a.distance - b.distance)}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContents}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          updateCellsBatchingPeriod={50}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          snapToAlignment='center' />
      </View>
    </View>
    <PaginationDot data={storeList} scrollX={scrollX} index={4}/></>
  ) : null;
};

export default Airport;

const styles = StyleSheet.create({
  container: {},
  txtServiceSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
    backgroundColor: palette.primaryDark,
    paddingRight: 24,
    paddingLeft: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  txtTitleSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 24,
  },
  list: {},
  listContents: {
    gap: 16,
  },
  mainItem: {
    borderRadius: 17,
  },
  card: {
    width: WIDTH - 38,
    borderRadius: 17,
  },
  cardContaint: {
    flexDirection: 'row',
    alignContent: 'center',
    width: WIDTH - 116,
    paddingHorizontal: 10,
  },
  txtSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 10,
    // height: 21,
    flexWrap: 'wrap',
  },
  img: {
    borderRadius: 12,
    width: 82,
    height: 83,
  },
  kmTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    lineHeight: 12.7,
  },
  viewFristArrBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    backgroundColor: palette.txtWhite,
    padding: 6,
    width: 20,
    height: 20,
  },
  viewSecArrBtn: {
    alignItems: 'center',
    borderRadius: 90,
    backgroundColor: '#D9D9D9',
    padding: 5,
  },
  viewTirdArrBtn: {
    alignItems: 'center',
    borderRadius: 90,
    backgroundColor: '#D9D9D91A',
    padding: 5,
    marginVertical: 6,
  },
});
