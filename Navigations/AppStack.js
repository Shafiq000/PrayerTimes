import React from 'react'
// import { NavigationCotainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainScreen from '../Screens/MainScreen';
import Setlocation from '../Screens/Setlocation';
import Setting from '../Screens/Setting';
import MoreApps from '../Screens/MoreApps';
import Notifications from '../Screens/Notifications';
import PrayerSetting from '../Screens/PrayerSetting';
import CheckInternet from '../Screens/CheckInternet';
const Stack = createNativeStackNavigator();
function AppStack() {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="MainScreen" component={MainScreen} />
         <Stack.Screen name="Setlocation" component={Setlocation} />
         <Stack.Screen name="Setting" component={Setting} />
         <Stack.Screen name="MoreApps" component={MoreApps} />
         <Stack.Screen name="Notifications" component={Notifications} />
         <Stack.Screen name="PrayerSetting" component={PrayerSetting} />
         <Stack.Screen name="CheckInternet" component={CheckInternet} />
        </Stack.Navigator>
    )
}

export default AppStack
 