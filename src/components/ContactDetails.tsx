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
  <div>
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
    <div
      style={{
        paddingTop: "1em"
      }}
    >
      <h4>
        {user.rnsName && `${user.rnsName}.rsk `}
        <RnsModal user={user} changeRNS={changeRNS} />
      </h4>
      <div
        className="overflow-auto"
        style={{ maxWidth: "100%", paddingLeft: "1em", paddingRight: "1em" }}
      >
        <small>{user.publicKey}</small>
      </div>
    </div>
  </div>
);
