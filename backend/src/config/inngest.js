import { Inngest } from 'inngest';
import { connectDb } from './db.js';
import { User } from '../models/user.model.js';
import {upsertStremUser, deleteStreamUser} from "./stream.js"

export const inngest = new Inngest({ id: 'slack-clone' });

const syncUser = inngest.createFunction(
  { id: 'user-sync' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    await connectDb();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const newUser = await User.create({
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ''} ${last_name || ''}`,
      image: image_url,
    });

    await newUser.save();
    await upsertStremUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.image
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: 'delete-user-from-db' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    await connectDb();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];
