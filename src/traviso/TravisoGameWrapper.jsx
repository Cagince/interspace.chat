import  React, { useRef, useEffect, useReducer } from 'react';
import { createFloatingRoomWindow } from '../components/FloatingRoomWindow';
import { initWhateverse } from './game';

const houseActions = {
    visit: 'visit',
    windowClose: 'windowClose',
};

function houseReducer(state, action) {
    switch(action.type) {
        case houseActions.visit:
            return { 
                ...state, 
                [action.payload.house.name]: true 
            };
        case houseActions.windowClose:
            return { 
                ...state, 
                [action.payload.name]: false 
            };
        default:
            return state;
    }
}

function TravisoGameWrapper({ }) {
    const [houses, dispatch] = useReducer(houseReducer, {});
    const ref = useRef(null);

    const canVisit = house => house.name && !houses[house.name];
    const onHouseVisit = house => canVisit(house) && dispatch({ type: houseActions.visit, payload: { house } });
    const closeHouseWindow = name =>  dispatch({ type: houseActions.windowClose, payload: { name } });

    useEffect(_ => ref && initWhateverse({ onHouseVisit }, ref), [ref]);

    const windows = Object.keys(houses)
        .filter(key => houses[key]);
        // .map((key, index) => createFloatingRoomWindow(key, closeHouseWindow, index));

    /**
     * @todo add windows ...etc.
     */
    return (
        <div ref={ref}>
            {windows}
        </div>
        
    );
}


export default TravisoGameWrapper;