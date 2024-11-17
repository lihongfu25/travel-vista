import {
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Button } from '../button/button';
import { useTranslation } from 'react-i18next';
import React from 'react';

/* eslint-disable-next-line */
export interface ConfirmModalProps {
  open: boolean;
  title: string;
  content: string;
  loading?: boolean;
  okText?: string;
  cancelText?: string;
  maxWidth?: false | Breakpoint | undefined;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  content,
  loading,
  okText,
  cancelText,
  maxWidth = 'xs',
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -20%)',
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions
        sx={{
          padding: '0 24px 20px',
          justifyContent: 'center',
        }}
      >
        <Button
          size="small"
          className="px-3"
          color="secondary"
          variant="outlined"
          onClick={onCancel}
        >
          {cancelText ?? t('common.cancel')}
        </Button>
        <Button
          size="small"
          type="submit"
          className="px-3"
          disableElevation
          variant="contained"
          loading={loading}
          onClick={onConfirm}
        >
          {okText ?? t('common.agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(ConfirmModal);
