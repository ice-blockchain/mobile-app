import {e164PhoneNumber} from '@utils/phoneNumber';

describe('e164PhoneNumber', () => {
  it('should format phone numbers with no country code as E.164', () => {
    expect(e164PhoneNumber('650-555-1212', 'US')).toBe('+16505551212');
  });

  it('should format phone numbers with a country code as E.164', () => {
    expect(e164PhoneNumber('+44 20 7031 3000')).toBe('+442070313000');
  });

  it('should use the default country code if provided', () => {
    expect(e164PhoneNumber('555-1212', 'US')).toBe('+15551212');
  });

  it('should handle phone numbers with leading or trailing whitespace', () => {
    expect(e164PhoneNumber(' 555-1212 ', 'US')).toBe('+15551212');
  });

  it('should return null for invalid phone numbers', () => {
    expect(e164PhoneNumber('invalid')).toBeNull();
  });

  it('should return null for phone number without a country code', () => {
    expect(e164PhoneNumber('99777333')).toBe(null);
  });
});
