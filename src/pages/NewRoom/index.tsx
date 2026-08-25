import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { push, ref } from 'firebase/database';
import { database } from '../../services/firebase';

import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { IllustrationAside } from '../../components/IlustrationAside';
import { UserInfo } from '../../components/UserInfo';

import logoImg from '../../assets/images/logo.svg';

import './styles.scss';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
  }, [user]);

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const newRoomRef = await push(ref(database, 'rooms'), {
      title: newRoom,
      author: {
        id: user?.id,
      name: user?.name,
      avatar: user?.avatar
      },
      endedAt: false,
    });

    navigate(`/admin/rooms/${newRoomRef.key}`);
  }
  
  return (
    <div id="page-new-room">
      <IllustrationAside />
      <main>
        <header>
          <UserInfo 
            avatar={user?.avatar}
            name={user?.name}
          />
          <Link to="/rooms/me">
            <Button type="button">Minhas salas</Button>
          </Link>
        </header>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              maxLength={40}
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit" disabled={!user}>
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? 
            <Link to="/"> Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}