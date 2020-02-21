import Heading from 'components/atoms/Heading'
import List, { ListProps } from 'components/atoms/List'
import ListItem from 'components/atoms/ListItem'
import SmallText from 'components/atoms/SmallText'
import { Contact } from 'models'
import React, { FC } from 'react'
import { useHistory } from 'react-router'

export interface ContactListProps extends ListProps {
  contacts: Contact[]
}

const ContactList: FC<ContactListProps> = ({ contacts, ...rest }) => {
  const history = useHistory()
  return (
    <List {...rest}>
      {!!contacts &&
        contacts.map((contact: Contact) => {
          const { rnsName, publicKey, chat } = contact
          const nChats = !!chat && chat.length
          const lastChatContent = !!nChats && chat[nChats - 1].content

          return (
            <ListItem
              key={publicKey}
              onClick={() => history.push(`/chat/${rnsName}`)}
            >
              <Heading hLevel={5}>{rnsName ? `${rnsName}.rsk` : ''}</Heading>
              <SmallText>{lastChatContent}</SmallText>
            </ListItem>
          )
        })}
    </List>
  )
}

export default ContactList
