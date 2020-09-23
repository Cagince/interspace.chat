import  React, { useRef, useEffect, useState, useReducer } from 'react';
import { initWhateverse } from './game';



const houseActions = {
    visit: 'visit',
    windowClose: 'windowClose',
}


function houseReducer(state, action) {
    switch(action.type) {
        case houseActions.visit:
            const { house } = action.payload;
            return { ...state, [house.name]: house };
        case houseActions.windowClose:
            const _state = { ...state };
            delete  _state[action.payload.houseName];
            return _state;
        default:
            return state;
    }
}

function TravisoGameWrapper({ }) {
    const [activeHouses, dispatch] = useReducer(houseReducer, {});

    const onHouseVisit = house => 
        house.name && 
        !activeHouses[house.name] && 
        dispatch({ type: houseActions.visit, payload: { house } });
    // const onHouseWindowClose = houseName => dispatch({ type: houseActions.windowClose, payload: { houseName } });

    useEffect(_ => initWhateverse({ onHouseVisit }), []);
    console.log(activeHouses);

    /**
     * @todo add modals ...etc.
     */
    return (<> </>);
}


export default TravisoGameWrapper;