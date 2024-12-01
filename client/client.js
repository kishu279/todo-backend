const token = String();

const signin = () => {
  fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "example@example.com",
      password: "securepassword",
    }),
  })
    .then((response) => response.json())
    .then((data) => {console.log(data)}); //
};
