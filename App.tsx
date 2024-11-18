import { StatusBar } from 'expo-status-bar'
import { Fragment } from 'react'
import { HomeBackground } from './src/components/HomeBackground'

export default function App() {
  return (
    <Fragment>
      <HomeBackground />
      <StatusBar style='light' />
    </Fragment>
  )
}
