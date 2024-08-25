import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getStoresByCityName } from '../../api/common/commonApi';
import Arrow from '../../asset/svg/arrow_forward.svg';
import Header from '../../components/header/Header';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';

type Props = {
  route?: any;
};

const WIDTH = Math.round(Dimensions.get('window').width);


const ValetServicesScreen: React.FC<Props> = ({ route }) => {
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


  React.useEffect(() => {
    setStoreList(data?.data?.data);
  }, [data?.data?.data]);




  return (
    <View style={{ flex: 1, backgroundColor: userContext?.customTheme?.primaryDark, gap: 50 }}>
      <Header navbar={true} />
      <View style={[styles.container, { backgroundColor: userContext?.customTheme?.primaryDark }]}>
        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />

        <View style={{ gap: 15, }}>
          <Text variant="titleLarge" style={styles.txtTitleSty}>Premium Valet Services Across {city.cityName}</Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={storeList}
            renderItem={({ item }) =>
              <View style={styles.card}>
                <Text variant="titleMedium" style={styles.txtSty}>{item?.storeName}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("ValetDetailsScreen", { store: item })}>
                  <View style={styles.arrowCard}>
                    <Arrow width={20} height={20} />
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
              <Text variant="bodyMedium" style={styles.emtTxt}>Data Not Found</Text>
            </>}
          />

        </View>
      </View>
    </View>
  );
};

export default ValetServicesScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: palette.primaryDark
  },
  txtTitleSty: {
    fontWeight: '600',
    color: palette.txtWhite,
    textTransform: 'uppercase',
    letterSpacing: 3,
    paddingBottom: 12
  },
  listContents: {
    gap: 16,

  },
  list: {

  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: palette.txtWhite,
    width: WIDTH - 40,
    height: 100,
    borderRadius: 17,
    gap: 16
    //   justifyContent: 'space-between'
  },
  txtSty: {
    fontWeight: '700',
    color: palette.txtBlack,
  },
  img: {
    borderRadius: 17,
    width: WIDTH / 4,
    height: WIDTH / 4
  },
  emtTxt: {
    color: palette.txtWhite,
    textAlign: 'center',
    paddingVertical: 30
  },
  arrowCard: {
    borderRadius: 90,
    backgroundColor: palette.txtWhite,
    padding: 6, borderWidth: 5,
    borderColor: palette.bgGray,
    height: 46,
    width: 46,
    alignItems: 'center',
    justifyContent: 'center'
  }



});


