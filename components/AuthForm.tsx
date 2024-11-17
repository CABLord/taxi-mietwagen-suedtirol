
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from './AuthContext'
import { useToast } from "@/components/ui/use-toast"
import { FormattedMessage, useIntl } from 'react-intl'

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { toast } = useToast();
  const intl = useIntl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email);
      toast({
        title: intl.formatMessage({ id: 'loginSuccessTitle' }),
        description: intl.formatMessage({ id: 'loginSuccessDescription' }),
      });
    } catch {
      toast({
        title: intl.formatMessage({ id: 'loginErrorTitle' }),
        description: intl.formatMessage({ id: 'loginErrorDescription' }),
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email"><FormattedMessage id="email" /></Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={intl.formatMessage({ id: 'enterEmail' })}
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
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
        />
      </div>
      <Button type="submit" className="w-full">
        <FormattedMessage id="login" />
      </Button>
    </form>
  );
};

export default AuthForm;
