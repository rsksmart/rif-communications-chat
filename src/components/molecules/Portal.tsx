import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal-root');

const Portal = props => {
  const { children } = props;
  const el = document.createElement('div');

  useEffect(() => {
    portalRoot && portalRoot.appendChild(el);

    return () => {
      portalRoot && portalRoot.removeChild(el);
    };
  });

  return ReactDOM.createPortal(children, el);
};

export default Portal;
