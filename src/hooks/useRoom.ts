import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';

import { database } from '@/services/firebase';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<string, {
  author: {
    id: string;
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>;

type QuestionType = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

type DatabaseRoomType = {
  title: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  questions?: FirebaseQuestions;
  endedAt: false,
  questionCount: 0,
}

export function useRoom(roomId: string) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');
  const [adminId, setAdminId] = useState('');

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);

    const unsubscribe = onValue(roomRef, roomSnapshot => {
      const databaseRoom = roomSnapshot.val() as DatabaseRoomType | null;

      if(!databaseRoom || databaseRoom.endedAt) {
        navigate('/');
        return;
      }

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object
            .entries(value.likes ?? {})
            .find(([, like]) => like.authorId === user?.id)?.[0],
        };
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      setAdminId(databaseRoom.author.id);
    });

    return () => {
      unsubscribe();
    };

  }, [roomId, user?.id, navigate]);

  return {
    questions,
    title,
    adminId
  }
}
