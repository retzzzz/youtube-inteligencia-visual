
export const useFormatters = () => {
  // Format date
  const formatarData = (dataIso: string) => {
    const data = new Date(dataIso);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_alta':
        return 'bg-green-100 text-green-800';
      case 'estavel':
        return 'bg-blue-100 text-blue-800';
      case 'em_queda':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return {
    formatarData,
    getStatusColor
  };
};
