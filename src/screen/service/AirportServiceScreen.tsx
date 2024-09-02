import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { palette } from '../../theme/themes';
import { Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import HeaderTitle from '../../components/header/HeaderTitle';
import SelectDropdown from 'react-native-select-dropdown';
import DownIcon from '../../assets/svg/Sort Down.svg';
import PrimaryButton from '../../components/button/PrimaryButton';

type Props = {
  route?: any;
};

const ImageHeight = Math.round(Dimensions.get('window').width * 9 / 9);
const WIDTH = Dimensions.get('window').width;

const ArrQty = [{ title: "Meet & Greet" }, { title: "Airport Transfer" }, { title: "Both" }];

const MeetAssist = [
  "Fast track through security, check-in & immigration.",
  "Porter assistance with checked luggage.",
  "Priority boarding."
];

const AIRPORTTRANSFER = [
  "Area coverage: from / to Dubai International Airport Terminals- 1, 2, 3 (only).",
  "Distance coverage: Maximum 45 kms from/to Dubai International Airport Terminals- 1, 2, 3 (only).",
  "Car type: Lexus ES350 or similar.",
  " No. of passengers: maximum 2 persons/vehicle.",
  "No. of luggage: 2 pieces/vehicle.",
  "Waiting period: At arrival: 1 hour | At departure: 15 mins."
];

const AirportServiceScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const { city } = route.params;

  const [isEnable, setIsEnable] = React.useState(false);
  const [selectQty, setSelectQty] = React.useState(null);



  React.useEffect(() => {

  }, []);



  return (
    <>
      <View style={{
        flex: 1,
        backgroundColor: userContext?.customTheme?.primaryDark,
      }}>
        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />
        <ScrollView showsVerticalScrollIndicator={false}>

          <HeaderTitle title={'Airport Services'} />


          <View style={{ margin: 16, gap: 16 }}>
            <Text style={styles.txtHeadingSty}>City: {city?.cityName}</Text>


            <View style={{ marginVertical: 16 }}>
              <Text style={styles.txtSty}>Dubai international airport - Termiinals 1, 2 & 3</Text>
            </View>

            <View style={styles.compView}>

              <View style={{ gap: 14 }}>
                <Text style={styles.txtTitleSty}>Select service</Text>
                <SelectDropdown
                  data={ArrQty}
                  onSelect={(selectedItem, index) => {
                    setSelectQty(selectedItem);
                  }}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.txtSty}>
                          {(selectQty && selectQty?.title) ||
                            'Select service'}
                        </Text>
                        <DownIcon />
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && {
                            backgroundColor: palette.txtBlack,
                          }),
                        }}>
                        <Text style={styles.txtSty}>{item.title}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>
              <View style={{ gap: 12 }}>
                <Text style={styles.txtTitleSty}>Service description</Text>

                <View>
                  <Text style={styles.txtSubTitleSty}>Meet & Assist:</Text>
                  {MeetAssist.map((item, index) => (
                    <View key={index} style={styles.termContainer}>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.termText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View>
                  <Text style={styles.txtSubTitleSty}>Airport Transfer:</Text>
                  {AIRPORTTRANSFER.map((item, index) => (
                    <View key={index} style={styles.termContainer}>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.termText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
        <View style={{ padding: 16 }}>
          <PrimaryButton
            onPress={() =>
              navigation.navigate('AirportTransferScreen', { city: city, })}
            buttonColor={'light'}>
            Select
          </PrimaryButton>
        </View>
      </View>
    </>
  );
};

export default AirportServiceScreen;

const styles = StyleSheet.create({
  compView: {
    padding: 10,
    gap: 30,
  },
  txtHeadingSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 20,
    fontWeight: '400',
    color: palette.txtWhite,
    textAlign: 'center',
    paddingVertical: 6,
    backgroundColor: palette.bgCard,
    borderWidth: 1,
    borderColor: palette.txtGray,
    borderRadius: 5,
    width: WIDTH - 120,
    alignSelf: 'center',
  },
  txtSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 12,
    fontWeight: '400',
    color: palette.txtWhite,
    alignSelf: 'center',
  },
  txtTitleSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 16,
    fontWeight: '400',
    color: palette.txtWhite,
    textTransform: 'uppercase',
    letterSpacing: 3,
    paddingBottom: 2
  },
  txtSubTitleSty: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 13,
    fontWeight: '400',
    color: palette.txtWhite,
    marginLeft: 20
  },
  countText: {
    textAlign: 'center',
    justifyContent: 'center',
    //width: 120,
    backgroundColor: 'rgba(199, 149, 75, 1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    fontSize: 18,
  },
  termContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dot: {
    fontSize: 16,
    lineHeight: 20,
    marginHorizontal: 10,
    color: palette.txtWhite,
  },
  termText: {
    fontFamily: FONT.Able.regular,
    fontSize: 12,
    lineHeight: 20,
    color: palette.txtWhite,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontWeight: '400',
    fontSize: 12,
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
  },
  dropdownButtonStyle: {
    width: "100%",
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#6A6868',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.txtGray,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 14,
  },
  dropdownMenuStyle: {
    backgroundColor: palette.bgCard,
    borderRadius: 8,
  },



});


