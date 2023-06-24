const Button = ({
  className,
  value,
  onFunc,
}: {
  className: string;
  value: string;
  onFunc: (key: string) => void;
}) => {
  return (
    <button onClick={() => onFunc(value)} className={`btn ${className}`}>
      {value}
    </button>
  );
};

export default Button;
