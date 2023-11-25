import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLoading } from "react-icons/ai";
import logo from "../../../assets/logo.svg"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'


const Register = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (values: any) => {
    console.log("Values - ", values)
    setError("")
    if (values.password < 5) {
      setError("Пароль должен быть длиннее 5 символов")
    } else {
      try {
        setLoading(true)

        const response = await axios.post(
          "http://localhost:1337/api/auth/local/register", values, { timeout: 10000 }
        ).then(response => {
          return response
        }).catch(error => {
          throw new Error(error);
        })

        console.log(response)

        setModal(true)

        setTimeout(() => {
          navigate('/login')
        }, 2500)

      } catch (err: any) {
        console.log(err)

        if (err == "Error: AxiosError: Request failed with status code 400") {
          setError("Ошибка, пользователь уже существует.")
        }
        else if (err == "Error: AxiosError: timeout of 10000ms exceeded") {
          setError("Превышено время ожидания запроса от сервера.")
        }
        else {
          setError(`Ошибка, ${err}`)
        }

      } finally {
        setLoading(false)
      }
    }
    console.log(error)

  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className='w-full relative flex justify-center mt-12'>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="sm:max-w-[425px] h-[20vh] flex items-center justify-center text-black">
          <DialogHeader className='flex flex-col gap-4'>
            <DialogTitle className='text-black text-center text-2xl'>Вы успешно зарегестрировались, теперь войдите в аккаунт.</DialogTitle>
            <DialogDescription className='text-black text-center'>Перенаправляем вас на страницу входа...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <form
        onSubmit={formik.handleSubmit}
        className='bg-black w-[98%] sm:w-[90%] xl:w-[55%] py-16 rounded-xl flex flex-col items-center gap-10 relative'
      >
        <Link to={"/"} className='absolute lg:top-5 lg:left-16 md:top-5 md:left-6 top-3 left-3 z-50'>
          <img src={logo} alt="Главная" width={50} height={50} />
        </Link>

        <h6 className='text-white font-black text-2xl'>Регистрация</h6>
        <div className="grid md:w-full w-[90%] max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className='text-start'>Username</Label>
          <Input
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Name"
          />
        </div>

        <div className="grid md:w-full w-[90%] max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className='text-start'>E-mail</Label>
          <Input
            name="email"
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Password"
          />
        </div>

        <div className="grid md:w-full w-[90%] max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className='text-start'>Пароль</Label>
          <Input
            name="password"
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
          />
        </div>

        {error !== "" && <Label className='text-[red] text-lg rounded-lg bg-slate-800 px-4 py-2'>{error}</Label>}

        <Label className='text-xl md:px-0 px-4'>Уже смешарик? <Link to={"/login"} className='text-indigo-300 hover:text-amber-300'>Страница входа</Link> </Label>

        {loading ?
          <Button disabled className='bg-white text-black'>
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin text-black" />
            Пожалуйста подождтие...
          </Button>
          :
          <Button variant={'secondary'} type='submit'>
            Зарегестрироваться
          </Button>
        }

      </form>
    </div>
  )
}


export default Register