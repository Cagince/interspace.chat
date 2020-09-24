import  React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FloatingSpaceContext } from '../contexts/FloatingSpaceContext';
import { MetaGameURLS } from '../utils/constants';
import { initWhateverse } from './game';

const StyledFooterMessage = styled.div`
    font-size: ${props => props.theme.font.small};
    color: ${props => props.theme.color.blue};
    position: absolute;
    bottom: 10px;
    right: 10px;

    > a {
        color: ${props => props.theme.color.pink};
    }
`;


function TravisoGameWrapper({ }) {
    const { addFloatingSpace } = useContext(FloatingSpaceContext);
    const ref = useRef(null);

    const onHouseVisit = house => addFloatingSpace(house);


    useEffect(_ => ref && initWhateverse({ onHouseVisit }, ref), [ref]);

    return (
        <div ref={ref}>
            <StyledFooterMessage>
                Feel free to make improvements to the map, download the .psd file
                &nbsp;<a href={MetaGameURLS.Psd}>here</a>&nbsp;
                and share with us <a href={MetaGameURLS.Discord}>there</a>
            </StyledFooterMessage>
        </div>
        
    );
}

export default TravisoGameWrapper;