import toast from "react-hot-toast";

export const registerUser = (userInfo, setError, navigate) => {
  fetch("https://server-imranwebdeveloper.vercel.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.status) {
        setError(data.message);
      } else {
        toast.success("Registration successfully ");
        localStorage.setItem("usedMobileToken", data.token);
        navigate("/");
      }
    })
    .catch((err) => console.log(err.message));
};
