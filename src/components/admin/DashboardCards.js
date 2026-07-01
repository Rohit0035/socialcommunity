export default function DashboardCards() {
  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5>Total Students</h5>
            <h2>120</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5>Total Counsellors</h5>
            <h2>15</h2>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5>New Enquiries</h5>
            <h2>34</h2>
          </div>
        </div>
      </div>
    </div>
  )
}