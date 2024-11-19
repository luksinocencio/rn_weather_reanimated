import {Pressable, StyleSheet, View} from "react-native";
import {MapIcon} from "../icons/MapIcon";
import {ListIcon} from "../icons/ListIcon";
import {TrapezoidBackground} from "./TrapezoidBackground";
import {useApplicationDimensions} from "../../../hooks/useApplicationDimensions";
import {CircleButton} from "./CircleButton";

export function TabbarItems() {
    const {width, height} = useApplicationDimensions()
    const trapezoidWidth = width * 0.68
    const trapezoidHeight = height * 0.12
    const circleRadius = (trapezoidHeight * 0.51) / 2
    const buttonCenterX = width / 2 - circleRadius

    const myStyles = styles({leftButtonPlus: buttonCenterX, circleRadius})

    return (
        <View style={myStyles.container}>
            <MapIcon/>
            <TrapezoidBackground width={trapezoidWidth} height={trapezoidHeight}/>
            <Pressable style={myStyles.pressablePlus}>
                {({pressed}) => <CircleButton radius={circleRadius} pressed={pressed}/>}
            </Pressable>
            <ListIcon/>
        </View>
    )
}

const styles = ({leftButtonPlus, circleRadius}: { leftButtonPlus: number, circleRadius: number }) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32
    },
    pressablePlus: {
        ...StyleSheet.absoluteFillObject,
        left: leftButtonPlus,
        top: 12,
        width: circleRadius * 2,
        height: circleRadius * 2
    }
})