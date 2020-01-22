import React, { FC, useState } from 'react';
import { UserPageTemplate } from './UserPageTemplate';
import { User, Contact } from 'models';
import { ContactDetails } from 'components/organisms/ContactDetails';
import CreateUserModal from 'components/pages/CreateUserModal';
import ButtonCircle from 'components/atoms/buttons/ButtonCircle';
import PencilIcon from 'components/atoms/icons/PencilIcon';
import ExportUserModal from 'components/pages/ExportUserModal';
import Button from 'react-bootstrap/Button';
import LogoutModal from 'components/pages/LogoutModal';
import Heading from 'components/atoms/Heading';
import ContactList from 'components/organisms/ContactList';
import PlusIcon from 'components/atoms/icons/PlusIcon';
import AddContactModal from 'components/pages/AddContactModal';

export interface ProfilePageTemplateProps {
  user: User;
  contacts: Contact[];
}

export const ProfilePageTemplate: FC<ProfilePageTemplateProps> = ({
  user,
  contacts,
}) => {
  const [isCreateUserVisible, setIsCreateUserVisible] = useState(false);
  const [isExportUserVisible, setIsExportUserVisible] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [isAddContactVisible, setIsAddContactVisible] = useState(false);

  const showCreateUserModal = () => setIsCreateUserVisible(true);
  const hideCreateUserModal = () => setIsCreateUserVisible(false);
  const showExportUserModal = () => setIsExportUserVisible(true);
  const hideExportUserModal = () => setIsExportUserVisible(false);
  const showLogoutModal = () => setIsLogoutVisible(true);
  const hideLogoutModal = () => setIsLogoutVisible(false);
  const showAddContactModal = () => setIsAddContactVisible(true);
  const hideAddContactModal = () => setIsAddContactVisible(false);

  const rnsName = !!user && user.rnsName;
  const publicKey = !!user && user.publicKey;

  const renderChangeNameModal = () => (
    <>
      <ButtonCircle className="change-name" onClick={showCreateUserModal}>
        <PencilIcon />
      </ButtonCircle>
      <CreateUserModal
        show={isCreateUserVisible}
        onHide={hideCreateUserModal}
      />
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
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'row',
            }}
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
              show={isExportUserVisible}
              onHide={hideExportUserModal}
            />
            <Button
              variant="danger"
              size="sm"
              style={{ margin: '0.25em' }}
              onClick={showLogoutModal}
            >
              Logout
            </Button>
            <LogoutModal show={isLogoutVisible} onHide={hideLogoutModal} />
          </div>
        </ContactDetails>
        <Heading level={2} style={{ marginTop: '2em' }}>
          Contacts:{' '}
          <ButtonCircle
            className="new-contact-btn"
            variant="primary"
            onClick={showAddContactModal}
          >
            <PlusIcon />
          </ButtonCircle>
          <AddContactModal
            show={isAddContactVisible}
            onHide={hideAddContactModal}
          />
          {/* <ContactList contacts={contacts} className={'contact-list'} /> */}
        </Heading>

        <ContactList contacts={contacts} className={'contact-list'} />
      </div>
    </UserPageTemplate>
  );
};
