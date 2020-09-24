import  React, { useRef, useEffect, useReducer, useContext } from 'react';
import { FloatingSpaceContext } from '../contexts/FloatingSpaceContext';
// import { createFloatingRoomWindow } from '../components/FloatingRoomWindow';
import { initWhateverse } from './game';

import styled from 'styled-components';


const COLORS = {
    BLUE: '#0dc3cf',
    PINK: '#ff247c',
}

const StyledFooterMessage = styled.div`
    position: absolute;
    bottom: 10px;
    right: 20px;
    margin: auto;

    font-size: 10px;
    color: ${COLORS.BLUE};


    > a {
        color: ${COLORS.PINK};
    }
`;



function TravisoGameWrapper({ }) {
    const { currentFloatingSpaces, addFloatingSpace } = useContext(FloatingSpaceContext);
    const ref = useRef(null);

    // const onHouseVisit = house => canVisit(house) && dispatch({ type: houseActions.visit, payload: { house } });
    const onHouseVisit = house => addFloatingSpace(house.name);

    useEffect(_ => ref && initWhateverse({ onHouseVisit }, ref), [ref]);

    return (
        <div ref={ref}>
            <StyledFooterMessage>
				Feel free to make improvements to the map, download the .psd file&nbsp;
				<a href='https://www.dropbox.com/s/cocwaannzy8lqty/Interspace%20v0.2.psd?dl=0'>
					here
				</a>&nbsp;
				and share with us <a href='https://discord.gg/cZjqQmE'>there</a>
            </StyledFooterMessage>
        </div>
        
    );
}


export default TravisoGameWrapper;