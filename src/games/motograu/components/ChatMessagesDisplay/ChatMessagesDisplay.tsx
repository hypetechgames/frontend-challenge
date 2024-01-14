import React, { useContext, useEffect, useState } from 'react';
import { CrashGameContext } from '@/core/providers/games/crash-game.provider';
import { IGameMessage } from '../../providers/interfaces/game-message.interface';
import { dateToHumanReadable } from '@/core/helpers/date';

const ChatMessagesDisplay = () => {
  const { messages, session } = useContext(CrashGameContext);
  const [localMessages, setLocalMessages] = useState<IGameMessage[]>(messages);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setLocalMessages(messages.slice(-2));
    } else {
      setLocalMessages(messages.slice(-5));
    }
  }, [messages, isMobile]);

  return (
    <div className="chat-messages-display">
      {localMessages.map((data: IGameMessage, idx: number) => (
        <div
          key={idx}
          className={`chat ${data.userId === session.userId ? 'chat-end' : 'chat-start'}`}
          style={{ maxHeight: isMobile ? '3rem' : 'none' }}
        >
          <div className="chat-image avatar">
            <div className="w-5 rounded-full">
              <img src="https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png" alt="user-avatar" />
            </div>
          </div>
          <div className="min-h-0" style={{ color: 'skyblue' }}>
            {data.message}
          </div>
          <div className="chat-footer text-xs opacity-50">
            {dateToHumanReadable(data.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessagesDisplay;
