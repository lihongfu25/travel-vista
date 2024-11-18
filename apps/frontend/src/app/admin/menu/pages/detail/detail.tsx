import { closestCenter, DndContext, useDroppable } from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
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
  const [isChange, setIsChange] = React.useState<boolean>(false);
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
  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);
  const { isOver, setNodeRef } = useDroppable({
    id: 'menu-item-dropped',
  });
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

  const handleSaveChange = () => {
    console.log('save change: ', data);
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
      setSelectedItem(undefined);
    }
  };

  const onSubmitForm = (data: any) => {
    mode === 'create' ? onCreateMenuItem(data) : onUpdateMenuItem(data);
  };
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = data.findIndex((item) => item.id === active.id);
    const newIndex = data.findIndex((item) => item.id === over?.id);

    const updatedData = arrayMove(data, oldIndex, newIndex).map(
      (item, index) => ({
        ...item,
        sort: index + 1,
      })
    );

    setIsChange(true);
    setData(updatedData);
  };

  const handleDelete = (item: MenuItem) => {
    setSelectedItem(item);
    setOpenConfirmModal(true);
  };

  const onCancelDelete = () => {
    setOpenConfirmModal(false);
    setSelectedItem(undefined);
  };

  const onConfirmDelete = async () => {
    if (!selectedItem) return;
    setLoadingAction(true);
    try {
      await http.delete('menu-item', selectedItem.id);
      showToast(t('menuItem.notification.success.deleted'), 'success');
      setOpenConfirmModal(false);
      setFetchApi(Math.random());
    } catch (error: any) {
      if (error?.response?.data?.message) {
        showToast(t(error?.response?.data?.message), 'error');
      }
    } finally {
      setLoadingAction(false);
    }
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
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div ref={setNodeRef} className={`${styles.menu__detail__list}`}>
              {data?.map((item: MenuItem) => (
                <MenuItemComponent
                  key={item.id}
                  data={item}
                  onView={handleOpenModal}
                  onEdit={handleOpenModal}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
              options={data.map((item: MenuItem) => ({
                label: item.label,
                value: item.id,
              }))}
              disabled={data.length === 0 || mode === 'view'}
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
        open={openConfirmModal}
        title={t('form.heading.delete')}
        content={t('menuItem.confirm.delete')}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
}

export default MenuDetailComponent;
