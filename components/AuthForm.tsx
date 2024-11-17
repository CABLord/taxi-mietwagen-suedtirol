
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();
  const { locale } = useLanguage();
  const intl = useIntl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Here you would typically show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">
        {isLogin ? (
          <FormattedMessage id="login" />
        ) : (
          <FormattedMessage id="register" />
        )}
      </h2>
      {!isLogin && (
        <div>
          <Label htmlFor="name"><FormattedMessage id="name" /></Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <Label htmlFor="email"><FormattedMessage id="email" /></Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password"><FormattedMessage id="password" /></Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {isLogin ? (
          <FormattedMessage id="login" />
        ) : (
          <FormattedMessage id="register" />
        )}
      </Button>
      <p className="text-center">
        {isLogin ? (
          <>
            <FormattedMessage id="noAccount" />{' '}
            <button type="button" onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline">
              <FormattedMessage id="registerHere" />
            </button>
          </>
        ) : (
          <>
            <FormattedMessage id="alreadyHaveAccount" />{' '}
            <button type="button" onClick={() => setIsLogin(true)} className="text-blue-500 hover:underline">
              <FormattedMessage id="loginHere" />
            </button>
          </>
        )}
      </p>
    </form>
  );
};

export default AuthForm;
