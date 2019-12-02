import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Contact from "models/Contact";
import ChatProvider from "providers/ChatProvider";
import { ROUTES, history } from "routes";

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
              const contact = new Contact({
                rnsName,
                publicKey: Math.floor(Math.random() * 10000000000).toString(36),
                multiaddr: ""
              });
              addContact(contact);
              actions.resetForm();
              actions.setErrors({});
              handleClose();
              history.push(ROUTES.CHAT(contact.publicKey));
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
                <Button
                  className={`btn-circle ${props.large && "btn-xl"}`}
                  variant="primary"
                  onClick={handleShow}
                >
                  <FontAwesomeIcon icon={faPlus} />
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
                        <small style={{ color: "red" }}>{errors.rnsName}</small>
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
    </span>
  );
};
