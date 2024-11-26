import { Http, showToast } from '@frontend/common';
import {
  Button,
  ConfirmModal,
  SelectControl,
  SimplePagination,
  SimpleSearch,
  Table,
  TableActions,
  TableLoadingCell,
  TextControl,
} from '@frontend/components';
import { useValidators } from '@frontend/hooks';
import { Menu, Role } from '@frontend/model';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './menu.module.scss';

interface MenuForm {
  name: string | null;
  roleId: string | null;
}

/* eslint-disable-next-line */
export interface MenuProps {}

export function MenuComponent(props: MenuProps) {
  const [data, setData] = React.useState<Menu[]>([]);
  const [pagination, setPagination] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingAction, setLoadingAction] = React.useState<boolean>(false);
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [fetchApi, setFetchApi] = React.useState<number>(Math.random());
  const [mode, setMode] = React.useState<'create' | 'update'>('create');
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<Menu | null>(null);
  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);
  const { t } = useTranslation();
  const validators = useValidators();
  const http = React.useMemo(() => new Http(), []);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MenuForm>({
    defaultValues: {
      name: null,
      roleId: null,
    },
  });

  React.useEffect(() => {
    const getRoles = async () => {
      const res = await http.get('role');
      setRoles(res.data.data);
    };
    getRoles();
  }, []);

  React.useEffect(() => {
    const getMenus = async () => {
      setLoading(true);
      try {
        const { data } = await http.get('menu');
        setData(data.data);
        setPagination(data.meta.pagination);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMenus();
  }, [fetchApi, http]);

  const handleView = (item: Menu) => {
    navigate(`/admin/menu/${item.id}`);
  };

  const handleEdit = (item: Menu) => {
    setValue('name', item.name);
    setValue('roleId', item.roleId);
    handleOpenModal('update');
    setSelectedItem(item);
  };

  const handleDelete = (item: Menu) => {
    setSelectedItem(item);
    setOpenConfirmModal(true);
  };

  const handleOpenModal = (mode: 'create' | 'update') => {
    setOpenModal(true);
    setMode(mode);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setValue('name', null);
    setValue('roleId', null);
  };

  const columns = [
    {
      field: 'name',
      headerName: t('menuPage.label.name'),
    },
    {
      field: 'role.name',
      headerName: t('menuPage.label.role'),
    },
    {
      field: 'action',
      headerName: 'Actions',
      cellRenderer: ({ data }: any) => {
        return (
          <TableActions
            row={data}
            showView
            onView={handleView}
            showEdit
            onEdit={handleEdit}
            showDelete
            onDelete={handleDelete}
            hover={{
              view: '#3B82F6',
              edit: '#3B82F6',
              delete: '#EF4444',
            }}
          />
        );
      },
    },
  ];

  const createMenu = async (data: MenuForm) => {
    setLoadingAction(true);
    try {
      await http.post('menu', data);
      showToast(t('menuPage.notification.success.created'), 'success');
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

  const updateMenu = async (data: MenuForm) => {
    setLoadingAction(true);
    try {
      if (!selectedItem) return;
      await http.update('menu', selectedItem.id, data);
      showToast(t('menuPage.notification.success.updated'), 'success');
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

  const onSubmitForm = (data: MenuForm) => {
    mode === 'create' ? createMenu(data) : updateMenu(data);
  };

  const onCancelDelete = () => {
    setOpenConfirmModal(false);
    setSelectedItem(null);
  };

  const onConfirmDelete = async () => {
    if (!selectedItem) return;
    setLoadingAction(true);
    try {
      await http.delete('menu', selectedItem.id);
      showToast(t('menuPage.notification.success.deleted'), 'success');
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
      <div className={`${styles.menu} flex-grow-1 rounded-10`}>
        <div className={`${styles.menu__heading} mb-3`}>
          <Typography variant="h4">{t('breadcrumb.menu')}</Typography>
        </div>
        <div
          className={`${styles.menu__action} row g-3 justify-content-between mb-4`}
        >
          <div className="col-12 col-sm-6 col-lg-5">
            <SimpleSearch />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="row justify-content-end">
              <div className="col-12 col-md-5 col-lg-8">
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    padding: '8px 16px',
                  }}
                  startIcon={<AddRoundedIcon />}
                  onClick={() => handleOpenModal('create')}
                  fullWidth
                >
                  {t('common.add')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Table columns={columns} data={data} loading={loading} />
        <div
          className={`${styles.menu__pagination} d-flex justify-content-end`}
        >
          <SimplePagination pagination={pagination} color="primary" />
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
              name="name"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.name}
              label={t('menuPage.label.name')}
              validates={[validators.required]}
            />
            <SelectControl
              name="roleId"
              size="medium"
              color="primary"
              control={control}
              errors={errors.name}
              label={t('menuPage.label.role')}
              options={roles.map((role) => ({
                label: role.name,
                value: role.id,
              }))}
              disabled={mode === 'update'}
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
        content={t('menuPage.confirm.delete')}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
}

export default MenuComponent;
