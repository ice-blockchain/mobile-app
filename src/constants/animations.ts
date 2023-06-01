// SPDX-License-Identifier: ice License 1.0
/* eslint-disable @typescript-eslint/no-unused-vars */

// @ts-ignore
const SPRING_CONFIG = {
  damping: 10,
  mass: 1,
  stiffness: 100,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

// export const sharedTransitionStyle = SharedTransition.custom(values => {
//   'worklet';
//   return {
//     width: withSpring(values.targetWidth, SPRING_CONFIG),
//     height: withSpring(values.targetHeight, SPRING_CONFIG),
//     originX: withSpring(values.targetOriginX, SPRING_CONFIG),
//     originY: withSpring(values.targetOriginY, SPRING_CONFIG),
//   };
// });
