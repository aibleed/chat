import React, { useCallback, useEffect, useState } from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { chatActions } from '../../redux/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ChatMessage from '../../models/chatMessage';

const Dialogue = () => {
	const [value, setValue] = useState('');
	const [username, setUsername] = useState('');
	const { isConnected, messages } = useAppSelector((state) => state.chatSlice);
	const dispatch = useAppDispatch();

	// const connect = useCallback(() => {
	// 	socket.current = new WebSocket('ws://localhost:5000');
	// 	socket.current.onopen = () => {
	// 		setConnected(true);
	// 		const message = {
	// 			event: 'connection',
	// 			username,
	// 			id: Date.now(),
	// 		};
	// 		socket.current!.send(JSON.stringify(message));
	// 		console.log('Подключение установлено');
	// 	};
	// 	socket.current.onmessage = (event) => {
	// 		const message = JSON.parse(event.data);
	// 		setMessages((prev) => [message, ...prev]);
	// 	};
	// 	socket.current.onclose = () => {
	// 		console.log('Socket закрыт');
	// 	};
	// 	socket.current.onerror = () => {
	// 		console.log('Socket произошла ошибка');
	// 	};
	// }, [connected]);

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		const message: ChatMessage = {
			username,
			message: value,
			id: Date.now(),
			event: 'message',
		};
		dispatch(chatActions.submitMessage({ content: message }));
		setValue('');
	};

	if (!isConnected) {
		return (
			<div>
				<div>
					<input
						type='text'
						value={username}
						placeholder='Введите ваше имя'
						onChange={(e) => setUsername(e.target.value)}
					/>
					<button onClick={() => dispatch(chatActions.startConnecting())}>Войти</button>
				</div>
			</div>
		);
	}

	return (
		<div className='w-full h-full bg-primary px-20 relative'>
			<h6 className='Dialogue__data text-gray-400 font-thin capitalize text-center my-3'>Today, 9:00 AM</h6>
			<div className='grid grid-cols-2 h-4/6'>
				{messages.map((message) => (
					<div
						key={message.id}
						className='Dialogue__friendMessage relative bg-gray-700 text-white w-96 rounded-lg h-max py-2 px-4'>
						<ProfileIcon
							style={{
								position: 'absolute',
								left: '-60px',
								top: '0px',
							}}
							img='https://png.pngitem.com/pimgs/s/192-1926160_transparent-ajax-png-anime-profile-png-download.png'
							alt='icon'
						/>

						<div>{message.message}</div>
					</div>
				))}
				<div className='Dialogue__myMessage bg-blue-100 w-96 h-max py-2 px-4 text-black rounded-lg  col-start-2'>
					Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
				</div>
			</div>
			<form onSubmit={sendMessage} className='form'>
				<input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className='input'
					placeholder='Type your text'
					type='text'
				/>
				<button className='mr-2'>Отправить</button>
				{/* <button className='reset' type='reset'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth='2'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'></path>
					</svg>
				</button> */}
			</form>
		</div>
	);
};

export default Dialogue;
