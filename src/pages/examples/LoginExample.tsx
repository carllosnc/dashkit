import { FiMail, FiLock, FiArrowRight, FiGithub } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '../../dashkit/Input/Input';
import { Button } from '../../dashkit/Button/Button';
import { Checkbox } from '../../dashkit/Checkbox/Checkbox';

import { Divider } from '../../dashkit/Divider/Divider';

export const LoginExample = () => {
  return (
    <div className="w-full min-h-screen ds-page flex relative">
      <Helmet>
        <title>Login | Dashkit UI</title>
        <meta name="description" content="A premium split-screen login page with social authentication and brand positioning built with Dashkit UI." />
      </Helmet>
      <div className="hidden lg:flex justify-center w-full relative bg-ds-950 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop"
            alt="Dashkit background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ds-950/75 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ds-950 via-ds-950/40 to-ds-950/75" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-between p-12">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" className="h-8 invert" alt="Dashkit" />
          </div>

          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold leading-tight mb-3 text-white">
              Design interfaces at the speed of light.
            </h2>
            <p className="text-ds-400 text-base">
              Modern UI library for React applications.
            </p>
          </div>

          <div aria-hidden="true" className="h-8" />
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
                <div className="flex mt-5 items-center justify-between px-1">
                  <Checkbox label="Remember me" />
                  <button type="button" className="text-sm text-foreground hover:text-primary transition-colors">
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
            <button className="font-semibold text-foreground hover:text-primary transition-colors">
              Request access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};


