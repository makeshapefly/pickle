import React, { createContext, useContext, useEffect, useState } from 'react';

const MemberContext = createContext({ member: null, addMember: (value: any) => {} });

export const MemberProvider = ({ children }) => {
  const [member, setMember] = useState(null);

  const addMember = (value: any) => {
    setMember(value);
  };

  return <MemberContext.Provider value={{ member, addMember }}>{children}</MemberContext.Provider>;
};

export const useMember = () => useContext(MemberContext);