import { Input } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ImageUploadControlProps } from '../types';
import styles from './image-upload-control.module.scss';
const StyledFormControl = styled(FormControl)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;
const StyledFormLabel = styled(FormLabel)`
  .MuiFormLabel-asterisk {
    color: red;
  }
`;
/* eslint-disable-next-line */

export function ImageUploadControl(props: ImageUploadControlProps) {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState<number | null>(
    null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
    }
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.validates}
      render={({ field }) => (
        <StyledFormControl
          size="small"
          fullWidth
          className={props.className}
          error={Boolean(props.errors)}
          required={Boolean(props.validates.required)}
        >
          {!props.fieldset && (
            <StyledFormLabel className="mb-1">{props.label}</StyledFormLabel>
          )}
          <div className={styles['image-upload']}>
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                width="100"
                className={styles['image-upload__preview']}
              />
            )}
            <div className={styles['image-upload__input']}>
              <input type="file" {...field} onChange={handleImageChange} />
            </div>
          </div>
          <FormHelperText>{props.errors?.message}</FormHelperText>
        </StyledFormControl>
      )}
    />
  );
}

export default ImageUploadControl;
