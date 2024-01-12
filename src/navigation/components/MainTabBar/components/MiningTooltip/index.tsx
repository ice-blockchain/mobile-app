// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useIsEnglishLocale} from '@hooks/useIsEnglishLocale';
import {MiningInfo} from '@navigation/components/MainTabBar/components/MiningTooltip/components/MiningInfo';
import {PreStakingCall} from '@navigation/components/MainTabBar/components/MiningTooltip/components/PreStakingCall';
import {
  PreStakingInfo,
  STACK_MAN_HEIGHT,
  STACK_MAN_OVERFLOW,
} from '@navigation/components/MainTabBar/components/MiningTooltip/components/PreStakingInfo';
import {useNavigation} from '@react-navigation/native';
import {
  isMiningActiveSelector,
  isPreStakingActiveSelector,
} from '@store/modules/Tokenomics/selectors';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const MiningTooltip = () => {
  const navigation = useNavigation();

  const isMiningActive = useSelector(isMiningActiveSelector);
  const isPreStakingActive = useSelector(isPreStakingActiveSelector);
  const isEnglishLocale = useIsEnglishLocale();

  useEffect(() => {
    if (!isMiningActive) {
      navigation.goBack();
    }
  }, [isMiningActive, navigation]);

  if (!isMiningActive) {
    return null;
  }

  const oneColumn = !isEnglishLocale;

  return (
    <View
      style={[styles.container, isPreStakingActive && styles.container_big]}>
      <MiningInfo oneColumn={oneColumn} />
      {isLightDesign ? (
        <View style={styles.bottomContainer} />
      ) : isPreStakingActive ? (
        <PreStakingInfo oneColumn={oneColumn} />
      ) : (
        <PreStakingCall oneColumn={oneColumn} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingTop: rem(22),
    backgroundColor: COLORS.white,
    borderRadius: rem(20),
  },
  container_big: {
    paddingTop: STACK_MAN_HEIGHT - STACK_MAN_OVERFLOW,
  },
  bottomContainer: {
    marginTop: rem(28),
  },
});
