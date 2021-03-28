import useFetch from 'use-http';

export function useEnergyData() {
  const options = {}
  const { loading, error, data = [] } = useFetch('data.php', options, [])
  return { loading, error, data };
}