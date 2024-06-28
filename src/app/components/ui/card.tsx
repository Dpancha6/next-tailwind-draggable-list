import React, { ReactNode } from 'react';

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={` w-full pl-4  bg-black ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }: { children: ReactNode; className?: string }) => {
  return (
    <div className="p-4">
      {children}
    </div>
  );
};
