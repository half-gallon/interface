import { atom } from 'jotai';

import { PAGE_STEPS } from './types';
import { Address } from 'viem';

export const pageStepAtom = atom<PAGE_STEPS>(PAGE_STEPS.walletConnect);

export const isVoiceOnboardingDoneAtom = atom<boolean>(false);
export const numberOfSendItemTestAtom = atom<number>(0);


export const toAddressAtom = atom<Address | undefined>(undefined);
export const sendAmountAtom = atom<string>('');
