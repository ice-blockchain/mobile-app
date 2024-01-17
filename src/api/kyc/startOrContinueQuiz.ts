// SPDX-License-Identifier: ice License 1.0

import {post} from '@api/client';
import {Quiz} from '@api/kyc/types';
import {SupportedLocale} from '@translations/localeConfig';

type Params = {
  userId: string;
  language: SupportedLocale;
  selectedOption: number;
  questionNumber: number;
};

export function startOrContinueQuiz({
  userId,
  language,
  selectedOption,
  questionNumber,
}: Params) {
  return post<null, Quiz>(
    `/kyc/startOrContinueKYCStep4Session/users/${userId}?questionNumber=${questionNumber}&language=${language}&selectedOption=${selectedOption}`,
    null,
  );
}
