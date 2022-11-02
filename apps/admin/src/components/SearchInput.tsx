import { ChangeEvent, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Field, Input } from '@daohaus/ui';
import useDebounce from '../utils/debounceHook';
import { Noun } from '@daohaus/utils';

type SearchInputProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalItems: number;
  noun?: Noun;
} & Partial<Field>;

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  totalItems,
  noun = {
    singular: 'proposal',
    plural: 'proposals',
  },
  ...inputProps
}: SearchInputProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>('');

  const debouncedSearchTerm = useDebounce<string>(localSearchTerm, 700);

  useEffect(() => {
    if (localSearchTerm !== searchTerm) {
      setSearchTerm(localSearchTerm);
    }
    // TODO: I don't want to fire on these others!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm((prevState) =>
      prevState === event.target.value ? '' : event.target.value
    );
  };

  return (
    <Input
      icon={BiSearch}
      id="table-search"
      placeholder={`Search ${totalItems} ${
        totalItems === 1 ? noun.singular : noun.plural
      }`}
      onChange={handleSearchTermChange}
      defaultValue={localSearchTerm}
      {...inputProps}
    />
  );
};

export default SearchInput;
