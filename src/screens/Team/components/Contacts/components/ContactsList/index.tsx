// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {BottomSheetSectionList} from '@components/BottomSheet';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useAddCollapsedSnapPointListener} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useAddCollapsedSnapPointListener';
import {useContactsListRenderItems} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useContactsListRenderItems';
import {useContactsListWalkthrough} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useContactsListWalkthrough';
import {
  ContactSection,
  ContactSectionDataItem,
  useGetContactSegments,
} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  focused: boolean;
  addCollapsedSnapPointListener: (key: string, listener: () => void) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const CONTACTS_LIST_PADDING_TOP = rem(16);

export const ContactsList = ({
  focused,
  addCollapsedSnapPointListener,
  containerStyle,
}: Props) => {
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const {sections, loadNext, loadNextLoading, refreshing} =
    useGetContactSegments(focused);

  const {renderItem, renderSectionHeader} = useContactsListRenderItems();

  const {bottomSheetRef} = useAddCollapsedSnapPointListener({
    addListener: addCollapsedSnapPointListener,
    hasSections: sections.length > 0,
  });

  const {onElementLayout: onContactsListLayout} = useContactsListWalkthrough();

  return (
    <BottomSheetSectionList<ContactSectionDataItem, ContactSection>
      ref={bottomSheetRef}
      onLayout={onContactsListLayout}
      contentContainerStyle={[
        tabbarOffset.current,
        styles.container,
        containerStyle,
      ]}
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={
        loadNextLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      showsVerticalScrollIndicator={false}
      onEndReached={focused ? loadNext : null}
      refreshing={refreshing}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: CONTACTS_LIST_PADDING_TOP,
  },
  loadingIndicator: {
    alignItems: 'center',
    flex: 1,
  },
});
