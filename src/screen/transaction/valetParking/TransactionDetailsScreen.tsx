import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BarcodeImage from '../../../assets/svg/barcode.svg'; // Add your barcode image
import ZapsIcon from '../../../assets/svg/zapsIcon.svg';
import { UserContext } from '../../../context/user/UserContext';
import { FONT } from '../../../theme/fonts';
import { palette } from '../../../theme/themes';
import HeaderTitle from '../../../components/header/HeaderTitle';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

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
        <HeaderTitle title={'Profile'} />
        <ImageBackground
          source={require('../../../assets/profileBack.png')}
          style={styles.background}
        >
          <View style={styles.overlay}>
            <ZapsIcon style={styles.icon} />
            <View style={styles.profileInfo}>
              <View style={styles.nameIdContainer}>
                <Text style={styles.itemText}>jb</Text>
                <Text style={styles.itemText}>ID: 0123456</Text>
              </View>
              <BarcodeImage height={87} width={87} />
            </View>
            <Text style={styles.membershipText}>Membership valid upto:</Text>
            <Text style={styles.membershipText}>05/24</Text>
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
                <Text style={styles.itemValueText}>Valet Parking</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Booking id</Text>
                <Text style={styles.itemValueText}>1234567890</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Location</Text>
                <Text style={styles.itemValueText}>Billionaire, riyadh</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Duration</Text>
                <Text style={styles.itemValueText}>2 Hrs</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>date</Text>
                <Text style={styles.itemValueText}>9/1/2024</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>Start</Text>
                <Text style={styles.itemValueText}>12:00 Am</Text>
              </View>
              <View style={styles.viewBorder} />
              <View style={[styles.listItem]}>
                <Text style={styles.itemText}>End</Text>
                <Text style={styles.itemValueText}>12:00 Am</Text>
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
    flex: 2,
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

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 50,
  },
  viewBorder: {
    borderBottomWidth: 1,
    borderBottomColor: palette.borderClr,
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
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 17,
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    borderRadius: 17,
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
  nameIdContainer: {
    gap: 6,
  },
  heading: {
    color: 'white',
    fontSize: 14,
    textAlign: 'auto',
  },
  barcodeImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  membershipText: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 12,
    fontWeight: '400',
    color: palette.txtWhite,
  },
});