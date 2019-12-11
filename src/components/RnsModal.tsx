import React, { useState } from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { checkUserExists } from '../services/UserService';

import { IUserInfo } from 'types';

interface IRnsModal {
  user: IUserInfo;
  changeRNS: (rns: string) => void;
}

interface FormValues {
  rnsName: string;
}

interface FormErrors {
  rnsName?: string;
}

export default ({ user, changeRNS }: IRnsModal) => {
  const [show, setShow] = useState(!user.rnsName);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <span>
      <Button className="btn-circle" onClick={handleShow}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </Button>
      <Formik
        validate={async ({ rnsName }: FormValues) => {
          let errors: FormErrors = {};
          if (!rnsName) {
            errors.rnsName = 'Required';
          } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
            errors.rnsName =
              'Min 3 alphanumeric characters plus ".", "_" and "-" only.';
          } else {
            const userExists = await checkUserExists(rnsName);
            if (userExists) {
              errors.rnsName = 'Already registered.';
            }
          }
          return errors;
        }}
        onSubmit={({ rnsName }: FormValues) => {
          changeRNS(rnsName);
          handleClose();
        }}
        initialValues={{ rnsName: user.rnsName || '' }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          isValid,
          errors,
          submitForm,
        }) => (
          <form>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Get your RNS pseudonym now!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Writing long-strings is not fun, make it easy for your friends
                and choose your RNS pseudonym. They will be able to chat with
                you much easily.
                <InputGroup className="mb-3" style={{ marginTop: '1em' }}>
                  <FormControl
                    placeholder="Your name"
                    aria-label="Your name"
                    aria-describedby="basic-addon2"
                    name="rnsName"
                    onChange={event => {
                      let { value } = event.target;

                      event.target.value = value.toLowerCase();
                      handleChange(event);
                    }}
                    onBlur={handleBlur}
                    defaultValue={values.rnsName}
                    autoComplete="off"
                    autoFocus
                    required
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">.comms19.rsk</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                {errors.rnsName && (
                  <small style={{ color: 'red' }}>{errors.rnsName}</small>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  type="submit"
                  className="ml-auto justify-content-end"
                  disabled={!isValid}
                  onClick={submitForm}
                >
                  Get
                </Button>
              </Modal.Footer>
            </Modal>
          </form>
        )}
      </Formik>
    </span>
  );
};
