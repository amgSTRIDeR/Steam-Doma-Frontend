interface BurgerButtonProps {
  readonly isOpen: boolean;
  readonly onClick: () => void;
}

export default function BurgerButton({ isOpen, onClick }: BurgerButtonProps) {
  return (
    <button
      className={`burger ${isOpen ? 'burger burger_active' : 'burger'}`}
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <span className="burger__line" />
      <span className="burger__line" />
      <span className="burger__line" />
    </button>
  );
}
