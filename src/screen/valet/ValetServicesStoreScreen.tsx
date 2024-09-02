import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getStoresByCityName } from '../../api/common/commonApi';
import Arrow from '../../assets/svg/arrow_forward.svg';
import Header from '../../components/header/Header';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';
import { FONT } from '../../theme/fonts';
import HeaderTitle from '../../components/header/HeaderTitle';
import LocationIcon from '../../assets/svg/Location.svg';
import { calculateDistance, openAddressOnMap } from '../../constant/constFunction';

type Props = {
  route?: any;
};

const WIDTH = Math.round(Dimensions.get('window').width);


const ValetServicesStoreScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { city } = route.params;

  const userContext = React.useContext(UserContext);
  const [storeList, setStoreList] = React.useState([]);

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['store_list_by_city', userContext?.user, city],
    queryFn: () => getStoresByCityName(userContext?.user, city?.cityName),
  });


  // React.useEffect(() => {
  //   setStoreList(data?.data?.data);
  // }, [data?.data?.data]);

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

  if (isLoading) {
    return (
      <View style={[styles.container, { flex: 1, backgroundColor: userContext?.customTheme?.primaryDark }]}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: userContext?.customTheme?.primaryDark, gap: 20 }}>
      <HeaderTitle title={"Valet Services"} />
      <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />

        <View style={{ gap: 24, }}>
          <Text style={styles.txtTitleSty}>City: {city.cityName}</Text>

          <ImageBackground
            source={require('../../assets/longb.png')}
            style={styles.background}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              // data={storeList}
              data={storeList.sort((a, b) => a.distance - b.distance)}
              renderItem={({ item }) =>
                <View style={styles.card}>
                  <View style={{ gap: 4, width: "82%" }}>
                    <Text style={styles.txtSty} numberOfLines={1}>{item?.storeName}</Text>
                    <TouchableOpacity onPress={() => openAddressOnMap(item?.latitude, item?.longitude, item?.templateName)}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <LocationIcon />
                        <Text style={styles.kmTxt}>{item?.distance} Km away</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate("ValetDetailsScreen", { store: item })}>
                    <View style={styles.viewTirdArrBtn}>
                      <View style={styles.viewSecArrBtn}>
                        <View style={styles.viewFristArrBtn}>
                          <Arrow width={10} height={11} />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              style={styles.list}
              contentContainerStyle={styles.listContents}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              windowSize={10}
              updateCellsBatchingPeriod={50}
              ListEmptyComponent={<>
                <Text style={styles.emtTxt}>Data Not Found</Text>
              </>}
            />
          </ImageBackground>

        </View>
      </View>
    </View>
  );
};

export default ValetServicesStoreScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: palette.primaryDark
  },
  txtTitleSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 22,
    fontWeight: '400',
    color: palette.txtWhite,
    textAlign: 'center',
    paddingVertical: 8,
    backgroundColor: palette.bgCard,
    borderWidth: 1,
    borderColor: palette.txtGray,
    borderRadius: 5,
    width: WIDTH - 120,
    alignSelf: 'center'
  },
  listContents: {
    gap: 16,

  },
  background: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 100,
    resizeMode: 'cover',
    borderRadius: 25, // Added borderRadius
    overflow: 'hidden',
    // height: 600,
    padding: 5,
  },
  list: {
    margin: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: palette.bgCard,
    width: '100%',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: palette.txtGray,
  },
  txtSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
    fontWeight: '400',
    color: palette.txtWhite,
  },
  emtTxt: {
    color: palette.txtWhite,
    textAlign: 'center',
    paddingVertical: 30
  },
  viewFristArrBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    backgroundColor: palette.txtWhite,
    padding: 6,
    width: 24, height: 24
  },
  viewSecArrBtn: {
    alignItems: 'center',
    borderRadius: 90,
    backgroundColor: "#D9D9D9",
    padding: 6,
  },
  viewTirdArrBtn: {
    alignItems: 'center',
    borderRadius: 90,
    backgroundColor: "#D9D9D91A",
    padding: 5,
    marginVertical: 7
  },
  kmTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    lineHeight: 12.7
  },



});


