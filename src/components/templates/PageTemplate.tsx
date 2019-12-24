import React from 'react';

const PageTemplate = ({ className, children, ...props }) => {
  return (
    <div className={`${className}-page`} {...props}>
      {children}
    </div>
  );
};

export default PageTemplate;
