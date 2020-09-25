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
      // console.warm('#1 if is true')
      // console.warn(RoomNames.indexOf(windowKey) !== -1)
      // console.warn(currentFloatingSpaces.findIndex(s => RoomNames.indexOf(s) !== -1) !== -1);
      // console.warn('before:', currentFloatingSpaces);
      const spaces = currentFloatingSpaces
          .filter(s => RoomNames.indexOf(s) === -1)
          .concat([windowKey])

      // console.warn('after', spaces);
      setFloatingSpaces(spaces)
    } else {
      // console.warn('#2 if is not true')
      // console.warn(RoomNames.indexOf(windowKey) !== -1)
      // console.warn(currentFloatingSpaces.findIndex(s => RoomNames.indexOf(s) !== -1) !== -1);
      // console.warn('before:', currentFloatingSpaces);
      const spaces = currentFloatingSpaces.concat([windowKey]);
      // console.warn('after', spaces);
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
