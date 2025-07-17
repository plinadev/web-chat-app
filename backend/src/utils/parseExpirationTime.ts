export const parseExpirationTime = (timeStr: string): number => {
  const match = timeStr.match(/^(\d+)([smhdw])$/);

  if (!match) {
    throw new Error(
      "Invalid EXPIRATION_TIME format. Use formats like 15d, 2h, 3600s, etc."
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const unitMultipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
  };

  return value * unitMultipliers[unit];
};
