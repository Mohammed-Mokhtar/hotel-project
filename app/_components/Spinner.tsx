type SpinnerProps = {
  count?: number;
};

function Spinner({ count = 3 }: SpinnerProps) {
  return <div className="spinner"></div>;
}

export default Spinner;

