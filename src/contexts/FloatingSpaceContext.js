import React, { createContext, useState } from "react";
import {RoomNames} from '../utils/constants';

export const FloatingSpaceContext = createContext([{}, () => {}]);

const FloatingSpaceContextProvider = props => {
  const [currentFloatingSpaces, setFloatingSpaces] = useState([]);

  function addFloatingSpace(windowKey) {
    if(currentFloatingSpaces.indexOf(windowKey) !== -1) return;

    if(
      RoomNames.indexOf(windowKey) !== -1 &&
      currentFloatingSpaces.findIndex(s => RoomNames.indexOf(s) !== -1) !== -1
    ) {
      const spaces = currentFloatingSpaces
          .filter(s => RoomNames.indexOf(s) === -1)
          .concat([windowKey])

      setFloatingSpaces(spaces)
    } else {
      const spaces = currentFloatingSpaces.concat([windowKey]);
      setFloatingSpaces(spaces);
    }
  }

  function closeFloatingSpace(windowKey) {
    console.error('close requested?')
    setFloatingSpaces(currentFloatingSpaces.filter(s => s !== windowKey))
  }

  return (
    <FloatingSpaceContext.Provider value={{ currentFloatingSpaces, addFloatingSpace, closeFloatingSpace }}>
      {props.children}
    </FloatingSpaceContext.Provider>
  );
};

export default FloatingSpaceContextProvider;
