// SPDX-License-Identifier: ice License 1.0

import {
  SEGMENTED_CONTROL_HEIGHT,
  SegmentedControl,
} from '@components/SegmentedControl';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useSafeAreaInsets} from '@hooks/useSafeAreaInsets';
import {CONTACTS_LIST_PADDING_TOP} from '@screens/Team/components/Contacts/components/ContactsList';
import {useContactsListRenderItems} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useContactsListRenderItems';
import {useGetContactSegments} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import {SEARCH_INPUT_TOP_OFFSET} from '@screens/Team/components/Header/components/Search';
import {SEGMENTED_CONTROL_PADDING_TOP} from '@screens/Team/components/SegmentedContent';
import {SEGMENTS} from '@screens/Team/components/SegmentedContent/segments';
import {WalkthroughElementContainer} from '@screens/Walkthrough/components/WalkthroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const OUTER_CONTAINER_VERTICAL_PADDING = rem(16);

export const useContactsListWalkthrough = () => {
  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const {top: topInset} = useSafeAreaInsets();

  const onElementLayout = () => {
    setWalkthroughElementData({
      stepKey: 'contactsList',
      elementData: {
        getRef: () => null,
        getTop: () => {
          return (
            topInset +
            SEARCH_INPUT_TOP_OFFSET -
            OUTER_CONTAINER_VERTICAL_PADDING
          );
        },
        render: () => (
          <WalkthroughElementContainer
            outerStyle={styles.outerContainer}
            innerStyle={styles.innerContainer}
            pointerEvents={'none'}>
            <ContactsListWalkthrough />
            <View style={styles.segmentedControl}>
              <SegmentedControl segments={SEGMENTS} initialIndex={0} />
            </View>
          </WalkthroughElementContainer>
        ),
      },
    });
  };

  return {
    onElementLayout,
  };
};

const ContactsListWalkthrough = () => {
  const {sections} = useGetContactSegments(false);

  const {renderItem, renderSectionHeader} = useContactsListRenderItems();

  return (
    <SectionList
      contentContainerStyle={styles.contactList}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: OUTER_CONTAINER_VERTICAL_PADDING,
  },
  innerContainer: {
    marginLeft: SCREEN_SIDE_OFFSET / 2,
    marginRight: SCREEN_SIDE_OFFSET / 2,
    paddingTop: SEGMENTED_CONTROL_PADDING_TOP + SEGMENTED_CONTROL_HEIGHT,
  },
  contactList: {
    paddingHorizontal: SCREEN_SIDE_OFFSET / 2,
    paddingTop: CONTACTS_LIST_PADDING_TOP,
  },
  segmentedControl: {
    position: 'absolute',
    top: SEGMENTED_CONTROL_PADDING_TOP,
    right: SCREEN_SIDE_OFFSET / 2,
    left: SCREEN_SIDE_OFFSET / 2,
  },
});
