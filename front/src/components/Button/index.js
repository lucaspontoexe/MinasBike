import styled from 'styled-components';

const Button = styled.button`
    /* color, general styling */
    background: ${props => props.color || '#c4c4c4'};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    border: none;

    /* positioning */
    height: 48px;
    min-width: 160px;
    margin: 20px;
    padding: 0px 20px;

    /* text properties */
    color: ${props => props.textColor || 'white'};
    font-size: 24px;
    line-height: 28px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default Button;
