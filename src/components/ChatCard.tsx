import React, { Component } from "react";
import { Nav, Image } from "react-bootstrap";

import Contact from "models/Contact";

interface IChatCard {
  contact: Contact;
}

export default ({ contact }: IChatCard) => (
  <div>
    {contact.rnsName || contact.publicKey}
    {contact.chat[contact.chat.length - 1]}
  </div>
);
