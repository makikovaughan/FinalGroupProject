import React from "react";
import styled from 'styled-components';

const StyledSelect = styled.select`
    font-family: 'Fira sans', sans-serif;
    color: #5533FF;
    font-weight: bold;
    font-size: 1.5em;
    border-radius: 0.5em;
    padding: 0.3em 0.7em;
`

const Dropdown = props => {

    return (
        <StyledSelect 
            name={props.name} 
            id={props.id} 
            className={`dropdown ${props.className}`} 
            onChange={e => props.selectOption(e)}
        >
            <option disabled selected hidden value=''>Pick an option</option>
            {props.options}
        </StyledSelect>
    )
}

export default Dropdown