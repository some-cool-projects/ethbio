import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/ethbio.png";
import searchIcon from "../../public/searchIcon.png";
import Link from "next/link";
import searchUnDraw from "../../public/searchUnDraw.png";
import { CryptoLogin, Footer, UserCard } from "../../components";
import voidImg from "../../public/voidImg.png";

export default function Home({ data }) {
  const [search, setSearch] = useState("");

  const [searchData, setSearchData] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(search);

    if (search === "") {
      alert("Please enter a search term");

      return;
    } else {
      const res = await fetch(
        `http://localhost:3000/api/search?query=${search}`
      );

      const intermediateVar = await res.json();

      console.log(intermediateVar);

      setSearchData(intermediateVar);
      setSearch("");
    }

    // api/search?query=queryonsearchbar
  }

  return (
    <div className="flex flex-col justify-between h-screen">
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
              onChange={handleChange}
            />
          </form>
        </div>

        <div className="flex justify-center items-center">
          <h1 className="font-finra text-[20px] mr-[20px]">
            <Link href="/discover">
              <a href="">Discover</a>
            </Link>
          </h1>
          <h1 className="font-finra text-[20px]">
            <Link href="/about">
              <a href="">About</a>
            </Link>
          </h1>
          <div className="absolute right-0 mr-[10px]">
            <CryptoLogin />
          </div>
        </div>
      </nav>

      {searchData === null ? (
        <div className="items-center justify-center mb-auto flex h-screen">
          {/* Add a cool image from unDraw here */}

          <Image src={searchUnDraw} alt="" />
          <h1 className="font-arvo text-[40px]">
            Start Searching for Some Users!
          </h1>
        </div>
      ) : (
        <span></span>
      )}
      {searchData !== null && searchData.length === 0 ? (
        <div className="items-center justify-center mb-auto flex h-screen">
          {/* Add a cool image from unDraw here */}
          <Image src={voidImg} alt="" width={830.4} height={796} />
          <h1 className="font-arvo text-[40px]">
            Yikes! There seem to be no users with that name.
          </h1>
        </div>
      ) : (
        <span></span>
      )}
      {searchData !== null && searchData.error !== "user not found" ? (
        <div className="overflow-y-scroll mb-auto">
          {searchData.map((searchDataElement) => (
            <UserCard
              userData={searchDataElement}
              key={searchDataElement.address}
            />
          ))}
        </div>
      ) : (
        <span></span>
      )}
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  // const param = ctx.params.user;

  // console.log(ctx.params);

  const res = await fetch(`http://localhost:3000/api/user/Bobby3105`);

  const data = await res.json();
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}
