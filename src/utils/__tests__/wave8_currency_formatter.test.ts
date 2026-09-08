describe('Wave 8 Rebalance: Soroban Token Balance Precision Formatter', () => {
  const formatTokenBalance = (rawUnits: bigint, decimals: number = 7): string => {
    const divisor = BigInt(10 ** decimals);
    const whole = rawUnits / divisor;
    const fraction = rawUnits % divisor;
    const fractionStr = fraction.toString().padStart(decimals, '0').replace(/0+$/, '');
    return fractionStr.length > 0 ? `${whole}.${fractionStr}` : `${whole}.0`;
  };

  it('should format 7-decimal Stellar Soroban token balance correctly', () => {
    const raw = BigInt(10500000); // 1.05 tokens
    expect(formatTokenBalance(raw, 7)).toBe('1.05');
  });

  it('should format whole number token balances with single trailing zero', () => {
    const raw = BigInt(50000000); // 5 tokens
    expect(formatTokenBalance(raw, 7)).toBe('5.0');
  });
});
