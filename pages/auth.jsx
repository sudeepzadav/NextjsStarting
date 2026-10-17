import { useSession, signIn } from "next-auth/react"
const auth = () => {
    const session = useSession();

    console.log("Session:", session);
    if(session.data === null){
        return <button onClick={signIn}>Login</button>
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-700">
      <h1 className="text-5xl text-amber-200">Auth:</h1>
    </div>
  )
}

export default auth
