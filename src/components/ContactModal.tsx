import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { generatePrivate, getPublic } from "eccrypto";
import * as RifCommunications from "libs/RIFcomms";

import Contact from "models/Contact";
import ChatProvider from "providers/UserProvider";
import { ROUTES, history } from "routes";
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
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  isValid,
  errors,
  submitForm
}

export default (props: IProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <span>
      <ChatProvider.Consumer>
        {({ actions: { addContact } }) => (
          <Formik
            validate={({ rnsName }: FormValues) => {
              let errors: FormErrors = {};
              if (!rnsName) {
                errors.rnsName = "Required";
              }
              return errors;
            }}
            onSubmit={({ rnsName }: FormValues, actions) => {
              fetchUserByName(rnsName)
                .then(publicKey => {

                  const contact = new Contact({
                    rnsName,
                    publicKey: publicKey,
                    multiaddr: ""
                  });
                  addContact(contact);
                  actions.resetForm();
                  actions.setErrors({});
                  handleClose();

                  history.push(ROUTES.CHAT(contact.rnsName));
                })
                .catch(error => {
                  actions.setErrors({ rnsName: "User does not exist!" });
                });
            }}
            initialValues={{
              rnsName: "",
              publicKey: ""
            }}
          >
            {(formik: IFormikProps) => (
              <>
                <Button
                  className={`btn-circle ${props.large && "btn-xl"}`}
                  variant="primary"
                  onClick={handleShow}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                      <Modal.Title>Create new Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Eter RNS name to search for contact
                      <InputGroup className="mb-3" style={{ marginTop: "1em" }}>
                        <FormControl
                          placeholder="Your name"
                          aria-label="Your name"
                          aria-describedby="basic-addon2"
                          name="rnsName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          defaultValue={formik.values.rnsName}
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
                      {formik.errors.rnsName && (
                        <small style={{ color: "red" }}>{formik.errors.rnsName}</small>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        type="submit"
                        className="ml-auto justify-content-end"
                        disabled={!formik.isValid}
                        onClick={formik.submitForm}
                      >
                        Add contact
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </>
            )}
          </Formik>
        )}
      </ChatProvider.Consumer>
    </span>
  );
};
