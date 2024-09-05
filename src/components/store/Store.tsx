import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet, View
} from 'react-native';
import { getNearByStores } from '../../api/common/commonApi';
import { calculateDistance } from '../../constant/constFunction';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import StoreItem from './StoreItem';

 


interface Props {
  location?: any;
}

const Store: React.FC<Props> = ({ location }) => {
  const userContext = React.useContext(UserContext);
  const [storeList, setStoreList] = React.useState<any[]>([]);

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
    <View style={styles.container}>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          data={storeList.sort((a, b) => a.distance - b.distance)}
          renderItem={({ item }) =>
            <StoreItem
              item={item}
            />}
          style={styles.list}
          contentContainerStyle={styles.listContents}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={10}
          updateCellsBatchingPeriod={50}
        />
      </View>
    </View>
  ) : null;
};

export default Store;

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
  list: {},
  listContents: {
    gap: 16,
  },

});
