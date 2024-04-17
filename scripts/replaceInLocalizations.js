// SPDX-License-Identifier: ice License 1.0

const fs = require('fs');
const path = require('path');

// Function to replace the first occurrence of a word in a text
function replaceFirstOccurrence(text, oldValue, newValue) {
  const index = text.indexOf(oldValue);
  if (index !== -1) {
    return (
      text.slice(0, index) + newValue + text.slice(index + oldValue.length)
    );
  }
  return text; // If oldValue not found, return original text
}

// Function to apply changes to a single JSON file
function applyChangesToFile(filePath, changes) {
  let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  try {
    changes.forEach(change => {
      const [jsonPath, oldValue, newValue] = change;
      const pathParts = jsonPath.split('/');
      let context = jsonData;
      for (let i = 0; i < pathParts.length - 1; i++) {
        context = context[pathParts[i]];
      }
      const finalKey = pathParts[pathParts.length - 1];
      if (typeof context[finalKey] === 'string') {
        context[finalKey] = replaceFirstOccurrence(
          context[finalKey],
          oldValue,
          newValue,
        );
      }
    });
  } catch (e) {
    console.error(e);
    console.error('Error during processing file:', filePath);
  }

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2)); // Save back to file
}

// Path to directory containing JSON files
const directoryPath = path.join(__dirname, '../src/translations/locales');

