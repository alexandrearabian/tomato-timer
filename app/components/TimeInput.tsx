interface TimeInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TimeInput = ({ value, onChange, placeholder }: TimeInputProps) => {
  return (
    <input
      type="number"
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className="text-center bg-transparent border border-transparent hover:border-primary-accent hover:scale-105 focus:outline-none focus:border-primary-accent placeholder-stone-200 w-16 h-16 text-inherit rounded-md transition-all custom-arrows"
    />
  );
};

export default TimeInput;
