import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEnergyData } from 'hooks/data';

export function Chart() {
    const { loading, error, data } = useEnergyData();

    return <ResponsiveContainer width="100%" height={200}>
    <LineChart
      width={500}
      height={200}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </LineChart>
  </ResponsiveContainer>;
}