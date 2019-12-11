import React from 'react';

import { IUserInfo } from 'types';
import RnsModal from 'components/RnsModal';
import PublicKey from 'components/PublicKey';
import PortModal from 'components/PortModal';
import { Image } from 'react-bootstrap';
import cosmonaut from 'assets/cosmonaut.png';

interface IContactDetailsCard {
  user: IUserInfo;
}

export default ({ user }: IContactDetailsCard) => (
  <div>
    <Image
      src={cosmonaut}
      roundedCircle
      style={{
        maxWidth: 150,
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
      }}
    />
    <div
      style={{
        paddingTop: '1em',
      }}
    >
      <h4>
        {user.rnsName && `${user.rnsName}.rsk `}
        <RnsModal />
      </h4>
      <PublicKey publicKey={user.publicKey} />
      <PortModal></PortModal>
    </div>
  </div>
);
