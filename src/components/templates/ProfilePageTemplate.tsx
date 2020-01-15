import React, { FC, useState } from 'react';
import { UserPageTemplate } from './UserPageTemplate';
import { User, Contact } from 'models';
import { ContactDetails } from 'components/organisms/ContactDetails';
import CreateUserModal from 'components/pages/CreateUserModal';
import ButtonCircle from 'components/atoms/buttons/ButtonCircle';
import PencilIcon from 'components/atoms/icons/PencilIcon';
import ExportUserModal from 'components/pages/ExportUserModal';
import Button from 'react-bootstrap/Button';

export interface ProfilePageTemplateProps {
  user: User;
  contacts: Contact[];
}

export const ProfilePageTemplate: FC<ProfilePageTemplateProps> = ({ user }) => {
  const [displayCreateUser, setDisplayCreateUser] = useState(false);
  const [displayExportUser, setDisplayExportUser] = useState(false);

  const showCreateUserModal = () => setDisplayCreateUser(true);
  const hideCreateUserModal = () => setDisplayCreateUser(false);
  const showExportUserModal = () => setDisplayExportUser(true);
  const hideExportUserModal = () => setDisplayExportUser(false);

  const { rnsName, publicKey } = user;

  const renderChangeNameModal = () => (
    <>
      <ButtonCircle className="change-name" onClick={showCreateUserModal}>
        <PencilIcon />
      </ButtonCircle>
      <CreateUserModal show={displayCreateUser} onHide={hideCreateUserModal} />
    </>
  );

  return (
    <UserPageTemplate style={{ textAlign: 'center' }} className="profile">
      <div style={{ textAlign: 'center' }}>
        <ContactDetails
          rnsName={rnsName || 'NO NAME'}
          publicKey={publicKey}
          nameChanger={renderChangeNameModal}
        >
          <Button
            variant="dark"
            size="sm"
            style={{ margin: '0.25em' }}
            onClick={showExportUserModal}
          >
            Export
          </Button>
          <ExportUserModal
            show={displayExportUser}
            onHide={hideExportUserModal}
          />
        </ContactDetails>
        <h2 style={{ marginTop: '2em' }}>{/* Contacts: <ContactModal /> */}</h2>
      </div>
    </UserPageTemplate>
  );
};
