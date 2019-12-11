import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';

import UserProvider from '../providers/UserProvider';
import { ROUTES, history } from 'routes';

interface IProps {
  importOnly?: boolean;
}

export default (props: IProps) => {
  const [isImport, setIsImport] = useState(false);
  const [isExport, setIsExport] = useState(false);
  const [title, setTitle] = useState('');

  let importText;

  const handleImport = () => {
    setIsImport(true);
    setTitle('Import profile.');
  };
  const handleExport = () => {
    setIsExport(true);
    setTitle('Export profile.');
  };
  const handleClose = () => {
    setIsImport(false);
    setIsExport(false);
  };

  return (
    <>
      {props.importOnly ? (
        <Button onClick={handleImport}>Import Existing</Button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          style={{ margin: '0.25em' }}
          onClick={handleImport}
        >
          Import
        </Button>
      )}
      {!props.importOnly && (
        <Button
          variant="dark"
          size="sm"
          style={{ margin: '0.25em' }}
          onClick={handleExport}
        >
          Export
        </Button>
      )}
      <span>
        <UserProvider.Consumer>
          {({ actions: { exportUser, importUser } }) => (
            <Modal
              show={isImport || isExport}
              onHide={handleClose}
              style={{ height: '90vh' }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Card>
                <Card.Body>
                  {isImport && (
                    <Form>
                      <Form.Control
                        as="textarea"
                        rows="5"
                        onChange={e => (importText = (e.target as any).value)}
                        style={{ height: '60vh' }}
                      />
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          type="submit"
                          className="ml-auto justify-content-end"
                          onClick={event => {
                            try {
                              importUser(JSON.parse(importText));
                              history.push(ROUTES.PROFILE);
                            } catch (e) {}
                          }}
                        >
                          Import
                        </Button>
                      </Modal.Footer>
                    </Form>
                  )}
                  {isExport && (
                    <Form.Control
                      readOnly
                      as="textarea"
                      rows="3"
                      value={exportUser()}
                      style={{ height: '60vh' }}
                    />
                  )}
                </Card.Body>
              </Card>
            </Modal>
          )}
        </UserProvider.Consumer>
      </span>
    </>
  );
};
