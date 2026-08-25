import { Link, useNavigate } from 'react-router-dom';

import deleteImg from '@/assets/images/delete.svg';

import './styles.scss';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { onValue, ref, remove, update } from 'firebase/database';

import { useAuth } from '@/hooks/useAuth';
import { database } from '@/services/firebase';
import { Button } from '@/components/Button';
import { UserInfo } from '@/components/UserInfo';
import { Header } from '@/components/Header';

type FirebaseMeRooms = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  title: string;
  endedAt?: boolean;
};

export function RoomsMe() {
  const { user } = useAuth();
  const [meRooms, setMeRooms] = useState<FirebaseMeRooms[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const roomsRef = ref(database, 'rooms');

    const unsubscribe = onValue(roomsRef, roomsSnapshot => {
      const rooms = roomsSnapshot.val() as Record<string, Omit<FirebaseMeRooms, 'id'>> | null;

      if(!rooms) {
        setMeRooms([]);
        return;
      }

      const parsedRooms = Object.entries(rooms).map(([key, value]) => {
        return {
          id: key,
          author: value.author,
          title: value.title,
          endedAt: value.endedAt,
        };
      });

      const roomsFiltered = parsedRooms.filter(result => result.author.id === user?.id)

      setMeRooms(roomsFiltered);
    });

    return () => {
      unsubscribe();
    };

  }, [user?.id]);

  function handleOpenRoom(event: FormEvent, roomId: string) {
    event.preventDefault();

    void update(ref(database, `rooms/${roomId}`), {
      endedAt: false,
    });

    navigate(`/admin/rooms/${roomId}`);
  }

  async function handleDeleteRoom(roomId: string) {
    if(window.confirm('Tem certeza que deseja excluir esta sala?')) {
      await remove(ref(database, `rooms/${roomId}`));
    }
  }

  return (
    <div id="page-roomsMe">
      <Header>
        <div className="infos">
          <UserInfo
            avatar={user?.avatar}
            name={user?.name}
          />
          <Link to={`/rooms`}>
            <Button type="button">
              Outras salas
            </Button>
          </Link>
        </div>
      </Header>

      <div className="rooms">
        <div>
          <Link to={`/rooms/new`}>
            <Button type="button">
              Criar nova sala
            </Button>
          </Link>
          <div className="details">
            {meRooms.length > 0 && (<h2>Total de salas: <span> {meRooms.length} </span></h2>)}
          </div>
        </div>

        {meRooms.map(room => (
          <div className="room" key={room.id}>
            <h1>{room.title}</h1>
            <div>
              <button
                type="button"
                onClick={() => handleDeleteRoom(room.id)}
                className="iconsButton"
                title="Deletar esta sala"
              >
                <img src={deleteImg} alt="Remover sala" />
              </button>
              {room.endedAt ? (
                <Button onClick={(event) => handleOpenRoom(event, room.id)} type="button">
                  Abrir a sala
                </Button>
              ) : (
                <Link to={`/admin/rooms/${room.id}`}>
                  <Button type="button">
                    Ir para a sala
                  </Button>
                </Link>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
