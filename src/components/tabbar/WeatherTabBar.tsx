import {StyleSheet, View} from 'react-native';
import {ArcComponent} from "./elements/ArcComponent";
import {useApplicationDimensions} from "../../hooks/useApplicationDimensions";
import {TabbarItems} from "./elements/TabbarItems";

interface StyleSheetProps {
    height: number
}

const TABBAR_HEIGHT = 88

export function WeatherTabBar() {
    const {width, height} = useApplicationDimensions()
    const myStyles = styles({height})

    return (
        <View style={myStyles.container}>
            <ArcComponent width={width} height={TABBAR_HEIGHT}/>
            <TabbarItems/>
        </View>
    )
}

const styles = ({height}: StyleSheetProps) => StyleSheet.create({
    container: {
        height: TABBAR_HEIGHT,
        ...StyleSheet.absoluteFillObject,
        top: height - TABBAR_HEIGHT,
    },
})