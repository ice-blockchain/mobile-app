// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const DESCRIPTION_OFFSET = rem(10);

export const Tooltip = () => {
  const {
    params: {
      descriptionPosition,
      targetRef,
      TargetComponent,
      DescriptionComponent,
    },
  } = useRoute<RouteProp<MainStackParamList, 'Tooltip'>>();

  const [targetData, setTargetData] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    targetRef.current?.measure((x, y, width, height) => {
      setTargetData({x, y, width, height});
    });
  }, [targetRef]);

  return (
    <View style={styles.container}>
      {targetData && (
        <View style={[styles.target, {top: targetData.y, left: targetData.x}]}>
          {TargetComponent}
        </View>
      )}
      {targetData && (
        <View
          style={[
            styles.description,
            descriptionPosition === 'below'
              ? {
                  top: targetData.y + targetData.height + DESCRIPTION_OFFSET,
                }
              : {
                  bottom: targetData.y + DESCRIPTION_OFFSET,
                },
          ]}>
          {DescriptionComponent}
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
  },
  description: {
    position: 'absolute',
  },
});
