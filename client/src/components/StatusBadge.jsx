function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-50 text-yellow-700",
    Approved: "bg-blue-50 text-blue-700",
    Active: "bg-emerald-50 text-emerald-700",
    Completed: "bg-slate-100 text-slate-700",
    Cancelled: "bg-red-50 text-red-700",
    "In Progress": "bg-blue-50 text-blue-700",
    Resolved: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`${styles[status] || "bg-slate-100 text-slate-700"} inline-flex rounded-full px-3 py-1 text-xs font-semibold`}> 
      {status}
    </span>
  );
}

export default StatusBadge;
