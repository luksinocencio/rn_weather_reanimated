import { Feather, Ionicons } from '@expo/vector-icons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  Shadow,
  vec,
} from '@shopify/react-native-skia'
import React from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackgroundGradient } from '../components/BackgroundGradient'
import { WeatherWidget } from '../components/WeatherWidget'
import { useApplicationDimensions } from '../hooks/useApplicationDimensions'

export function WeatherList() {
  const { top } = useSafeAreaInsets()
  const { width } = useApplicationDimensions()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  const spaceFromTop =
    Platform.select({
      ios: top + 20,
      android: top + 10,
    }) ?? 10

  return (
    <>
      <BackgroundGradient />
      <View style={{ paddingTop: spaceFromTop }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingBottom: 8,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Pressable onPress={() => navigation.navigate('home')}>
              <Ionicons
                name="chevron-back"
                size={34}
                color="rgba(235,235,245,0.6)"
              />
            </Pressable>
            <Text style={styles.titleText}>Wheather</Text>
          </View>
          <Ionicons name="ellipsis-horizontal-circle" size={34} color="white" />
        </View>
        <View style={{ marginHorizontal: 16, borderRadius: 10, height: 36 }}>
          <Canvas style={{ ...StyleSheet.absoluteFillObject }}>
            <RoundedRect x={0} y={0} width={width - 32} height={36} r={10}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width - 32, 36)}
                colors={['rgba(46,51,90,026)', 'rgba(28,27,51,0.26)']}
              />
              <Shadow dx={0} dy={4} blur={4} color="rgba(0,0,0,1)" inner />
            </RoundedRect>
          </Canvas>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: 8,
              alignItems: 'center',
            }}
          >
            <Feather name="search" size={17} color="rgba(235,235,245,0.6)" />
            <TextInput
              placeholder="Search for a city or airport"
              placeholderTextColor="rgba(235, 235, 246,0.6)"
              style={styles.searchInput}
              cursorColor={'rgba(235, 235, 246,0.6)'}
              underlineColorAndroid="transparent"
              multiline={false}
              scrollEnabled={false}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <WeatherWidget />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontFamily: 'SF-Semibold',
    fontSize: 28,
    lineHeight: 34,
  },
  searchInput: {
    color: 'rgba(235, 235, 246, 0.6)',
    fontFamily: 'SF-Regular',
    fontSize: 17,
    lineHeight: 22,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})
