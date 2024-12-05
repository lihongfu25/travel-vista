import { Http, showToast } from '@frontend/common';
import {
  Button,
  ConfirmModal,
  DeleteIcon,
  EditIcon,
  Icon,
  TextControl,
  VerticalMoreIcon,
} from '@frontend/components';
import { useValidators } from '@frontend/hooks';
import { SettingWidget as SettingWidgetModel } from '@frontend/model';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './setting-widget.module.scss';

const StyledMenuItem = styled(MenuItem)({
  minWidth: '200px',
});

interface SettingWidgetForm {
  settingWidgetGroupId: string;
  name: string | null;
  description: string | null;
  link: string | null;
  icon: string | null;
  sort: number | null;
}

export interface SettingWidgetProps {
  data: SettingWidgetModel;
  fetchData: (params: number) => void;
}

export function SettingWidget({ data, fetchData }: SettingWidgetProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loadingAction, setLoadingAction] = React.useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    React.useState<boolean>(false);

  const { t } = useTranslation();
  const validators = useValidators();
  const http = React.useMemo(() => new Http(), []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingWidgetForm>({
    defaultValues: {
      settingWidgetGroupId: data.settingWidgetGroupId,
      name: null,
      description: null,
      link: null,
      icon: null,
      sort: null,
    },
  });

  // open menu
  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // edit setting widget
  const handleOpenEditModal = () => {
    handleCloseMenu();
    setOpenModal(true);
    setValue('name', data.name);
    setValue('description', data.description);
    setValue('link', data.link);
    setValue('icon', data.icon);
    setValue('sort', data.sort);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setValue('name', null);
    setValue('description', null);
    setValue('link', null);
    setValue('icon', null);
    setValue('sort', null);
  };

  const onSubmitForm = (formValue: SettingWidgetForm) => {
    const update = async () => {
      setLoadingAction(true);
      try {
        await http.update('setting-widget', data.id, formValue);
        showToast(t('settingWidget.notification.success.updated'), 'success');
        setOpenModal(false);
        fetchData(Math.random());
        /* eslint-disable-next-line */
      } catch (error: any) {
        if (error?.response?.data?.statusCode === 403) {
          showToast(t('notification.errorCommon.error403'), 'error');
        } else if (error?.response?.data?.message) {
          showToast(t(error?.response?.data?.message), 'error');
        } else {
          showToast(t('notification.error'), 'error');
        }
      } finally {
        setLoadingAction(false);
      }
    };

    update();
  };

  // delete setting widget
  const onCancelDelete = () => {
    setOpenConfirmDeleteModal(false);
  };

  const onConfirmDelete = () => {
    const deleteSettingWidget = async () => {
      try {
        await http.delete('setting-widget', data.id);
        showToast(t('settingWidget.notification.success.deleted'), 'success');
        setOpenConfirmDeleteModal(false);
        fetchData(Math.random());
        /* eslint-disable-next-line */
      } catch (error: any) {
        if (error?.response?.data?.statusCode === 403) {
          showToast(t('notification.errorCommon.error403'), 'error');
        } else if (error?.response?.data?.message) {
          showToast(t(error?.response?.data?.message), 'error');
        } else {
          showToast(t('notification.error'), 'error');
        }
      }
    };

    deleteSettingWidget();
  };

  return (
    <>
      <Link to={data.link} className={styles.link}>
        <div className={styles.container}>
          {data.icon && (
            <div className={styles.icon}>
              <Icon src={data.icon} size={40} stroke={1} />
            </div>
          )}
          <div className={styles.info}>
            <div className={styles.name}>{data.name}</div>
            {data.description && (
              <div className={styles.description}>{data.description}</div>
            )}
          </div>
          <div
            className={`${styles.actions} ${anchorEl ? styles.active : ''}`}
            onClick={handleClickMenu}
          >
            <Icon src={VerticalMoreIcon} size={18} />
          </div>
        </div>
      </Link>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 10,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <StyledMenuItem onClick={handleOpenEditModal}>
          <Icon src={EditIcon} />
          <span className={styles.menuItem__label}>
            {t('settingWidget.button.update')}
          </span>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            handleCloseMenu();
            setOpenConfirmDeleteModal(true);
          }}
        >
          <Icon src={DeleteIcon} />
          <span className={styles.menuItem__label}>
            {t('settingWidget.button.delete')}
          </span>
        </StyledMenuItem>
      </Menu>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
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
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <DialogTitle>{t(`form.heading.update`)}</DialogTitle>
          <DialogContent>
            <TextControl
              name="name"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.name}
              label={t('settingWidget.label.name')}
              validates={[validators.required]}
            />
            <TextControl
              name="description"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.description}
              label={t('settingWidget.label.description')}
              multiline
              rows={3}
            />
            <TextControl
              name="link"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.link}
              label={t('settingWidget.label.link')}
              validates={[validators.required]}
            />
            <TextControl
              name="icon"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.icon}
              label={t('settingWidget.label.icon')}
              multiline
              rows={5}
            />
            <TextControl
              name="sort"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.sort}
              label={t('settingWidget.label.sort')}
            />
          </DialogContent>
          <DialogActions
            sx={{
              padding: '0 24px 20px',
            }}
          >
            <Button
              size="small"
              className="px-5"
              color="secondary"
              variant="outlined"
              onClick={handleCloseModal}
              disabled={loadingAction}
            >
              {t('common.cancel')}
            </Button>
            <Button
              size="small"
              type="submit"
              className="px-5"
              disableElevation
              variant="contained"
              loading={loadingAction}
              disabled={!isEmpty(errors)}
            >
              {t('common.save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmModal
        open={openConfirmDeleteModal}
        title={t('form.heading.delete')}
        content={t('form.content.delete')}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
}

export default SettingWidget;
