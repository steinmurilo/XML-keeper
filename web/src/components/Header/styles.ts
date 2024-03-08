import styled from "styled-components";


export const HeadContainer = styled.section`
    padding: 2rem 1rem;
    margin-bottom: 1rem;
    background-color: ${(props) => props.theme['blue-title']};
    width: 100%;

    font-family: 'Lexend Giga', sans-serif;
    font-weight: 800;
    font-size: 2rem;
    color: ${(props) => props.theme['white']};

    display: flex;
    justify-content: flex-start;
`