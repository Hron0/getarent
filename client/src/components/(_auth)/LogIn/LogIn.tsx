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

const LogIn = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const signIn = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values: any) => {
    console.log("Values - ", values)
    setError("")
    if (values.password < 5) {
      setError("Пароль должен быть длинне 5 символов")
    } else {
      try {
        setLoading(true)

        const response = await axios.post(
          "http://localhost:1337/api/auth/local", values
        )

        setLoading(false)
        console.log(response)

        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: values.email },
        });

        alert("Вы вошли в аккаунт... Переходим на главную страницу...")

        setTimeout(() => {
          navigate('/')
        }, 1000)

      } catch (err: any) {
        console.log(err.response.status)
        {
          err.response.status == 400
          ? setError("Ошибка, неправильный логин/пароль.")
          : setError(`Ошибка, ${err.message}`)
        }
        setLoading(false)
      }
    }
    console.log(error)

  }

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className='w-full relative flex justify-center mt-10'>
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