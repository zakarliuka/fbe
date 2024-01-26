import { db, user } from "@/db";
import bcrypt from "bcryptjs";

type NewUser = typeof user.$inferInsert;

export const findByUsername = (username: string) => {
  return db.query.user.findFirst({
    where: (user, { eq }) => eq(user.username, username.toLowerCase()),
  });
};

export const findById = (id: number) => {
  return db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, id),
  });
};

export const createUser = async (payload: NewUser) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return db
    .insert(user)
    .values({
      username: payload.username.toLowerCase(),
      password: hashedPassword,
    })
    .returning({
      username: user.username,
      id: user.id,
    });
};
