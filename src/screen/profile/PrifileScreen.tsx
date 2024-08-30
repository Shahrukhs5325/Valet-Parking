import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, LayoutChangeEvent, Image } from 'react-native';
import HeaderTitle from '../../components/header/HeaderTitle';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import ZapsIcon from '../../assets/svg/zapsIcon.svg';
import BarcodeImage from '../../assets/svg/barcode.svg'; // Add your barcode image
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import { UserContext } from '../../context/user/UserContext';

const ProfileScreen = () => {
  const userContext = React.useContext(UserContext);
  const user = userContext.user;

  const [listHeight, setListHeight] = useState(0);
  const flatListRef = useRef(null);

  const historyData = [
    { id: '1', name: 'Change Password' },
    { id: '2', name: 'Contact Us' },
    { id: '3', name: 'Terms of Use' },
    { id: '4', name: 'Privacy Policy' },
    { id: '5', name: 'Notifications' },
    { id: '6', name: 'Log Out' },
    { id: '7', name: 'Delete Account' },
  ];

  const renderItem = ({ item, index }) => (
    <View style={[styles.listItem, index === historyData.length - 1 && styles.lastItem]}>
      <Text style={styles.itemText}>{item?.name?.toUpperCase()}</Text>
    </View>
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setListHeight(height);
  };

  return (
    <View style={styles.container}>
      <HeaderTitle title={'Profile'} />
      <ImageBackground
        source={require('../../assets/profileBack.png')}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <ZapsIcon style={styles.icon} />
          <View style={styles.profileInfo}>
            <View style={styles.nameIdContainer}>
              <Text style={styles.itemText}>{user?.customerName}</Text>
              <Text style={styles.itemText}>ID: 0123456</Text>
            </View>
            <BarcodeImage height={87} width={87} />
          </View>
          <Text style={styles.membershipText}>Membership valid upto:</Text>
          <Text style={styles.membershipText}>05/24</Text>
        </View>
      </ImageBackground>
      <View style={[styles.gradientWrapper, { height: listHeight }]}>
        <LinearGradient
          colors={['rgba(22, 22, 22, 1)', 'rgba(40, 40, 40, 1)']} // Gradient color
          style={styles.gradientContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <FlatList
            scrollEnabled={false}
            ref={flatListRef}
            data={historyData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
            onLayout={handleLayout}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

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
    //  borderColor: palette.borderClr,
    overflow: 'hidden'
  },
  gradientContainer: {
    paddingHorizontal: 20,
    borderRadius: 17,
  },
  flatListContent: {
    gap: 4,
  },
  lastItem: {
    borderBottomWidth: 0, // Remove underline for the last item
    marginBottom: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: palette.borderClr,
  },
  itemText: {
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 14,
    fontWeight: '400',
    color: palette.txtWhite,
  },
  background: {
    flex: 1,
    // marginHorizontal: 12,
    // marginBottom: 6, // Decrease margin to reduce space between image and gradient
    //height: 203,
    resizeMode: 'cover', // Or 'contain' depending on your need
    borderRadius: 17, // Added borderRadius
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
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

export default ProfileScreen;
