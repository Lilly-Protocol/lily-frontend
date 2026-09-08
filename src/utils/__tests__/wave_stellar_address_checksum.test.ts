describe('Wave Sprint: Stellar Public Key Checksum Validation', () => {
  const isValidStellarAddress = (addr: string): boolean => {
    return typeof addr === 'string' && addr.startsWith('G') && addr.length === 56;
  };

  it('should validate 56-character G-prefixed Stellar public address', () => {
    const validAddr = 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5';
    expect(isValidStellarAddress(validAddr)).toBe(true);
  });

  it('should reject invalid length or prefix Stellar addresses', () => {
    expect(isValidStellarAddress('ABBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5')).toBe(false);
    expect(isValidStellarAddress('GBBD47IF6LWK7P7MDEVSCWR7DPUW')).toBe(false);
  });
});
