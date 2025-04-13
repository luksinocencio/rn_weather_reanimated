import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, View } from 'react-native'
import { useApplicationDimensions } from '../../../hooks/useApplicationDimensions'
import { ListIcon } from '../icons/ListIcon'
import { MapIcon } from '../icons/MapIcon'
import { CircleButton } from './CircleButton'
import { TrapezoidBackground } from './TrapezoidBackground'

export function TabbarItems() {
  const { width, height } = useApplicationDimensions()
  const trapezoidWidth = width * 0.68
  const trapezoidHeight = height * 0.12
  const circleRadius = (trapezoidHeight * 0.51) / 2
  const buttonCenterX = width / 2 - circleRadius
  const myStyles = styles({ leftButtonPlus: buttonCenterX, circleRadius })

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  return (
    <View style={myStyles.container}>
      <MapIcon />
      <TrapezoidBackground width={trapezoidWidth} height={trapezoidHeight} />
      <Pressable style={myStyles.pressablePlus}>
        {({ pressed }) => (
          <CircleButton radius={circleRadius} pressed={pressed} />
        )}
      </Pressable>
      <Pressable onPress={() => navigation.navigate('list')}>
        <ListIcon />
      </Pressable>
    </View>
  )
}

const styles = ({
  leftButtonPlus,
  circleRadius,
}: {
  leftButtonPlus: number
  circleRadius: number
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    pressablePlus: {
      ...StyleSheet.absoluteFillObject,
      left: leftButtonPlus,
      top: 12,
      width: circleRadius * 2,
      height: circleRadius * 2,
    },
  })
