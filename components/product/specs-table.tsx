type SpecsTableProps = {
  specs: { key: string; value: string }[];
};

export function SpecsTable({ specs }: SpecsTableProps) {
  if (!specs.length) return null;

  return (
    <div className="surface-card overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.key} className="border-b border-indigo-50 last:border-0">
              <th className="w-2/5 bg-indigo-50/60 px-5 py-4 text-left font-bold text-slate-800">
                {spec.key}
              </th>
              <td className="px-5 py-4 text-slate-600">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
