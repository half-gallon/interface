import { atom } from 'jotai';

import { PAGE_STEPS } from './types';
import { Address } from 'viem';

export const pageStepAtom = atom<PAGE_STEPS>(PAGE_STEPS.walletConnect);

export const isVoiceOnboardingDoneAtom = atom<boolean>(false);
export const isVoiceVerifiedAtom = atom<boolean>(false);
export const numberOfSendItemTestAtom = atom<number>(0);


export const toAddressAtom = atom<Address | undefined>('0xdcA2fF91E57d1703d62d09f8f83dD5F985fc1Dc5');
export const sendAmountAtom = atom<string>('');
export const proofAtom = atom<string>('');


// for video 
export const isTokenClaimedAtom = atom<boolean>(false);