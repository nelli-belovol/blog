import React from 'react';
import { SignIn } from '@clerk/nextjs';
const page = () => {
  return (
    <div>
      <SignIn routing="hash" forceRedirectUrl="/" />
    </div>
  );
};

export default page;
