import React from "react";
import styled from "styled-components";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from "@mui/material/TextField";

interface Props {
  setFilter: Function,
  setPage: Function,
  setName: Function,
}

const Filter: React.FC<Props> = ({ setFilter, setPage, setName }) => {

  const handleChange = (value: string) => {
    setFilter(value);
    setPage(1);
  }

  const handleChangeName = (value: string) => {
    setName(value);
    setPage(1);
  }

  return (
    <Main>
      <h3>Refine sua busca</h3>
      <TextField 
        id="outlined-basic"
        label="Pesquisar"
        variant="outlined"
        onChange={ (event) => handleChangeName(event.target.value)}
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Por preço</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=''
          name="radio-buttons-group"
          onChange={ (event) => handleChange(event.target.value)}
        >
          <FormControlLabel value="0-40" control={<Radio />} label="Até R$40" />
          <FormControlLabel value="40-60" control={<Radio />} label="R$40 A R$60" />
          <FormControlLabel value="100-200" control={<Radio />} label="R$100 A R$200" />
          <FormControlLabel value="200-500" control={<Radio />} label="R$200 A R$500" />
          <FormControlLabel value="500-10000" control={<Radio />} label="Acima de R$500" />
        </RadioGroup>
      </FormControl>
    </Main>
  )
}

export default Filter

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  float: left; 

  @media (max-width: 800px) {
    display: none;
  }
`
