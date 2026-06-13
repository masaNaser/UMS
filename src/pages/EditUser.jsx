import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GetAllUser, UpdateUser } from "../services/api";
import UserForm from "../components/UserForm";
import Loader from "../components/loader/Loader";

export default function EditUser() {
  const { id } = useParams();
  console.log("Editing user with ID:", id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fetchData = async () => {
    const response = await GetAllUser();
    console.log("response.data:", response.data);
    console.log("response.data.data:", response.data?.data);
    const users = response.data.data?.users || response.data.users;
    const found = users.find((u) => u.id === Number(id));
    return found;
  };
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5,
  });
  console.log("Fetched user data for editing:", currentUser);
  const handleUpdate = async (data) => {
    setIsPending(true);
    setSubmitError("");

    try {
      const jsonData = {
        name: data.name,
        email: data.email,
        age: Number(data.age),
      };

      await UpdateUser(id, jsonData);

      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      setSubmitError(err?.response?.data?.message || "Failed to update user.");
    } finally {
      setIsPending(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10" dir="ltr">
        Failed to load user data. The user might not exist.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-xl" dir="ltr">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
        >
          &larr; Cancel
        </Link>
      </div>

      {submitError && (
        <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
          {submitError}
        </div>
      )}

      <UserForm
        initialData={currentUser}
        onSubmit={handleUpdate}
        isPending={isPending}
        submitButtonText="Update User"
        hideImage={true}  
      />
    </div>
  );
}
