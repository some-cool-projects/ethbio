import React from "react";
import Image from "next/image";
import instagram from "../public/instagram.png";
import twitter from "../public/twitter.png";
import facebook from "../public/facebook.png";
import github from "../public/github.png";
import reddit from "../public/reddit.png";
import twitch from "../public/twitch.png";
import { useMoralis } from "react-moralis";
import makeBlockie from "ethereum-blockies-base64";
// import Router from "next/router";

function filt(link) {
  const title = link.title;

  return (
    title != "twitter" &&
    title != "twitch" &&
    title != "instagram" &&
    title != "github" &&
    title != "reddit"
  );
}

function CardComponent({ link, name }) {
  return (
    <a href={link}>
      <div className="bg-[#582a8c] rounded-md text-20px font-arvo text-white p-[10px] items-center justify-center flex">
        {name}
      </div>
    </a>
  );
}

const User = ({ userData }) => {
  const { authenticate, isAuthenticated, user, logout, account } = useMoralis();
  try {
    const filterOtherLinks = userData.links.filter(filt);

    const isInstagram = userData.links.find(
      (link) => link.title.toLowerCase() == "instagram"
    );
    const isTwitter = userData.links.find(
      (link) => link.title.toLowerCase() == "twitter"
    );
    const isFacebook = userData.links.find(
      (link) => link.title.toLowerCase() == "facebook"
    );
    const isGithub = userData.links.find(
      (link) => link.title.toLowerCase() == "github"
    );
    const isReddit = userData.links.find(
      (link) => link.title.toLowerCase() == "reddit"
    );
    const isTwitch = userData.links.find(
      (link) => link.title.toLowerCase() == "twitch"
    );

    console.log("hello " + isInstagram + " hello2 " + isTwitter);

    console.log(isTwitter);

    return (
      <div className="justify-center items-center flex">
        <div className="w-[900px]">
          <div className="rounded-md p-[10px]">
            <header className="flex">
              <div className="rounded-full">
                <Image
                  alt=""
                  src={makeBlockie(account)}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>

              <div className="pt-[20px] pl-[10px]">
                <h1 className="font-arvo text-[20px]">{userData.username}</h1>
                <h1 className="font-finra text-[15px]">{userData.address}</h1>
                {isInstagram ? (
                  <span className="m-[5px]">
                    {" "}
                    <a href={isInstagram.url}>
                      <Image alt="" src={instagram} width={20} height={20} />
                    </a>
                  </span>
                ) : (
                  <span></span>
                )}
                {isTwitter ? (
                  <span className="m-[5px]">
                    {" "}
                    <a href={isTwitter.url}>
                      <Image alt="" src={twitter} width={20} height={20} />
                    </a>
                  </span>
                ) : (
                  <span> </span>
                )}
                {isFacebook ? (
                  <span className="m-[5px]">
                    {" "}
                    <a href={isFacebook.url}>
                      <Image alt="" src={facebook} width={20} height={20} />
                    </a>
                  </span>
                ) : (
                  <span></span>
                )}
                {isGithub ? (
                  <span className="m-[5px]">
                    <a href={isGithub.url}>
                      <Image alt="" src={github} width={20} height={20} />
                    </a>
                  </span>
                ) : (
                  <span> </span>
                )}
                {isReddit ? (
                  <span className="m-[5px]">
                    <a href={isReddit.url}>
                      <Image alt="" src={reddit} width={20} height={20} />
                    </a>
                  </span>
                ) : (
                  <span> </span>
                )}
                {isTwitch ? (
                  <span className="m-[5px]">
                    <a href={isTwitch.url}>
                      <Image alt="" src={twitch} width={20} height={20} />
                    </a>
                  </span>
                ) : (
                  <span> </span>
                )}
              </div>
            </header>

            <hr className="border-1 border-black" />

            {/* no more than 8 here, but you should check for that on the /user/edit page prompting that more than 8 links cannot be entered */}
            <div className="grid grid-cols-2 mt-[20px] md-[20px] gap-[15px]">
              {filterOtherLinks.map(function (i, index) {
                return (
                  <CardComponent link={i.url} name={i.title} key={index} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return (
      <div className="justify-center items-center flex">
        <h1 className="font-arvo text-[20px]">
          Yikes this user does not seem to exist
        </h1>
      </div>
    );
  }
};
export default User;
