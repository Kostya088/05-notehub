import css from "./SearchBox.module.css";

interface SearchBoxProps {
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ defaultValue, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      className={css.input}
      placeholder="Search notes"
      onChange={onChange}
    />
  );
}
