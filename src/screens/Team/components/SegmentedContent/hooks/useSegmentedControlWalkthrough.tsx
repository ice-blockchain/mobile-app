// SPDX-License-Identifier: ice License 1.0

import {
  SEGMENTED_CONTROL_HEIGHT,
  SEGMENTED_CONTROL_HORIZONTAL_OFFSET,
} from '@components/SegmentedControl';
import {Segment} from '@components/SegmentedControl/components/Segment';
import {SegmentIndicator} from '@components/SegmentedControl/components/SegmentIndicator';
import {COLORS} from '@constants/colors';
import {SEGMENTS} from '@screens/Team/components/SegmentedContent/segments';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const OUTER_VERTICAL_PADDING = rem(16);
const OUTER_HORIZONTAL_PADDING = rem(16);
const INNER_VERTICAL_PADDING = rem(12);
const INNER_HORIZONTAL_PADDING = rem(20);

export const useSegmentedControlWalkthrough = () => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const onElementLayout = () => {
    SEGMENTS.forEach((segmentData, index) => {
      const stepKey = (
        {
          Contacts: null,
          TierOne: 'segmentedControlTierOne',
          TierTwo: 'segmentedControlTierTwo',
          Team: 'segmentedControlTierOne',
        } as const
      )[segmentData.key];

      if (!stepKey) {
        return;
      }

      setWalkthroughElementData({
        stepKey,
        elementData: {
          getRef: () => elementRef,
          getTop: measurements => {
            return (
              measurements.pageY -
              OUTER_VERTICAL_PADDING -
              INNER_VERTICAL_PADDING
            );
          },
          render: ({measurements}) => {
            const sectionWidth =
              (measurements.width - SEGMENTED_CONTROL_HORIZONTAL_OFFSET * 2) /
              SEGMENTS.length;
            const left =
              measurements.pageX +
              sectionWidth * index -
              OUTER_HORIZONTAL_PADDING -
              INNER_HORIZONTAL_PADDING +
              SEGMENTED_CONTROL_HORIZONTAL_OFFSET;
            return (
              <View style={[styles.outerContainer, {left}]}>
                <View style={styles.innerContainer}>
                  <View style={[styles.section, {width: sectionWidth}]}>
                    <SegmentIndicator />
                    <Segment active={true} segment={segmentData} />
                  </View>
                </View>
              </View>
            );
          },
        },
      });
    });
  };

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: rem(20),
    paddingVertical: OUTER_VERTICAL_PADDING,
    paddingHorizontal: OUTER_HORIZONTAL_PADDING,
    backgroundColor: COLORS.white02opacity,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  innerContainer: {
    borderRadius: rem(20),
    paddingVertical: INNER_VERTICAL_PADDING,
    paddingHorizontal: INNER_HORIZONTAL_PADDING,
    backgroundColor: COLORS.white,
  },
  section: {
    height: SEGMENTED_CONTROL_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
