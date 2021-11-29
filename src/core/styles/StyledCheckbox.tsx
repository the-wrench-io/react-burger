import React from 'react';
import { CheckboxProps, Checkbox, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { styled } from "@mui/material/styles";



const StyledCheckboxRoot = styled(Checkbox)<CheckboxProps>(({ theme }) => ({
  color: theme.palette.uiElements.main,
  '&.Mui-checked': {
    color: theme.palette.uiElements.main,
  }
}))


const StyledCheckbox: React.FC<{ checked: boolean, sx?: SxProps<Theme> }> = (props) => {
  return (
    <StyledCheckboxRoot />
  )
}

export { StyledCheckbox }