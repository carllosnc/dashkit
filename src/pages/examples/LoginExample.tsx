import { FiMail, FiLock, FiArrowRight, FiGithub } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Checkbox } from '../../components/Checkbox/Checkbox';

import { Divider } from '../../components/Divider/Divider';

export const LoginExample = () => {
  return (
    <div className="w-full min-h-screen ds-page flex relative">
      <Helmet>
        <title>Login | Dashkit UI</title>
        <meta name="description" content="A premium split-screen login page with social authentication and brand positioning built with Dashkit UI." />
      </Helmet>
      <div className="hidden lg:flex justify-center w-full relative bg-ds-950">
        <div className="relative h-full flex flex-col items-center justify-between p-12">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" className="h-8 invert" alt="Dashkit" />
          </div>

          <div className="max-w-xl text-center">
            <h2 className="text-3xl font-bold leading-tight mb-8 text-white">
              Design gorgeous interfaces at the speed of light.
            </h2>
            <p className="text-ds-400 text-lg">
              The most advanced UI library for high-performance React applications and modern dashboards.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-ds-400">
            <span>By carllosnc</span>
            <span className="size-1 rounded-full bg-ds-700" />
            <span>Premium UI Kit</span>
          </div>
        </div>
      </div>

      <Divider orientation="vertical" />

      {/* Form Side */}
      <div className="w-full flex items-center justify-center p-8 lg:p-20 relative">
        <div className="w-full max-w-[400px] flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Please enter your details to access your dashboard.
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-5">
              <Input
                label="Email address"
                type="email"
                placeholder="name@example.com"
                leftIcon={<FiMail className="size-4" />}
                required
              />
              <div className="flex flex-col gap-2">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<FiLock className="size-4" />}
                  required
                />
                <div className="flex mt-[20px] items-center justify-between px-1">
                  <Checkbox label="Remember me" />
                  <button type="button" className="text-sm text-ds-950 dark:text-ds-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    Forgot password?
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" variant="filled" rightIcon={<FiArrowRight />}>
              Sign in to platform
            </Button>
          </form>

          <Divider>Or continue with</Divider>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outlined" leftIcon={<FcGoogle className="size-5" />}>
              Google
            </Button>
            <Button variant="outlined" leftIcon={<FiGithub className="size-5" />}>
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button className="font-semibold text-ds-900 dark:text-ds-100 hover:text-blue-500 dark:hover:text-sky-400 transition-colors">
              Request access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};


