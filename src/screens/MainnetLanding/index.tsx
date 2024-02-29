// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {PullToRefreshContainer} from '@components/PullToRefreshContainer';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {IceLogo} from '@screens/MainnetLanding/components/IceLogo';
import {JoinMainnet} from '@screens/MainnetLanding/components/JoinMainnet';
import {LaunchCountdown} from '@screens/MainnetLanding/components/LaunchCountdown';
import {Notice} from '@screens/MainnetLanding/components/Notice';
import {Platforms} from '@screens/MainnetLanding/components/Platforms';
import {Roadmap} from '@screens/MainnetLanding/components/Roadmap';
import {Stats} from '@screens/MainnetLanding/components/Stats';
import {useRefresh} from '@screens/MainnetLanding/hooks/useRefresh';
import {useRequestNotificationPermissions} from '@screens/MainnetLanding/hooks/useRequestNotificationPermissions';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {rem} from 'rn-units';

export const MainnetLanding = () => {
  useFocusStatusBar({style: 'light-content'});

  useRequestNotificationPermissions();

  const {onRefresh, refreshing} = useRefresh();

  return (
    <View style={styles.container}>
      <LinesBackground />
      <PullToRefreshContainer
        style={commonStyles.flexOne}
        refreshing={refreshing}
        theme="dark-content"
        onRefresh={onRefresh}>
        <Animated.ScrollView contentContainerStyle={styles.scrollContent}>
          <SafeAreaView style={commonStyles.flexOne} edges={['top']}>
            <IceLogo />
            <Notice />
            <Platforms />
            <View style={[commonStyles.baseSubScreen, styles.subScreen]}>
              <Stats />
              <Roadmap />
              <JoinMainnet />
            </View>
          </SafeAreaView>
        </Animated.ScrollView>
      </PullToRefreshContainer>
      <LaunchCountdown />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  subScreen: {
    marginTop: rem(16),
    paddingBottom: rem(16),
  },
});
