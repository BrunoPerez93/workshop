import React from 'react'

const TableUsers = ({currentUsers}) => {
  return (
    <table className="w-1/2 text-sm rtl:text-right text-gray-500 dark:text-gray-400 mt-5 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.username}
              </th>
              <td className="px-6 py-4">{user.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default TableUsers
