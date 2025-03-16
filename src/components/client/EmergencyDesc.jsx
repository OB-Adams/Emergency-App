export default function EmergencyDesc({value, onChange}) {
  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-lg font-semibold">Briefly specify emergency</h3>
      <hr />
        <textarea className="w-full h-40 p-2 border-red-600" placeholder="Describe the emergency. Add any specific details that are important for this report."></textarea>
    </div>
  )
}
