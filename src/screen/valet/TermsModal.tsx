import React from 'react';
import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CrossIcon from '../../assets/svg/cross-icon.svg';
import {palette} from '../../theme/themes';

interface Terms {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  terms: string[];
  onPress: any;
}

const TermsModal: React.FC<Terms> = ({ modalVisible, setModalVisible, terms, onPress }) => {
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
            <Text style={styles.title}>TERMS & CONDITIONS</Text>
            {terms.map((term, index) => (
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

export default TermsModal;

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
    fontWeight: 'bold',
    marginBottom: 5,
    color: palette.txtWhite,
    fontSize: 16,
  },
  simpleBack: {
    marginTop: 35,
    backgroundColor: 'rgba(31, 31, 31, 1)',
    marginVertical: 25,
    borderRadius: 17,
    padding: 16,
  },
  termContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dot: {
    fontSize: 16,
    lineHeight: 20,
    marginRight: 8,
    color: palette.txtWhite,
  },
  termText: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.txtWhite,
    flex: 1,
  },
});
