import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import React, { useState } from 'react'
import toast, { Toaster, ToastIcon } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  function inputHandle(event) {
    const a = event.target.name;
    const b = event.target.value;
    setFormData(() => {
      return {
        ...formData, [a]: b,
      }

    })
  
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    const data = await result.json();
    console.log(data);
    if (data.success) {
toast.success(data.message)

      navigate("/");

    } else {
      navigate("/login");
      toast.error(data.message)
    }
    setFormData({

      email: "",
      password: "",
    })

  
}
return (
  <>
  <Toaster/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-red-700 mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={inputHandle}
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={inputHandle}
            />
          </div>
          <br />
          <a href="/signup" className='text-red-500  hover:text-red-700 transition underline'>Don't have an Account ? SignUp</a>
          <Button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  </>
)
}