// Changes to apply
const changes = [
  ['welcome/page1/title', 'Ice', '[[:project]]'],
  ['welcome/page1/description', '[[:ice]]', '[[:coin_with_logo]]'],
  ['welcome/page1/description', 'Ice', '[[:coin]]'],
  ['welcome/page2/description', '[[:ice]]', '[[:coin_with_logo]]'],
  ['welcome/page3/description_part2', '[[:ice]]', '[[:project_with_logo]]'],
  ['welcome/page4/description', '[[:iceLogo]]', '[[:logo]]'],
  ['welcome/page4/description', 'Ice', '[[:coin]]'],
  ['welcome/page6/description_part1', '[[:ice]]', '[[:project_with_logo]]'],
  ['button/invite_friend/description', '[[:ice]]', '[[:coin_with_logo]]'],
  ['team/contacts/empty_title', '[[:ice]]', '[[:project_with_logo]]'],
  ['team/contacts/empty_description', '[[:ice]]', '[[:project_with_logo]]'],
  ['team/contacts/empty_description', 'Ice', '[[:coin]]'],
  ['team/contacts_list/invitation_text', 'Ice', '[[:project]]'],
  ['signIn/welcome', 'Ice', '[[:project]]'],
  ['home/pioneer/description', '[[:ice]]', '[[:coin_with_logo]]'],
  ['home/roadmap/button_subtitle', 'Ice', '[[:project]]'],
  ['settings/invite_description', 'Ice', '[[:coin]]'],
  ['settings/notifications/domain/system/description', 'Ice', '[[:project]]'],
  ['invite_share/share_message', 'Ice', '[[:project]]'],
  ['invite_share/share_message', 'Ice', '[[:coin]]'],
  ['invite_share/share_subject', 'Ice', '[[:project]]'],
  ['invite_share/description', '[[:ice]]', '[[:coin_with_logo]]'],
  ['staking/benefits_description', 'Ice', '[[:coin]]'],
  ['staking/terms_agree', '[[:ice]]', '[[:coin_with_logo]]'],
  ['staking/terms_agree', 'Ice', '[[:coin]]'],
  ['general/ice', 'Ice', '[[:coin]]'],
  ['general/ice_per_hour', 'Ice', '[[:coin]]'],
  ['search/empty', 'Ice', '[[:project]]'],
  ['invite_friend/description', '[[:ice]]', '[[:project_with_logo]]'],
  ['pop_up/delete_account_confirmation_text', 'Ice', '[[:coin]]'],
  ['ice_bonus/description', '[[:ice]]', '[[:coin_with_logo]]'],
  ['roles/snowman/description', 'Ice', '[[:project]]'],
  ['walkthrough/overrides/home/team/description', '[[:ice]]', '[[:project]]'],
  [
    'walkthrough/overrides/team/segmented_control_tier_one/description',
    'Ice',
    '[[:project]]',
  ],
  [
    'walkthrough/team/allow_contacts/description',
    '[[:ice]]',
    '[[:project_with_logo]]',
  ],
  [
    'walkthrough/team/allow_contacts/description',
    '[[:ice]]',
    '[[:project_with_logo]]',
  ],
  [
    'walkthrough/team/allow_contacts/description',
    '[[:ice]]',
    '[[:coin_with_logo]]',
  ],
  ['walkthrough/team/confirm_phone/description', 'Ice', '[[:project]]'],
  [
    'walkthrough/team/contacts_list/description',
    '[[:ice]]',
    '[[:project_with_logo]]',
  ],
  ['walkthrough/home/home/description', '[[:ice]]', '[[:project_with_logo]]'],
  ['walkthrough/home/team/description', '[[:ice]]', '[[:project_with_logo]]'],
  ['walkthrough/home/earningicestart/title', 'Ice', '[[:coin]]'],
  [
    'walkthrough/home/earningicestart/description',
    '[[:ice]]',
    '[[:project_with_logo]]',
  ],
  ['walkthrough/home/earningiceseemore/title', 'Ice', '[[:coin]]'],
  ['walkthrough/home/wallet/description', '[[:ice]]', '[[:coin_with_logo]]'],
  [
    'walkthrough/home/adoptioncard/description',
    '[[:ice]]',
    '[[:coin_with_logo]]',
  ],
  [
    'walkthrough/home/balancehistory/description',
    '[[:ice]]',
    '[[:coin_with_logo]]',
  ],
  ['social_media/tiktok/description', 'Ice', '[[:coin]]'],
  ['social_media/youtube/description', 'Ice', '[[:coin]]'],
  ['social_media/linkedin/description', 'Ice', '[[:project]]'],
  ['social_media/facebook/description_part2', 'Ice', '[[:project]]'],
  ['social_media/instagram/description_part1', 'Ice', '[[:project]]'],
  ['social_media/reddit/description', 'Ice', '[[:project]]'],
  ['social_media/reddit/description', 'Ice', '[[:coin]]'],
  ['social_media/discord/description', 'Ice', '[[:project]]'],
  ['social_media/discord/description', 'ice', '[[:project]]'],
  ['creative_library/title', 'Ice', '[[:project]]'],
  ['creative_library/share', 'Ice', '[[:project]]'],
  ['creative_library/get_started/subtitle', 'Ice', '[[:project]]'],
  ['creative_library/get_started/description', 'Ice', '[[:project]]'],
  [
    'creative_library/get_started/carousel/02/description',
    'Ice',
    '[[:project]]',
  ],
  [
    'creative_library/get_started/carousel/03/description',
    'Ice',
    '[[:project]]',
  ],
  ['creative_library/carousel/03/description', 'Ice', '[[:project]]'],
  ['creative_library/social_section/share/description', 'Ice', '[[:project]]'],
  ['creative_library/social_section/share/description', 'Ice', '[[:project]]'],
  ['creative_library/promo_section/web/description', 'Ice', '[[:project]]'],
  ['creative_library/promo_section/web/description', 'Ice', '[[:project]]'],
  ['creative_library/promo_section/mobile/description', 'Ice', '[[:project]]'],
  [
    'creative_library/practices_section/good/rules/01/description',
    'Ice',
    '[[:project]]',
  ],
  ['creative_library/promo_section/mobile/description', 'Ice', '[[:project]]'],
  [
    'creative_library/practices_section/good/rules/03/description',
    'Ice',
    '[[:project]]',
  ],
  [
    'creative_library/practices_section/bad/rules/02/description',
    'Ice',
    '[[:project]]',
  ],
  [
    'creative_library/practices_section/bad/rules/03/description',
    'Ice',
    '[[:project]]',
  ],
  ['face_auth/consent', 'Ice', '[[:project]]'],
  ['override/claimUsername/description', '[[:ice]]', '[[:project]]'],
  ['override/home/roadmap/button_subtitle', 'Ice', '[[:project]]'],
  [
    'override/team/contacts/empty_description',
    '[[:ice]]',
    '[[:project_with_logo]]',
  ],
  ['override/profile/invite_friends_engage', 'Ice', '[[:project]]'],
  ['override/walkthrough/home/invite/description', 'Ice', '[[:project]]'],
  ['override/walkthrough/home/wallet/description', 'ice', '[[:coin]]'],
  ['bsc_address/enter_address_description', 'ICE', '[[:coin]]'],
  ['distribution_kyc/select_method_step/description', 'ICE', '[[:coin]]'],
  ['quiz/intro/description', 'Ice', '[[:project]]'],
  ['quiz/intro/description', 'Ice', '[[:coin]]'],
  ['quiz/intro/why_quiz/description', 'Ice', '[[:coin]]'],
  ['quiz/intro/community_engagement/description', 'Ice', '[[:project]]'],
  ['quiz/intro/community_engagement/point3', 'Ice', '[[:project]]'],
  [
    'distribution_kyc_dynamic/select_method_step/description',
    'ICE',
    '[[:coin]]',
  ],
];

// Read all files from the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(file => {
    if (file.endsWith('.json')) {
      // Process only JSON files
      applyChangesToFile(path.join(directoryPath, file), changes);
    }
  });
  console.log('All files have been processed.');
});
