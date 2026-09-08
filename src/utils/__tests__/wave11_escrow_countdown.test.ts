describe('Wave 11 Realms: Escrow Timelock Countdown Formatter', () => {
  const formatRemainingTime = (secondsRemaining: number): string => {
    if (secondsRemaining <= 0) return 'UNLOCKED';
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  it('should format remaining escrow timelock hours, minutes, and seconds', () => {
    expect(formatRemainingTime(3665)).toBe('1h 1m 5s');
    expect(formatRemainingTime(7200)).toBe('2h 0m 0s');
  });

  it('should return UNLOCKED when timelock timestamp has elapsed', () => {
    expect(formatRemainingTime(0)).toBe('UNLOCKED');
    expect(formatRemainingTime(-50)).toBe('UNLOCKED');
  });
});
