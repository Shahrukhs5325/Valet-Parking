import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import CallIcon from '../../../assets/svg/call-white.svg';
import Header from '../../../components/header/Header';
import { utcDateConvoter } from '../../../constant/constFunction';
import { UserContext } from '../../../context/user/UserContext';
import { palette } from '../../../theme/themes';
import moment from 'moment';
import { FONT } from '../../../theme/fonts';
import PrimaryButton from '../../../components/button/PrimaryButton';

type Props = {
  route?: any;
};



const TransactionDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { coupon } = route.params;

  const userContext = React.useContext(UserContext);

  const [timeLeft, setTimeLeft] = React.useState(null);

  const startDate = moment(coupon?.redeemStartDate, "DD-MM-YYYY HH:mm");
  const endDate = moment(coupon?.redeemEndDate, "DD-MM-YYYY HH:mm");


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


  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={userContext?.customTheme?.primaryDark}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, backgroundColor: userContext?.customTheme?.primaryDark, paddingBottom: 50 }}>
            <Header navbar={true} />
            <View
              style={[styles.compView, { backgroundColor: userContext?.customTheme?.primaryDark }]}
            >
              <Text variant="titleLarge" style={styles.txtSty}>Your booking is confirmed</Text>
              <Text style={styles.txtStysec}>Booking booking confirmed! Your exclusive valete service is confirmed and active</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, marginHorizontal: 40 }}>
              <View style={{ alignItems: 'center', gap: 6 }}>
                {isBeforeStart ? (
                  <Text style={styles.txtTitleSty}>00:00</Text>
                ) : timeLeft ? (
                  <Text variant="displayMedium" style={styles.txtTitleSty}>
                    {`${timeLeft.hours}:${timeLeft.minutes}`}
                  </Text>
                ) : (
                  <Text style={styles.txtTitleSty}>00:00</Text>
                )}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {isBeforeStart ? (
                    <Text style={styles.txtStatusSty}>Not Started</Text>
                  ) : timeLeft ? (
                    <Text style={styles.txtStatusSty}>In Progress</Text>
                  ) : (
                    <Text style={styles.txtStatusSty}>Complete</Text>
                  )}
                </View>
              </View>
              <View style={{ alignItems: 'center', gap: 10 }}>
                <CallIcon />
                <Text style={styles.txtStysec}>Call support</Text>
              </View>

            </View>
          </View>

          <View style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -28, backgroundColor: palette.txtWhite, paddingBottom: 30 }}>
            <View style={{ padding: 15, gap: 8 }}>
              <Text style={styles.txtBlackHeading}>Booking Summary</Text>
              <View style={{}}>
                <Text style={styles.txtSummHeading}>Booking ID</Text>
                <Text style={styles.txtBodyHeading}>987654321</Text>
              </View>
              <View style={{}}>
                <Text style={styles.txtSummHeading}>Booked for</Text>
                <Text style={styles.txtBodyHeading}>{userContext.user?.customerName}</Text>
              </View>
              <View style={{}}>
                <Text style={styles.txtSummHeading}>Booked Date</Text>
                <Text style={styles.txtBodyHeading}>{utcDateConvoter(coupon?.createdDateTime)}</Text>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderColor: palette.txtGray, marginHorizontal: 30 }}></View>
            <View style={{ padding: 15, gap: 8 }}>
              <Text style={styles.txtBlackHeading}>Service Details</Text>
              <View style={{}}>
                <Text style={styles.txtSummHeading}>Service Type</Text>
                <Text style={styles.txtBodyHeading}>Valet Parking Service</Text>
              </View>
              <View style={{}}>
                <Text style={styles.txtSummHeading}>Service Name</Text>
                <Text style={styles.txtBodyHeading}>{coupon?.templateName}</Text>
              </View>

            </View>
            <View style={{ borderBottomWidth: 1, borderColor: palette.txtGray, marginHorizontal: 30 }}></View>
            <View style={{ padding: 15, gap: 8 }}>
              <Text style={styles.txtBlackHeading}>Service Time</Text>
              <View style={{}}>
                <Text style={styles.txtSummHeading}>Duration</Text>
                <Text style={styles.txtBodyHeading}>{coupon?.validityDuration} Hour</Text>
              </View>
              <View style={{}}>
                <Text style={styles.txtSummHeading}>Start Date & Time</Text>
                <Text style={styles.txtBodyHeading}>{coupon?.redeemStartDate}</Text>
              </View>
              <View style={{}}>
                <Text style={styles.txtSummHeading}>End Date & Time</Text>
                <Text style={styles.txtBodyHeading}>{coupon?.redeemEndDate}</Text>
              </View>
            </View>
            <View style={{ width: '46%', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
              <PrimaryButton onPress={() => navigation.replace("HomeScreen")} buttonColor={"light"} >Home</PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default TransactionDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  compView: {
    marginTop: 50,
    paddingHorizontal: 15,
    gap: 10,
    //  backgroundColor: palette.primaryDark
  },
  txtSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 22,
  },
  txtStysec: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    fontSize: 14,
  },
  txtTitleSty: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    fontSize: 38,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  img: {
    width: 100,
    height: 100
  },
  txtStatusSty: {
    backgroundColor: palette.txtGold,
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 15
  },
  txtBlackHeading: {
    color: palette.txtBlack,
    fontWeight: '400',
    fontFamily: FONT.Able.regular,
    fontSize: 16,
  },
  txtSummHeading: {
    color: palette.txtGray,
    fontWeight: '400',
    fontFamily: FONT.Able.regular,
    fontSize: 12,
  },
  txtBodyHeading: {
    color: palette.txtBlack,
    fontWeight: '400',
    fontFamily: FONT.Able.regular,
    fontSize: 14,
  }



});


