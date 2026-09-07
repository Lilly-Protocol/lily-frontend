describe('Wave 14 Solaris: Stellar SEP-0007 URI Scheme Formatter', () => {
  const generateSEP07PayURI = (destination: string, amount: string, memo?: string): string => {
    let uri = `web+stellar:pay?destination=${encodeURIComponent(destination)}&amount=${encodeURIComponent(amount)}`;
    if (memo) {
      uri += `&memo=${encodeURIComponent(memo)}&memo_type=MEMO_TEXT`;
    }
    return uri;
  };

  it('should format standard SEP-0007 payment URI with destination and amount', () => {
    const dest = 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5';
    const uri = generateSEP07PayURI(dest, '250.00');
    expect(uri).toContain('web+stellar:pay?destination=');
    expect(uri).toContain('&amount=250.00');
  });

  it('should include encoded memo string when specified', () => {
    const dest = 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5';
    const uri = generateSEP07PayURI(dest, '100.00', 'Bounty Settlement');
    expect(uri).toContain('&memo=Bounty%20Settlement');
    expect(uri).toContain('&memo_type=MEMO_TEXT');
  });
});
