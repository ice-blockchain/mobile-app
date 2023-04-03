// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {NewsArticle} from '@screens/News/components/NewsArticle';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units/index';

const MAIN_PADDING = rem(16);

type Props = {
  newsArticleId?: string;
};

export const useReleasedNewsWalkthrough = ({newsArticleId}: Props) => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const [canSetWalkthroughElementData, setCanSetWalkthroughElementData] =
    useState(false);

  useEffect(() => {
    if (newsArticleId && canSetWalkthroughElementData) {
      setWalkthroughElementData({
        stepKey: 'releasedNews',
        elementData: {
          getRef: () => elementRef,
          getTop: measurements => measurements.pageY - MAIN_PADDING,
          render: ({measurements}) => {
            return (
              <View style={styles.mainContainer}>
                <View style={{width: measurements.width}}>
                  <NewsArticle newsArticleId={newsArticleId} />
                </View>
              </View>
            );
          },
        },
      });
    }
  }, [canSetWalkthroughElementData, newsArticleId, setWalkthroughElementData]);

  const onElementLayout = useCallback(() => {
    setCanSetWalkthroughElementData(true);
  }, []);

  return {
    onElementLayout,
    elementRef,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: MAIN_PADDING,
    backgroundColor: COLORS.white02opacity,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
