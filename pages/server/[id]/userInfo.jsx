const UserInfo = ({ data }) => {
  return (
    <div>
      <h1>This is the userInfo page (SSG)</h1>
      <h2>
        {data.firstName} {data.lastName}
      </h2>
      <p>{data.email}</p>
    </div>
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