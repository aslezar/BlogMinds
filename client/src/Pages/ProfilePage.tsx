import { useState } from "react"


import { useAppSelector } from "../hooks"


  




const ProfilePage = () => {
    const [edit,setEdit] = useState(false)
    const handleEdit = () => {
        setEdit(true)
    }
    const handleUpdate = () => {
        setEdit(false)
    }

    const { loading, isAuthenticated, user } = useAppSelector(
        (state) => state.user,
      )
    
      if (loading) return <div>Loading...</div>
      if (!isAuthenticated) return <div>Not Authenticated</div>
    
      console.log(user);

  return (
    <div className="flex flex-col">
    <nav className="w-100 border-2 p-5 rounded-xl mx-5 my-5 
    flex justify-between">
        <h1 className="text-2xl font-medium">Profile Page</h1>
        <button className="bg-slate-500 p-2 rounded-3xl px-5 text-white hover:bg-slate-700" onClick={handleEdit}>Edit</button>
    </nav>
    <main className="flex ">
        <section className="h-screen w-3/6  p-5">
            <form action="" className="flex flex-col">
            <h3 className="text-xl mb-3">Basic Info</h3>

            <label className="mt-2">Full Name</label>
            <input type="text" placeholder="vedant Nagar" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <label className="mt-2">Profline Tagline</label>
            <input type="text" placeholder="Software Developer @" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <label className="mt-2">Profile Photo</label>
            <img className="h-40 w-40" src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711065600&semt=ais" alt="" />

            <label className="mt-2">Location</label>
            <input type="text" placeholder="India, Rohini" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <h3 className="text-xl my-3 mt-6">About You</h3>

            <label >Profile Bio(About you)</label>
            <input type="text" placeholder="I am a developer from ..." disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <label className="mt-2">Tech Stack</label>
            <input type="text" placeholder="Search technologies,topics and more ..." disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <label className="mt-2">Available for</label>
            <input type="text" placeholder="I am available for menoring..." disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>
            {edit && 
        <div className="my-8">
           <button className="bg-slate-500 p-2 rounded-3xl px-5 text-white hover:bg-slate-700" onClick={handleUpdate}>
                Update
            </button> 
        </div>
        }
            </form>
        </section>
        <section className="h-screen w-3/6  p-5 ml-0">
            <form action="" className="flex flex-col">
            <h3 className="text-xl mb-3">Social</h3>

            <p >Twitter Profile</p>
            <input type="text" placeholder="https://twitter.com/johnDoe" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <p className="mt-2">Instagram Profile</p>
            <input type="text" placeholder="https://instagram.com/johnDoe" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <p className="mt-2">Github Profile</p>
            <input type="text" placeholder="https://github.com/johnDoe" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <p className="mt-2">Stack Overflow Profile</p>
            <input type="text" placeholder="https://stackoverflow.com/johnDoe" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <p className="mt-2">Facebook Profile</p>
            <input type="text" placeholder="https://twitter.com/johnDoe" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <p className="mt-2">Website URL</p>
            <input type="text" placeholder="https://twitter.com/johnDoe" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <p className="mt-2">Linkedin URL</p>
            <input type="text" placeholder="https://twitter.com/johnDoe" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>
            
            <h3 className="text-xl my-3 mt-6">Profile Identity</h3>

            <p className="mt-2">UserName</p>
            <p className="text-base font-light text-gray-400 leading-4 mb-1 italic">You have the option to change your username once. Please choose carefully as it cannot be changed again.</p>
            <input type="text" placeholder="pathaa" disabled = {!edit}  className={`${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>

            <p className="mt-2">Email Address</p>
            <p className="text-base font-light text-gray-400 leading-4 mb-1 italic">Changing your email address might break your OAuth sign-in if your social media accounts do not use the same email address. Please use magic link sign-in if you encounter such an issue..</p>
            <input type="text" placeholder="pathaa@gmail.com"disabled = {!edit}  className={`mb-4 ${!edit && 'rounded-xl p-2 bg-gray-100'}  ${edit && 'rounded-xl p-2 border text-black'}`}/>
            </form>
        </section>
        
    </main>
    </div>
  )
}

export default ProfilePage