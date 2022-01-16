import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { useEffect } from "react";
import randomColor from "random-color";
export default function CryptoLogin() {
  const { authenticate, isAuthenticated, user, logout, account } = useMoralis();
  const Router = useRouter();
  var color = randomColor();
  const CheckDatabase = async (u) => {
    const res = await fetch(`http://localhost:3000/api/user/${u}`);

    const data = await res.json();
    if (data.error) {
      const d = {
        username: u,
        address: u,
        links: [],
        pfp: color.hexString(),
      };
      const res = await fetch(`http://localhost:3000/api/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      });

      const da = await res.json();
      alert(da.value);
    }
  };

  const handleLogin = async () => {
    authenticate();
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => handleLogin()}
        className="h-10 w-20 text-white text-[18px] rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold font-finra py-2 px-46 rounded-md bottom-[37px] h-[60px] w-[130px] text-center mt-[10px]"
      >
        Sign up
      </button>
    );
  } else {
    useEffect(async () => {
      await CheckDatabase(account);
    }, []);
    return (
      <div>
        {/* <h1>Welcome {account}</h1>
      <h1>Welcome {user.get("username")}</h1> */}
        <button
          onClick={() => logout()}
          className="h-10 w-20 text-white text-[18px] rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold font-finra py-2 px-46 rounded-md bottom-[37px] h-[60px] w-[130px] text-center mt-[10px]"
        >
          Sign out
        </button>
      </div>
    );
  }
}
