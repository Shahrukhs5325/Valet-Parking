import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlagIcon from '../../assets/svg/history/GolfHole.svg';
import CupIcon from '../../assets/svg/history/Coffee.svg';
import Dumbbell from '../../assets/svg/history/Dumbbell.svg';
import { palette } from '../../theme/themes';
import { FONT } from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';

const Expiring = () => {
  const data = [
    {
      id: '1',
      name: 'gym Membership',
      key: 'Valid until : July 15th',
      dayLeft: '06',
      icon: <Dumbbell width={40} height={40} />,
    },
    {
      id: '2',
      name: 'Golf Club Membership',
      key: 'Valid until : July 13th',
      dayLeft: '02',
      icon: <FlagIcon width={40} height={40} />,
    },
    {
      id: '3',
      name: 'Cafe voucher',
      key: 'Valid until : July 11th',
      dayLeft: '12',
      icon: <CupIcon width={40} height={40} />,
    },
  ];

  return (
    <View style={styles.gradientWrapper}>
      <LinearGradient
        colors={['rgba(22, 22, 22, 1)', 'rgba(40, 40, 40, 1)']} // Gradient color
        style={[
          styles.gradientContainer,
          { borderWidth: 1, borderColor: palette.borderClr },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.itemContainer}>
          {data.map((item, index) => (
            <View key={item.id} style={styles.item}>
              <View style={styles.iconContainer}>{item.icon}</View>
              <View style={index === data.length - 1 ? styles.noBorder : styles.Details}>
                <View>
                  <Text style={styles.historyService}>{item.name}</Text>
                  <Text style={styles.historyLocation}>{item.key}</Text>
                </View>
                <View>
                  <Text style={styles.dayLeft}>{item.dayLeft}</Text>
                  <Text style={styles.id}>DAYS LEFT</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

export default Expiring;

const styles = StyleSheet.create({
  gradientWrapper: {
    flex: 2,
    // marginTop: 25,
    marginBottom: 12,
    borderRadius: 17,
  },
  Details: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute content horizontally
    alignItems: 'center', // Align content vertically
    flexGrow: 1, // Fill available space within parent
    gap: 2, // Add spacing between elements
    borderBottomWidth: 1, // Add border only to the bottom edge
    borderBottomColor: 'gray',
    overflow: 'hidden', // Prevent content from overflowing the border
  },
  noBorder: { // No border for the last item
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    gap: 2,
    overflow: 'hidden',
  },
  historyService: {
    fontWeight: '400',
    marginBottom: 15,
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 14,
  },
  historyLocation: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: FONT.Able.regular,
    marginBottom: 15,
    fontSize: 10,
    fontWeight: '400',
  },
  gradientContainer: {
    paddingHorizontal: 20,
    borderRadius: 17,
  },
  itemContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  iconContainer: {
    marginBottom: 5,
    paddingRight: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  key: {
    color: 'gray',
  },
  id: {
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  dayLeft: {
    color: palette.txtWhite,
    fontSize: 20,
    textAlign: 'center',
  },
})