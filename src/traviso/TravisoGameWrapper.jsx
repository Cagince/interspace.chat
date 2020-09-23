import  React, { useRef, useEffect, useState, useReducer } from 'react';
import { initWhateverse } from './game';

function TravisoGameWrapper({ }) {

    useEffect(_ => initWhateverse(), []);

    /**
     * @todo add modals ...etc.
     */
    return (<> </>);
}


export default TravisoGameWrapper;