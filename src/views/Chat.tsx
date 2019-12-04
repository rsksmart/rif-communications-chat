import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";

import UserProvider from "providers/UserProvider";

import Contact from "models/Contact";
import User from "models/User";
import Message, { MESSAGE_SENDER } from "models/Message";
import ChatBubble from "components/ChatBubble";

import { ROUTES, history } from "routes";

interface IChatProps {
  user?: User;
  contact?: Contact;
  addMessage: (message: Message, contact: Contact) => void;
}

interface FormValues {
  content: string;
}

interface IChatRouteProps extends RouteComponentProps<{ rnsName: string }> {}

class Chat extends React.Component<IChatProps> {
  componentDidMount() {
    if (!this.props.user) history.push(ROUTES.CHATS);
  }
  public render() {
    const { user, contact, addMessage } = this.props;
    if (!user) return null;
    if (!contact) return <p>Couldn't find requested user</p>;
    return (
      <div>
        <h5 style={{ paddingLeft: "8px", paddingRight: "8px" }}>
          {contact.rnsName ? `${contact.rnsName}.rsk` : contact.publicKey}
        </h5>
        <hr />
        <div
          style={{
            paddingLeft: "8px",
            paddingRight: "8px"
          }}
        >
          {contact.chat.map((m, i) => (
            <ChatBubble message={m} key={i} index={i} />
          ))}
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            backgroundColor: "#EEE",
            padding: "8px",
            paddingRight: "40px",
            width: "100%"
          }}
        >
          <Formik
            onSubmit={({ content }: FormValues, actions) => {
              addMessage(new Message({ content }), contact);
              actions.resetForm();
            }}
            initialValues={{ content: "" }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              submitForm
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormControl
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  autoComplete="off"
                  autoFocus
                  style={{ width: "100%" }}
                />
                <Button
                  type="submit"
                  className="btn-circle"
                  onClick={submitForm}
                  disabled={!values.content}
                  style={{ position: "fixed", bottom: "10px", right: ".5em" }}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default (props: IChatRouteProps) => (
  <UserProvider.Consumer>
    {({ state: { user }, actions: { getContact, addMessage } }) => (
      <Chat
        user={user}
        contact={getContact(props.match.params.rnsName)}
        addMessage={addMessage}
      />
    )}
  </UserProvider.Consumer>
);
