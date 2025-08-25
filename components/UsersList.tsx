import React from 'react'
import UserCard from './UserCard';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  address: string;
  username: string;
}


const UsersList = ({users} : {users: any}) => {
  if (users.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-8">
        No items found.
      </p>
    );
  }

  return (
    <div className="mt-8 grid justify-center gap-6 px-8 py-6
                    grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
      {users.map((user:any, idx:number) => (
        <Link href={`/profile/${user.id}`} key={idx} className="flex justify-center">
          <UserCard user={user} />
        </Link>
      ))}
    </div>
  );
}

export default UsersList