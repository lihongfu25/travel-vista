import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageUploadControlProps } from '../types';
import styles from './image-upload-control.module.scss';
import { mergeValidates } from '../methods';

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
  const { t } = useTranslation();
  const [selectedImages, setSelectedImages] = React.useState<File[] | null>(
    null
  );

  const validates = mergeValidates(props.validates);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = event.target.files;
    if (fileList) {
      const files = Array.from(fileList);
      setSelectedImages(files);
      return files.map((file) => URL.createObjectURL(file));
    }
    return null;
  };

  const handleRemoveImage = (image: File) => {
    const newFiles = selectedImages
      ? selectedImages?.filter(
          (file) => file.lastModified !== image.lastModified
        )
      : null;
    setSelectedImages(newFiles);
    return newFiles?.map((file) => URL.createObjectURL(file)) || null;
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={validates}
      render={({ field }) => (
        <StyledFormControl
          size={props.size || 'small'}
          fullWidth
          className={props.className}
          error={Boolean(props.errors)}
          required={Boolean(validates.required)}
        >
          {!props.fieldset && (
            <StyledFormLabel className="mb-1">{props.label}</StyledFormLabel>
          )}
          <div className={styles['image-upload']}>
            {selectedImages?.map((image, i) => (
              <div className={styles['image-upload__preview']} key={i}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="object-fit-cover w-100 h-100"
                />
                <div
                  className={`${styles['image-upload__preview__backdrop']} position-absolute top-0 bottom-0 start-0 end-0 rounded-4`}
                >
                  <Tooltip title={t('common.delete')}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        const urls = handleRemoveImage(image);
                        field.onChange(urls);
                      }}
                    >
                      <DeleteOutlinedIcon
                        sx={{
                          color: '#f5f5f5',
                          fontSize: '1.5rem',
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ))}
            <div
              className={`${styles['image-upload__input']} ${
                Boolean(props.errors) && styles['error']
              }`}
            >
              <AddIcon
                sx={{
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                }}
              />
              <p
                className="mb-0 mt-2"
                style={{
                  color: '#1a1a1a',
                }}
              >
                {t('common.upload')}
              </p>
              <input
                type="file"
                multiple={props.multiple}
                onChange={async (e) => {
                  const urls = await handleImageChange(e);
                  field.onChange(urls);
                }}
              />
            </div>
          </div>
          <FormHelperText>{props.errors?.message}</FormHelperText>
        </StyledFormControl>
      )}
    />
  );
}

export default ImageUploadControl;
