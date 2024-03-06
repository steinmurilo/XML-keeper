import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100vh;
`

export const Table = styled.table`
    border-collapse: collapse;
    max-width: 50rem;
`

export const THead = styled.th`
    padding: 0.5rem;
    border: 1px solid;
    background-color: ${(props) => props.theme['base-card']};
`

export const TData = styled.td`
    padding: 0.5rem;
    border: 1px solid;
    text-align: center;
`