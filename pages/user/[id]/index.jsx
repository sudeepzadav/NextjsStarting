import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <dt className="text-sm text-slate-500">{label}</dt>
    <dd className="truncate text-sm font-medium text-slate-900">
      {value || "-"}
    </dd>
  </div>
);

const UserInfoPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: userInfo, error, isLoading } = useSWR(
    id ? `https://dummyjson.com/users/${id}` : null,
    fetcher
  );

  const loading = !id || isLoading;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-xl">
        <Link
          href="/user"
          className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          &larr; Back to users
        </Link>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-6 h-96 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        )}

       
        {!loading && error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.message}
          </div>
        )}

        {/* Profile card */}
        {!loading && userInfo && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-24 bg-indigo-600" />

            <div className="px-6 pb-6">
              <img
                src={userInfo.image}
                alt={`${userInfo.firstName} ${userInfo.lastName}`}
                className="-mt-12 h-24 w-24 rounded-full border-4 border-white bg-slate-100 object-cover"
              />

              <h1 className="mt-3 text-2xl font-semibold text-slate-900">
                {userInfo.firstName} {userInfo.lastName}
              </h1>
              <p className="text-sm text-slate-500">@{userInfo.username}</p>

              {userInfo.company?.title && (
                <span className="mt-3 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  {userInfo.company.title}
                </span>
              )}

              <dl className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
                <InfoRow label="Email" value={userInfo.email} />
                <InfoRow label="Phone" value={userInfo.phone} />
                <InfoRow label="Age" value={userInfo.age} />
                <InfoRow label="Gender" value={userInfo.gender} />
                <InfoRow label="Company" value={userInfo.company?.name} />
                <InfoRow
                  label="Location"
                  value={
                    userInfo.address
                      ? `${userInfo.address.city}, ${userInfo.address.country}`
                      : ""
                  }
                />
              </dl>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default UserInfoPage;