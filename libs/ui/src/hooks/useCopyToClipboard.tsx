import { truncateAddress } from '@daohaus/utils';
import { useState } from 'react';

import { useToast } from './useToast';

type CopiedValue = string | null;
type CopyFn = (
  targetText: string,
  toastTitle: string,
  toastDescription?: string
) => Promise<boolean>; // Return success

export const useCopyToClipboard = (): CopyFn => {
  // ! Will we need to get the text back from this hook? Does firing the Toast from the hook make sense?
  const [, setCopiedText] = useState<CopiedValue>(null); // eslint-disable-line no-eval
  const { successToast, errorToast } = useToast();

  const copy: CopyFn = async (
    text,
    toastTitle = 'Success',
    toastDescription = 'was copied to your clipboard.'
  ) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    let toastText = text;

    if (text.startsWith('0x')) {
      toastText = truncateAddress(text);
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      successToast({
        title: toastTitle,
        description: `${toastText} ${toastDescription}`,
      });
      return true;
    } catch (error) {
      errorToast({
        title: 'Copy failed:',
        description: `${error}`,
      });
      setCopiedText(null);
      return false;
    }
  };

  return copy;
};

export default useCopyToClipboard;
