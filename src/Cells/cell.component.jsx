import React from 'react';
import styled, { css } from 'styled-components';

const Cell = ({ className, onClick, value }) => {
  return <div className={className} onClick={onClick}>
    {value}
  </div>;
};

const StyledCell = styled(Cell)`
  ${({ className }) => {
    // Convert class names to CSS selectors and apply existing styles
    const classSelectors = className.split(' ').map((name) => `.${name}`).join(',');
    return css`
      ${classSelectors} {
        /* Existing class-based styles can be added here */
        /* For example: */
        /* border: 1px solid black; */
      }
    `;
  }}
`;

export default StyledCell;