// SPDX-License-Identifier: ice License 1.0

export const radiansToDegrees = (radians: number) => {
  return (radians * 180) / Math.PI;
};

export const degreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};
