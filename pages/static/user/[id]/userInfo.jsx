import Link from "next/link";

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <dt className="text-sm text-slate-500">{label}</dt>
    <dd className="truncate text-sm font-medium text-slate-900">
      {value || "-"}
    </dd>
  </div>
);

const UserInfo = ({ data }) => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-xl">
        <Link
          href="/static/user"
          className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          &larr; Back to users
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-24 bg-indigo-600" />

          <div className="px-6 pb-6">
            <img
              src={data.image}
              alt={`${data.firstName} ${data.lastName}`}
              className="-mt-12 h-24 w-24 rounded-full border-4 border-white bg-slate-100 object-cover"
            />

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold text-slate-900">
                {data.firstName} {data.lastName}
              </h1>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Static generated
              </span>
            </div>
            <p className="text-sm text-slate-500">@{data.username}</p>

            <dl className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
              <InfoRow label="Email" value={data.email} />
              <InfoRow label="Age" value={data.age} />
              <InfoRow label="Gender" value={data.gender} />
              <InfoRow label="Phone" value={data.phone} />
              <InfoRow label="Company" value={data.company?.name} />
              <InfoRow
                label="Location"
                value={
                  data.address
                    ? `${data.address.city}, ${data.address.country}`
                    : ""
                }
              />
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/users");
  const { users } = await res.json();

  return {
    paths: users.map((user) => ({ params: { id: String(user.id) } })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`https://dummyjson.com/users/${id}`);
  if (!res.ok) return { notFound: true };
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default UserInfo;