import  React, { useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FloatingSpaceContext } from '../contexts/FloatingSpaceContext';
import { MetaGameURLS } from '../utils/constants';
import { initWhateverse } from './game';
import Logo from '../img/logo.png';

const StyledFooter = styled.div`
    font-size: ${props => props.theme.font.small};
    color: ${props => props.theme.color.blue};
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 320px;
    text-align: right;

    > a {
        color: ${props => props.theme.color.pink};
    }
`;

const StyledImage = styled.img`
    width: 100%;
    margin: 1em 0;
`;


function TravisoGameWrapper({ }) {
    const {currentFloatingSpaces, addFloatingSpace } = useContext(FloatingSpaceContext);
    const ref = useRef(null);
    console.log(currentFloatingSpaces)


    const onHouseVisit = house => addFloatingSpace(house);


    useEffect(_ => ref && initWhateverse({ onHouseVisit }, ref), [ref]);

    return (
        <div ref={ref}>
            <StyledFooter>
                <StyledImage src={Logo} />
                Feel free to make improvements to the map, download the .psd file
                &nbsp;<a href={MetaGameURLS.Psd}>here</a>&nbsp;
                and share with us <a href={MetaGameURLS.Discord}>there</a>
            </StyledFooter>
        </div>
        
    );
}

export default TravisoGameWrapper;