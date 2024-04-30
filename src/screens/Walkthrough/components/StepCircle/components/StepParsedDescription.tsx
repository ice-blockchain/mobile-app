// SPDX-License-Identifier: ice License 1.0

import {ParsedDescription} from '@components/ParsedDescription';
import {WalkthroughStep} from '@store/modules/Walkthrough/types';
import React, {memo} from 'react';

type Props = {
  step: WalkthroughStep | undefined;
};

function getDescription(step: WalkthroughStep) {
  // When ice label is first in the description then any custom text styles are not applied
  // As a workaround adding a leading space here so text styles are applied
  if (step.description.startsWith('[[:ice]]')) {
    return `\u200B${step.description}`;
  }
  return step.description;
}

export const StepParsedDescription = memo(({step}: Props) => {
  if (!step) {
    return null;
  }

  return (
    <ParsedDescription description={getDescription(step)} link={step.link} />
  );
});
