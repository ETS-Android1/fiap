import {
    Dimensions, 
    Platform, 
    PixelRatio
} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 375;
export function resize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function hp(size) {
  let porcetagem = (size * 100) / 667;
  return (porcetagem * SCREEN_HEIGHT) / 100;
}

export function wp(size) {
  let porcetagem = (size * 100) / 375;
  return (porcetagem * SCREEN_WIDTH) / 100;
}