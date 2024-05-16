import React from 'react';
import { SignIn } from '@clerk/nextjs';
const page = () => {
  return (
    <div>
      <SignIn routing="hash" fallbackRedirectUrl="/" />
    </div>
  );
};

export default page;
