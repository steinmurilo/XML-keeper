import styled from "styled-components"

export const TableContainer = styled.table`
    border-collapse: collapse;
    font-size: 0.75rem;
`

export const THead = styled.th`
    padding: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme['gray-100']};
    background-color: ${(props) => props.theme['blue-title']};
    font-weight: bold;
    color: ${(props) => props.theme['white']};
`

export const TData = styled.td`
    padding: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme['gray-100']};
    text-align: center;

    &.currency {
        text-align: end;
    }

    svg {
        cursor: pointer;
    }
`

export const ButtonContainer = styled.section`
    margin-top: 1rem;
    display: flex;
    
    align-items: center;
`

export const NavButtom = styled.button`
    padding: 0.25rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 1rem;

    border-radius: 5px;
    border: none;
    background-color: ${(props) => props.theme['gray-300']};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme['gray-500']};
    }

    &:disabled {
        background-color: ${(props) => props.theme['gray-100']};
        cursor: not-allowed;
    }
`