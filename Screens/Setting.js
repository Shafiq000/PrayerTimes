import React, { useState,useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Linking, Alert, Share, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuthContext } from '../Navigations/AuthContext';
// import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

const Setting = ({ navigation }) => {
    const { themeMode, toggleThemeMode } = useAuthContext();
    // const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const aboutUsURL = 'https://mslm.io/jamaat/about';
    const privacyUsURL = 'https://mslm.io/jamaat/privacy-policy';
    const handleAboutUsPress = () => {
        Linking.openURL(aboutUsURL);
    };
    const handlePrivacyPress = () => {
        Linking.openURL(privacyUsURL);
    };
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'PrayerTimes https://play.google.com/store/apps/details?id=com.mslm.jamaat.prayertime',
            });
            if (result.action === Share.sharedAction) {
                // Handle share success
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    // useEffect(() => {
    //     if (notificationsEnabled) {
    //         const interval = setInterval(async () => {
    //             // Request permission
    //             await notifee.requestPermission();
    //             // Create a channel (required for Android)
    //             const channelId = await notifee.createChannel({
    //                 id: 'default 3',
    //                 name: 'Default Channel 3',
    //                 sound: 'default',
    //                 importance: AndroidImportance.HIGH,
    //             });
    //             // Display notification
    //             await notifee.displayNotification({
    //                 title: 'Meeting with Ahmad',
    //                 body: 'Today at 9:00am',
    //                 android: {
    //                     channelId,
    //                 },
    //             });
    //         }, 60000); // 60000 milliseconds = 1 minute

    //         return () => clearInterval(interval); // Clear interval on component unmount
    //     }
    // }, [notificationsEnabled]);

    // const onToggleNotifications = () => {
    //     setNotificationsEnabled(!notificationsEnabled);
    // };

    return (
        <SafeAreaView style={[styles.container, themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
            <View style={styles.setting}>
                <Pressable hitSlop={30} onPress={() => navigation.goBack()}>
                    <Icon name="left" size={20} left={10} style={[themeMode === "dark" && { color: "#fff" }]} />
                </Pressable>
                <Text style={[styles.settingIcon, themeMode === "dark" && { color: "#fff" }]}>Settings</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
                <Pressable onPress={() => navigation.navigate("PrayerSetting")}>
                    <View style={styles.items}>
                        <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>Prayer Setting</Text>
                        <Icon name="right" size={18} color="#000" style={[styles.icon, themeMode === "dark" && { color: "#fff" }]} />
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Notifications")}>
                    <View style={styles.items}>
                        <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>Notifications</Text>
                        <Icon name="right" size={18} color="#000" style={[styles.icon, themeMode === "dark" && { color: "#fff" }]} />
                    </View>
                </Pressable>
                <Pressable onPress={handlePrivacyPress}>
                    <View style={styles.items}>
                        <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>Privacy Policy</Text>
                        <Icon name="right" size={18} color="#000" style={[styles.icon, themeMode === "dark" && { color: "#fff" }]} />
                    </View>
                </Pressable>
                <Pressable onPress={handleAboutUsPress}>
                    <View style={styles.items}>
                        <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>About Us</Text>
                        <Icon name="right" size={18} color="#000" style={[styles.icon, themeMode === "dark" && { color: "#fff" }]} />
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("MoreApps")}>
                    <View style={styles.items}>
                        <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>More Apps</Text>
                        <Icon name="right" size={18} color="#000" style={[styles.icon, themeMode === "dark" && { color: "#fff" }]} />
                    </View>
                </Pressable>
                <Pressable onPress={onShare}>
                    <View style={styles.items}>
                        <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>Share App</Text>
                    </View>
                </Pressable>
                <View style={styles.items}>
                    <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>Dark Mode</Text>
                    <Switch
                        trackColor={{ false: '#B2B2B2', true: '#5BB5AB' }}
                        thumbColor={themeMode === "dark" ? '#0a9484' : '#f4f3f4'}
                        onValueChange={toggleThemeMode}
                        value={themeMode === "dark"}
                    />

                </View>
{/* 
                <View style={styles.items}>
                    <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>Other Setting</Text>
                    <Switch
                        trackColor={{ false: '#B2B2B2', true: '#5BB5AB' }}
                        thumbColor={themeMode === "dark" ? '#0a9484' : '#f4f3f4'}
                        onValueChange={onToggleNotifications}
                        value={notificationsEnabled}
                    />
                </View>
                <Pressable onPress={() => {
                    NotificationMSG()
                }} style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center", top: 20, width: "50%", height: 50 }}>

                    <Text style={{ color: "white" }}>Notification</Text>

                </Pressable> */}
            </View>
        </SafeAreaView>
    );
};
export default Setting;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    setting: {
        flexDirection: "row",
        gap: 115,
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
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
        justifyContent: "space-between",
        padding: 25
    },
    title: {
        fontSize: 14,
        fontWeight: "500"
    },

});
