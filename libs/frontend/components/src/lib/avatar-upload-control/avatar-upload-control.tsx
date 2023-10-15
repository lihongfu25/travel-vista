import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import styles from './avatar-upload-control.module.scss';
import { useTranslation } from 'react-i18next';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { styled } from '@mui/system';

const StyledIconButton = styled(IconButton)`
  &:hover {
    background-color: #fff !important;
  }
`;
/* eslint-disable-next-line */
interface AvatarControlProps {
  className?: string;
  src?: string;
  style?: any;
  errors?: boolean;
}

export function AvatarUploadControl(props: AvatarControlProps) {
  const [selectedImages, setSelectedImages] = React.useState<string | null>(
    props.src || null
  );
  const { t } = useTranslation();

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClickUploadButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImages(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className={`${styles['avatar']} shadow-sm ${props.className}`}
      style={props.style}
    >
      {selectedImages && (
        <img
          src={selectedImages}
          alt="Preview"
          className={`${styles['avatar__preview']} object-fit-cover w-100 h-100`}
        />
      )}
      <div
        className={`${styles['avatar__input']} ${
          Boolean(props.errors) && styles['error']
        }`}
      >
        <Tooltip title={t('common.upload')}>
          <StyledIconButton
            sx={{
              backgroundColor: '#fff',
            }}
            size="small"
            className="shadow-sm"
            onClick={handleClickUploadButton}
          >
            <CameraAltRoundedIcon color="primary" fontSize="small" />
          </StyledIconButton>
        </Tooltip>
        <input type="file" ref={fileInputRef} onChange={handleImageChange} />
      </div>
    </div>
  );
}

export default AvatarUploadControl;
