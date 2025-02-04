import mongoose from 'mongoose';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error('Password must be at least 5 characters long');
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pass, salt);
  body.password = hashedPassword;

  const createdUser = await User.create(body);

  return Response.json(createdUser);
}
