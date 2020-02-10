import React, { FC } from 'react'

import { Image } from 'react-bootstrap'

import cosmonaut from 'assets/cosmonaut.png'
import Heading from 'components/atoms/Heading'
import PublicKey from 'components/molecules/PublicKey'

export interface ContactDetailsProps {
  rnsName: string
  publicKey: string
  nameChanger?: React.ElementType
}

export const ContactDetails: FC<ContactDetailsProps> = ({
  rnsName,
  publicKey,
  nameChanger: NameChanger,
  children,
}) => {
  return (
    <>
      <Image
        src={cosmonaut}
        roundedCircle={true}
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
        <Heading hLevel={4}>
          {rnsName && `${rnsName}.rsk `}
          {!!NameChanger && <NameChanger />}
        </Heading>
        <PublicKey publicKey={publicKey} />
        {children}
      </div>
    </>
  )
}
