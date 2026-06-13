/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UserForm({ initialData, onSubmit, isPending, submitButtonText = "Save", hideImage = false }) {
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // تعبئة البيانات تلقائياً في الحقول عند فتح صفحة التعديل
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // تأمين استخراج رابط الصورة سواء أرسلها السيرفر باسم image أو imageUrl
  const currentImage = initialData?.imageUrl || initialData?.image;

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6" dir="ltr">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. John Doe"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. john@example.com"
            {...register("email", { 
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
            })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Age Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
          <input
            type="number"
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. 25"
            {...register("age", { 
              required: "Age is required", 
              valueAsNumber: true, 
              min: { value: 18, message: "Age must be between 18 and 60" },
              max: { value: 60, message: "Age must be between 18 and 60" }
            })}
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
        </div>

        {/* Profile Image (File Upload) */}
        {!hideImage && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (Optional)</label>
          
          {/* عرض الصورة الحالية المرفوعة مسبقاً إن وجدت */}
          {currentImage && (
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs text-gray-500">Current Image:</span>
              <img 
                src={currentImage} 
                alt="Current" 
                className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm" 
              />
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            {...register("imageFile")} // اسم فريد للحقل لتجنب تضاربه مع الروابط النصية القديمة
          />
        </div>
        )}
        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <button
            type="submit"
            disabled={isPending}
            className={`flex-1 text-center px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm transition-colors ${
              isPending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Saving..." : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
