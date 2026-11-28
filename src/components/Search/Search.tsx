import type { ChangeEventHandler } from 'react';
import Icon from '../Icon/Icon';

export interface SearchProps {
  readonly placeholder: string;
  readonly labelText?: string;
  readonly name: string;
  readonly onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

export default function Search({ placeholder, name, labelText, onChangeHandler }: SearchProps) {
  return (
    <div className="search">
      <label className="search__label" htmlFor={name}>
        {labelText}
      </label>
      <div className="search__input-wrapper">
        <Icon name="icon-search" className="search__icon" />
        <input
          className="search__input"
          type="search"
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
}
