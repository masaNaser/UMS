import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { CreateUser } from "../services/api";
import UserForm from "../components/UserForm";

export default function AddUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 
  const [isPending, setIsPending] = useState(false);

  const handleCreate = async (data) => {
    setIsPending(true); 
    try {
      const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("age", data.age);

    if (data.imageFile && data.imageFile.length > 0) {
     formData.append("image", data.imageFile[0]);
    }
      await CreateUser(formData);

      queryClient.invalidateQueries({ queryKey: ["users"] });

      navigate("/");
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Something went wrong!");
    } finally {
      setIsPending(false); 
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
        <Link to="/" className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md">
          &larr; Back
        </Link>
      </div>

      <UserForm 
        onSubmit={handleCreate} 
        isPending={isPending} 
        submitButtonText="Add User" 
      />
    </div>
  );
}