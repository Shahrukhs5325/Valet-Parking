import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CrossIcon from '../../assets/svg/cross-icon.svg';
import { palette } from '../../theme/themes';
import { FONT } from '../../theme/fonts';

interface RedeemModal {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  steps: string[];
  onPress: any;
}

const HEIGHT = Dimensions.get('window').height;


const RedeemModal: React.FC<RedeemModal> = ({ modalVisible, setModalVisible, steps, onPress }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <ImageBackground
          source={require('../../assets/privilege.png')}
          style={styles.background}>
          <TouchableOpacity onPress={onPress} style={styles.closeButton}>
            <CrossIcon width={44} />
          </TouchableOpacity>
          <View style={styles.simpleBack}>
            <Text style={styles.title}>HOW TO REDEEM?</Text>
            {steps.map((term, index) => (
              <View key={index} style={styles.termContainer}>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.termText}>{term}</Text>
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default RedeemModal;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 17,
    elevation: 5,
    width: '100%',
    overflow: 'hidden',
    marginTop: 200,
    marginBottom: 100,
    // height:HEIGHT/2,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    marginBottom: 25,
    zIndex: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.JuliusSansOne.regular,
    fontSize: 14,
  },
  simpleBack: {
    marginTop: 35,
    backgroundColor: 'rgba(31, 31, 31, 1)',
    marginVertical: 25,
    borderRadius: 17,
    padding: 16,
    gap: 18
  },
  termContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dot: {
    fontSize: 16,
    marginRight: 8,
    color: palette.txtWhite,
  },
  termText: {
    fontWeight: '400',
    color: palette.txtWhite,
    fontFamily: FONT.Able.regular,
    fontSize: 14,
  },
});
