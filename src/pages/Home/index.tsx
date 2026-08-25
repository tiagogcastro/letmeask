import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { database } from '../../services/firebase';

import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { IllustrationAside } from '../../components/IlustrationAside';

import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import './styles.scss';

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    navigate('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomSnapshot = await get(ref(database, `rooms/${roomCode}`));

    if(!roomSnapshot.exists()) {
      alert('Room does not exist');
      return;
    } 

    if(roomSnapshot.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <IllustrationAside />
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
          <p>
            Quer ver todas as salas? 
            <Link to="/rooms"> Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}