import type { ListItemData } from '../../pages/About/aboutData';
import ListItem from '../ListItem/ListItem';
import Icon from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';

interface ListProps {
  readonly data: ListItemData[];
  readonly className: string;
  readonly isIcon?: boolean;
}

export default function List({ data, className, isIcon }: ListProps) {
  return (
    <ul className={`list ${className}`}>
      {data.map((el) => {
        const media = isIcon ? (
          <Icon name={`icon-${el.id}` as IconName} className="list__icon" />
        ) : (
          <img src={`./src/assets/images/${el.id}.png`} alt={el.id} />
        );
        return <ListItem title={el.title} text={el.text} image={media} key={el.id} />;
      })}
    </ul>
  );
}
