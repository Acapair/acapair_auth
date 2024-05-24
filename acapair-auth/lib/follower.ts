import axios from "axios";

export const followerCount = async (username: string) => {
  const data = await axios
    .get(`https://tahinli.com.tr:3434/search-username/${username}`)
    .then((res) => {
      return res.data;
    });
  return data.channel.followed_list.length;
};
