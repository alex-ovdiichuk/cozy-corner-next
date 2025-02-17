interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </button>
  );
};
