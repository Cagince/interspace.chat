import React, { useEffect, useContext, useReducer } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';

import { FloatingSpaceContext } from '../contexts/FloatingSpaceContext';
import LoftRadioInstance from './integrations/LoftRadioInstance';
import RTreesInstance from './integrations/RTreesInstance';
import RoomInstance from './RoomInstance';
import { RoomNames } from '../utils/constants';

const height = 600;
const width = 850;

const SpaceHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SpaceHeaderElement = styled.div`
	font-family: monospace;
	margin: 0.5rem;
`;

const SpaceContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justifycontent: flex-start;
	flex-direction: column;
`;

const SpaceContent = styled.div`
	width: 100%;
	flex: 1;
`;

const StyledRnd = styled(Rnd)`
	background: ${props => props.theme.color.transparent_dark};
	border: 1px solid ${props => props.theme.color.pink};
	font-size: ${props => props.theme.font.large};
	backdrop-filter: opacity(20%);
	border-radius: 3px;
	padding: 16px 8px;
	margin: 10px;
	cursor: all-scroll;
	pointerEvents: all;

	&:active iframe: {
		pointerEvents: none,
	};

`;

const StyledCloser = styled.div`
	cursor: pointer;
	opacity: 0.7;

	&:hover {
		opacity: 1;
	}

	&::before {
		content: '×';
		font-family: Arial, sans-serif;
		font-weight: bold;
		font-size: ${props => props.theme.small};
		color: ${props => props.theme.color.pink};
	}
`;

function getFloatingRoomWindow(windowKey) {
	if (windowKey === 'loft.radio') {
		return <LoftRadioInstance />;
	} else if (RoomNames.indexOf(windowKey) > -1) {
		return <RoomInstance space={windowKey} />;
	} else if (windowKey === 'rTrees') {
		return <RTreesInstance backgroundColor={'white'} />;
	} else if (windowKey === null) {
		return null;
	}
}

function zIndexesReducer(state, action) {
	return {
		...state,
		[action.key]: action.value,
	};
}

const defaultDimensions =  { x: 20, y: 20, width, height };

function FloatingRoomWindow() {
	const { currentFloatingSpaces, closeFloatingSpace } = useContext(FloatingSpaceContext);

	const [zIndexes, setZIndexes] = useReducer(zIndexesReducer, {});
	const maxZ = Object.values(zIndexes).reduce((acc, el) => Math.max(acc, el), 1);

	useEffect(() => {
		let tempMax = maxZ;
		currentFloatingSpaces.forEach((space) => {
			if (!zIndexes[space]) {
				setZIndexes({ key: space, value: ++tempMax });
			}
		});
	}, [currentFloatingSpaces]);

	function setWindowFocus(windowKey) {
		setZIndexes({ key: windowKey, value: maxZ + 1 });
	}

	return currentFloatingSpaces.map((windowKey) => (
		<StyledRnd
			key={windowKey}
			default={defaultDimensions}
			style={{ zIndex: zIndexes[windowKey] || 1, }}
			onDragStart={() => setWindowFocus(windowKey)}
		>
			<SpaceContainer>
				<SpaceHeader>
					<SpaceHeaderElement></SpaceHeaderElement>
					<SpaceHeaderElement>{windowKey}</SpaceHeaderElement>
					<SpaceHeaderElement onClick={() => closeFloatingSpace(windowKey)}>
						<StyledCloser />
					</SpaceHeaderElement>
				</SpaceHeader>
				<SpaceContent>{getFloatingRoomWindow(windowKey)}</SpaceContent>
			</SpaceContainer>
		</StyledRnd>
	));
}

export default FloatingRoomWindow;
