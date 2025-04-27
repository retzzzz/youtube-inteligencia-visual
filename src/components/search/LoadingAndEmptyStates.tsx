
interface LoadingAndEmptyStatesProps {
  isLoading: boolean;
  hasResults: boolean;
  hasSearchParams: boolean;
  error: string | null;
}

const LoadingAndEmptyStates = ({ isLoading, hasResults, hasSearchParams, error }: LoadingAndEmptyStatesProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoading && hasSearchParams && !hasResults && !error) {
    return (
      <div className="text-center p-12">
        <p className="text-xl font-medium">Nenhum resultado encontrado</p>
        <p className="text-muted-foreground mt-2">Tente ajustar seus critérios de pesquisa</p>
      </div>
    );
  }

  return null;
};

export default LoadingAndEmptyStates;
