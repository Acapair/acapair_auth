import { db } from "@/lib/db";

// Get user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get user by id
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Create user
export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const user = await db.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
