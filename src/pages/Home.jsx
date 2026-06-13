import { GetAllUser,DeleteUser } from "../services/api";
 import Loader from "../components/loader/Loader";
import { useQuery,useQueryClient } from '@tanstack/react-query'
import { Link } from "react-router-dom";
export default function Home() {
    const queryClient = useQueryClient();

    const fetchData = async () => {
      const response = await GetAllUser();
      console.log(response.data);
      return response.data;
    }
  const{data,isLoading,error} = useQuery({
    queryKey:['users'],
    queryFn:fetchData,
    staleTime: 1000 * 60 * 5, 
  });

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await DeleteUser(id);

    queryClient.invalidateQueries({ queryKey: ["users"] });
    
    alert("User deleted successfully!");
  } catch (err) {
    console.error("Delete failed:", err);
    alert(err?.response?.data?.message || "Failed to delete user.");
  }
};



  if(isLoading){
    return <Loader/>
  }
  if(error){
    return <div className="text-center text-red-500 py-10">
        حدث خطأ أثناء جلب المستخدمين. حاول مرة أخرى لاحقًا.
    </div>
  }
 
return (
    <div className="container mx-auto p-6" dir="ltr">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">User List</h1>
      
      <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-900">Name</th>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-900">Email</th>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-900 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users && data.users.length > 0 ? (
              data.users.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                 
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex justify-center gap-2">
                      <Link 
                        to={`/edit-user/${user.id}`}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                      >
                        Edit
                      </Link>
                       <Link 
                        to={`/details-user/${user.id}`}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md transition-colors shadow-sm"
                      >
                        Details
                      </Link>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                  No users found to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <Link 
          to="/add-user"
          className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors shadow-sm"
        >
          Add User
        </Link>
      </div>
    </div>
  );
}
