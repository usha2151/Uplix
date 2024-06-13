import React from 'react'


function AddEmails() {
  return (
    <div className='p-16'>
       <div className=" flex items-center justify-center">
    <div className="bg-white p-10 rounded-lg w-full border border-gray" >
     
      <form className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="hostname" className="block text-sm font-medium text-gray-700">Hostname:</label>
          <input type="text" id="hostname" placeholder='Enter hostname' name="hostname" className="mt-1 p-2 border border-gray rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="port" className="block text-sm font-medium text-gray-700">Port:</label>
          <input type="text" id="port" name="port" placeholder='Enter port' className="mt-1 p-2 border border-gray rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input type="text"  id="username" name="username" className="mt-1 p-2 border border-gray rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input type="password"   id="password" name="password" className="mt-1 p-2 border border-gray rounded-md w-full" required />
        </div>
        <div>
          <label htmlFor="encryption" className="block text-sm font-medium text-gray-700">Encryption:</label>
          <select id="encryption" name="encryption" className="mt-1 p-2 border border-gray rounded-md w-full" required>
            <option value="ssl">SSL</option>
            <option value="tls">TLS</option>
          </select>
        </div>
        <div className="flex justify-end col-span-2">
          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm text-white font-medium bg-blue">Save</button>
        </div>
      </form>
    </div>
  </div>
    </div>
  )
}

export default AddEmails
