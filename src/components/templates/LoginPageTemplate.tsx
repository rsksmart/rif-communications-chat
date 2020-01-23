import React, { useState, FC } from 'react';

import { Logo } from 'rifui';
import PageTemplate from 'components/templates/PageTemplate';
import CreateUserModal from 'components/pages/CreateUserModal';
import Button from 'components/atoms/buttons/Button';
import ImportUserModal from 'components/pages/ImportUserModal';
import { User } from 'models';

export interface LoginPageTemplateProps {
  user: User;
}

const LoginPageTemplate: FC<LoginPageTemplateProps> = ({ user }) => {
  const [displayCreateUser, setDisplayCreateUser] = useState(false);
  const [displayImportUser, setDisplayImportUser] = useState(false);

  const showCreateUserModal = () => setDisplayCreateUser(true);
  const hideCreateUserModal = () => setDisplayCreateUser(false);
  const showImportUserModal = () => setDisplayImportUser(true);
  const hideImportUserModal = () => setDisplayImportUser(false);

  return (
    <PageTemplate
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      className="login"
    >
      <Logo />
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          size="lg"
          variant="primary"
          type="button"
          className="ml-auto justify-content-end btn-block"
          onClick={showCreateUserModal}
        >
          Create User
        </Button>
        <CreateUserModal
          show={displayCreateUser}
          onHide={hideCreateUserModal}
        />
        <span>or</span>
        <Button
          size="lg"
          className="ml-auto justify-content-center btn-block"
          type="button"
          variant="outline-primary"
          onClick={showImportUserModal}
        >
          Import Existing
        </Button>
        <ImportUserModal
          show={displayImportUser}
          onHide={hideImportUserModal}
        />
      </span>
    </PageTemplate>
  );
};

export default LoginPageTemplate;
