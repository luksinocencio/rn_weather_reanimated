import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import { Fragment } from 'react'
import {
  Image,
  ImageBackground,
  ScaledSize,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'

export function HomeBackground() {
  const dimensions = useWindowDimensions()
  const { width, height } = dimensions
  const myStyles = styles(dimensions)

  return (
    <Fragment>
      <Canvas style={myStyles.container}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={['#2e335a', '#1c1b33']}
          />
        </Rect>
      </Canvas>
      <ImageBackground
        source={require('../assets/home/Background.png')}
        resizeMode='cover'
        style={myStyles.imageBackground}>
        <Image
          source={require('../assets/home/House.png')}
          resizeMode='cover'
          style={myStyles.houseImage}
        />
      </ImageBackground>
    </Fragment>
  )
}

const styles = ({ width }: ScaledSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackground: {
      height: '100%',
    },
    houseImage: {
      width: width,
      height: width,
      ...StyleSheet.absoluteFillObject,
      top: '36%',
    },
  })
