import type { ReactNode } from 'react';
interface ListItemProps {
  readonly title: string;
  readonly text?: string;
  readonly image?: ReactNode;
}

export default function ListItem({ title, text, image }: ListItemProps) {
  return (
    <li className="list__item">
      {image && <p className="list__item-img">{image}</p>}
      <div className="list__item-content">
        <h3 className="list__item-title">{title}</h3>
        <div className="list__item-text">{text}</div>
      </div>
    </li>
  );
}
