import React, { useContext, useState, useReducer } from 'react';
import { Logo } from 'rifui';
import PageTemplate from 'components/templates/PageTemplate';
import CreateUserModal from 'components/pages/CreateUserModal';
import UserStore from 'store/User/UserStore';
import Button from 'components/atoms/buttons/Button';
import ImportUserModal from './ImportUserModal';
import { USER_ACTIONS } from 'store/User/userActions';
import userReducer from 'store/User/userReducer';

const LoginPage = () => {
  const userStore = useContext(UserStore);
  const { state } = userStore;

  const { user } = state;

  const [displayCreateUser, setDisplayCreateUser] = useState(false);
  const [displayImportUser, setDisplayImportUser] = useState(false);

  const showCreateUserModal = () => setDisplayCreateUser(true);
  const hideCreateUserModal = () => setDisplayCreateUser(false);
  const showImportUserModal = () => setDisplayImportUser(true);
  const hideImportUserModal = () => setDisplayImportUser(false);

  return (
    // TODO: Extract template
    <PageTemplate
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      className="login"
    >
      <Logo />
      {!!user && user.rnsName}
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/*TODO: Refactor these buttons */}
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

export default LoginPage;
