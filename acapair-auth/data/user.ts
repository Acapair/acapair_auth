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

// Get User
export const getAllUsers = async (skip: number) => {
  try {
    const users = await db.user.findMany({
      take: 2,
    });
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Delete user by id
export const deleteUserById = async (id: string) => {
  try {
    await db.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
  }
};
