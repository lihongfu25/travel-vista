import { Http, showToast } from '@frontend/common';
import {
  Button,
  ConfirmModal,
  SelectControl,
  TextControl,
} from '@frontend/components';
import { useValidators } from '@frontend/hooks';
import { Menu, MenuItem } from '@frontend/model';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import { useParams } from 'react-router-dom';
import { MenuItemComponent } from '../../components/menu-item/menu-item';
import styles from './detail.module.scss';

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
  const [flatData, setFlatData] = React.useState<Array<MenuItem>>([]);
  const [isChange, setIsChange] = React.useState<boolean>(false);
  /* eslint-disable-next-line */
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingAction, setLoadingAction] = React.useState<boolean>(false);
  const [fetchApi, setFetchApi] = React.useState<number>(Math.random());
  const [mode, setMode] = React.useState<'create' | 'update' | 'view'>(
    'create'
  );
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<MenuItem | undefined>(
    undefined
  );
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    React.useState<boolean>(false);
  const [openConfirmSortModal, setOpenConfirmSortModal] =
    React.useState<boolean>(false);
  const [openConfirmDiscardChangeModal, setOpenConfirmDiscardChangeModal] =
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

  const nestMenuItems = (flatData: MenuItem[]): MenuItem[] => {
    const itemMap = new Map<number, MenuItem>();
    const nestedData: MenuItem[] = [];

    flatData.forEach((item) => {
      item.children = [];
      itemMap.set(item.id, item);
    });

    flatData.forEach((item) => {
      if (item.parentId === null) {
        nestedData.push(item);
      } else {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          parent.children.push(item);
        }
      }
    });

    return nestedData;
  };

  const fetchMenuItems = async (name: string | undefined) => {
    if (!name) return;
    try {
      const { data } = await http.get('menu-item/menu-item-by-name', {
        menuName: name,
      });
      const nestedData = nestMenuItems(data.data);
      setFlatData(data.data);
      setData(nestedData);
      /* eslint-disable-next-line */
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
      /* eslint-disable-next-line */
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    }
  };

  React.useEffect(() => {
    fetchMenu(id);
    /* eslint-disable-next-line */
  }, [id]);

  React.useEffect(() => {
    fetchMenuItems(menu?.name);
    /* eslint-disable-next-line */
  }, [menu, fetchApi]);

  const handleOpenModal = (
    mode: 'create' | 'update' | 'view',
    item?: MenuItem
  ) => {
    setMode(mode);
    setSelectedItem(item);
    if (item) {
      setValue('label', item.label);
      setValue('link', item.link);
      setValue('icon', item.icon);
      setValue('parentId', item.parentId);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setValue('label', null);
    setValue('link', null);
    setValue('icon', null);
    setValue('parentId', null);
  };

  const handleAddItem = () => {
    isChange ? handleDiscard() : handleOpenModal('create');
  };

  const handleSaveSort = () => {
    setOpenConfirmSortModal(true);
  };

  const onCancelSort = () => {
    setOpenConfirmSortModal(false);
  };

  const onConfirmSort = () => {
    const sort = async () => {
      if (!menu) return;
      try {
        await http.post(`menu-item/sort/menu/${menu.id}`, data);
        setFetchApi(Math.random());
        setIsChange(false);
        setOpenConfirmSortModal(false);
        showToast(t('menuItem.notification.success.sorted'), 'success');
        /* eslint-disable-next-line */
      } catch (error: any) {
        if (error?.response?.data?.message) {
          showToast(t(error?.response?.data?.message), 'error');
        }
      }
    };

    sort();
  };

  const onCreateMenuItem = async (data: MenuItemForm) => {
    setLoadingAction(true);
    try {
      await http.post('menu-item', { ...data, menuId: menu?.id });
      showToast(t('menuItem.notification.success.created'), 'success');
      setFetchApi(Math.random());
      handleCloseModal();
      /* eslint-disable-next-line */
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    } finally {
      setLoadingAction(false);
    }
  };

  const onUpdateMenuItem = async (data: MenuItemForm) => {
    setLoadingAction(true);
    try {
      if (!selectedItem) return;
      await http.update('menu-item', selectedItem.id, data);
      showToast(t('menuItem.notification.success.updated'), 'success');
      setFetchApi(Math.random());
      handleCloseModal();
      /* eslint-disable-next-line */
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    } finally {
      setLoadingAction(false);
      setSelectedItem(undefined);
    }
  };

  const onSubmitForm = (data: MenuItemForm) => {
    mode === 'create' ? onCreateMenuItem(data) : onUpdateMenuItem(data);
  };

  const handleDelete = (item: MenuItem) => {
    setSelectedItem(item);
    setOpenConfirmDeleteModal(true);
  };

  const onCancelDelete = () => {
    setOpenConfirmDeleteModal(false);
    setSelectedItem(undefined);
  };

  const onConfirmDelete = async () => {
    if (!selectedItem) return;
    setLoadingAction(true);
    try {
      await http.delete('menu-item', selectedItem.id);
      showToast(t('menuItem.notification.success.deleted'), 'success');
      setOpenConfirmDeleteModal(false);
      setFetchApi(Math.random());
      /* eslint-disable-next-line */
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDiscard = () => {
    setOpenConfirmDiscardChangeModal(true);
  };

  const onCancelDiscard = () => {
    setOpenConfirmDiscardChangeModal(false);
  };

  /* eslint-disable-next-line */
  const onConfirmDiscard = () => {
    setOpenConfirmDiscardChangeModal(false);
    handleOpenModal('create');
    setIsChange(false);
    setData(nestMenuItems(flatData));
  };

  const updateParent = (
    data: MenuItem[],
    parentId: number | null = null,
    currentSort = 0
  ): MenuItem[] => {
    return data.map((item) => {
      currentSort++;
      const updatedItem = { ...item, parentId, sort: currentSort };
      if (item.children && item.children.length > 0) {
        updatedItem.children = updateParent(
          item.children,
          item.id,
          currentSort
        );
      }
      return updatedItem;
    });
  };

  const handleMenuChange = (data: MenuItem[]) => {
    const newData = updateParent(data);
    setIsChange(true);
    setData(newData);
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
                onClick={handleSaveSort}
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
                onClick={handleAddItem}
                fullWidth
              >
                {t('common.add')}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.menu__detail__list}>
          <Nestable
            items={data}
            maxDepth={2}
            renderItem={({ item }) => (
              <MenuItemComponent
                data={item as MenuItem}
                onView={handleOpenModal}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            )}
            onChange={({ items }) => handleMenuChange(items as MenuItem[])}
          />
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
              disabled={mode === 'view'}
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
              disabled={mode === 'view'}
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
              disabled={mode === 'view'}
            />
            <SelectControl
              name="parentId"
              size="medium"
              color="primary"
              control={control}
              errors={errors.parentId}
              label={t('menuItem.label.parent')}
              options={flatData.map((item: MenuItem) => ({
                label: item.label,
                value: item.id,
              }))}
              disabled={flatData.length === 0 || mode === 'view'}
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
      <ConfirmModal
        open={openConfirmSortModal}
        title={t('form.heading.saveChange')}
        content={t('form.content.saveChange')}
        onConfirm={onConfirmSort}
        onCancel={onCancelSort}
      />
      <ConfirmModal
        open={openConfirmDiscardChangeModal}
        title={t('form.heading.haveChange')}
        content={t('form.content.haveChange')}
        onConfirm={onConfirmDiscard}
        onCancel={onCancelDiscard}
      />
    </>
  );
}

export default MenuDetailComponent;
