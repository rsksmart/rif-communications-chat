import React, { useContext } from 'react';
import { Logo } from 'rifui';
import PageTemplate from 'components/templates/PageTemplate';
import { useFormik } from 'formik';
import UserStore from 'store/User/UserStore';
import { USER_ACTIONS } from 'store/User/userActions';

const LoginPage = () => {
  const userStore = useContext(UserStore);
  const {
    state: { user },
    dispatch,
  } = userStore;

  const formik = useFormik({
    onSubmit: () => {},
    initialValues: {},
  });
  return (
    <PageTemplate
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Logo />
      {user && user.rnsName}
      <button
        onClick={() => {
          dispatch({
            type: USER_ACTIONS.ADD_USER,
            payload: {
              rnsName: 'fancyname fs',
              publicKey: '134256',
            },
          });
        }}
      >
        CLICK ME
      </button>
    </PageTemplate>
  );
};

export default LoginPage;
