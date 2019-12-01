import React from "react";

import { IUserInfo } from "types";
import RnsModal from "components/RnsModal";
import { Image } from "react-bootstrap";
import cosmonaut from "assets/cosmonaut.png";

interface IContactDetailsCard {
  user: IUserInfo;
  changeRNS: (rnsName: string) => void;
}

export default ({ user, changeRNS }: IContactDetailsCard) => (
  <>
    <Image
      src={cosmonaut}
      roundedCircle
      style={{
        maxWidth: 150,
        borderWidth: 2,
        borderColor: "black",
        borderStyle: "solid"
      }}
    />
    <br />
    {user.rnsName && `${user.rnsName}.rsk`}
    <RnsModal user={user} changeRNS={changeRNS} />
    <br />
    {user.publicKey}
    <br />
  </>
);
