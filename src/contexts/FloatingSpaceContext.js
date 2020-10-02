import React, { createContext, useState } from "react";
import {RoomNames} from '../utils/constants';

const unique = array => [...new Set(array)];

export const FloatingSpaceContext = createContext([{}, () => {}]);

const FloatingSpaceContextProvider = props => {
  const [currentFloatingSpaces, setFloatingSpaces] = useState([]);

  const addFloatingSpace = (windowKey) => setFloatingSpaces(unique(currentFloatingSpaces.concat(windowKey)));

  function closeFloatingSpace(windowKey) {
    setFloatingSpaces(currentFloatingSpaces.filter(s => s !== windowKey))
  }

  return (
    <FloatingSpaceContext.Provider value={{ currentFloatingSpaces, addFloatingSpace, closeFloatingSpace }}>
      {props.children}
    </FloatingSpaceContext.Provider>
  );
};

export default FloatingSpaceContextProvider;
