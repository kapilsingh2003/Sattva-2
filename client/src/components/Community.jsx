import React from "react";

import Post from "./Post";

import Swal from "sweetalert2";

import { posts } from "../utils/posts";

const Community = ({user}) => {
  const handleClick = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Enter Content and tag',
      html:
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })
  const obj = {
    name : user.name,
    hour : 0,
    img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRug35-jEL_cLj3IwNOaXXAHCWlQ8xxUco5AA&usqp=CAU",
    content : formValues[0],
    tag : formValues[1]
  }
  posts.shift(obj)
  }
  return (
    <div className="w-screen  flex flex-col justify-around items-center relative">
     {
      posts.map(post => <Post name = {post.name} hour = {post.hour} img = {post.img} content = {post.content} tag = {post.tag} like = {post.like} com = {post.com}/>)
     }
      <div className="fixed rounded-full top-20 left-1/4">
          <button onClick={handleClick} class="p-0 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
            <svg
              viewBox="0 0 20 20"
              enable-background="new 0 0 20 20"
              class="w-6 h-6 inline-block"
            >
              <path
                fill="#FFFFFF"
                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
              />
            </svg>
          </button>
      </div>
    </div>
  );
};

export default Community;
