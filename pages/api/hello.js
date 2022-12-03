import axios from "axios";

export default async function handler(nextReq, nextRes) {
  axios
    .get(
      "https://api.unsplash.com/photos/random?client_id=j-HQOzjYOyL8NGtBumlbUJuic8zkQ2abcclsQ4Z2dyw"
    )
    .then((axiosResponse) => {
      nextRes.json({ data: axiosResponse.data }).status(200);
    })
    .catch((axiosError) => {
      nextRes.json({ message: axiosError.message });
    });
}
