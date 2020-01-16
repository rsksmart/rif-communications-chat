import React, { FC, useContext } from 'react';
import SmallText from 'components/atoms/SmallText';
import UserStore from 'store/User/UserStore';

export interface FormInfoBarProps {
  error: string | undefined;
  loadingMsgOverride?: string;
}

export const FormInfoBar: FC<FormInfoBarProps> = ({
  children,
  error,
  loadingMsgOverride,
}) => {
  const {
    state: {
      AppState: {
        message: { isLoading, message },
      },
    },
  } = useContext(UserStore);
  const renderInfo = () => (
    <>
      {error && <SmallText style={{ color: 'red' }}>{error}</SmallText>}
      {children}
    </>
  );
  return (
    <>
      {!isLoading && renderInfo()}
      {!!isLoading && <SmallText>{loadingMsgOverride || message}</SmallText>}
    </>
  );
};
