import React, { FC, useContext, useState, useEffect } from 'react';
import { FormControl } from 'components/atoms/forms';
import PageTemplate from 'components/templates/PageTemplate';
import Modal from 'components/molecules/ModalDialogue';
import UserStore from 'store/User/UserStore';
import { ModalProps } from 'components/atoms/modal/Modal';

export interface ExportUserModalProps extends ModalProps {}

const ExportUserModal: FC<ExportUserModalProps> = modalProps => {
  const {
    state: {
      UserState: { user },
    },
  } = useContext(UserStore);

  const [profile, setProfile] = useState('');

  const contacts = !!user && user.contacts;
  const rnsName = !!user && user.rnsName;
  const keystore = localStorage.getItem('keystore');

  useEffect(() => {
    try {
      const profile = JSON.stringify(
        {
          rnsName,
          keystore,
          contacts,
        },
        undefined,
        2,
      );

      setProfile(profile);
    } catch (err) {}
  }, [contacts, rnsName, keystore, setProfile]);

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
