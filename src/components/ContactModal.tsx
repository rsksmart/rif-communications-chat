import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";
import { Formik } from "formik";

import Contact from "models/Contact";
import ChatProvider from "providers/ChatProvider";

interface FormValues {
  rnsName: string;
  publicKey: string;
}

interface FormErrors {
  rnsName?: string;
  publicKey?: string;
}

export default () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
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
            addContact(
              new Contact({
                rnsName,
                publicKey: Math.floor(Math.random() * 10000000000).toString(36),
                multiaddr: ""
              })
            );
            actions.resetForm();
            actions.setErrors({});
            handleClose();
          }}
          initialValues={{
            rnsName: "",
            publicKey: ""
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            isValid,
            errors,
            submitForm
          }) => (
            <>
              <Button variant="primary" onClick={handleShow}>
                Add Contact
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
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
                        onChange={handleChange}
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
                      <Form.Text style={{ color: "red" }}>
                        {errors.rnsName}
                      </Form.Text>
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
  );
};
