import { Pressable, SafeAreaView, StyleSheet, Text, View, Image, FlatList, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuthContext } from '../Navigations/AuthContext';
const RenderItem = ({ item }) => {
    const { themeMode } = useAuthContext();
    const handlePress = () => {
        Linking.openURL(item.uri);
    };
    return (
       <View style = {{}}>
         <Pressable onPress={handlePress} style={styles.item}>
            <View style={styles.blockImag}>
                <Image style={styles.innerImage} source={item.image} />
            </View>
           <View style = {{alignItems:"center",justifyContent:"center"}}>
           <Text numberOfLines={1} style={[styles.titleText, themeMode === "dark" && { color: "#fff" }]}>{item.title}</Text>
           </View>
        </Pressable>
       </View>
    );
};
const MoreApps = ({ navigation }) => {
    const { themeMode } = useAuthContext();
    const data = [
        {
            id: 1,
            image: require('../Images/shalat.png'),
            title: "Jamaat ",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.jamaat"
        },
        {
            id: 2,
            image: require('../Images/time.png'),
            title: "Prayer Time",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.jamaat.prayertime"
        },
        {
            id: 3,
            image: require('../Images/qibla.png'),
            title: "Qibla ",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.jamaat.qibla"
        },
        {
            id: 4,
            image: require('../Images/tasbih.png'),
            title: "Tasbih",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.tasbih&hl=en_US"
        },
        {
            id: 5,
            image: require('../Images/allah.png'),
            title: "Allah Names",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.allah.names"
        },
        {
            id: 6,
            image: require('../Images/dua.png'),
            title: "Dua",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.dua&hl=en&gl=US"
        },
        {
            id: 7,
            image: require('../Images/quran.png'),
            title: "Hadith",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.hadith"
        },
        {
            id: 8,
            image: require('../Images/mosque.png'),
            title: "Masjid",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.masjid"
        },
        {
            id: 9,
            image: require('../Images/calendar.png'),
            title: "Calendar",
            uri: "https://play.google.com/store/apps/details?id=com.mslm.islamic.calendar&hl=en_US"
        },

    ];
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: "#FFFFFF", }, themeMode === "dark" && { backgroundColor: "#1C1C22", color: "#fff" }]}>
            <View style={styles.header}>
                <Pressable hitSlop={30} onPress={() => navigation.goBack()}>
                    <Icon name="left" size={20}left={10} style = {[themeMode === "dark" && { color: "#fff" }]}/>
                </Pressable>
                <Text style={[styles.leftIcon,themeMode === "dark" && { color: "#fff" }]}>More Apps</Text>
            </View>
            <FlatList
                data={data}
                numColumns={3}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}
export default MoreApps
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 110,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        height: 60,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    leftIcon: {
       
        fontSize: 22,
        fontWeight: "700",
    },
    item: {
        flexDirection: 'column',
        marginHorizontal: 20,
        marginVertical: 18,
        top: 20,
        alignItems: "center",
        justifyContent:"center",
        
    },
    blockImag: {
        backgroundColor: "#0a9484",
        borderRadius: 8,
        margin: 0,
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",

    },
    innerImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        // tintColor:"#fff"
    },
    titleText: {
        marginTop: 10,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center",
        
    },
    flatListContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
      
    }
})
