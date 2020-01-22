import { FormControl } from 'components/atoms/forms';
import { ModalProps } from 'components/atoms/modal/Modal';
import Modal from 'components/molecules/ModalDialogue';
import PageTemplate from 'components/templates/PageTemplate';
import React, { FC } from 'react';
import LocalStorage from 'utils/LocalStorage';

const persistence = LocalStorage.getInstance();

export interface ExportUserModalProps extends ModalProps {}

const ExportUserModal: FC<ExportUserModalProps> = modalProps => {
  const contacts = persistence.getItem('contacts');
  const rnsName = persistence.getItem('rnsName');
  const keystore = persistence.getItem('keystore');

  const profile = JSON.stringify(
    {
      rnsName,
      keystore,
      contacts,
    },
    undefined,
    2,
  );

  return (
    <PageTemplate>
      <Modal title="Export profile." {...modalProps}>
        <FormControl
          readOnly
          as="textarea"
          rows="3"
          value={profile}
          style={{ height: '60vh' }}
        />
      </Modal>
    </PageTemplate>
  );
};

export default ExportUserModal;
