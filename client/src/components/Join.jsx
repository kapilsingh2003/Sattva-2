import React, { useState } from 'react';
import Input from './Join/Input';
import JoinButton from './Join/JoinButton';
import Avatar from 'boring-avatars';
import Select from './Join/Select';
import getToken from '../utils/getToken';
import { useHMSActions } from '@100mslive/hms-video-react';
import {Tag1, Tag2, Tag3, Tag4, Tag5} from './Tags/tags.component';

const Join = ({text1, text2}) => {
  const hmsActions = useHMSActions();
  const [role, setRole] = useState('speaker');
  const [username, setUsername] = useState('');

  const joinRoom = () => {
    getToken(role)
      .then((token) => {
        hmsActions.join({
          userName: username || 'Anonymous',
          authToken: token,
          settings: {
            isAudioMuted: true, 
          },
          initEndpoint : process.env.REACT_APP_HMS_INIT_PEER_ENPOINT || undefined
        });
      })
      .catch((error) => {
        console.log('Token API Error', error);
      });
  };
  return (
    <div className="flex relative mt-10 flex-col items-center justify-center mb-20 h-100 w-1/4 bg-pal-17">
      <Avatar size={120} name={username} />
      <Input state={{ username, setUsername }} />
      <Select state={{ role, setRole }} />
      <JoinButton onClick={joinRoom} />
     <div className='mt-4'>
      <Tag3 text={text1}/>
      <Tag5 text={text2} />  
     </div>
    </div>
  );
};

export default Join;
