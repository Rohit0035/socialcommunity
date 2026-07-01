export default function StudentsTable() {
  const students = [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul@gmail.com',
      course: 'MBA',
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya@gmail.com',
      course: 'BTech',
    },
  ]

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">
                    Edit
                  </button>

                  <button className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}