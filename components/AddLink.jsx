import trash from "../public/trash.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/router'
const AddLink = ({ uData }) => {
  const Router = useRouter();
  const path = Router.asPath.split("/")[1];
   const [title, setTitle] = useState();
   const [hyperlink, setHyper] = useState();
   const [removed, setRemoved] = useState(false);
   const add = uData.address; const user = uData.username; const prevLinks = uData.links;
   const handleSubmit = async(event) => {
    event.preventDefault();
    let li = [];
    prevLinks.forEach(link => {
      li.push({title: link.title, url: link.url})
    })
    const form = {
      address: add,
      username: user,
      links: [
         ...li,
         {
           title: title,
           url: hyperlink
         }
      ]
    }
    const res = await fetch(`http://localhost:3000/api/user/create`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(form)
    })

    const data = await res.json();
    if(data.error) {
      console.log(data.error)
    }
  }
  
    if(removed == false) {
  return (
    <form onSubmit={handleSubmit}>
    <div className=" ">
      <div
        className="border-2 m-[10px] r
      unded-md w-[600px]"
      >
        <h1 className="font-bold m-[15px] text-[20px] items-center justify-center flex">
          Add a new link
        </h1>
        <div className="ml-6 mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 ">
            Link Title
          </label>
          <input
            className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="ml-6 mb-6">
          <label className="block text-gray-700 text-sm  font-bold mb-2">
            Hyperlink
          </label>
          <input
            className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={hyperlink} 
            onChange={(e) => setHyper(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"
            type="submit"
          >
            Submit Changes
          </button>

          <button onClick={() => setRemoved(true)}>
            <Image alt="" src={trash} width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
    </form>
  );
}
else if(removed == true) {
  return(<span></span>)
}
};

export default AddLink;