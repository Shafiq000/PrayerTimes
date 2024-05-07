// import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
// import React from 'react';
// import Location_Icon from 'react-native-vector-icons/EvilIcons';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// const GOOGLE_PLACES_API_KEY = 'AIzaSyDZy9lBieXFt2KDcxhLub2QG-2XicbmSM0'; 

// const CountryAndCityName = () => {
//   const renderCountryItem = ({ item }) => (
//     <TouchableOpacity style={styles.itemContainer}>
//       <Location_Icon name='location' size={25} color={"#0a9484"} style={styles.locationIcon} />
//       <GooglePlacesAutocomplete
//                         placeholder="Search"
//                         query={{
//                             key: GOOGLE_PLACES_API_KEY,
//                             language: 'en',
//                         }}
//                         onPress={(data, details = null) => console.log(data)}
//                         onFail={(error) => console.error(error)}
//                         requestUrl={{
//                             url:
//                                 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
//                             useOnPlatform: 'web',
//                         }} 
//                     />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
       
//         renderItem={renderCountryItem}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default CountryAndCityName;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     borderBottomColor:"#C7C7C7",
//     borderBottomWidth:1
    
//   },
//   locationIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   countryName: {
//     fontSize: 18,
   
//   },
// });
