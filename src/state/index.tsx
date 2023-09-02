import { atom } from 'jotai';

import { PAGE_STEPS } from './types';

export const pageStepAtom = atom<PAGE_STEPS>(PAGE_STEPS.walletConnect);

export const isVoiceOnboardingDoneAtom = atom<boolean>(false);
export const numberOfSendItemTestAtom = atom<number>(0);