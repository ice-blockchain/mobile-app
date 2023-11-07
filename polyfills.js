import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import TextEncodingPolyfill from 'text-encoding';

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});
