import { GetAllUser } from "../services/api";
 import Loader from "../components/loader/Loader";
import { useQuery } from '@tanstack/react-query'
import { useParams,Link } from "react-router-dom";
export default function DetailsUser() {
    const {id}= useParams(); 
    const fetchData = async () => {
    const response = await GetAllUser();
    console.log("response.data:", response.data);
    console.log("response.data.data:", response.data?.data);
    const users = response.data.data?.users || response.data.users;
    const found = users.find(u => u.id === Number(id));
    return found;
    }
  const{data:user,isLoading,error} = useQuery({
    queryKey:['user', id],
    queryFn:fetchData,
    staleTime: 1000 * 60 * 5, 
  });
console.log("Fetched user details:", user); 
  if(isLoading){
    return <Loader/>
  }
  if(error){
    return <div className="text-center text-red-500 py-10">
        حدث خطأ أثناء جلب  تفاصيل المستخدم. حاول مرة أخرى لاحقًا.
    </div>
  }
return (
  <div className="container mx-auto p-6 max-w-md" dir="ltr">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
        <Link to="/" className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md">
          &larr; Back to List
        </Link>
      </div>

      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 flex flex-col items-center">
         {(user?.imageUrl || user?.image) ? (
          <img 
            src={user.imageUrl || user.image} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover border border-gray-300 mb-4 shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl font-bold border border-indigo-200 mb-4">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="w-full space-y-3 mt-2">
          <div className="flex justify-between border-b pb-2 text-sm">
            <span className="font-semibold text-gray-500">Full Name:</span>
            <span className="text-gray-900 font-medium">{user.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2 text-sm">
            <span className="font-semibold text-gray-500">Email Address:</span>
            <span className="text-gray-900 font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between pb-2 text-sm">
            <span className="font-semibold text-gray-500">Age:</span>
            <span className="text-gray-900 font-medium">{user.age} Years</span>
          </div>
        </div>

        <Link 
          to={`/edit-user/${id}`}
          className="w-full text-center mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm transition-colors shadow-sm"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

