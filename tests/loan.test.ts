import { describe, expect, it } from 'vitest';
import { calcLtv, canExtendBullet } from '../lib/loan';

describe('loan rules', () => {
  it('calculates ltv', () => {
    expect(calcLtv(10000, 0.1, 300000)).toBeCloseTo(33.33, 1);
  });
  it('bullet extension only on ltv <= 50', () => {
    expect(canExtendBullet(49.9)).toBe(true);
    expect(canExtendBullet(50)).toBe(true);
    expect(canExtendBullet(50.1)).toBe(false);
  });
});
