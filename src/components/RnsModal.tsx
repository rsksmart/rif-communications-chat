import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { checkUserExists } from "../services/UserService";
import { addUserName } from "../services/UserService";

import { IUserInfo } from "types";

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
            errors.rnsName = "Required";
          }
          const userExists = await checkUserExists(rnsName);
          console.log("RNSMODAL::: userExists:", userExists);
          if (userExists) {
            errors.rnsName = "Already registered.";
          }

          // TODO: make 2 validations - valid name and check if it is not registered already
          // else if () {
          //   errors.rnsName = 'Already registered';
          // }
          return errors;
        }}
        onSubmit={({ rnsName }: FormValues) => {
          addUserName(rnsName)
            .then(() => {
              changeRNS(rnsName);
            })
            .finally(() => {
              handleClose();
            });
        }}
        initialValues={{ rnsName: user.rnsName || "" }}
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
            <Form onSubmit={handleSubmit}>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Get your RNS pseudonym now!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Writing long-strings is not fun, make it easy for your friends
                  and choose your RNS pseudonym. They will be able to chat with
                  you much easily.
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
                      <InputGroup.Text id="basic-addon2">.rsk</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  {values.rnsName === user.rnsName && errors.rnsName && (
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
                    Get
                </Button>
                </Modal.Footer>
              </Modal>
            </Form>
          )}
      </Formik>
    </span>
  );
};
