import {
  AddFileIcon,
  Button,
  ConfirmModal,
  DeleteIcon,
  EditIcon,
  Icon,
  NoData,
  TextControl,
  VerticalMoreIcon,
} from '@frontend/components';
import styles from './setting-widget-group.module.scss';
import { SettingWidgetGroup as SettingWidgetGroupModel } from '@frontend/model';
import SettingWidget from '../setting-widget/setting-widget';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useValidators } from '@frontend/hooks';
import { Http, showToast } from '@frontend/common';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { isEmpty } from 'lodash';
import { SettingWidgetGroupForm } from '../../pages/home/home';

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

export interface SettingWidgetGroupProps {
  data: SettingWidgetGroupModel;
  fetchData: (params: number) => void;
}

export function SettingWidgetGroup({
  data,
  fetchData,
}: SettingWidgetGroupProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
  const [loadingAction, setLoadingAction] = React.useState<boolean>(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    React.useState<boolean>(false);

  const { t } = useTranslation();
  const validators = useValidators();
  const http = React.useMemo(() => new Http(), []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingWidgetForm>({
    defaultValues: {
      settingWidgetGroupId: data.id,
      name: null,
      description: null,
      link: null,
      icon: null,
      sort: null,
    },
  });

  const {
    control: controlEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setValueEdit,
    formState: { errors: errorsEdit },
  } = useForm<SettingWidgetGroupForm>({
    defaultValues: {
      name: null,
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

  // create setting widget
  const handleOpenCreateSettingWidgetModal = () => {
    handleCloseMenu();
    setOpenCreateModal(true);
  };

  const handleCloseSettingWidgetModal = () => {
    setOpenCreateModal(false);
  };

  const onSubmitWidgetForm = (formValue: SettingWidgetForm) => {
    const create = async () => {
      setLoadingAction(true);
      try {
        await http.post('setting-widget', formValue);
        showToast(t('settingWidget.notification.success.created'), 'success');
        setOpenCreateModal(false);
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

    create();
  };

  // edit setting widget group
  const handleOpenEditWidgetGroupModal = () => {
    handleCloseMenu();
    setOpenEditModal(true);
    setValueEdit('name', data.name);
    setValueEdit('sort', data.sort);
  };

  const handleCloseSettingWidgetGroupModal = () => {
    setOpenEditModal(false);
    setValueEdit('name', null);
    setValueEdit('sort', null);
  };

  const onSubmitWidgetGroupForm = (formValue: SettingWidgetGroupForm) => {
    const update = async () => {
      setLoadingAction(true);
      try {
        await http.update('setting-widget-group', data.id, formValue);
        showToast(
          t('settingWidgetGroup.notification.success.updated'),
          'success'
        );
        setOpenEditModal(false);
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

  // delete setting widget group
  const onCancelDelete = () => {
    setOpenConfirmDeleteModal(false);
  };

  const onConfirmDelete = () => {
    const deleteSettingWidgetGroup = async () => {
      try {
        await http.delete('setting-widget-group', data.id);
        showToast(
          t('settingWidgetGroup.notification.success.deleted'),
          'success'
        );
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

    deleteSettingWidgetGroup();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header__title}>{data.name}</div>
          <div
            className={`${styles.header__actions} ${anchorEl && styles.active}`}
            onClick={handleClickMenu}
          >
            <Icon src={VerticalMoreIcon} size={18} />
          </div>
        </div>
        <div
          className={`${styles.body} ${
            data.settingWidgets && data.settingWidgets.length > 0
              ? ''
              : styles.noData
          }`}
        >
          {data.settingWidgets && data.settingWidgets.length > 0 ? (
            data.settingWidgets.map((item) => (
              <SettingWidget key={item.id} data={item} fetchData={fetchData} />
            ))
          ) : (
            <NoData
              title="settingWidgetGroup.label.noData.title"
              description="settingWidgetGroup.label.noData.description"
            />
          )}
        </div>
      </div>
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
        <StyledMenuItem onClick={handleOpenCreateSettingWidgetModal}>
          <Icon src={AddFileIcon} />
          <span className={styles.menuItem__label}>
            {t('settingWidget.button.add')}
          </span>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleOpenEditWidgetGroupModal}>
          <Icon src={EditIcon} />
          <span className={styles.menuItem__label}>
            {t('settingWidgetGroup.button.update')}
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
            {t('settingWidgetGroup.button.delete')}
          </span>
        </StyledMenuItem>
      </Menu>

      <Dialog
        open={openCreateModal}
        onClose={handleCloseSettingWidgetModal}
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
        <form onSubmit={handleSubmit(onSubmitWidgetForm)}>
          <DialogTitle>{t(`form.heading.create`)}</DialogTitle>
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
              onClick={handleCloseSettingWidgetModal}
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

      <Dialog
        open={openEditModal}
        onClose={handleCloseSettingWidgetGroupModal}
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
        <form onSubmit={handleSubmitEdit(onSubmitWidgetGroupForm)}>
          <DialogTitle>{t(`form.heading.update`)}</DialogTitle>
          <DialogContent>
            <TextControl
              name="name"
              size="medium"
              color="primary"
              className="mb-3"
              control={controlEdit}
              errors={errorsEdit.name}
              label={t('settingWidgetGroup.label.name')}
              validates={[validators.required]}
            />
            <TextControl
              name="sort"
              size="medium"
              color="primary"
              className="mb-3"
              control={controlEdit}
              errors={errorsEdit.sort}
              label={t('settingWidgetGroup.label.sort')}
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
              onClick={handleCloseSettingWidgetGroupModal}
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
              disabled={!isEmpty(errorsEdit)}
            >
              {t('common.save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmModal
        open={openConfirmDeleteModal}
        title={t('form.heading.delete')}
        content={t('settingWidgetGroup.confirm.delete')}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
}

export default SettingWidgetGroup;
