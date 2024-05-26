import axios from "axios";

export const sendMessage = async (
  room_id: string,
  username: string,
  message: string,
) => {
  let headersList = {
    Accept: "/",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
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

  let data = await response.text();
  console.log("Tahinli: Message Sent!");
};

export const getMessage = async (room_id: string) => {
  let headersList = {
    Accept: "/",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    room_id: room_id,
  });

  let response = await fetch("https://tahinli.com.tr:2334/receive", {
    method: "GET",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  console.log("Message Received!");
  return data;
};
