import { BeatLoader } from 'react-spinners';

interface LoadingComponentProps {
  loading: boolean;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ loading }) => {
  return (
    loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-9999">
        <BeatLoader
          color={"#ffffff"}
          loading={loading}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  );
};

export default LoadingComponent;

