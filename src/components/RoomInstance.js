import React, { useState } from "react";
import styled from "styled-components";

import { RoomURLs } from "../utils/constants";
import JitsiInstance from './integrations/JitsiInstance';
// import YoutubeInstance from './integrations/YoutubeInstance';
// import HubInstance from './integrations/HubInstance';

const SERVICES = {
  jitsi: {
    title: 'Jitsi',
    component: JitsiInstance,
  },
  youtube: {
    title: 'Youtube',
    component: () => null,
    external: true,
  },
  mozillaHub: {
    title: 'Virtual Hub',
    component: () => null,
    external: true,
  },
};

//#region Styled Components

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: ${props => props.theme.font.medium};
`;

const ServiceButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
`;

const ServiceButton = styled.div`
  padding: 10px 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.color.white};

  &:hover > span {
    text-shadow: ${props => props.theme.color.text_shadow_pink};
  }

  border-bottom: 1px solid ${props => props.theme.color.blue};
  
  span {
    font-family: monospace;
    text-shadow: ${props => props.theme.color.text_shadow_blue};
  }

  &.active {
    border-radius: 3px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid ${props => props.theme.color.blue};
    border-bottom: none;

    span {
    text-shadow: ${props => props.theme.color.text_shadow_blue};
    }
  }
`;

const ServiceContent = styled.div`
  border-radius: 3px;
  background: ${props => props.theme.color.transparent_dark};
  border: 1px solid ${props => props.theme.color.blue};
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-top: none;

  margin: 0 5px;
  padding: 1em;
  flex: 1;
`;

//#endregion

const RoomInstance = ({space}) => {
  const roomURLs = RoomURLs[space];
  const availableServiceNames = Object.keys(SERVICES).filter(serviceName => Object.keys(roomURLs).includes(serviceName));

  const [selectedServiceName, selectServiceName] = useState(availableServiceNames[0]);

  if(availableServiceNames.length === 0) return <div>Unknown room</div>;

  const roomData = roomURLs[selectedServiceName];
  const selectedService = SERVICES[selectedServiceName];
  const RoomServiceComponent = selectedService.component;

  function onServiceClick(name) {
    const service = SERVICES[name];
    if(service.external) {
      const roomData = roomURLs[name];
      window.open(roomData.externalUrl)
    } else {
      selectServiceName(name);
    }
  }


  return (
    <Container>
      <ServiceButtonContainer>
        {
          availableServiceNames.map(serviceName =>
            <ServiceButton
              key={serviceName}
              onClick={() => onServiceClick(serviceName)}
              className={selectedServiceName === serviceName && 'active'}
            >
              <span>{SERVICES[serviceName].title}</span>
              {SERVICES[serviceName].external &&
              <i className="fas fa-external-link-alt" style={{ marginLeft: 10 }}/>
              }
            </ServiceButton>
          )
        }
      </ServiceButtonContainer>

      <ServiceContent>
        <RoomServiceComponent roomData={roomData} />
      </ServiceContent>
    </Container>
  );
};

export default RoomInstance;
