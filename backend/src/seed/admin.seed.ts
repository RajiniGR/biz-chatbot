import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../modules/auth/user.model';

dotenv.config();

async function run(){
  await mongoose.connect(process.env.MONGODB_URI!);
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const pass = process.env.ADMIN_PASSWORD || 'Admin123!';
  const exists = await User.findOne({ email });
  if(exists){ console.log('Admin exists'); process.exit(0); }
  const hash = await bcrypt.hash(pass, 10);
  const admin = new User({ email, password: hash, role: 'admin', name: 'Admin' });
  await admin.save();
  console.log('Admin created', email);
  process.exit(0);
}

run().catch(err=>{ console.error(err); process.exit(1); });