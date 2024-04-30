// SPDX-License-Identifier: ice License 1.0

import {stopPropagation} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Connector} from '@screens/Modals/Tooltip/assets/svg/Connector';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {rem} from 'rn-units';

// Sometimes because of rounding may lost pixel and it prevents empty line between elements
const EXTRA_PIXELS_OVERLAP = 1;

export const Tooltip = () => {
  const navigation = useNavigation();
  const {
    params: {
      position,
      targetRef,
      TargetComponent,
      DescriptionComponent,
      targetCircleSize = rem(60),
      descriptionOffset = rem(40),
    },
  } = useRoute<RouteProp<MainStackParamList, 'Tooltip'>>();

  const [targetData, setTargetData] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const [containerHeight, setContainerHeight] = useState(0);

  const connectorHeight =
    descriptionOffset *
      // It is just "magic" multiplier number, previously it was 1.125
      1.1579 +
    EXTRA_PIXELS_OVERLAP;

  const onLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  useEffect(() => {
    targetRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      // measure might return undefined values e.g. when underlying view is removed by android (removeClippedSubviews)
      if (pageX && pageY && width && height) {
        setTargetData({x: pageX, y: pageY, width, height});
      }
    });
  }, [targetRef]);

  return (
    <TouchableWithoutFeedback onLayout={onLayout} onPress={navigation.goBack}>
      <View style={styles.container}>
        {targetData && (
          <>
            <View
              {...stopPropagation}
              style={[
                styles.target,
                {
                  top: targetData.y,
                  left: targetData.x,
                  width: targetData.width,
                },
              ]}>
              {targetCircleSize && (
                <View
                  style={[
                    styles.targetCircle,
                    {
                      width: targetCircleSize,
                      height: targetCircleSize,
                      borderRadius: targetCircleSize / 2,
                    },
                  ]}>
                  <Connector
                    style={[
                      styles.connector,
                      position === 'below'
                        ? {bottom: -(descriptionOffset + EXTRA_PIXELS_OVERLAP)}
                        : {top: -(descriptionOffset + EXTRA_PIXELS_OVERLAP)},
                    ]}
                    height={connectorHeight}
                    width={(connectorHeight * 48) / 45}
                    color={COLORS.white}
                  />
                </View>
              )}
              <TargetComponent onPress={navigation.goBack} />
            </View>
            {targetData && (
              <View
                {...stopPropagation}
                style={[
                  styles.description,
                  position === 'below'
                    ? {
                        top:
                          targetData.y +
                          targetData.height +
                          (targetCircleSize - targetData.height) / 2 +
                          descriptionOffset,
                      }
                    : {
                        bottom:
                          containerHeight -
                          targetData.y +
                          (targetCircleSize - targetData.height) / 2 +
                          descriptionOffset,
                      },
                ]}>
                <DescriptionComponent />
              </View>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
  },
  target: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetCircle: {
    position: 'absolute',
    backgroundColor: COLORS.white,
  },
  description: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  connector: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
