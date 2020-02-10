import Button from 'components/atoms/buttons/Button';
import { ModalProps } from 'components/atoms/modal/Modal';
import Modal from 'components/molecules/ModalDialogue';
import PageTemplate from 'components/templates/PageTemplate';
import React, { FC, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { USER_ACTIONS } from 'store/User/userActions';
import UserStore from 'store/User/UserStore';

export interface LogoutModalProps extends ModalProps {}

const LogoutModal: FC<LogoutModalProps> = modalProps => {
  const {
    state: {
      UserState: { user },
    },
    dispatch,
  } = useContext(UserStore);
  const history = useHistory();

  const rnsName = !!user && user.rnsName;
  const keystore = localStorage.getItem('keystore');

  useEffect(() => {
    if (!rnsName && !keystore) {
      history.go(history.length - 1);
    }
  }, [rnsName, keystore, history]);

  const logout = () => {
    dispatch({ type: USER_ACTIONS.LOGOUT });
  };

  const renderFooter = () => (
    <Button
      variant="danger"
      type="button"
      className="ml-auto justify-content-end"
      onClick={logout}
    >
      Continue
    </Button>
  );

  return (
    <PageTemplate>
      <Modal title="Logout" footer={renderFooter()} {...modalProps}>
        <p>
          This action will delete all of your user data on this device. Make
          sure you exported your profile. To log back in you will need to import
          this or create new RNS name.
        </p>
        <p>Would you like to continue?</p>
      </Modal>
    </PageTemplate>
  );
};

export default LogoutModal;
