import { useAppSelector } from "../hooks"

const ProfilePage = () => {
  const { loading, isAuthenticated, user } = useAppSelector(
    (state) => state.user,
  )

  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Not Authenticated</div>

  return (
    <div>
      <h1>Profile</h1>
      <div>{JSON.stringify(user, null, 2)}</div>
    </div>
  )
}

export default ProfilePage
