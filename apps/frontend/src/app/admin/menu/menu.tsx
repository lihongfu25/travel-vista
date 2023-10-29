import { Http } from '@frontend/common';
import {
  Button,
  SelectControl,
  SimplePagination,
  SimpleSearch,
  Table,
  TextControl,
} from '@frontend/components';
import { useValidators } from '@frontend/hooks';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button as MuiButton,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './menu.module.scss';
import { Role } from '@frontend/model';
/* eslint-disable-next-line */
export interface MenuProps {}

const TableActionButton = styled(MuiButton)(() => ({
  paddingTop: '4px',
  paddingBottom: '4px',
  borderRadius: '6px',
}));

export function MenuComponent(props: MenuProps) {
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const validators = useValidators();
  const http = new Http();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

  const handleDelete = (item: any) => {
    // Xử lý logic xóa dữ liệu cho hàng cụ thể ở đây
    console.log('Xóa:', item);
  };

  const handleEdit = (item: any) => {
    // Xử lý logic chỉnh sửa dữ liệu cho hàng cụ thể ở đây
    console.log('Chỉnh sửa:', item);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const pagination = {
    itemCount: 5,
    totalItems: 12,
    itemsPerPage: 5,
    currentPage: 1,
    totalPages: 3,
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'age',
      label: 'Age',
    },
    {
      key: 'country',
      label: 'Country',
    },
  ];
  const data = [
    { name: 'John Doe', age: 30, country: 'USA' },
    { name: 'Jane Smith', age: 25, country: 'Canada' },
    // Thêm dữ liệu khác ở đây
  ];

  const onSubmitCreateForm = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className={`${styles['menu']} rounded-10`}>
        <div className={`${styles['menu__heading']} mb-3`}>
          <Typography variant="h4">{t('breadcrumb.menu')}</Typography>
        </div>
        <div
          className={`${styles['menu__action']} row g-3 justify-content-between mb-4`}
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
                  onClick={handleOpenCreateModal}
                  fullWidth
                >
                  {t('common.add')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={data}
          actions={(row) => (
            <Stack direction="row" spacing={1}>
              <TableActionButton
                color="info"
                size="small"
                variant="outlined"
                onClick={() => handleEdit(row)}
                startIcon={<DriveFileRenameOutlineRoundedIcon />}
              >
                {t('common.edit')}
              </TableActionButton>
              <TableActionButton
                size="small"
                color="error"
                variant="outlined"
                onClick={() => handleDelete(row)}
                startIcon={<DeleteRoundedIcon />}
              >
                {t('common.delete')}
              </TableActionButton>
            </Stack>
          )}
        />
        <div
          className={`${styles['menu__pagination']} d-flex justify-content-end`}
        >
          <SimplePagination pagination={pagination} color="primary" />
        </div>
      </div>
      <Dialog
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmitCreateForm)}>
          <DialogTitle>{t('form.heading.add')}</DialogTitle>
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
              validates={[validators.required]}
              options={roles.map((role) => ({
                label: role.name,
                value: role.id,
              }))}
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
              onClick={handleCloseCreateModal}
            >
              {t('common.cancel')}
            </Button>
            <Button
              size="small"
              type="submit"
              className="px-5"
              disableElevation
              variant="contained"
            >
              {t('common.save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default MenuComponent;
