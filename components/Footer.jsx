import Image from "next/image";
import logo from "../public/ethbio.png";

const Footer = () => {
  return (
    <footer className="bg-[#000000]">
      <div className="flex justify-center items-center">
        <Image alt="Ethbio logo" src={logo} width={100} height={100} />
        <span className="font-semibold text-[30px] text-white font-arvo">
          Ethbio
        </span>
      </div>
    </footer>
  );
};

export default Footer;
