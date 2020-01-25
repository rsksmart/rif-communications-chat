import Button from 'components/atoms/buttons/Button';
import LoadingSpinner from 'components/molecules/LoadingSpinner';
import CreateUserModal from 'components/pages/CreateUserModal';
import ImportUserModal from 'components/pages/ImportUserModal';
import PageTemplate from 'components/templates/PageTemplate';
import React, { FC, useState } from 'react';
import { Logo } from 'rifui';

export interface LoginPageTemplateProps {
  isRecovering: boolean;
}

const LoginPageTemplate: FC<LoginPageTemplateProps> = ({ isRecovering }) => {
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
      {!!isRecovering && <LoadingSpinner message="Recovering user..." />}
      {!isRecovering && (
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
      )}
    </PageTemplate>
  );
};

export default LoginPageTemplate;
