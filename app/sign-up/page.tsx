'use client';

import { SignUp } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return <SignUp routing="hash" forceRedirectUrl="/" />;
};

export default page;
