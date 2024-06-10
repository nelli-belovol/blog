'use client';

import { SignUp } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <SignUp routing="hash" forceRedirectUrl="/" />
    </div>
  );
};

export default page;
