import React from "react";

export default function FriendsList({friends}) {
  const handleClick = e=> { alert('Link was clicked') };

  return <ul>
            <li>
                <a href='#' onClick={handleClick} >Click me</a>
            </li>
            {friends.map( (friend, i) =>
                <li key={i}>{friend}</li>
            )}
         </ul>
}