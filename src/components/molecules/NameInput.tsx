import React, { FC } from 'react';
import {
  FormControl,
  InputGroup,
  InputGroupAppend,
  InputGroupText,
} from 'components/atoms/forms';

export interface NameInputProps {
  tld: string;
}

const NameInput: FC<NameInputProps> = props => {
  const { tld, ...rest } = props;
  return (
    <InputGroup className="mb-3">
      <FormControl
        aria-describedby="basic-addon2"
        autoComplete="off"
        autoFocus
        required
        {...rest}
      />
      <InputGroupAppend>
        <InputGroupText id="basic-addon2">{tld}</InputGroupText>
      </InputGroupAppend>
    </InputGroup>
  );
};

export default NameInput;
