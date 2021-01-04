import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

const Page = forwardRef(({ children, title = '', ...rest }, ref) => (
  <div ref={ref} {...rest}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}

  </div>
));

export default Page;
