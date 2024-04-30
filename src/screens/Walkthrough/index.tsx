// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ViewMeasurementsResult} from '@ice/react-native';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {StepCircle} from '@screens/Walkthrough/components/StepCircle';
import {ANIMATION_DELAY} from '@screens/Walkthrough/constants';
import {useAnimatedStyles} from '@screens/Walkthrough/hooks/useAnimatedStyles';
import {WalkthroughActions} from '@store/modules/Walkthrough/actions';
import {debounce} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

export function Walkthrough() {
  const route = useRoute<RouteProp<MainStackParamList, 'Walkthrough'>>();
  const {step, total, index} = route.params ?? {};

  const [elementMeasurements, setElementMeasurements] =
    useState<ViewMeasurementsResult | null>(null);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          return true;
        },
      );
      return () => subscription.remove();
    }, []),
  );

  const [elementHeight, setElementHeight] = useState<number>();

  const {elementAnimatedStyle, circleAnimatedStyle, runCloseAnimation} =
    useAnimatedStyles({step, elementHeight});

  const onNext = debounce(() => {
    runCloseAnimation(() => {
      if (step) {
        dispatch(
          WalkthroughActions.COMPLETE_WALKTHROUGH_STEP.STATE.create({
            stepKey: step.key,
          }),
        );
        setElementHeight(0);
      }
    });
  }, ANIMATION_DELAY);

  const onSkip = () => {
    runCloseAnimation(() => {
      dispatch(
        WalkthroughActions.SKIP_WALKTHROUGH.STATE.create({stepsKeys: []}),
      );
      setElementHeight(0);
    });
  };

  useEffect(() => {
    if (step) {
      setElementMeasurements(null);
      const ref = step.elementData?.getRef()?.current;
      if (ref) {
        ref.measure((x, y, width, height, pageX, pageY) => {
          setElementMeasurements({x, y, width, height, pageY, pageX});
        });
      } else {
        setElementMeasurements({
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          pageY: 0,
          pageX: 0,
        });
      }
    }
  }, [step]);

  /**
   * return null -> ui is blocked with a transparent layer
   */
  if (!step?.elementData) {
    return null;
  }

  /**
   * Keep showing background when a step element is measured
   * So there won't be background flickering between steps change
   */
  if (!elementMeasurements) {
    return <View style={styles.background} />;
  }

  return (
    <View style={styles.background}>
      <StepCircle
        elementHeight={elementHeight}
        elementTop={step.elementData.getTop(elementMeasurements)}
        step={step}
        onNext={onNext}
        onSkip={onSkip}
        animatedStyle={circleAnimatedStyle}
        totalSteps={total ?? 0}
        stepIndex={index ?? 0}
      />
      <Animated.View
        style={[
          elementAnimatedStyle,
          {top: step.elementData.getTop(elementMeasurements)},
        ]}
        onLayout={({nativeEvent}) => {
          setElementHeight(nativeEvent.layout.height);
        }}>
        {step.elementData.render({measurements: elementMeasurements, onNext})}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
  },
});
