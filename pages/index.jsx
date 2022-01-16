import Link from "next/link";
import Image from "next/image";
import logo from "../public/ethbio.png";
import React, { useState } from "react";
import ether from "../public/ether.png";
import { CryptoLogin, Footer } from "../components";
import bitcoin from "../public/bitcoin.png";
import key from "../public/key.png";
import lock from "../public/lock.png";
import searchIcon from "../public/searchIcon.png";
import cryptoPortfolio from "../public/cryptoPortfolio.png";
import socialFriends from "../public/socialFriends.png";
import postOnline from "../public/postOnline.png";

export default function Home() {
  const handleSubmit = () => {
    // redirect to /discovery
  };

  return (
    <div>
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
            <Link href="/about">
              <a href="">About</a>
            </Link>
          </h1>
          <div className="absolute right-0 mr-[10px]">
            <CryptoLogin />
          </div>
        </div>
      </nav>
      <div className="flex  place-items-center">
        <div className="text-center lg:w-3/6 md:w-screen">
          <h1 className="font-arvo 2xl:text-[95px] xl:text-[75px] lg:text-[60px] md:text-[50px] text-black mb-[15px] text-black">
            Your One Place <br />
            On the Internet.
          </h1>
          <h3 className="xl:text-[30px] xl:text-[22px] lg:text-[20px] text-black font-fira text-black">
            <span className="text-[#582a8c]">Ethbio</span> is The Bio Page for
            all things Crypto, NFTs, <br /> Social Pages and beyond
          </h3>
          <CryptoLogin />
        </div>

        <div className="lg:w-3/6 flex justify-center items-center">
          <Image src={ether} alt="Illustration" width={830} height={866.25} />
        </div>
      </div>

      <div className="flex justify-center items-center mt-[20px]">
        <div>
          <Image src={logo} alt="" />
        </div>
        <h1 className="font-arvo 2xl:text-[55px] xl:text-[35px] lg:text-[25px] md:text-[25px] text-black mb-[15px] text-black">
          Built on the principles of <br />
          Web3.0
        </h1>
      </div>

      <div className="flex justify-center items-center grid grid-cols-3 gap-[3rem] m-[15px]">
        <div className="mt-[20px] text-center items-center justify-center shadow-2xl rounded-lg p-[10px]">
          <div className="">
            <Image src={key} alt="" height={100} width={100} />
          </div>
          <h1 className="text-[20px] font-arvo clear-left">
            No Login Whatsoever.
          </h1>
          <h2 className="font-finra text-[15px]">
            We retrieve our data from your public address, meaning no <br />{" "}
            hassle of login whatseoever, one click and you are all set.
          </h2>
        </div>
        <div className="mt-[20px] text-center justify-center items-center shadow-2xl rounded-lg p-[10px]">
          <Image src={lock} alt="" height={100} width={100} />

          <h1 className="text-[20px] font-arvo">Privacy above all else.</h1>
          <h2 className="font-finra text-[15px]">
            We store none of your details including password or email <br /> all
            of your data comes from one single public address.
          </h2>
        </div>
        <div className="mt-[20px] text-center justify-center items-center shadow-2xl rounded-lg p-[10px]">
          <Image src={bitcoin} alt="" height={100} width={100} />
          <h1 className="text-[20px] font-arvo">
            Built Using Low Trust Policies.
          </h1>
          <h2 className="font-finra text-[15px]">
            Built using the same low trust policies that empower the <br />
            cryptocurrencies and NFTs of today
          </h2>
        </div>
      </div>

      <div className="flex  place-items-center mt-[50px]">
        <div className="lg:w-3/6 flex justify-center items-center">
          <Image
            src={cryptoPortfolio}
            alt="Illustration"
            width={607.5}
            height={417}
          />
        </div>
        <div className="text-center lg:w-3/6 md:w-screen">
          <h1 className="font-arvo 2xl:text-[45px] xl:text-[75px] lg:text-[60px] md:text-[50px] text-black mb-[15px] text-black">
            Show all of your NFT goodies <br /> in one place.
          </h1>
        </div>
      </div>

      <div className="flex  place-items-center mt-[50px]">
        <div className="text-center lg:w-3/6 md:w-screen">
          <h1 className="font-arvo 2xl:text-[45px] xl:text-[75px] lg:text-[60px] md:text-[50px] text-black mb-[15px] text-black">
            Discover new users, and find <br /> out what they are all about.
          </h1>
        </div>
        <div className="lg:w-3/6 flex justify-center items-center">
          <Image
            src={socialFriends}
            alt="Illustration"
            width={524}
            height={374.5}
          />
        </div>
      </div>

      <div className="flex  place-items-center mt-[50px]">
        <div className="lg:w-3/6 flex justify-center items-center">
          <Image
            src={postOnline}
            alt="Illustration"
            width={338.5}
            height={469}
          />
        </div>
        <div className="text-center lg:w-3/6 md:w-screen">
          <h1 className="font-arvo 2xl:text-[45px] xl:text-[75px] lg:text-[60px] md:text-[50px] text-black mb-[15px] text-black">
            Post all of your social pages <br /> for people to see.
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}
