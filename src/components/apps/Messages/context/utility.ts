import {MessageWithMetaType} from './types';

export const isMessageWithMeta = (
  message: MessageWithMetaType | string,
): message is MessageWithMetaType => {
  return (message as MessageWithMetaType).type !== undefined;
};
