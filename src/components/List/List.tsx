import type { ListItemData } from '../../pages/About/aboutData';
import ListItem from '../ListItem/ListItem';
import Icon from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';
import { useTranslation } from 'react-i18next';

interface ListProps {
  readonly data: ListItemData[];
  readonly className: string;
  readonly isIcon?: boolean;
}

export default function List({ data, className, isIcon }: ListProps) {
  const { t } = useTranslation();

  return (
    <ul className={`list ${className}`}>
      {data.map((el) => {
        const media = isIcon ? (
          <Icon name={`icon-${el.id}` as IconName} className="list__icon" />
        ) : (
          <img src={`./src/assets/images/${el.id}.png`} alt={el.id} />
        );

        return (
          <ListItem
            title={t(el.title)}
            text={el.text ? t(el.text) : undefined}
            image={media}
            key={el.id}
          />
        );
      })}
    </ul>
  );
}
//return <ListItem title={t(el.title)} image={media} key={el.id} />;
