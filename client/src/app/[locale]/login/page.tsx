'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import useHttpClient from '../../utils/useHttpClient'
import { useTranslations } from 'next-intl'
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { failPopUp, resetPopUp, successPopUp } from '../../hooks/features/popup.slice'
import Image from 'next/image'
import { PasswordInput } from '../../components/password-input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/card'
import { Label } from '../../components/label'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import RImage from '@/src/app/assets/RImage.png'
import LoginImage from '@/src/app/assets/login_img.png'
import BGImage from '@/src/app/assets/login_bg.svg'
import Link from 'next/link'
import Flag_EN from '@/src/app/assets/england.png'
import Flag_VI from '@/src/app/assets/vietnam.png'

export default function LoginPage() {
  const t = useTranslations('login')
  const router = useRouter()
  const { post } = useHttpClient()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    document.title = t('title');
  }, [t]);

  useEffect(() => {
    const token = getCookie('authToken')
    if (token) {
      const role = getCookie('role')
      role === 'admin' ? router.push('/admin') : router.push('/')
      return
    }
  }, [router])

  const handleLoginSuccess = (response: any) => {
    const token = response.message.jwt
    const role = response.message.roles
    console.log(role)
    setCookie('authToken', token)
    setCookie('role', role)
    console.log(t('login_successful'))
    dispatch(successPopUp(t('login_successful')))
    role === 'admin' ? router.push('/admin') : router.push('/')
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response: any = await post('auth/login', { auth: { email: email, password: password } })
      const token = response.message.jwt
      const role = response.message.roles
      console.log(role)
      setCookie('authToken', token)
      setCookie('role', role)
      console.log(t('login_successful'))
      dispatch(successPopUp(t('login_successful')))
      role === 'admin' ? router.push('/admin') : router.push('/')
    } catch (error) {
      console.log(t('login_failed'))
      dispatch(failPopUp(t('login_failed')))
    }
  }

  const responseGoogle = async (response: any) => {
    try {
      const res: any = await post(`auth/google_oauth2`, { auth: { id_token: response.credential } })
      handleLoginSuccess(res)
    } catch (error) {
      console.log(t('login_failed'))
      dispatch(failPopUp(t('login_failed')))
    }
  }

  return (
    <div>
      <Image className='-z-50' src={BGImage.src} layout='fill' objectFit='cover' alt='Background' />
      <div className='flex flex-row h-screen z-0'>
        <div className='flex flex-col basis-1/2 justify-end ml-36'>
          <Link href='/'>
            <Image className='max-w-md mb-5' src={RImage.src} alt='img' width={200} height={200} />
          </Link>
          <p className='text-3xl font-bold w-[500px] mb-10'>{t('welcome_message')}</p>
          <Image className='max-w-md' src={LoginImage.src} alt='img' width={500} height={200} />
        </div>
        <div className='flex basis-1/2 items-center'>
          <Card className='w-[500px] p-6'>
            <CardHeader>
              <CardTitle className='text-3xl'>{t('sign_in')}</CardTitle>
              <CardDescription>{t('sign_in_prompt')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className='grid w-full items-center gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='email' className='text-lg font-bold'>
                      {t('email')}
                    </Label>
                    <Input
                      id='email'
                      placeholder={t('email')}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='password' className='text-lg font-bold'>
                      {t('password')}
                    </Label>
                    <PasswordInput
                      id='password'
                      placeholder={t('password')}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className='flex justify-center w-full'>
              <div className='flex flex-col items-center w-full'>
                <div className='mb-8'>
                  <Button
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                      handleLogin(e)
                    }}
                  >
                    {t('sign_in')}
                  </Button>
                </div>
                <div className='flex items-center justify-center mb-8 relative w-full'>
                  <div className='flex-grow border-t border-gray-500'></div>
                  <span className='mx-4 text-sm text-gray-500 whitespace-nowrap'>{t('or_continue_with')}</span>
                  <div className='flex-grow border-t border-gray-500'></div>
                </div>
                <div>
                  <GoogleOAuthProvider clientId={process.env.clientId as string}>
                    <GoogleLogin
                      onSuccess={responseGoogle}
                      onError={() => {
                        console.log(t('login_failed'))
                      }}
                    />
                  </GoogleOAuthProvider>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid grid-cols-2 content-end h-full gap-4 mr-5 pb-2 text-xl font-bold'>
          <Link href='/en/login'>
            <Image src={Flag_EN} alt='Flag EN' className='w-9 h-7' />
          </Link>
          <Link href='/vi/login'>
            <Image src={Flag_VI} alt='Flag EN' className='w-9 h-7' />
          </Link>
        </div>
      </div>
    </div>
  )
}
