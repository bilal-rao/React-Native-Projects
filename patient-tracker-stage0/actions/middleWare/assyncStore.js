export default class AssynStorage {
    static assyncStore(value) {
        console.log('Patient Data  :', value);
        return (dispatch) => {
            //My Bussiness Logic
            AsyncStorage.setItem('name', value);
            this.setState({ 'name': value })
        }
    }
}