import React, { useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BarcodeImage from '../../../assets/svg/barcode.svg'; // Add your barcode image
import ZapsIcon from '../../../assets/svg/zapsIcon.svg';
import { UserContext } from '../../../context/user/UserContext';
import { FONT } from '../../../theme/fonts';
import { palette } from '../../../theme/themes';
import HeaderTitle from '../../../components/header/HeaderTitle';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { openAddressOnMap } from '../../../constant/constFunction';
import CallIcon from '../../../assets/svg/call.svg';
import MapIcon from '../../../assets/svg/Waypoint Map.svg';

type Props = {
  route?: any;
};

const WIDTH = Dimensions.get('window').width;


const TransactionDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { coupon } = route.params;


  const userContext = React.useContext(UserContext);

  const [timeLeft, setTimeLeft] = React.useState(null);

  const startDate = moment(coupon.redeemStartDate, "DD-MM-YYYY HH:mm");
  const endDate = moment(coupon.redeemEndDate, "DD-MM-YYYY HH:mm");


  useEffect(() => {
    // Function to calculate the time left
    const calculateTimeLeft = () => {
      const now = moment();
      const difference = moment.duration(endDate.diff(now));

      if (difference.asMilliseconds() > 0) {
        setTimeLeft({
          hours: Math.floor(difference.asHours()),
          minutes: difference.minutes(),
        });
      } else {
        setTimeLeft(null); // Timer has ended
      }
    };

    // Initial calculation
    calculateTimeLeft();

    // Update the countdown every minute
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // 60,000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Check if the current time is before the redeemStartDate
  const isBeforeStart = moment().isBefore(startDate);

  console.log(isBeforeStart);
  console.log(coupon.redeemStartDate);
  console.log(coupon.redeemEndDate);



  return (
    <>
      <View style={styles.container}>
        <HeaderTitle title={'History'} />

        <View>
          {isBeforeStart ? (
            <Text style={styles.txtHeadingSty}>Active Booking</Text>
          ) : timeLeft ? (
            <Text style={styles.txtHeadingSty}>Active Booking</Text>
          ) : (
            <Text style={styles.txtHeadingSty}>Used</Text>
          )}
        </View>

        <ImageBackground
          source={require('../../../assets/profileBack.png')}
          style={styles.background}
        >
          <View style={styles.overlay}>
            {isBeforeStart ? (
              <View style={styles.viewCol}>
                <Text style={styles.txtCounter}>00:00</Text>
                <Text style={styles.txtStatus}>Wait</Text>
              </View>
            ) : timeLeft ? (
              <View style={styles.viewCol}>
                <Text style={styles.txtCounter}>{timeLeft.hours}:{timeLeft.minutes}</Text>
                <Text style={styles.txtStatus}>In Progress</Text>
              </View>
            ) : (
              <View style={styles.viewCol}>
                <Text style={styles.txtCounter}>00:00</Text>
                <Text style={styles.txtStatus}>Completed</Text>
              </View>
            )}

            {!!timeLeft ? <View style={styles.viewCol}>
              <View style={styles.viewCall}>
                <CallIcon />
                <Text style={styles.txtUtilSty}>Call</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => openAddressOnMap(coupon?.latitude, coupon?.longitude, coupon?.templateName)}>
                  <View style={styles.viewCall}>
                    <MapIcon />
                    <Text style={styles.txtUtilSty}>Direction</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View> : null}

          </View>
        </ImageBackground>

        <View style={[styles.gradientWrapper]}>
          <LinearGradient
            colors={['rgba(22, 22, 22, 1)', 'rgba(40, 40, 40, 1)']} // Gradient color
            style={styles.gradientContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View>
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Service</Text>
                <Text style={styles.itemValueText}>{coupon?.service}</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Booking id</Text>
                <Text style={styles.itemValueText}>1234567890</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Location</Text>
                <Text style={styles.itemValueText}>{coupon.templateName ? coupon.templateName : 'Billionaire'}</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Duration</Text>
                <Text style={styles.itemValueText}>{coupon.validityDuration ? coupon.validityDuration : 1} Hrs</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>date</Text>
                <Text style={styles.itemValueText}>{coupon.redeemStartDate ? moment(coupon.redeemStartDate, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY") : "02-09-2024"}</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Start</Text>
                <Text style={styles.itemValueText}>{coupon.redeemStartDate ? moment(coupon.redeemStartDate, "DD-MM-YYYY HH:mm").format("HH:mm a") : "11:00 AM"}</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>End</Text>
                <Text style={styles.itemValueText}>{coupon.redeemEndDate ? moment(coupon.redeemEndDate, "DD-MM-YYYY HH:mm").format("HH:mm a") : "01:00 PM"}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </>
  );
};

export default TransactionDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    gap: 16,
  },
  gradientWrapper: {
    // flex: 1,
    marginTop: 25,
    marginBottom: 12,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: palette.borderClr,
    overflow: 'hidden'
  },
  gradientContainer: {
    paddingHorizontal: 20,
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 50,
  },
  viewBorder: {
    borderBottomWidth: 0.8,
    borderBottomColor: palette.borderClr,
  },
  txtCounter: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 32,
    fontWeight: '400',
    color: palette.txtWhite,
    textAlign: 'center',
  },
  txtStatus: {
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.txtWhite,
    backgroundColor: "#C7954B",
    paddingVertical: 3,
    width: '100%',
    textAlign: 'center',
    borderRadius: 17
  },
  txtUtilSty: {
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.txtWhite,
    textAlign: 'center',
  },
  itemText: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.txtWhite,
    width: '30%',
  },
  itemValueText: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.txtWhite,
    width: '100%',
  },
  background: {
    // flex: 1,
    resizeMode: 'cover',
    borderRadius: 17,
    height: 124,
    marginTop: 25,
    overflow: 'hidden',
  },
  overlay: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 17,
    height: 124
  },
  viewCol: {
    alignSelf: 'center',
    // justifyContent: 'space-between',
    gap: 5,
    width: '30%'
  },
  viewCall: {
    width: WIDTH / 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: palette.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.txtGray,
    justifyContent: 'center',
    height: 44
  },
  icon: {
    alignSelf: 'auto',
  },
  profileInfo: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },


});