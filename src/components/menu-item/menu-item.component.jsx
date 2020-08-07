import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  Title,
  SubTitle,
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <MenuItemContainer
    className={`${size}`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroundImageContainer
      className='background-image'
      imageUrl={imageUrl}
    />
    <ContentContainer>
      <Title>{title.toUpperCase()}</Title>
      <SubTitle>SHOP NOW</SubTitle>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
