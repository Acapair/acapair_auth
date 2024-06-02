import axios from "axios";

export const sendMessage = async (
  room_id: string,
  username: string,
  message: string,
) => {
  let headersList = {
    Accept: "/",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    room_id: room_id,
    username: username,
    message: message,
  });

  let response = await fetch("https://tahinli.com.tr:2334/send", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });
};

export const getMessage = async (room_id: string) => {
  let reqOptions = {
    url: "https://tahinli.com.tr:2334/receive/" + room_id,
    method: "GET",
  };

  let response = await axios.request(reqOptions);
  return response.data.messages;
};
