export default function requestTable() {
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Select</th>
                <th>Request ID</th>
                <th>Request Type</th>
                <th>Requester Full name</th>
                <th>Requester cellphone</th>
                <th>Request Time</th>
                <th>Request Location</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={selectedRequests.includes(request)}
                  onChange={() => toggleRequestSelection(request)}
                />
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}
