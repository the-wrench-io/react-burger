import React from 'react';
import {
  TextField, TextFieldProps, FormControl, FormControlProps,
  FormHelperText, InputLabel, Input, InputProps, Typography, Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { styled } from "@mui/material/styles";
import { FormattedMessage } from 'react-intl';

interface StyledInputFieldProps<T> {
  label: string;
  disabled?: boolean;
  helperText?: string;
  value: T | undefined;
  placeholder?: T | string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange: (newValue: T) => void;
  onEnter?: () => void;
}

const TextFieldRoot = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.paper,
  '& .MuiInputBase-input': {
    padding: theme.spacing(2)
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.uiElements.main,
    },
  },
}));

const StyledFormControl = styled(FormControl)<FormControlProps>(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.paper,
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.uiElements.main,
    },
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.h1.fontWeight,
  paddingLeft: theme.spacing(2),
}));

const StyledBottomText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  paddingLeft: theme.spacing(2),
}));

const StyledInputProps = styled(Input)<InputProps>(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.paper,
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.uiElements.main,
    },
  },
}));

const BottomText: React.FC<{
  helperText: string | undefined,
  errorMessage: string | undefined,
  error: boolean | undefined
}> = ({ helperText, errorMessage, error }) => {
  if (error) {
    return (
      <StyledBottomText color="error" variant='caption'>
        {errorMessage ? <FormattedMessage id={errorMessage} /> : errorMessage}
      </StyledBottomText>
    );
  }
  return (
    <StyledBottomText variant='caption'>
      {helperText ? <FormattedMessage id={helperText} /> : helperText}
    </StyledBottomText >
  );
}

const StyledFileField: React.FC<StyledInputFieldProps<string>> = ({ onChange, label, value, required, placeholder, helperText, disabled }) => {
  const title = <FormattedMessage id={label} />;
  return (
    <Box sx={{ mt: 2 }}>
      <InputLabel sx={{ fontWeight: "bold" }}>{title}</InputLabel>
      <StyledFormControl variant="outlined" fullWidth>
        <StyledInputProps
          fullWidth
          disableUnderline
          type="file"
          disabled={disabled}
          onChange={(e) => {
            const file: File = (e.target as any).files[0];
            const enc = new TextDecoder("utf-8");
            file.arrayBuffer().then(d => onChange(enc.decode(d)));
          }}
        />
      </StyledFormControl>
      {helperText ? <FormHelperText><FormattedMessage id={helperText} /></FormHelperText> : null}
    </Box>
  );
}

const StyledTextField: React.FC<StyledInputFieldProps<string>> = (props) => {
  const { onChange, onEnter, label, value, required, placeholder, helperText, disabled, errorMessage, error } = props;
  return (
    <>
      <StyledInputLabel><FormattedMessage id={label} /></StyledInputLabel>
      <TextFieldRoot
        fullWidth
        disabled={disabled}
        variant="outlined"
        required={required}
        placeholder={placeholder + ""}
        value={value}
        error={error}
        onChange={({ target }) => onChange(target.value)}
        onKeyPress={onEnter ? (event) => {
          const key = event.key;
          if (key === 'Enter') {
            onEnter();
          }
        } : undefined}
      />
      <BottomText helperText={helperText} errorMessage={errorMessage} error={error} />
    </>
  );
}

const StyledNumberField: React.FC<StyledInputFieldProps<number>> = (props) => {
  const { onChange, onEnter, label, value, required, placeholder, helperText, disabled, error, errorMessage } = props;
  return (
    <>
      <StyledInputLabel><FormattedMessage id={label} /></StyledInputLabel>
      <TextFieldRoot
        fullWidth
        disabled={disabled}
        variant="outlined"
        required={required}
        type={"number"}
        placeholder={placeholder + ""}
        value={value}
        error={error}
        onChange={({ target }) => onChange(target.value as any)}
        onKeyPress={onEnter ? (event) => {
          const key = event.key;
          if (key === 'Enter') {
            onEnter();
          }
        } : undefined}
      />
      <BottomText helperText={helperText} errorMessage={errorMessage} error={error} />
    </>
  );
}

const StyledDateField: React.FC<StyledInputFieldProps<string>> = (props) => {
  const { onChange, onEnter, label, value, required, placeholder, helperText, disabled, error, errorMessage } = props;
  const placeholderColor = value ? 'text.primary' : 'text.secondary';
  return (
    <>
      <StyledInputLabel><FormattedMessage id={label} /></StyledInputLabel>
      <TextFieldRoot
        fullWidth
        disabled={disabled}
        variant="outlined"
        required={required}
        type={"date"}
        placeholder={placeholder + ""}
        value={value}
        error={error}
        sx={{
          '& .MuiInputBase-input': {
            color: placeholderColor,
          }
        }}
        onChange={({ target }) => onChange(target.value as any)}
        onKeyPress={onEnter ? (event) => {
          const key = event.key;
          if (key === 'Enter') {
            onEnter();
          }
        } : undefined}
      />
      <BottomText helperText={helperText} errorMessage={errorMessage} error={error} />
    </>
  );
}

const StyledDateTimeField: React.FC<StyledInputFieldProps<string>> = (props) => {
  const { onChange, onEnter, label, value, required, placeholder, helperText, disabled, error, errorMessage } = props;
  const placeholderColor = value ? 'text.primary' : 'text.secondary';
  return (
    <>
      <StyledInputLabel><FormattedMessage id={label} /></StyledInputLabel>
      <TextFieldRoot
        fullWidth
        disabled={disabled}
        variant="outlined"
        required={required}
        type={"datetime-local"}
        placeholder={placeholder + ""}
        value={value}
        error={error}
        sx={{
          '& .MuiInputBase-input': {
            color: placeholderColor,
          }
        }}
        onChange={({ target }) => onChange(target.value as any)}
        onKeyPress={onEnter ? (event) => {
          const key = event.key;
          if (key === 'Enter') {
            onEnter();
          }
        } : undefined}
      />
      <BottomText helperText={helperText} errorMessage={errorMessage} error={error} />
    </>
  );
}

const StyledSearchField: React.FC<StyledInputFieldProps<string>> = (props) => {
  const { onChange, onEnter, label, value, required, placeholder, helperText, disabled, error, errorMessage } = props;
  return (
    <>
      <StyledInputLabel><FormattedMessage id={label} /></StyledInputLabel>
      <TextFieldRoot
        fullWidth
        disabled={disabled}
        variant="outlined"
        required={required}
        type={"string"}
        placeholder={placeholder + ""}
        value={value}
        error={error}
        onChange={({ target }) => onChange(target.value as any)}
        onKeyPress={onEnter ? (event) => {
          const key = event.key;
          if (key === 'Enter') {
            onEnter();
          }
        } : undefined}
        InputProps={{
          endAdornment: (
            <SearchIcon sx={{ color: 'uiElements.main' }} />
          ),
        }}
      />
      <BottomText helperText={helperText} errorMessage={errorMessage} error={error} />
    </>
  );
}

export type { StyledInputFieldProps }
export { StyledTextField, StyledNumberField, StyledFileField, StyledSearchField, StyledDateField, StyledDateTimeField }

