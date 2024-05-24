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

// Get user by username
export const getUserByUsername = async (name: string) => {
  try {
    const user = await db.user.findUnique({
      where: { name },
      include: {
        stream: true,
      },
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
  name: string,
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

// Create Stream
export const createStream = async (name: string, user: any, userId: any) => {
  try {
    const stream = await db.stream.create({
      data: {
        name,
        userId,
        user,
      },
    });
    return stream;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get User
export const getAllUsers = async (take: number) => {
  try {
    const users = await db.user.findMany({
      take,
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
