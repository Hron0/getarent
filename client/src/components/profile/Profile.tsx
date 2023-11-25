import { useSignOut } from 'react-auth-kit'
import { useAuthUser } from 'react-auth-kit'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const auth: Function = useAuthUser()
  const signOut = useSignOut()
  const navigate = useNavigate()
  const handleLogout = () => {
    signOut()
    navigate("/")
  }

  return (
    <div className='flex flex-col w-full items-start border-black border-2 rounded-xl pt-8 pb-12 mt-10 px-4 gap-8'>
      <p className='text-xl font-bold text-black self-center'>Hello {auth().name}!</p>
      <p className='text-xl font-bold text-black'>{auth().email}</p>
      <Button 
      className='text-xl font-bold text-white'
      onClick={handleLogout}
      >Выйти из аккуанта</Button>
    </div>
  )
}

export default Profile