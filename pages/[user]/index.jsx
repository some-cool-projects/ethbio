import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/ethbio.png";
import Link from "next/link";
import searchIcon from "../../public/searchIcon.png";

import { CryptoLogin, Footer, User } from "../../components";

export default function Home({ data }) {
  const handleSubmit = () => {
    // redirect to /discovery
  };
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
            <Link href="/discover">
              <a href="">Discover</a>
            </Link>
          </h1>
          <h1 className="font-finra text-[20px]">
            <Link href="/user/edit">
              <a href="">Edit</a>
            </Link>
          </h1>
          <div className="absolute right-0 mr-[10px]">
            <CryptoLogin />
          </div>
        </div>
      </nav>

      <div className="mb-auto mt-[10px]">
        <User userData={data} />
      </div>


      <h1 className="font-arvo text-[30px] justify-center items-center flex">
        {" "}
        My NFT Collection
      </h1>
      <div className="  overflow-y-scroll gap-6 mt-[20px]">
        <div className="justify-center items-center flex">
          <div className="mt-[20px] w-[900px] grid grid-cols-3">
            {/* Each of these images should be replaced with an NFT of theirs, make sure the width and height are limited to 300 and 300 or else it's gonna be a mess */}
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
            <Image alt="" src={logo} width={300} height={300} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const param = ctx.params.user;

  console.log(ctx.params);

  const res = await fetch(`http://localhost:3000/api/user/${param}`);

  const data = await res.json();
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}
