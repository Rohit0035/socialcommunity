export default function EnquiriesPage() {
  return (
    <div>
      <h2 className="mb-4">Enquiries</h2>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Amit</td>
                <td>amit@gmail.com</td>
                <td>9999999999</td>
                <td>MBA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}