import React from 'react';
import { TextField } from '@material-ui/core';

type InputAreaProps = {
  label: string;
  onChange: any;
  type?: string;
  error: boolean;
  helperText: string;
  defaultValue: string;
};

export const InputArea: React.FC<InputAreaProps> = React.memo(
  ({ label, onChange, type, error, helperText, defaultValue }) => {
    return (
      <div className="input-wrapper">
        <TextField
          label={label}
          type={type}
          required
          onChange={onChange}
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      </div>
    );
  }
);
