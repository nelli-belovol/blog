import React from 'react';
import { SignIn } from '@clerk/nextjs';
const page = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <SignIn routing="hash" forceRedirectUrl="/" />
    </div>
  );
};

export default page;
