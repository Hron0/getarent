import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useSignIn } from 'react-auth-kit'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLoading } from "react-icons/ai";
import logo from "../../../assets/logo.svg"
import { DialogHeader } from '@/components/ui/dialog'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'

const LogIn = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const signIn = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values: any) => {
    console.log("Values - ", values)
    setError("")

    try {
      setLoading(true)

      const response = await axios.post(
        "http://localhost:1337/api/auth/local", values, { timeout: 10000 }
      ).then(response => {
        return response
      }).catch(error => {
        throw new Error(error);
      })

      console.log(response)

      signIn({
        token: response.data.jwt,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          email: response.data.user.email,
          name: response.data.user.username,
        },
      });

      setModal(true)

      setTimeout(() => {
        navigate('/')
      }, 2500)

    } catch (err: any) {
      console.log(err)

      if (err == "Error: AxiosError: Request failed with status code 400") {
        setError("Ошибка, неправильный логин/пароль.")
      }
      else if (err == "Error: AxiosError: timeout of 10000ms exceeded") {
        setError("Превышено время ожидания ответа от сервера.")
      }
      else if (err == "Error: AxiosError: Network Error") {
        setError("Ошибка соединения с сервером.")
      }
      else {
        setError(`Ошибка, ${err}`)
      }

    } finally {
      setLoading(false)
    }


  }

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className='w-full relative flex justify-center mt-12'>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="sm:max-w-[425px] h-[20vh] flex items-center justify-center text-black">
          <DialogHeader className='flex flex-col gap-4'>
            <DialogTitle className='text-black text-center text-2xl'>Вы успешно вошли в аккаунт.</DialogTitle>
            <DialogDescription className='text-black text-center'>Перенаправляем вас на главную страницу...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <form
        onSubmit={formik.handleSubmit}
        className='bg-black w-[98%] sm:w-[90%] xl:w-[55%] py-16 rounded-xl flex flex-col items-center gap-12 relative'
      >
        <Link to={"/"} className='absolute lg:top-5 lg:left-16 md:top-5 md:left-6 top-3 left-3 z-50'>
          <img src={logo} alt="Главная" width={50} height={50} />
        </Link>

        <h6 className='text-white font-black text-2xl'>Вход</h6>
        <div className="grid md:w-full w-[90%] max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className='text-start'>E-mail / Username</Label>
          <Input
            name="identifier"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            placeholder="Email/Name"
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

        <Label className='text-xl md:px-0 px-4'>Нет аккаунта? <Link to={"/register"} className='text-indigo-300 hover:text-amber-300'>Страница регистрации</Link> </Label>

        {loading ?
          <Button disabled className='bg-white text-black'>
            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin text-black" />
            Пожалуйста подождтие...
          </Button>
          :
          <Button variant={'secondary'} type='submit'>
            Войти
          </Button>
        }

      </form>
    </div>
  )
}


export default LogIn