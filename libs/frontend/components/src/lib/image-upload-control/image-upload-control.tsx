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
import { Http } from '@frontend/common';
import { CircularProgress } from '@mui/material';

interface UploadItem {
  url: string;
  status: 'success' | 'failed';
}

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
  const [uploadedItems, setUploadedItems] = React.useState<UploadItem[] | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const validates = mergeValidates(props.validates);
  const http = new Http();

  const uploadSingleImage = async (imageFile: File): Promise<UploadItem> => {
    if (!props.apiEndpoint) {
      return {
        url: URL.createObjectURL(imageFile),
        status: 'success',
      };
    }

    const formData = new FormData();
    formData.append('files', imageFile);

    try {
      const response = await http.post(props.apiEndpoint, formData);
      return {
        url: response.data.data[0].url,
        status: 'success',
      };
    } catch {
      if (props.control && props.name) {
        props.control.setError(props.name, {
          type: 'type',
          message: t('form.validators.type', { type: 'SVG' }),
        });
      }
    }

    return {
      url: URL.createObjectURL(imageFile),
      status: 'failed',
    };
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<UploadItem[] | null> => {
    setIsLoading(true);
    const { control, name, errors, clearErrors } = props;
    if (control && name && errors && clearErrors) {
      clearErrors(name);
    }

    const fileList = event.target.files;
    if (!fileList) {
      return null;
    }

    const files = Array.from(fileList);
    setSelectedImages(files);

    const uploadPromises = files.map((file) => uploadSingleImage(file));
    const uploadedItems = await Promise.all(uploadPromises);
    setUploadedItems(uploadedItems);

    setIsLoading(false);
    return uploadedItems;
  };

  const handleRemoveImage = (image: File) => {
    const newFiles = selectedImages
      ? selectedImages.filter(
          (file) => file.lastModified !== image.lastModified
        )
      : null;
    setSelectedImages(newFiles);

    const newUrls =
      uploadedItems?.filter(
        (_, index) => selectedImages?.indexOf(image) !== index
      ) || null;
    setUploadedItems(newUrls);
    return newUrls;
  };

  if (props.control && props.name)
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
            <div className={styles.preview__list}>
              {uploadedItems?.map((item, i) => (
                <div
                  className={`${styles.preview__list__item} ${
                    styles[`preview__list__item--${item.status}`]
                  }`}
                  key={i}
                >
                  <img
                    src={item.url}
                    alt="Preview"
                    className="object-fit-cover w-100 h-100"
                  />
                  <div
                    className={`${styles.preview__list__item__backdrop} position-absolute top-0 bottom-0 start-0 end-0 rounded-4`}
                  >
                    <Tooltip title={t('common.delete')}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          const urls = handleRemoveImage(selectedImages![i]);
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
                className={`${styles.preview__list__input} ${
                  Boolean(props.errors) && styles.error
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
                {isLoading && (
                  <div className={styles.preview__list__input__backdrop}>
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                      <CircularProgress size={24} sx={{}} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <FormHelperText
              sx={{
                fontSize: '12px',
              }}
            >
              {props.errors?.message}
            </FormHelperText>
          </StyledFormControl>
        )}
      />
    );
  else
    return (
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
        <div className={styles.preview__list}>
          {selectedImages?.map((item, i) => (
            <div className={styles.preview__list__item} key={i}>
              <img
                src={URL.createObjectURL(item)}
                alt="Preview"
                className="object-fit-cover w-100 h-100"
              />
              <div
                className={`${styles.preview__list__item__backdrop} position-absolute top-0 bottom-0 start-0 end-0 rounded-4`}
              >
                <Tooltip title={t('common.delete')}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleRemoveImage(item);
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
            className={`${styles.preview__list__input} ${
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
                await handleImageChange(e);
              }}
            />
          </div>
        </div>
        <FormHelperText
          sx={{
            fontSize: '12px',
          }}
        >
          {props.errors?.message}
        </FormHelperText>
      </StyledFormControl>
    );
}

export default ImageUploadControl;
