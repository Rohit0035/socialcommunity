import StudentsTable from '@/components/admin/StudentsTable'

export default function StudentsPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Students</h2>

        <button className="btn btn-primary">
          Add Student
        </button>
      </div>

      <StudentsTable />
    </div>
  )
}