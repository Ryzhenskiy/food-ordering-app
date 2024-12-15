'use client';

import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  async function handleSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    console.log('here 1');
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4 font-semibold">
        Login
      </h1>

      <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          disabled={loginInProgress}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          disabled={loginInProgress}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn('google')}
          className="flex gap-4 justify-center"
        >
          <Image src={'/google.png'} width={24} height={24} alt={'google'} />
          Login with Google
        </button>
      </form>
    </section>
  );
};
export default LoginPage;
