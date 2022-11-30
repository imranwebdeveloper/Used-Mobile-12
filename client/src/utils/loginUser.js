import toast from "react-hot-toast";

const loginUser = (userInfo, setError, setUser, navigate) => {
  fetch("https://server-imranwebdeveloper.vercel.app/login", {
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
        localStorage.setItem("usedMobileToken", data.token);
        setUser(data.user);
        navigate("/");
        toast.success("Login Success");
      }
    })
    .catch((err) => console.log(err.message));
};

export default loginUser;
