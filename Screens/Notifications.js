import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Switch, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../Navigations/AuthContext';

const Notifications = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState("");
    const [selectedOption, setSelectedOption] = useState("Default");
    // const [prayerTimes, setPrayerTimes] = useState([]);
    const { themeMode } = useAuthContext();
    const [sound, setSound] = useState(null);
    Sound.setCategory('Playback')
    useEffect(() => {
        loadSound();
        loadSettings();
        // fetchPrayerTimes();
        const intervalId = setInterval(checkPrayerTimeMatch, 1000); // Check every minute
        return () => clearInterval(intervalId);
    }, []);

    const loadSettings = async () => {
        try {
            const storedIsEnabled = await AsyncStorage.getItem('isEnabled');
            const parsedIsEnabled = storedIsEnabled === 'true'; // Parse string to boolean
            const storedSelectedOption = await AsyncStorage.getItem('selectedOption');
            console.log("storedSelectedOption",storedSelectedOption);
            setSelectedOption(storedSelectedOption || 'Adhan');
            setIsEnabled(parsedIsEnabled);
            console.log("parsedIsEnabled", parsedIsEnabled);
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const loadSound = async () => {
        const soundObject = new Sound(
            "azan.mp3",
            Sound.MAIN_BUNDLE,
            (error) => {
                if (error) {
                    console.log("failed to load the sound", error);
                    return;
                }
                setSound(soundObject);
            }
        );
    };

    useEffect(() => {
        checkPrayerTimeMatch();
        saveSettings();
    }, [selectedOption, isEnabled]);

    const toggleSwitch = async () => {
        const updatedStates = !isEnabled;
        setIsEnabled(updatedStates);
        try {
            await AsyncStorage.setItem('isEnabled', updatedStates.toString());
        } catch (error) {
            console.error('Error saving isEnabled setting:', error);
        }
    };
    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('isEnabled', isEnabled.toString());
            await AsyncStorage.setItem('selectedOption', selectedOption);
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    // const fetchPrayerTimes = async () => {
    //     const date = new Date();
    //     const year = date.getFullYear();
    //     const month = date.getMonth() + 1;

    //     try {
    //         const response = await fetch(
    //             `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=51.508515&longitude=-0.1254872&method=2`
    //         );
    //         const data = await response.json();

    //         if (data && data.data && data.data.length > 0 && data.data[0].timings) {
    //             const timings = data.data[0].timings;

    //             const filteredPrayers = Object.entries(timings)
    //                 .filter(([prayerName, _]) => !["Sunset", "Imsak", "Midnight", "Firstthird", "Lastthird"].includes(prayerName))
    //                 .map(([prayerName, prayerTime]) => {
    //                     const formattedTime = formatTimeAMPM(prayerTime);
    //                     return { prayerName, prayerTime: formattedTime };
    //                 });

    //             return filteredPrayers;
    //         } else {
    //             console.error("No prayer timings found in API response");
               
    //         }
    //     } catch (error) {
    //         console.error("Error fetching prayer data:", error);
    //         throw error;
    //     }
    // };

    
    const checkPrayerTimeMatch = async () => {
        try {
            const prayerTimeStr = "12:50 PM"; // Set the specific prayer time
            const currentTime = new Date(Date.now());
            const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            console.log("currentTimeStr", currentTimeStr);
            // console.log("selectedOption",selectedOption);
            // Check if isEnabled is false or selectedOption is "Default", if so, stop the sound
            if (!isEnabled || selectedOption === "Default") {
                if (sound) {
                    sound.stop();
                }
                return;
            }
    
            // If isEnabled is true and selectedOption is "Adhan", check if the current time matches the specified prayer time
            if (currentTimeStr === prayerTimeStr) {
                console.log("Prayer time matched for:", currentTimeStr);
                if (sound) {
                    // If sound is loaded, play it
                   sound.play();
                    // Update soundPlayed state to true to indicate that the sound has been played
                }
                // setTimeout(() => {
                //     setSelectedOption("Default");
                // }, 1000);
            }
        } catch (error) {
            console.error("Error checking prayer time match:", error);
        }
    };

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };

    // const formatTimeAMPM = (time) => {
    //     const [hours, minutes] = time.split(':');
    //     const date = new Date();
    //     date.setHours(parseInt(hours, 10));
    //     date.setMinutes(parseInt(minutes, 10));
    //     return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    // };


    return (
        <SafeAreaView style={[styles.container, themeMode === "dark" && { backgroundColor: "#1C1C22", color: "#fff" }]}>
            <View style={styles.setting}>
                <Pressable hitSlop={30} onPress={() => navigation.goBack()}>
                    <Icon name="left" size={20} left={10} style={[themeMode === "dark" && { color: "#fff" }]} />
                </Pressable>
                <Text style={[styles.settingIcon, themeMode === "dark" && { color: "#fff" }]}>Settings</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
                <View style={styles.notifications}>
                    <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>Show Notifications</Text>
                    <Switch
                        trackColor={{ false: '#B2B2B2', true: '#5BB5AB' }}
                        thumbColor={isEnabled ? '#0a9484' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={{ flexDirection: "column" }}>
                    <View style={styles.items}>
                        <RadioButton.Group
                            onValueChange={value => handleOptionPress(value)}
                            value={selectedOption}
                        >
                            <View style={styles.radioContainer}>
                                <RadioButton.Item
                                    value="Default"
                                    label="Default"
                                    color="#0a9484"
                                    disabled={!isEnabled}
                                    style={[styles.radioButton, themeMode === "dark" && { color: "#fff" }]}
                                    labelStyle={[{ fontSize: 15 }, themeMode === "dark" && { color: "#fff" }]}
                                />
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={styles.items}>
                        <RadioButton.Group
                            onValueChange={value => handleOptionPress(value)}
                            value={selectedOption}
                        >
                            <View style={styles.radioContainer}>
                                <RadioButton.Item
                                    label="Adhan"
                                    value="Adhan"
                                    color="#0a9484"
                                    disabled={!isEnabled}
                                    style={[styles.radioButton, themeMode === "dark" && { color: "#fff" }]}
                                    labelStyle={[{ fontSize: 15 }, themeMode === "dark" && { color: "#fff" }]}
                                />
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    setting: {
        flexDirection: "row",
        gap: 110,
        justifyContent: 'flex-start',
        alignItems: "center",
        height: 60,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    settingIcon: {
        fontSize: 22,
        fontWeight: "700",
    },
    items: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
        justifyContent: "space-between",
        padding: 10
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        marginRight: 10,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    notifications: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
        justifyContent: "space-between",
        padding: 20
    },
    radioButton: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-start',

    }
});
