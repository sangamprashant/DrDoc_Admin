import React from 'react'
import "./Chats.css"
import {IconButton} from "component-craftsman"

const Chats = () => {
  return (
    <div class="wrapper" style={{marginTop:"-100px"}}>
    <div class="container-message">
      <div class="left">
        <div class="top">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              className="form-control py-4"
            />
            <IconButton effect="jaques" 
            // icon={Icons.PersonSearchIcon} 
            bg={1} />
          </div>
        </div>
        <ul class="people">
          <li class="person" data-chat="person1">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg"
              alt=""
            />
            <span class="name">Thomas Bangalter</span>
            <span class="time">2:09 PM</span>
            <span class="preview">I was wondering...</span>
          </li>
          <li class="person" data-chat="person2">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png"
              alt=""
            />
            <span class="name">Dog Woofson</span>
            <span class="time">1:44 PM</span>
            <span class="preview">I've forgotten how it felt before</span>
          </li>
          <li class="person" data-chat="person3">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg"
              alt=""
            />
            <span class="name">Louis CK</span>
            <span class="time">2:09 PM</span>
            <span class="preview">
              But we’re probably gonna need a new carpet.
            </span>
          </li>
          <li class="person" data-chat="person4">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/bo-jackson.jpg"
              alt=""
            />
            <span class="name">Bo Jackson</span>
            <span class="time">2:09 PM</span>
            <span class="preview">It’s not that bad...</span>
          </li>
          <li class="person" data-chat="person5">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/michael-jordan.jpg"
              alt=""
            />
            <span class="name">Michael Jordan</span>
            <span class="time">2:09 PM</span>
            <span class="preview">
              Wasup for the third time like is you blind bitch
            </span>
          </li>
          <li class="person" data-chat="person6">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/drake.jpg"
              alt=""
            />
            <span class="name">Drake</span>
            <span class="time">2:09 PM</span>
            <span class="preview">howdoyoudoaspace</span>
          </li>
          <li class="person" data-chat="person6">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/drake.jpg"
              alt=""
            />
            <span class="name">Drake</span>
            <span class="time">2:09 PM</span>
            <span class="preview">howdoyoudoaspace</span>
          </li>
          <li class="person" data-chat="person6">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/drake.jpg"
              alt=""
            />
            <span class="name">Drake</span>
            <span class="time">2:09 PM</span>
            <span class="preview">howdoyoudoaspace</span>
          </li>
          <li class="person" data-chat="person6">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/drake.jpg"
              alt=""
            />
            <span class="name">Drake</span>
            <span class="time">2:09 PM</span>
            <span class="preview">howdoyoudoaspace</span>
          </li>
          <li class="person" data-chat="person6">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/drake.jpg"
              alt=""
            />
            <span class="name">Drake</span>
            <span class="time">2:09 PM</span>
            <span class="preview">howdoyoudoaspace</span>
          </li>
          <li class="person" data-chat="person6">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/drake.jpg"
              alt=""
            />
            <span class="name">Drake</span>
            <span class="time">2:09 PM</span>
            <span class="preview">howdoyoudoaspace</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="top">
          <span>
            To: <span class="name">Dog Woofson</span>
          </span>
        </div>
        <div class="chat">
          <div class="conversation-start">
            <span>Today, 6:48 AM</span>
          </div>
          <div class="bubble you">Hello,</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble you">it's me.</div>
          <div class="bubble me">I was wondering...</div>      
        </div>
        <div class="write">
        <div className="d-flex gap-2">
          <input type="text" className="form-control" placeholder="Message.."/>
          <button className="btn btn-primary">Send</button>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Chats
