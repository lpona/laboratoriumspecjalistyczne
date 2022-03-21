import { EffectCallback, useEffect } from 'react';

const useEffectOnce = (effect: EffectCallback) => {
  // eslint-disable-next-line
  useEffect(effect, []);
};

export default useEffectOnce;
