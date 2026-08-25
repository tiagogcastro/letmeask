import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { get, ref } from 'firebase/database';
import { database } from '../../services/firebase';

import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { IllustrationAside } from '../../components/IlustrationAside';

import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import './styles.scss';

const joinRoomFormSchema = z.object({
  roomCode: z.string().trim().min(1, 'Informe o código da sala'),
});

type JoinRoomFormData = z.infer<typeof joinRoomFormSchema>;

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinRoomFormData>({
    resolver: zodResolver(joinRoomFormSchema),
  });

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }

    navigate('/rooms/new');
  }

  async function handleJoinRoom({ roomCode }: JoinRoomFormData) {
    const roomSnapshot = await get(ref(database, `rooms/${roomCode}`));

    if(!roomSnapshot.exists()) {
      setError('roomCode', { message: 'Sala não encontrada. Verifique o código.' });
      return;
    }

    if(roomSnapshot.val().endedAt) {
      setError('roomCode', { message: 'Esta sala já foi encerrada.' });
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
          <form onSubmit={handleSubmit(handleJoinRoom)}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              {...register('roomCode')}
            />
            {errors.roomCode && (
              <span className="form-error">{errors.roomCode.message}</span>
            )}
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
