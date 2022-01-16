import logo from "../../public/ethbio.png";

import Image from "next/image";
import { useRouter } from "next/router";
import { CryptoLogin, AddLink, AddPreviousLink } from "../../components";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import needAuth from "../../public/needAuth.png";
import searchIcon from "../../public/searchIcon.png";
import { useMoralis } from "react-moralis";
import makeBlockie from "ethereum-blockies-base64";

export default function Users({ data }) {
  const { authenticate, isAuthenticated, user, logout, account } = useMoralis();
  const [username, setUsername] = useState();
  const [value] = useDebounce(username, 1000);
  const [numberButtons, setNumberButtons] = useState([]);
  const [images, setImages] = useState([]);
  const Router = useRouter();
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const handleAddLink = async (e) => {
    
    setNumberButtons([...numberButtons, e]);
  };
  const checkUserName = async (event) => {
    if (event.target.value != data.username) {
      setUsername(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value) {
      const search = await fetch(
        `http://localhost:3000/api/search?query=${value}`
      );
      const da = await search.json();

      if (da != []) {
        let li = [];
        data.links.forEach((link) => {
          li.push({ title: link.title, url: link.url });
        });
        let form = {
          username: value,
          address: data.address,
          links: li,
          pfp: data.pfp,
        };
        const push = await fetch(`http://localhost:3000/api/user/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const e = await push.json();

        if (e.error) {
          alert("There was a error in requesting this change");
        }
      } else {
        alert(`${value} is already taken!`);
      }
    }
  };
  let cont = (
    <h1 className="font-arvo text-[40px] content-center mt-[30px]">
      Add some links to show on your page!
    </h1>
  );
  let content = <span></span>;
  if (data.links.length && data.links.length > 0) {
    cont = (
      <div>
        {data.links.map((link) => {
          return (
            <div key={Math.random()} className="mt-[40px]">
              <AddPreviousLink
                allLinks={data.links}
                uLink={link}
                username={data.username}
                address={data.address}
              />
            </div>
          );
        })}
      </div>
    );
  }
  if (numberButtons.length > 0) {
    content = (
      <div>
        {numberButtons.map(() => {
          return (
            <div key={Math.random()} className="mt-[40px]">
              <AddLink uData={data} />
            </div>
          );
        })}
      </div>
    );
  }

  console.log(data.address);
  console.log(account);
  if (isAuthenticated && data.address.toLowerCase() == account.toLowerCase()) {
    return (
      <div className="flex flex-col h-screen justify-between">
        <nav className="flex items-center justify-center grid grid-cols-3 gap-3 pt-6 pl-6 border-b-2">
          <div className="flex items-center text-black">
            <Image alt="Ethbio logo" src={logo} width={100} height={100} />
            <span className="font-semibold text-[30px] text-black font-arvo">
              Ethbio
            </span>
          </div>

          <div className="flex items-center justify-centre">
            <form>
              <button
                className="p-1 focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                <Image
                  alt="search icon"
                  src={searchIcon}
                  width={45}
                  height={23.25}
                />
              </button>
              <input
                type="search"
                className="shadow-sm border-2 w-[500px] h-[50px] rounded-lg"
                autoComplete="off"
              />
            </form>
          </div>

          <div className="flex justify-center items-center">
            <h1 className="font-finra text-[20px] mr-[20px]">
              <a href="">Discover</a>
            </h1>
            <h1 className="font-finra text-[20px]">
              <a href="">About</a>
            </h1>
            <div className="absolute right-0 mr-[10px]">
              <CryptoLogin />
            </div>
          </div>
        </nav>
        <div className="grid grid-cols-2 mb-auto h-16">
          <div className="mb-auto place-items-center m-auto rounded-md shadow mt-[80px] mb-[40px] bg-[#F5F5F5]">
            <form
              className="px-8 pt-6 pb-8 mb-4 w-[600px]"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <span className="items-center flex justify-center">
                  <Image
                    src={makeBlockie(account)}
                    alt=""
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                </span>
                <h1 className="font-bold m-[10px] text-[20px] items-center justify-center flex">
                  Profile Changes
                </h1>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Username"
                  value={value}
                  onChange={(e) => checkUserName(e)}
                />
              </div>
              <div className="flex items-center justify-center text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                  type="submit"
                >
                  Submit Changes
                </button>
              </div>
            </form>
          </div>

          <div className="overflow-y-scroll">
            <div className="text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-[20px] py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-[40px]"
                type="button"
                onClick={handleAddLink}
              >
                Add some links!
              </button>
            </div>
            <div className="flex justify-center items-center">{cont}</div>
            <div className="flex justify-center items-center">{content}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <body className="flex justify-center h-screen items-center">
        <div className="grid grid-cols-2 gap-2">
          <Image alt="" src={needAuth} />
          <div className="text-center mt-[20px]">
            <h1 className="font-arvo text-[60px]">
              Yikes! Seems like you do not have the credentials to access this
              page!
            </h1>
          </div>
        </div>
      </body>
    );
  }
}

export const redirectIfUnauthenticated = async (context) => {
  const params = context.params.user;

  const res = await fetch(`http://localhost:3000/api/user/${params}`);
  const data = await res.json();

  if (!data) {
    const { res } = context;

    res.writeHead(200, { Location: "/404" });
    res.end();

    return true;
  }
};
export async function getServerSideProps(ctx) {
  const params = ctx.params.user;

  const res = await fetch(`http://localhost:3000/api/user/${params}`);
  const data = await res.json();
  return (
    (await redirectIfUnauthenticated(ctx)) || {
      props: {
        data: data,
      },
    }
  );
}
