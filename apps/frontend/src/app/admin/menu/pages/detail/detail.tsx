import { Menu, MenuItem } from '@frontend/model';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './detail.module.scss';
import { Http, showToast } from '@frontend/common';
import { useTranslation } from 'react-i18next';
import { Button, SelectControl, TextControl } from '@frontend/components';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useValidators } from '@frontend/hooks';
import { isEmpty } from 'lodash-es';
import { MenuItemComponent } from '../../components/menu-item/menu-item';

interface MenuItemForm {
  label: string | null;
  link: string | null;
  icon: string | null;
  parentId: number | null;
}

/* eslint-disable-next-line */
export interface MenuDetailProps {}

export function MenuDetailComponent(props: MenuDetailProps) {
  const [menu, setMenu] = React.useState<Menu | null>(null);
  const [data, setData] = React.useState<Array<MenuItem>>([]);
  const [isChange, setIsChange] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingAction, setLoadingAction] = React.useState<boolean>(false);
  const [fetchApi, setFetchApi] = React.useState<number>(Math.random());
  const [mode, setMode] = React.useState<'create' | 'update'>('create');
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<Menu | null>(null);
  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);
  const { id } = useParams();
  const { t } = useTranslation();
  const validators = useValidators();
  const http = React.useMemo(() => new Http(), []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenuItemForm>({
    defaultValues: {
      label: null,
      link: null,
      icon: null,
      parentId: null,
    },
  });

  const fetchMenuItems = async (name: string | undefined) => {
    if (!name) return;
    try {
      const { data } = await http.get('menu-item/menu-item-by-name', {
        menuName: name,
      });
      setData(data.data);
      console.log(data.data);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    }
  };

  const fetchMenu = async (id: string | number | undefined) => {
    if (!id) return;
    try {
      const { data } = await http.show('menu', id);
      setMenu(data.data);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    }
  };

  React.useEffect(() => {
    fetchMenu(id);
  }, [id]);

  React.useEffect(() => {
    fetchMenuItems(menu?.name);
  }, [menu, fetchApi]);

  const handleOpenModal = (mode: 'create' | 'update') => {
    setOpenModal(true);
    setMode(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setValue('label', null);
    setValue('link', null);
    setValue('icon', null);
    setValue('parentId', null);
  };

  const handleSaveChange = () => {
    console.log('save change');
  };

  const onCreateMenuItem = async (data: any) => {
    setLoadingAction(true);
    try {
      await http.post('menu-item', { ...data, menuId: menu?.id });
      showToast(t('menuItem.notification.success.created'), 'success');
      setFetchApi(Math.random());
      handleCloseModal();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    } finally {
      setLoadingAction(false);
    }
  };

  const onUpdateMenuItem = async (data: any) => {
    setLoadingAction(true);
    try {
      if (!selectedItem) return;
      await http.update('menu-item', selectedItem.id, data);
      showToast(t('menuItem.notification.success.updated'), 'success');
      setFetchApi(Math.random());
      handleCloseModal();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    } finally {
      setLoadingAction(false);
      setSelectedItem(null);
    }
  };

  const onSubmitForm = (data: any) => {
    mode === 'create' ? onCreateMenuItem(data) : onUpdateMenuItem(data);
  };

  return (
    <>
      <div className={`${styles.menu__detail} flex-grow-1 rounded-10`}>
        <div className={`${styles.menu__detail__heading}`}>
          <div className="">
            <h1 className="">{menu?.name}</h1>
          </div>
          <div className="row justify-content-end">
            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  padding: '8px 16px',
                }}
                onClick={() => handleSaveChange()}
                fullWidth
                disabled={!isChange}
              >
                {t('common.save')}
              </Button>
            </div>
            <div className="col-12 col-sm-4 col-md-3 col-lg-2">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  padding: '8px 16px',
                }}
                onClick={() => handleOpenModal('create')}
                fullWidth
              >
                {t('common.add')}
              </Button>
            </div>
          </div>
        </div>
        <div className={`${styles.menu__detail__list}`}>
          {data?.map((item: MenuItem) => (
            <MenuItemComponent key={item.id} data={item} />
          ))}
        </div>
      </div>
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
          <DialogTitle>{t(`form.heading.${mode}`)}</DialogTitle>
          <DialogContent>
            <TextControl
              name="label"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.label}
              label={t('menuItem.label.label')}
              validates={[validators.required]}
            />
            <TextControl
              name="link"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.link}
              label={t('menuItem.label.link')}
              validates={[validators.required]}
            />
            <TextControl
              name="icon"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.icon}
              label={t('menuItem.label.icon')}
              multiline
              rows={5}
            />
            <SelectControl
              name="parentId"
              size="medium"
              color="primary"
              control={control}
              errors={errors.parentId}
              label={t('menuItem.label.parent')}
              options={data.map((item: MenuItem) => ({
                label: item.label,
                value: item.id,
              }))}
              disabled={data.length === 0}
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
    </>
  );
}

export default MenuDetailComponent;
