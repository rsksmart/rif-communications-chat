import React, { FC } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from 'components/atoms/modal';
import { ModalProps } from 'components/atoms/modal/Modal';

export interface ModalDialogueProps extends ModalProps {
  title: string;
  footer: React.ReactElement;
  wrapper?;
  wrapperProps?;
}

const ModalDialogue: FC<ModalDialogueProps> = ({
  title,
  footer,
  children,
  wrapper: Wrapper,
  wrapperProps,
  ...props
}) => {
  const renderBody = () => (
    <>
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </>
  );

  return (
    <Modal show={true} {...props}>
      {!!Wrapper ? (
        <Wrapper {...wrapperProps}>{renderBody()}</Wrapper>
      ) : (
        renderBody()
      )}
    </Modal>
  );
};

export default ModalDialogue;
