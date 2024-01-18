import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
    display: flex;
    background-color: red;
    padding: 0 10px;
    justify-content: space-between;
`

const StyledRightItemHeader = styled.div`
    display: flex;
    gap: 10px;
    background-color: red;
    justify-content: space-between;
`

const Header = ({name}) => {
    return (
        <StyledHeader>
            <div>
                <h1>Home</h1>
            </div>
            <StyledRightItemHeader>
                <h1>About</h1>
                <h1>Contact</h1>
                <h1>{name}</h1>
            </StyledRightItemHeader>

        </StyledHeader>
    )
}


export default Header;