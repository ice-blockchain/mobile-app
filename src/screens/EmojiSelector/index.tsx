// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import BottomSheet, {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import {BottomSheetSectionListMethods} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {EmojiRow, ROW_HEIGHT} from '@screens/EmojiSelector/components/EmojiRow';
import {EmojiSelectorBackdrop} from '@screens/EmojiSelector/components/EmojiSelectorBackdrop';
import {EmojiSelectorBackground} from '@screens/EmojiSelector/components/EmojiSelectorBackground';
import {EmojiSelectorHeader} from '@screens/EmojiSelector/components/EmojiSelectorHeader';
import {EmojiSelectorSectionHeader} from '@screens/EmojiSelector/components/EmojiSelectorSectionHeader';
import {
  categories,
  categoryOffsets,
  sections,
} from '@screens/EmojiSelector/data';
import {
  EmojiCategory,
  EmojiData,
  EmojiSelectorSection,
} from '@screens/EmojiSelector/type';
import {
  findEmojis,
  getItemLayout,
  splitArrayIntoChunks,
} from '@screens/EmojiSelector/utils';
import {useScrollEventsHandlersCustom} from '@screens/HomeFlow/BalanceHistory/components/DynamicHeight/hooks/useScrollEventsHandlersCustom';
import {EmojiHistoryActions} from '@store/modules/EmojiHistory/actions';
import {emojiHistorySelector} from '@store/modules/EmojiHistory/selectors';
import * as React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {runOnJS, useAnimatedReaction} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

const SNAP_POINTS = ['90%'];

export function EmojiSelector() {
  const navigation = useNavigation();
  const sectionListRef = useRef<BottomSheetSectionListMethods>(null);
  const route = useRoute<RouteProp<MainStackParamList, 'EmojiSelector'>>();
  const {onSelected: paramsOnSelected} = route.params;
  const emojiHistory = useSelector(emojiHistorySelector);
  const emojiHistoryData = useMemo(
    () =>
      emojiHistory.map(emoji => ({
        emoji,
        keywords: [],
      })),
    [emojiHistory],
  );

  const dispatch = useDispatch();
  const onSelected = useCallback(
    (emoji: string) => {
      paramsOnSelected(emoji);
      dispatch(EmojiHistoryActions.ADD_EMOJI_TO_HISTORY.STATE.create(emoji));
      navigation.goBack();
    },
    [dispatch, navigation, paramsOnSelected],
  );

  const renderItem = ({
    item,
    section,
  }: {
    item: EmojiData[];
    section: EmojiSelectorSection;
  }) => {
    const emojis = section.title === 'recent' ? emojiHistoryData : item;
    return <EmojiRow emojis={emojis} onSelected={onSelected} />;
  };

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: EmojiCategory};
  }) => {
    return <EmojiSelectorSectionHeader category={title} />;
  };

  const {useDefaultHook, scrollY} = useScrollEventsHandlersCustom();
  const [activeCategory, setActiveCategory] = useState<EmojiCategory>('recent');
  const onSetActiveCategory = useCallback(
    (newActiveCategory: EmojiCategory) => {
      if (sectionListRef.current) {
        const sectionIndex = categories.findIndex(
          category => category === newActiveCategory,
        );
        if (sectionIndex >= 0) {
          sectionListRef.current.scrollToLocation({
            animated: true,
            itemIndex: sectionIndex ? -1 : 0,
            sectionIndex,
          });
          scrollY.value = sectionIndex
            ? categoryOffsets[sectionIndex - 1].offset
            : 0;
        }
      }
    },
    [scrollY],
  );

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<EmojiSelectorSection>({
    title: 'search_results',
    data: [],
  });

  useEffect(() => {
    setSearchResults(current => ({
      ...current,
      data: splitArrayIntoChunks(findEmojis({searchValue, sections})),
    }));
  }, [searchValue]);

  const updateActiveCategory = useCallback((offset: number) => {
    const cOffset = categoryOffsets.find(
      categoryOffset => categoryOffset.offset > offset,
    );
    if (cOffset) {
      setActiveCategory(cOffset.category);
    }
  }, []);

  useAnimatedReaction(
    () => scrollY.value,
    (result, previous) => {
      if (!previous || Math.abs(result - previous) > ROW_HEIGHT) {
        runOnJS(updateActiveCategory)(result);
      }
    },
    [],
  );

  return (
    <BottomSheet
      enablePanDownToClose
      animateOnMount
      backdropComponent={EmojiSelectorBackdrop}
      backgroundComponent={EmojiSelectorBackground}
      handleComponent={null}
      style={styles.container}
      snapPoints={SNAP_POINTS}
      onChange={(index: number) => {
        if (index === -1) {
          navigation.goBack();
        }
      }}>
      <EmojiSelectorHeader
        categories={categories}
        onSetActiveCategory={onSetActiveCategory}
        setSearchValue={setSearchValue}
        scrollY={scrollY}
        activeCategory={activeCategory}
      />
      <BottomSheetSectionList
        ref={sectionListRef}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        sections={searchValue ? [searchResults] : sections}
        renderItem={renderItem}
        initialNumToRender={2}
        windowSize={3}
        renderSectionHeader={renderSectionHeader}
        getItemLayout={getItemLayout}
        scrollEventsHandlersHook={useDefaultHook}
        stickySectionHeadersEnabled={false}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: rem(20),
    borderTopLeftRadius: rem(20),
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  contentContainer: {
    marginTop: -rem(8),
    backgroundColor: COLORS.white,
  },
});
