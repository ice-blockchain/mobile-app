// SPDX-License-Identifier: ice License 1.0

import {
  SEGMENTED_CONTROL_HEIGHT,
  SegmentedControl,
} from '@components/SegmentedControl';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import Clipboard from '@react-native-clipboard/clipboard';
import {Contacts} from '@screens/Team/components/Contacts';
import {useSegmentedControlWalkthrough} from '@screens/Team/components/SegmentedContent/hooks/useSegmentedControlWalkthrough';
import {
  SegmentIndex,
  useSegmentedMethods,
} from '@screens/Team/components/SegmentedContent/hooks/useSegmentedMethods';
import {TierList} from '@screens/Team/components/TierList';
import {Listener} from '@screens/Team/types';
import {logsSelector} from '@store/modules/AppCommon/selectors';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

import {SEGMENTS} from './segments';

type Props = {
  addCollapsedSnapPointListener: (key: string, listener: Listener) => void;
};

export const SEGMENTED_CONTROL_PADDING_TOP = rem(20);
export const CONTAINER_PADDING_TOP =
  SEGMENTED_CONTROL_HEIGHT + SEGMENTED_CONTROL_PADDING_TOP;

export const SegmentedContent = memo(
  ({addCollapsedSnapPointListener}: Props) => {
    const {
      activeIndex,
      onPageChange,
      onSegmentedControlChange,
      switcherRef,
      pagerRef,
    } = useSegmentedMethods();

    const {
      elementRef: segmentedControlRef,
      onElementLayout: onSegmentedControlLayout,
    } = useSegmentedControlWalkthrough();

    const logs = useSelector(logsSelector);

    return (
      <View style={styles.container}>
        <PagerView
          initialPage={0}
          style={styles.flex}
          ref={pagerRef}
          onPageSelected={onPageChange}>
          <View style={styles.flex}>
            <Contacts
              focused={activeIndex === SegmentIndex.ContactList}
              addCollapsedSnapPointListener={addCollapsedSnapPointListener}
            />
          </View>
          <View style={styles.flex}>
            <TierList
              referralType="T1"
              emptyTitle={t('users.referralType.T1')}
              focused={activeIndex === SegmentIndex.Tier1List}
              addCollapsedSnapPointListener={addCollapsedSnapPointListener}
            />
          </View>
          <View style={styles.flex}>
            <TierList
              referralType="T2"
              emptyTitle={t('users.referralType.T2')}
              focused={activeIndex === SegmentIndex.Tier2List}
              addCollapsedSnapPointListener={addCollapsedSnapPointListener}
            />
          </View>
          <View style={styles.flex}>
            <Text
              onPress={() => Clipboard.setString(logs.join('\n'))}
              style={styles.button}>
              Copy all
            </Text>
            <ScrollView
              style={styles.flex}
              contentContainerStyle={{flexGrow: 1}}>
              {logs.map((event, index) => (
                <Text key={index}>{event}</Text>
              ))}
            </ScrollView>
          </View>
        </PagerView>
        <View
          ref={segmentedControlRef}
          onLayout={onSegmentedControlLayout}
          style={styles.tabbar}>
          <SegmentedControl
            segments={SEGMENTS}
            ref={switcherRef}
            onChange={onSegmentedControlChange}
            initialIndex={0}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: CONTAINER_PADDING_TOP,
  },
  tabbar: {
    position: 'absolute',
    top: SEGMENTED_CONTROL_PADDING_TOP,
    right: SCREEN_SIDE_OFFSET,
    left: SCREEN_SIDE_OFFSET,
  },
  button: {color: 'blue', textAlign: 'center', marginVertical: 15},
});
