// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {useSafeAreaFrame} from '@hooks/useSafeAreaFrame';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {Header, HEADER_HEIGHT} from '@navigation/components/Header';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useImageGesture} from '@screens/ImageView/hooks/useImageGesture';
import {useImageMeasure} from '@screens/ImageView/hooks/useImageMeasure';
import {useImageSizedUri} from '@screens/ImageView/hooks/useImageSizedUri';
import {useImageZoomAnimation} from '@screens/ImageView/hooks/useImageZoomAnimation';
import {t} from '@translations/i18n';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ImageView = () => {
  const {
    params: {imageRef, uri, size, borderRadius = 0},
  } = useRoute<RouteProp<MainStackParamList, 'ImageView'>>();

  const {top: topInset, bottom: bottomInset} = useSafeAreaInsets();
  const viewPortWidth = windowWidth;
  const frame = useSafeAreaFrame();
  const viewPortHeight = frame.height - topInset - bottomInset - HEADER_HEIGHT;

  const {imageMeasure} = useImageMeasure(imageRef, topInset + HEADER_HEIGHT);
  const {imageUri} = useImageSizedUri(uri, size);
  const {animatedZoomStyle, animatedOpacityStyle, zoomAnimationDone} =
    useImageZoomAnimation(
      size,
      borderRadius,
      viewPortWidth,
      viewPortHeight,
      imageMeasure,
    );
  const {gesture, animatedGestureStyle} = useImageGesture(
    viewPortWidth,
    viewPortHeight,
  );

  const initialStyle = useMemo(() => {
    return StyleSheet.create({
      // eslint-disable-next-line react-native/no-unused-styles
      current: imageMeasure
        ? {
            top: imageMeasure.y,
            left: imageMeasure.x,
            width: imageMeasure.width,
            height: imageMeasure.height,
            borderRadius,
          }
        : {},
    });
  }, [imageMeasure, borderRadius]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        {imageMeasure && (
          <>
            <Animated.Image
              source={{uri: imageUri}}
              style={[
                styles.image,
                initialStyle.current,
                animatedZoomStyle,
                animatedGestureStyle,
              ]}
            />
            {zoomAnimationDone && (
              // render GestureDetector only when the zoom animation is done cuz
              // GestureDetector's gesture uses native handlers and mounting of which
              // leads to the FPS drop
              <GestureDetector gesture={gesture}>
                <View style={StyleSheet.absoluteFill} />
              </GestureDetector>
            )}
          </>
        )}
      </View>
      <Animated.View style={[animatedOpacityStyle, styles.header]}>
        <Header
          backLabel={t('button.back')}
          backgroundColor={'transparent'}
          color={COLORS.white}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    position: 'absolute',
    top: 0,
  },
  imageWrapper: {
    marginTop: HEADER_HEIGHT,
    flex: 1,
  },
  image: {
    position: 'absolute',
  },
});
