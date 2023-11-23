import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useSignIn } from 'react-auth-kit'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLoading } from "react-icons/ai";

const LogIn = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
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

      } catch (err) {
        console.log(err)
        setError(`Ошибка, ${err}`)
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
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className='bg-black w-[70%] py-10 rounded-xl flex flex-col items-center gap-5'
      >
        <h6 className='text-white'>Вход</h6>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className='text-start'>E-mail / Username</Label>
          <Input
            name="identifier"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            placeholder="Email/Name"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
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

        <Label>Нет аккаунта? <Link to={"/register"} className='text-indigo-300'>Страница регистрации</Link> </Label>
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