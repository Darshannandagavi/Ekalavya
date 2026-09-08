import { useEffect, useState } from "react";
import API from "../../axiosConfig";

function FacultyRequests() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFaculty = async () => {
    try {
      const res = await API.get("/facultyadmin/faculty");
      setFaculty(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const approve = async (id) => {
    try {
      await API.put(`/facultyadmin/faculty/approve/${id}`);
      fetchFaculty();
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (id) => {
    if (!window.confirm("Reject this faculty?")) return;

    try {
      await API.delete(`/facultyadmin/faculty/reject/${id}`);
      fetchFaculty();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "var(--bg-main)", color: "var(--text-main)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Faculty Requests</h1>

          <p
            className="mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Approve or reject faculty registrations.
          </p>
        </div>

        <div
          className="px-5 py-3 rounded-xl font-semibold"
          style={{
            background: "var(--primary)",
            color: "#fff",
          }}
        >
          Total Faculty : {faculty.length}
        </div>
      </div>

      <div
        className="overflow-x-auto rounded-2xl"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
        }}
      >
        <table className="w-full">
          <thead
            style={{
              background: "var(--bg-secondary)",
            }}
          >
            <tr>
              {[
                "Name",
                "Email",
                "Designation",
                "University",
                "Course",
                "Status",
                "Action",
              ].map((item) => (
                <th
                  key={item}
                  className="px-6 py-4 text-left text-sm font-semibold"
                  style={{
                    color: "var(--text-main)",
                  }}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : faculty.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  No faculty registrations found.
                </td>
              </tr>
            ) : (
              faculty.map((f) => (
                <tr
                  key={f._id}
                  className="transition-colors duration-200"
                  style={{
                    borderTop: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "var(--bg-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "transparent")
                  }
                >
                  <td className="px-6 py-5 font-medium">
                    {f.name}
                  </td>

                  <td
                    className="px-6 py-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {f.email}
                  </td>

                  <td className="px-6 py-5">
                    {f.designation || "-"}
                  </td>

                  <td className="px-6 py-5">
                    {f.university?.name}
                  </td>

                  <td className="px-6 py-5">
                    {f.course?.name}
                  </td>

                  <td className="px-6 py-5">
                    {f.isApproved ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        Approved
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    {!f.isApproved ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => approve(f._id)}
                          className="rounded-lg px-4 py-2 text-white font-semibold transition-all duration-200 hover:scale-105"
                          style={{
                            background: "#16a34a",
                          }}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => reject(f._id)}
                          className="rounded-lg px-4 py-2 text-white font-semibold transition-all duration-200 hover:scale-105"
                          style={{
                            background: "#dc2626",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="font-semibold text-green-600">
                        Approved
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyRequests;