// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem, screenHeight} from 'rn-units';

export const Tooltip = () => {
  const {
    params: {
      descriptionPosition,
      targetRef,
      TargetComponent,
      DescriptionComponent,
      targetCircleSize,
      descriptionOffset = rem(20),
    },
  } = useRoute<RouteProp<MainStackParamList, 'Tooltip'>>();

  const [targetData, setTargetData] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    targetRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTargetData({x: pageX, y: pageY, width, height});
    });
  }, [targetRef]);

  return (
    <View style={styles.container}>
      {targetData && (
        <View
          style={[
            styles.target,
            {top: targetData.y, left: targetData.x, width: targetData.width},
          ]}>
          {targetCircleSize && (
            <View
              style={[
                styles.targetCircle,
                {
                  width: rem(targetCircleSize),
                  height: rem(targetCircleSize),
                  borderRadius: rem(targetCircleSize) / 2,
                },
              ]}
            />
          )}
          <TargetComponent />
        </View>
      )}
      {targetData && (
        <View
          style={[
            styles.description,
            descriptionPosition === 'below'
              ? {
                  top: targetData.y + targetData.height + descriptionOffset,
                }
              : {
                  bottom: screenHeight - targetData.y + descriptionOffset,
                },
          ]}>
          <DescriptionComponent />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black04opacity,
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
});
