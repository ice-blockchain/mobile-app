// SPDX-License-Identifier: ice License 1.0

import {ReferralType} from '@api/user/types';
import {Earnings} from '@screens/Team/components/TierList/components/Header/components/Earnings';
import {WalkthroughElementContainer} from '@screens/Walkthrough/components/WalkthroughElementContainer';
import {useSetWalkthroughElementData} from '@store/modules/Walkthrough/hooks/useSetWalkthroughElementData';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const CONTAINER_PADDING = rem(20);

export const useEarningsWalkthrough = ({
  referralType,
  focused,
}: {
  referralType: ReferralType;
  focused: boolean;
}) => {
  const elementRef = useRef<View>(null);

  const {setWalkthroughElementData} = useSetWalkthroughElementData();

  const [rendered, setRendered] = useState(false);
  const isWalkthroughElementDataSetRef = useRef(false);
  const onElementLayout = () => setRendered(true);

  useEffect(() => {
    if (
      focused &&
      referralType === 'T1' &&
      rendered &&
      !isWalkthroughElementDataSetRef.current
    ) {
      setWalkthroughElementData({
        stepKey: 'tierOneEarnings',
        elementData: {
          getRef: () => elementRef,
          getTop: measurements => {
            return measurements.pageY - CONTAINER_PADDING * 2;
          },
          render: ({measurements}) => {
            const left = measurements.pageX - CONTAINER_PADDING * 2;
            return (
              <WalkthroughElementContainer
                outerStyle={[styles.outerContainer, {left}]}
                innerStyle={styles.innerContainer}>
                <Earnings referralType={referralType} />
              </WalkthroughElementContainer>
            );
          },
        },
      });
      isWalkthroughElementDataSetRef.current = true;
    }
  }, [focused, referralType, rendered, setWalkthroughElementData]);

  return {
    elementRef,
    onElementLayout,
  };
};

const styles = StyleSheet.create({
  outerContainer: {
    alignSelf: 'flex-start',
    padding: CONTAINER_PADDING,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: CONTAINER_PADDING,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
