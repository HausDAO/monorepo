import { WrappedSelect } from '../WrappedSelect/WrappedSelect';
import { SHAMAN_PERMISSIONS } from '@daohaus/utils';
import { Buildable, SelectProps } from '../../../types/formAndField';

export const ShamanPermission = (
  props: Buildable<Omit<SelectProps, 'options'>>
) => {
  const { id = 'shamanPermission' } = props;
  const options = SHAMAN_PERMISSIONS.map((permission) => ({
    name: permission.displayName,
    value: permission.id,
  }));
  return <WrappedSelect {...props} id={id} options={options} />;
};
