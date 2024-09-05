import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions, Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import LocationIcon from '../../assets/svg/Location.svg';
import Arrow from '../../assets/svg/arrow_forward.svg';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';

const WIDTH = Math.round(Dimensions.get('window').width);

interface StoreItem {
  storeName: string;
  address: string;
}

interface Props {
  item: any;
}

const StoreItem: React.FC<Props> = ({ item }) => {
  const userContext = React.useContext(UserContext);
  const navigation = useNavigation();

  return (
    <>
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
            <Text style={styles.txtServiceSty}>Valet Services</Text>
          </View>
          <View style={styles.cardContaint}>
            <Image
              source={require('../../assets/bili-img.png')}
              style={styles.img}
            />
            <View style={{ width: '100%', gap: 2, paddingLeft: 10 }}>
              <Text style={styles.txtTitleSty}>{item.storeName}</Text>
              <Text style={styles.txtSty} numberOfLines={2}>
                {item.address}
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
                    navigation.navigate('ValetDetailsScreen', { store: item })
                  }>
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
    </>
  )
};

export default StoreItem;

const styles = StyleSheet.create({
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
    height: 21,
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
