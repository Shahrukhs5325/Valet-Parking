import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import CallIcon from '../../asset/svg/call-white.svg';
import Header from '../../components/header/Header';
import { utcDateConvoter } from '../../constant/constFunction';
import { UserContext } from '../../context/user/UserContext';
import { palette } from '../../theme/themes';

type Props = {
  route?: any;
};



const TransactionDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { coupon } = route.params;

  const userContext = React.useContext(UserContext);





  return (
    <>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={palette.primaryDark}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, backgroundColor: userContext?.customTheme?.primaryDark, paddingBottom: 50 }}>
            <Header navbar={true} />
            <View
              style={[styles.compView, { backgroundColor: userContext?.customTheme?.primaryDark }]}
            >
              <Text variant="titleLarge" style={styles.txtSty}>Your booking is confirmed</Text>
              <Text variant="titleSmall" style={styles.txtStysec}>Booking booking confirmed! Your exclusive valete service is confirmed and active</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, marginHorizontal: 40 }}>
              <View style={{ alignItems: 'center', gap: 6 }}>
                <Text variant="displayMedium" style={styles.txtTitleSty}>33:33</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text variant="titleSmall" style={styles.txtStatusSty}>In Progress</Text>
                </View>
              </View>
              <View style={{ alignItems: 'center', gap: 10 }}>
                <CallIcon />
                <Text variant="titleSmall" style={styles.txtStysec}>Call support</Text>
              </View>

            </View>
          </View>

          <View style={{ flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -28, backgroundColor: palette.bgGray }}>
            <View style={{ padding: 15, gap: 8 }}>
              <Text variant="titleMedium" style={styles.txtBlackHeading}>Booking Summary</Text>
              <View style={{}}>
                <Text variant="titleMedium" style={styles.txtSummHeading}>Booking ID</Text>
                <Text variant="bodyLarge" style={styles.txtBodyHeading}>987654321</Text>
              </View>
              <View style={{}}>
                <Text variant="titleMedium" style={styles.txtSummHeading}>Booked for</Text>
                <Text variant="bodyLarge" style={styles.txtBodyHeading}>{userContext.user?.customerName}</Text>
              </View>
              <View style={{}}>
                <Text variant="titleMedium" style={styles.txtSummHeading}>Booked Date</Text>
                <Text variant="bodyLarge" style={styles.txtBodyHeading}>{utcDateConvoter(coupon?.createdDateTime)}</Text>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderColor: palette.txtGray, marginHorizontal: 30 }}></View>
            <View style={{ padding: 15, gap: 8 }}>
              <Text variant="titleMedium" style={styles.txtBlackHeading}>Service Details</Text>
              <View style={{}}>
                <Text variant="titleMedium" style={styles.txtSummHeading}>Service Type</Text>
                <Text variant="bodyLarge" style={styles.txtBodyHeading}>Valet Parking Service</Text>
              </View>
              <View style={{}}>
                <Text variant="titleMedium" style={styles.txtSummHeading}>Service Name</Text>
                <Text variant="bodyLarge" style={styles.txtBodyHeading}>{coupon?.templateName}</Text>
              </View>

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
    fontWeight: '800',
    color: palette.txtWhite,
  },
  txtStysec: {
    color: palette.txtWhite,
  },
  txtTitleSty: {
    fontWeight: '800',
    color: palette.txtWhite,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  img: {
    width: 100,
    height: 100
  },
  txtStatusSty: {
    backgroundColor: palette.txtGold,
    color: palette.txtWhite,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 15
  },
  txtBlackHeading: {
    color: palette.txtBlack,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  txtSummHeading: {
    color: palette.txtBlack,
    fontWeight: '800',
  },
  txtBodyHeading: {
    color: palette.txtGray,
  }



});


