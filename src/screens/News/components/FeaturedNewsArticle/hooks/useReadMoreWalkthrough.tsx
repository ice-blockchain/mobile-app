// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ReadMoreButton} from '@screens/News/components/FeaturedNewsArticle/components/ReadMoreButton';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units/index';

const MAIN_PADDING = rem(12);
const PADDING = rem(8);

type Props = {
  onPress: () => void;
};

export const useReadMoreWalkthrough = ({onPress}: Props) => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'newsReadMore',
      elementData: {
        getRef: () => elementRef,
        getTop: measurements => measurements.pageY - (MAIN_PADDING + PADDING),
        render: ({measurements}) => {
          return (
            <View
              style={{
                paddingLeft: measurements.pageX - (MAIN_PADDING + PADDING),
              }}>
              <View style={styles.container}>
                <View style={styles.mainContainer}>
                  <View style={{width: measurements.width}}>
                    <ReadMoreButton onPress={onPress} />
                  </View>
                </View>
              </View>
            </View>
          );
        },
      },
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  container: {
    padding: PADDING,
    backgroundColor: COLORS.white02opacity,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    padding: MAIN_PADDING,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
