import {StyleSheet} from 'react-native';
import {Canvas, LinearGradient, Path, vec} from "@shopify/react-native-skia";

interface ArcComponentProps {
    width: number,
    height: number
}

export function ArcComponent({width, height}: ArcComponentProps) {
    const arcPath = `M 0 0 Q ${width / 2} ${height / 2} ${width} 0 L ${width} ${height} L 0 ${height} Z`
    const arcBorder = `M 0 0 Q ${width / 2} ${height / 2} ${width} 0`;

    return (
        <Canvas style={{height: height, ...StyleSheet.absoluteFillObject}}>
            <Path path={arcPath}>
                <LinearGradient
                    start={vec(width / 2, 0)}
                    end={vec(width / 2, height)}
                    colors={['rgba(58,58,106,1)', 'rgba(37,36,76,01)']}
                />
            </Path>
            <Path
                path={arcBorder}
                style={"stroke"}
                strokeWidth={0.5}
                color={"rgba(117,130,244,0.5)"}
            />
        </Canvas>
    )
}

const styles = StyleSheet.create({})