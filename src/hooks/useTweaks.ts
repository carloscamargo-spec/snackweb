import { useState, useCallback } from 'react';
import type { TweakValues } from '../types';

export function useTweaks(defaults: TweakValues): [TweakValues, (key: keyof TweakValues, val: TweakValues[keyof TweakValues]) => void] {
  const [values, setValues] = useState<TweakValues>(defaults);

  const setTweak = useCallback((key: keyof TweakValues, val: TweakValues[keyof TweakValues]) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  return [values, setTweak];
}
