// SPDX-License-Identifier: ice License 1.0

import {LottieView} from '@components/LottieView';
import {LottieAnimations} from '@lottie';
import {SearchPlaceholder} from '@screens/Team/components/SearchResults/components/SearchPlaceholder';
import {MagnifierZoomOutEmptyIcon} from '@svg/MagnifierZoomOutEmptyIcon';
import {MagnifierZoomOutIcon} from '@svg/MagnifierZoomOutIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  loading: boolean;
  hasSearchQuery: boolean;
};

export const EmptyList = ({loading, hasSearchQuery}: Props) => {
  if (!hasSearchQuery) {
    return (
      <SearchPlaceholder
        Icon={<MagnifierZoomOutIcon width={rem(28)} height={rem(28)} />}
        label={t('search.empty')}
      />
    );
  }
  if (loading) {
    return (
      <SearchPlaceholder
        Icon={
          <LottieView
            style={styles.loader}
            source={LottieAnimations.loadingLogoBlue}
            autoPlay={true}
            loop={true}
          />
        }
        label={t('search.loading')}
      />
    );
  }
  return (
    <SearchPlaceholder
      Icon={<MagnifierZoomOutEmptyIcon width={rem(28)} height={rem(28)} />}
      label={t('search.nothing_is_found')}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    width: rem(69),
    height: rem(69),
  },
});
