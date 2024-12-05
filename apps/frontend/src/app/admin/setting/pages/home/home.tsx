import { Http, showToast } from '@frontend/common';
import { Button, IBreadcrumb, Icon, TextControl } from '@frontend/components';
import { useValidators } from '@frontend/hooks';
import { SettingWidgetGroup as SettingWidgetGroupModel } from '@frontend/model';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from '@mui/material';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '../../../../reduxs/admin-layout/admin-layout';
import SettingWidgetGroup from '../../components/setting-widget-group/setting-widget-group';
import styles from './home.module.scss';

export interface SettingWidgetGroupForm {
  name: string | null;
  sort: number | null;
}

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const [settingWidgetGroups, setSettingWidgetGroups] = React.useState<
    Array<SettingWidgetGroupModel>
  >([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loadingAction, setLoadingAction] = React.useState<boolean>(false);
  const [fetchApi, setFetchApi] = React.useState<number>(Math.random());
  const { t } = useTranslation();
  const http = React.useMemo(() => new Http(), []);
  const validators = useValidators();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingWidgetGroupForm>({
    defaultValues: {
      name: null,
      sort: null,
    },
  });

  React.useEffect(() => {
    const breadcrumbs: Array<IBreadcrumb> = [
      {
        label: t('breadcrumb.dashboard'),
        link: '/admin',
        isOrigin: true,
      },
      {
        label: t('breadcrumb.setting'),
        link: '#',
      },
    ];
    dispatch(setBreadcrumb(breadcrumbs));
  }, [t, dispatch]);

  React.useEffect(() => {
    const getSettingWidgets = async () => {
      try {
        const { data } = await http.get('setting-widget-group', { limit: -1 });
        setSettingWidgetGroups(data.data);
        /* eslint-disable-next-line */
      } catch (error: any) {
        showToast(t('notification.error'), 'error');
      }
    };

    getSettingWidgets();
  }, [http, fetchApi, t]);

  const handleOpenCreateWidgetGroupModal = () => {
    setOpenModal(true);
  };

  const handleCloseSettingWidgetGroupModal = () => {
    setOpenModal(false);
    setValue('name', null);
    setValue('sort', null);
  };

  const onSubmitWidgetGroupForm = (formValue: SettingWidgetGroupForm) => {
    const create = async () => {
      setLoadingAction(true);
      try {
        await http.post('setting-widget-group', formValue);
        showToast(
          t('settingWidgetGroup.notification.success.created'),
          'success'
        );
        setOpenModal(false);
        setFetchApi(Math.random());
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

  return (
    <>
      <div className={styles.container}>
        {settingWidgetGroups.map((item) => (
          <SettingWidgetGroup
            key={item.id}
            data={item}
            fetchData={setFetchApi}
          />
        ))}
        <div className={styles.actions}>
          <Tooltip title={t('settingWidgetGroup.button.add')}>
            <div
              className={styles.actions__create}
              onClick={handleOpenCreateWidgetGroupModal}
            >
              <Icon
                size={32}
                stroke={1}
                src={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                      <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                  </svg>`}
              />
            </div>
          </Tooltip>
        </div>
      </div>

      <Dialog
        open={openModal}
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
        <form onSubmit={handleSubmit(onSubmitWidgetGroupForm)}>
          <DialogTitle>{t(`form.heading.create`)}</DialogTitle>
          <DialogContent>
            <TextControl
              name="name"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.name}
              label={t('settingWidgetGroup.label.name')}
              validates={[validators.required]}
            />
            <TextControl
              name="sort"
              size="medium"
              color="primary"
              className="mb-3"
              control={control}
              errors={errors.sort}
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

export default Home;
