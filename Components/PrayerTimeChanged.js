import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/AntDesign';
const PrayerTimeChanged = () => {
    const [today, setToday] = useState(new Date());
    const [hijriDate, setHijriDate] = useState('');
    const [gregorianDate, setGregorianDate] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.aladhan.com/v1/gToHCalendar/${today.getMonth() + 1}/${today.getFullYear()}`
                );
                const data = await response.json();
                const currentDateData = data.data.find(
                    (item) => item.gregorian.date === formatDate(today)
                );
                if (currentDateData) {
                    setHijriDate(
                        `${currentDateData.hijri.day} ${currentDateData.hijri.month.en}, ${currentDateData.hijri.year}`
                    );
                    setGregorianDate(
                        `${currentDateData.gregorian.weekday.en}, ${currentDateData.gregorian.day} ${currentDateData.gregorian.month.en}`
                    );
                }
            } catch (error) {
                console.error('Error fetching prayer times:', error);
            }
        };

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        fetchData();
    }, [today]);

    const goToPreviousDate = () => {
        const previousDate = new Date(today);
        previousDate.setDate(previousDate.getDate() - 1);
        if (previousDate >= new Date()) {
            setToday(previousDate);
        }
    };

    const goToNextDate = () => {
        setToday(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
    };

    return (
        <SafeAreaView style={{ flex: 1,top:60 }}>
            <View style={styles.dateSetting}>
                <Pressable hitSlop={30} onPress={goToPreviousDate}>
                    <Feather name="left" size={22} />
                </Pressable>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>{gregorianDate}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '400' }}>{hijriDate}</Text>
                </View>
                <Pressable hitSlop={30} onPress={goToNextDate}>
                    <Feather name="right" size={22} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default PrayerTimeChanged;

const styles = StyleSheet.create({
    dateSetting: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
