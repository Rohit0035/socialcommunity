"use client";

import { useState } from "react";
import PackageTable from "@/components/admin/Package/PackageTable";

export default function PackagesPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Packages</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Package
        </button>
      </div>

      <PackageTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchData={() => {}}
      />
    </div>
  );
}