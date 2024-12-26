import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import config from "../../config/config";
import { PageLoader } from "../../components";
import { motion } from "motion/react";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  const getAllUser = async () => {
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const res = await axios.get(
        `${config.backendUrl}/admin/cyber/dashboard/allusers`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        toast.error(res.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllUser();
  }, []);

  return !users ? (
    <PageLoader />
  ) : (
    <motion.section
      className="ps-2 ps-md-3 pt-2 pt-md-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <h1 className="fs-3 fw-semibold mb-3">
        All Users{" "}
        <span className="fs-5 opacity-75 bg-secondary-subtle px-2 rounded-1 ms-2">
          {users.length}
        </span>
      </h1>

      <ul className="list-unstyled m-0">
        {users.length > 0 ? (
          users.map((user) => (
            <motion.li
              key={user._id}
              className="mb-2 mb-md-3"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className="d-md-flex align-items-center gap-4 border p-3 rounded-3">
                <div
                  className="p-2 rounded-circle"
                  style={{ height: "100px", width: "100px" }}
                >
                  <img
                    src={user?.profilePhoto}
                    alt={user?.fullname || "Product image"}
                    className="banner rounded-circle"
                    height="100%"
                  />
                </div>

                <div>
                  <p className="fs-5 fw-semibold mb-0">{user?.fullname}</p>
                  <p className="fs-6 mb-0">{user?.email}</p>
                  <p className="mb-2">+91 {user?.phone}</p>
                  <p className="mb-0">Total Orders : {user?.orderCount}</p>
                </div>
              </div>
            </motion.li>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </ul>
    </motion.section>
  );
};

export default UserList;
