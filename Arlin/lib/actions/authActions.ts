'use server';

import { cookies } from 'next/headers';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/User';
import { comparePassword, hashPassword, signToken, verifyToken } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  try {
    await connectDB();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { success: false, message: 'Моля попълнете всички полета' };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'Грешен имейл или парола' };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Грешен имейл или парола' };
    }

    const token = await signToken({
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      user: {
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        plan: user.plan,
        exp: user.exp,
      },
      token,
    };
  } catch (error: any) {
    return { success: false, message: error.message || 'Грешка при влизане' };
  }
}

export async function registerAction(formData: FormData) {
  try {
    await connectDB();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    if (!email || !password) {
      return { success: false, message: 'Моля попълнете задължителните полета' };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: 'Потребител с този имейл вече съществува' };
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'student',
      plan: 'none',
      exp: 0,
    });

    const token = await signToken({
      _id: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      user: {
        _id: newUser._id.toString(),
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        plan: newUser.plan,
        exp: newUser.exp,
      },
      token,
    };
  } catch (error: any) {
    return { success: false, message: error.message || 'Грешка при регистрация' };
  }
}

export async function logoutAction() {
  cookies().delete('token');
  return { success: true };
}

export async function getSessionUser() {
  try {
    const token = cookies().get('token')?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload || !payload._id) return null;

    await connectDB();
    const user = await User.findById(payload._id).select('-password').lean();
    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch {
    return null;
  }
}
