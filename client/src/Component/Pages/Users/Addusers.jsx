import React from 'react'

function Addusers() {
  return (
    <div>
       <div className="flex items-center justify-center py-12">
     <div className="bg-white p-5 rounded-lg relative">
      
       <form >
        
           <div  className="mb-4.5">
            <div className="mb-4.5  gap-4 xl:flex mb-2">
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">First name</label>
               <input type="text" name="firstName"  placeholder="Enter your first name"  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">Last name</label>
               <input type="text" name="lastName"  placeholder="Enter your last name"  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
            
             <div className="w-full xl:w-full">
               <label className="mb-2.5 block text-black dark:text-white">Email <span className="text-meta-1">*</span></label>
               <input type="email" name="email" placeholder="Enter your email address"  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
             </div>
           <button className="inline-flex justify-center items-center mt-8 rounded-md border border-transparent bg-red py-2 px-4 text-sm text-white font-medium bg-blue-500 h-8">Cancel</button>
           </div>
           </div>
        
         <div className="mt-4 flex justify-end gap-2">
           <button  className="inline-flex justify-center rounded-md border border-transparent bg-blue py-2 px-4 text-sm text-white font-medium bg-blue-500"><i class="fa-solid fa-user-plus mr-1 mt-1"></i>Add Users</button>
         </div>

         <p className="text-center">OR</p>
        <div className="w-full mt-2"><label className="mb-2.5 block text-black dark:text-white">Upload Client List</label> <input type="file"  accept=".xlsx, .xls"  /></div>

         
         <div className="mt-4 flex justify-end">
           <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue py-2 px-4 text-sm text-white font-medium bg-blue-500">Add</button>
         </div>
       </form>
     </div>
   </div>
    </div>
  )
}

export default Addusers
