import sprite from '../../assets/icons/sprite.svg';

export type IconName =
  | 'icon-brand'
  | 'icon-home'
  | 'icon-catalog'
  | 'icon-categories'
  | 'icon-menu'
  | 'icon-arrow-right'
  | 'icon-arrow-left'
  | 'icon-chevron-down'
  | 'icon-chevron-left'
  | 'icon-chevron-right'
  | 'icon-search'
  | 'icon-filter'
  | 'icon-sliders'
  | 'icon-sort-desc'
  | 'icon-grid'
  | 'icon-list'
  | 'icon-gamepad'
  | 'icon-heart'
  | 'icon-star'
  | 'icon-shopping-cart'
  | 'icon-plus'
  | 'icon-minus'
  | 'icon-user'
  | 'icon-users'
  | 'icon-user-plus'
  | 'icon-log-in'
  | 'icon-log-out'
  | 'icon-lock'
  | 'icon-mail'
  | 'icon-eye'
  | 'icon-eye-off'
  | 'icon-pencil'
  | 'icon-upload'
  | 'icon-image'
  | 'icon-sun'
  | 'icon-moon'
  | 'icon-globe'
  | 'icon-settings'
  | 'icon-bell'
  | 'icon-refresh-cw'
  | 'icon-more-horizontal'
  | 'icon-shield-check'
  | 'icon-database'
  | 'icon-dashboard'
  | 'icon-admin'
  | 'icon-clock'
  | 'icon-check'
  | 'icon-check-circle'
  | 'icon-close'
  | 'icon-alert-circle'
  | 'icon-info'
  | 'icon-audit-log'
  | 'icon-edit'
  | 'icon-game-type'
  | 'icon-platform'
  | 'icon-features'
  | 'icon-reviews'
  | 'icon-rating'
  | 'icon-discount'
  | 'icon-genre'
  | 'icon-shopping-bag';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <use href={`${sprite}#${name}`} />
    </svg>
  );
}
