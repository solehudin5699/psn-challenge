import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const DUMMY_USERS = [
  {
    id: '1',
    username: 'user1',
    password: '12345Abc!',
  },
  {
    id: '2',
    username: 'user2',
    password: '12345Abc!',
  },
];

// export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { password, username } = await request.json();

    const user = DUMMY_USERS.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    (await cookies()).set({
      name: 'token',
      value: 'my-secret-token',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60,
      // maxAge: 60 * 60 * 24, // 1 hari
    });

    return NextResponse.json({
      data: {
        id: user.id,
        username: user.username,
      },
      status: 'success',
      message: 'Login successfully',
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: 'Error processing request' }), { status: 500 });
  }
}
