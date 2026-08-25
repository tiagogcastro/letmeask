import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { push, ref } from 'firebase/database';
import { database } from '@/services/firebase';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/Button';
import { IllustrationAside } from '@/components/IlustrationAside';
import { UserInfo } from '@/components/UserInfo';

import logoImg from '@/assets/images/logo.svg';

import './styles.scss';

const newRoomFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Informe o nome da sala')
    .max(40, 'O nome da sala deve ter no máximo 40 caracteres'),
});

type NewRoomFormData = z.infer<typeof newRoomFormSchema>;

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRoomFormData>({
    resolver: zodResolver(newRoomFormSchema),
  });

  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
  }, [user]);

  async function handleCreateRoom({ title }: NewRoomFormData) {
    const newRoomRef = await push(ref(database, 'rooms'), {
      title,
      author: {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar,
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
          <form onSubmit={handleSubmit(handleCreateRoom)}>
            <input
              maxLength={40}
              type="text"
              placeholder="Nome da sala"
              {...register('title')}
            />
            {errors.title && (
              <span className="form-error">{errors.title.message}</span>
            )}
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
