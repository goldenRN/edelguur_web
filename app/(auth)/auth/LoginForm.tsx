'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import logo_white from '/img/logowhite.png';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().min(1, { message: 'Нэвтрэх нэр оруулна уу' }),
  password: z.string().min(1, { message: 'Нууц үг оруулна уу' }),
});

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {

        const error = await response.json();
        alert(error.message || 'Нэвтрэхэд амжилтгүй боллоо.');
        return;
      }

      const result = await response.json();
      const userData = {
        token: result.token,
        username: result.username || data.email,
        role: 'admin',
      };
      await localStorage.setItem('user', JSON.stringify(userData));
      await login(userData);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Системийн алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#e6edf5] to-[#c5d3ea]">
      <Card className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden md:w-3/4 lg:w-2/4">
        {/* LEFT PANEL */}
        <CardHeader className="bg-[#1d3b86] text-white flex flex-col items-center justify-center w-full md:w-1/3 p-8">
          <div className="flex flex-col items-center">
            <Image src={logo_white} width={140} height={100} alt="logo" />
          </div>
          {/* <CardDescription className="text-gray-200 mt-2 text-sm text-center">
            Системд нэвтрэх эрхээрээ орно уу
          </CardDescription> */}
        </CardHeader>

        {/* RIGHT PANEL */}
        <CardContent className="w-full md:w-2/3 p-10 bg-white">
          <CardTitle className="text-2xl font-bold text-center text-[#1d3b86]">
            {/* <CardTitle className="text-center text-lg mt-5 font-semibold"> */}
            Удирдлагын систем
            {/* </CardTitle> */}
          </CardTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8 pt-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1d3b86] font-medium">
                      Нэвтрэх нэр
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Нэвтрэх нэр"
                        {...field}
                        className="border-[#9bb0d6] focus-visible:ring-[#1d3b86]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1d3b86] font-medium">
                      Нууц үг
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Нууц үг"
                        {...field}
                        className="border-[#9bb0d6] focus-visible:ring-[#1d3b86]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#d49943] to-[#edad45] hover:opacity-90 transition-all duration-200 text-white font-semibold py-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Нэвтэрч байна...
                  </div>
                ) : (
                  'Нэвтрэх'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div >
  );
};

export default LoginForm;
