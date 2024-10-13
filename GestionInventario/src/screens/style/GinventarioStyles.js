import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5A6D7C',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#5A6D7C',
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    backgroundColor: '#4B5A6C',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#E17055',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#4B5A6C',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#fff',
  },
  modalInput: {
    width: '100%',
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  floatingButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: '#E17055',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E17055',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default styles;