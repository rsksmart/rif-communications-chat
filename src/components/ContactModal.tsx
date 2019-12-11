import React, { useState } from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { generatePrivate, getPublic } from 'eccrypto';
import * as RifCommunications from 'libs/RIFcomms';

import Contact from 'models/Contact';
import ChatProvider from 'providers/UserProvider';
import PublicKey from '../components/PublicKey';
import { ROUTES, history } from 'routes';
import { fetchUserByName } from '../services/UserService';

interface IProps {
  large?: boolean;
}

interface FormValues {
  rnsName: string;
  publicKey: string;
}

interface FormErrors {
  rnsName?: string;
  publicKey?: string;
}

interface IFormikProps {
  handleSubmit;
  handleChange;
  handleBlur;
  values;
  isValid;
  errors;
  submitForm;
}

export default (props: IProps) => {
  const [show, setShow] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <span>
      <ChatProvider.Consumer>
        {({ actions: { addContact } }) => (
          <Formik
            validate={async ({ rnsName }: FormValues) => {
              let errors: FormErrors = {};
              if (!rnsName) {
                errors.rnsName = 'Required';
              } else if (!RegExp(/^([\w\d.\-_]+){3,20}$/).test(rnsName)) {
                errors.rnsName =
                  'Min 3 alphanumeric characters plus optional ".", "_" and "-" only.';
              } else {
                try {
                  setIsLoading(true);
                  const contactPK = await fetchUserByName(rnsName);
                  setPublicKey(contactPK);
                } catch (e) {
                  errors.rnsName = 'User does not exist.';
                } finally {
                  setIsLoading(false);
                }
              }
              return errors;
            }}
            onSubmit={({ rnsName }: FormValues, actions) => {
              const contact = new Contact({
                rnsName,
                publicKey: publicKey,
                multiaddr: '',
              });
              addContact(contact);
              actions.resetForm();
              actions.setErrors({});
              handleClose();

              history.push(ROUTES.CHAT(contact.rnsName));
            }}
            initialValues={{
              rnsName: '',
              publicKey: '',
            }}
            initialErrors={{
              rnsName: 'Required',
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              isValid,
              errors,
              submitForm,
            }) => (
              <>
                <Button
                  className={`btn-circle ${props.large && 'btn-xl'}`}
                  variant="primary"
                  onClick={handleShow}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <form>
                    <Modal.Header closeButton>
                      <Modal.Title>Create new Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Eter RNS name to search for contact
                      <InputGroup className="mb-3" style={{ marginTop: '1em' }}>
                        <FormControl
                          placeholder="Your name"
                          aria-label="Your name"
                          aria-describedby="basic-addon2"
                          name="rnsName"
                          onChange={event => {
                            let { value } = event.target;

                            event.target.value = value.toLowerCase();
                            errors.rnsName = '';
                            setPublicKey('');
                            handleChange(event);
                          }}
                          onBlur={handleBlur}
                          defaultValue={values.rnsName}
                          autoComplete="off"
                          autoFocus
                          required
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">
                            .rsk
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                      {errors.rnsName && (
                        <small style={{ color: 'red' }}>{errors.rnsName}</small>
                      )}
                      {!errors.rnsName && publicKey && (
                        <PublicKey publicKey={publicKey} paddingLeft="0em" />
                      )}
                      {isLoading && <small>Fetching user...</small>}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        type="submit"
                        className="ml-auto justify-content-end"
                        disabled={!isValid}
                        onClick={submitForm}
                      >
                        Add contact
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </>
            )}
          </Formik>
        )}
      </ChatProvider.Consumer>
    </span>
  );
};
