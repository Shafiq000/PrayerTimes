import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, PermissionsAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/AntDesign';
import Location_Icon from 'react-native-vector-icons/FontAwesome6';
import Location_pin from 'react-native-vector-icons/EvilIcons';
import Geolocation from 'react-native-geolocation-service';
import { useAuthContext } from '../Navigations/AuthContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDZy9lBieXFt2KDcxhLub2QG-2XicbmSM0';

const Setlocation = ({ navigation }) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const { themeMode } = useAuthContext();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        requestLocationPermission();
        loadSelectedCountry();
    }, []);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to function properly.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const loadSelectedCountry = async () => {
        try {
            const savedCountry = await AsyncStorage.getItem('selectedCountry');
            if (savedCountry) {
                setSelectedCountry(savedCountry);
            }
        } catch (error) {
            console.error('Error loading selected country:', error);
        }
    };

    const setCurrentLocation = async (country) => {
        try {
            setSelectedCountry(country);
            setIsInputFocused(true);
            await AsyncStorage.setItem('selectedCountry', country);
        } catch (error) {
            console.error('Error setting current location:', error);
        }
    };

    const handleCountrySelect = async (country) => {
        setSelectedCountry(country.description);
        setIsInputFocused(true);
        setCurrentLocation(country.description);
        // console.log('Selected country:', country.description);
    };

    const handleGetLocation = () => {
        setLoading(true);
        Geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`);
                    const data = await response.json();
                    const cityComponent = data.results[0].address_components.find(component => component.types.includes('locality'));
                    const city = cityComponent ? cityComponent.long_name : '';
                    setSelectedCountry(city);
                    setCurrentLocation(city);
                    setLoading(false);
                    navigation.navigate("MainScreen", { country: city });
                } catch (error) {
                    console.error('Error getting current location:', error);
                    setLoading(false);
                }
            },
            (error) => {
                console.log('Error getting current position:', error);
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    // const handleCountrySelect = async (country) => {
    //     // try {
    //     //     const placeDetails = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${country.place_id}&fields=geometry&key=${GOOGLE_PLACES_API_KEY}`);
    //     //     const { lat, lng } = placeDetails.data.result.geometry.location;

    //         setSelectedCountry(country.description);
    //         setIsInputFocused(false);
    //         setCurrentLocation(country.description);
    //         console.log('Selected country:', country.description);    
    //     //     try {
    //     //         const response = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${GOOGLE_PLACES_API_KEY}`);
    //     //         if (response.data && response.data.timeZoneId) {
    //     //             const { timeZoneId } = response.data;
    //     //             console.log('Time zone:', timeZoneId);
    //     //             // Here you can handle the timezone data as needed, such as updating the UI with the timezone information.
    //     //         } else {
    //     //             console.error('Invalid timezone data:', response.data);
    //     //         }
    //     //     } catch (error) {
    //     //         console.error('Error fetching timezone data:', error);
    //     //     }
    //     // } catch (error) {
    //     //     console.error('Error fetching place details:', error);
    //     // }
    // };


    return (
        <SafeAreaView style={[styles.container, themeMode === 'dark' && { backgroundColor: '#1C1C22' }]}>
            {loading?(
                <View style={[styles.loadingContainer, { backgroundColor: themeMode === "dark" ? "#1C1C22" : "#FFFFFF" }]}>
                <ActivityIndicator animating={true} size="large" color={themeMode === "dark" ? "#FFFFFF" : "#0a9484"} />
                <Text style={[styles.loadingText, { color: themeMode === "dark" ? "#FFFFFF" : "#000000" }]}>Loading...!</Text>
            </View>
            ):(
                <>
                <View style={styles.mainHeader}>
                <Pressable hitSlop={50} onPress={() => navigation.goBack()}>
                    <Feather name="left" size={22} right={100} style={[, themeMode === 'dark' && { color: '#fff' }]} />
                </Pressable>
                <View style={styles.mainText}>
                    <Text style={[styles.headerText, themeMode === 'dark' && { color: '#fff' }]}>Set Location</Text>
                </View>
            </View>
            <View style={styles.bodyArea}>
                <View style={[styles.textInputContainer, themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
                    <GooglePlacesAutocomplete
                        placeholder="Select Country"
                       
                        textInputProps={{
                            onFocus: () => setIsInputFocused(true),
                            // onBlur: () => setIsInputFocused(false)
                        }}
                        query={{
                            key: GOOGLE_PLACES_API_KEY,
                            language: 'en',
                             types: 'geocode'
                        }}
                        onPress={(data, details = null) => handleCountrySelect(data)}
                        // console.log("data detail",JSON.stringify ( data,details,2,null))
                        onFail={(error) => console.error(error)}
                        requestUrl={{
                            url: 'https://maps.googleapis.com/maps/api',
                            useOnPlatform: 'web',
                        }}

                        enablePoweredByContainer={false}
                        GooglePlacesDetailsQuery={{
                            fields: ['formatted_address', 'geometry'],
                        }}
                        renderLeftButton={() => <Location_pin name='location' style={{ marginTop: 12, marginLeft: 8, fontSize: 25, color: "#0a9484" }}>  </Location_pin>}

                        returnKeyType={'default'}
                        fetchDetails={true}
                        styles={{ textInput: [styles.input, isInputFocused && styles.focusedInput, themeMode === 'dark' && styles.darkModeInput], description: [themeMode === "dark" && { color: "white" }], row: [themeMode === "dark" && { backgroundColor: "#1C1C22" }] }}
                    />
                </View>

                <Pressable
                    onPress={() => navigation.navigate("MainScreen", { country: selectedCountry })}
                    style={[
                        isInputFocused ? styles.saveBtnPress : styles.simple,
                        themeMode === 'dark' && { backgroundColor: '#343434' }
                    ]}
                >
                    <Text style={[styles.saveBtn, themeMode === 'dark' && { color: 'lightgray' }]}>Save</Text>
                </Pressable>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#C7C7C7', marginLeft: 20, top: 3 }} />
                    <View>
                        <Text style={[{ width: 50, textAlign: 'center', fontWeight: '600', fontSize: 18 }, , themeMode === 'dark' && { color: '#fff' }]}>or</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#C7C7C7', marginRight: 20, top: 3 }} />
                </View>
                <Pressable onPress={handleGetLocation}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 30 }}>
                        <Location_Icon name='location-crosshairs' size={25} color={'#0a9484'} />
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#0a9484', marginHorizontal: 10 }}>Get My Location</Text>
                    </View>
                </Pressable>
            </View>
                </>
            )}
            
        </SafeAreaView>
    );
};

export default Setlocation;

const styles = StyleSheet.create({
    mainHeader: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#C7C7C7',
        borderBottomWidth: 1,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    bodyArea: {
        top: 20,
        marginVertical: 10,
        gap: 15,
    },
    textInputContainer: {
        marginLeft: 15,
        borderTopColor: '#0a9484',
        borderBottomColor: '#0a9484',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#0a9484',
        borderRadius: 8,
        padding: 8,
        width: '90%',
        shadowColor: 'white',
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        shadowOffset: { width: 2, height: 2 },
    },
    input: {
        borderColor: '#0a9484',
        borderWidth: 2,
        color: 'black',
    },

    darkModeInput: {
        color: 'white',
        backgroundColor: "black"
    },
    saveBtnPress: {
        backgroundColor: '#0a9484',
        height: 38,
        width: 90,
        justifyContent: 'center',
        marginVertical: 25,
        marginHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        color: '#fff',
    },
    saveBtn: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: '500',
        color: "#fff"
    },
    simple: {
        backgroundColor: '#C7C7C7',
        height: 38,
        width: 90,
        justifyContent: 'center',
        marginVertical: 25,
        marginHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        color: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    row: {
        backgroundColor: '#FFFFFF',
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#c8c7cc',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
});
