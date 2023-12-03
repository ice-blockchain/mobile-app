import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const VerifiedSvg = (props: SvgProps) => (
  <Svg width={rem(18)} height={rem(18)} fill="none" {...props}>
    <Path
      fill="#35D487"
      d="M15.884 7.228c-.268-.274-.542-.562-.647-.808-.106-.247-.099-.612-.106-.985-.007-.682-.02-1.462-.562-2.004-.542-.541-1.322-.555-2.004-.562-.373-.007-.752-.014-.984-.106-.233-.091-.535-.38-.81-.647-.484-.464-1.04-.991-1.771-.991-.731 0-1.287.527-1.772.991-.274.268-.562.542-.808.647-.247.106-.612.099-.985.106-.682.007-1.462.02-2.004.562-.541.542-.555 1.322-.562 2.004-.007.373-.014.753-.106.985-.091.232-.38.534-.647.808-.464.485-.991 1.04-.991 1.772 0 .731.527 1.287.991 1.772.268.274.542.562.647.809.106.246.099.611.106.984.007.682.02 1.462.562 2.004.542.541 1.322.555 2.004.562.373.007.753.014.985.106.232.091.534.38.808.647.485.464 1.04.991 1.772.991.731 0 1.287-.527 1.772-.991.274-.268.562-.542.809-.647.246-.106.611-.099.984-.106.682-.007 1.462-.02 2.004-.562.541-.542.555-1.322.562-2.004.007-.373.014-.752.106-.984.091-.233.38-.535.647-.81.464-.484.991-1.04.991-1.771 0-.731-.527-1.287-.991-1.772Z"
    />
    <Path
      fill="#fff"
      d="m8.36 11.658 4.12-3.938a.562.562 0 0 0-.773-.815l-3.74 3.565-1.674-1.597a.562.562 0 1 0-.773.816l2.06 1.969a.57.57 0 0 0 .78 0Z"
    />
  </Svg>
);
