import { useState } from "react";
import Link from "next/link";
import style from '../../styles/User.module.css'

const UserPage = ({ data }) => {
  const [search, setSearch] = useState("");
  const users = data.users;

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.username}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-slate-900">Users</h1>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                Server rendered
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {filteredUsers.length} of {users.length} users
            </p>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or username"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:w-72"
          />
        </div>

        
        {filteredUsers.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-base font-medium text-slate-900">
              No users found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try a different name or username.
            </p>
          </div>
        )}

        
        {filteredUsers.length > 0 && (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <li key={user.id}>
                <Link
                  href={`/server/${user.id}/userInfo`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
                >
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-14 w-14 rounded-full bg-slate-100 object-cover"
                  />
                  <div className="min-w-0">
                    <p className={`truncate text-sm font-semibold text-slate-900 ${style.text}`}>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      @{user.username}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) return { notFound: true };
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default UserPage;