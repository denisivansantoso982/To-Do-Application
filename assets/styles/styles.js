import { StyleSheet } from 'react-native';
import colour from '../../models/Colour';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollInput: {
    flexDirection: 'column',
    paddingVertical: 4,
    paddingHorizontal: 5
  },
  titleApp: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#414141'
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    marginTop: 4,
    alignSelf: 'center'
  },
  subTitleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#626262',
    marginVertical: 5,
    alignSelf: 'center',
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 15,
    justifyContent: 'center',
    flexGrow: 1
  },
  cardInput: {
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
  inputTextField: {
    fontFamily: 'Poppins-SemiBold',
    color: '#313131',
    fontSize: 16,
    marginBottom: -4,
    marginTop: 8
  },
  inputField: {
    fontFamily: 'Poppins-Medium',
    width: '100%',
    borderBottomWidth: 2,
    color: '#474747',
    borderBottomColor: colour.primary,
    fontSize: 16,
    paddingVertical: 2
  },
  notice: {
    fontFamily: 'Poppins-Normal',
    alignSelf: 'flex-end',
    marginVertical: -6,
    color: colour.primary
  },
  button: {
    backgroundColor: colour.primary,
    paddingVertical: 6,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFF',
    fontSize: 18,
  },
  askingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    alignSelf: 'center'
  },
  askingAccount: {
    fontFamily: 'Poppins-SemiBold',
    color: '#414141',
    fontSize: 14
  },
  loginOrRegister: {
    fontFamily: 'Poppins-SemiBold',
    color: colour.primary,fontSize: 15
  },
  modalDatePicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: '#000'
  },
  closeModal: {
    position: 'absolute',
    top: 14,
    right: 4,
    padding: 10
  },
  dateField: {
    flexDirection: 'column',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colour.primary
  },
  header: {
    // width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colour.primary,
    marginLeft: 14,
    marginRight: 20
  },
  avatar: {
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colour.primary,
    alignContent: 'flex-end',
    marginRight: 8
  },
  contentLandingPage: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    marginTop: 10
  },
  gridContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  touchableContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    width: '45%',
    marginHorizontal: 10
  },
  titlePriority: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  textPriority: {
    fontFamily: 'Poppins-Medium',
    color: '#FFF',
    marginLeft: 8,
    fontSize: 18
  },
  parentTextPriority: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFF',
    fontSize: 18,
    marginBottom: 6
  },
  role: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colour.primary,
    marginRight: 6,
    marginBottom: 6
  },
  listOutline: {
    borderWidth: 1,
    borderColor: colour.primary,
    width: '95%',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginTop: 10
  },
  list: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  contentList: {
    fontFamily: 'Poppins-Bold',
    color: colour.primary
  },
  inputFieldReadOnly: {
    fontFamily: 'Poppins-Medium',
    width: '100%',
    borderWidth: 1,
    color: '#474747',
    borderColor: colour.primary,
    fontSize: 16,
    padding: 4
  },
  openCamera: {
    position: 'absolute',
    top: 14,
    left: 4,
    padding: 10
  },
  titleModal: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    position: 'absolute',
    top: 24
  }
});

export default styles;