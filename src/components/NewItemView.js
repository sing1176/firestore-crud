import React from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';

const NewItemView = () => {
	const [fullName, setFullName] = useState('');
	const [creator, setCreator] = useState('');
	const [alterEgo, setAlterEgo] = useState('');
	const [modalShow, setModalShow] = useState(false);
	const superheroCol = collection(db, 'Superheros');

	const createSuperhero = async () => {
		setModalShow(true);
		let newObj = {
			fullName: fullName,
			alterEgo: alterEgo,
			creator: creator,
		};

		await addDoc(superheroCol, newObj);
	};

	function MyVerticallyCenteredModal(props) {
		return (
			<Modal
				{...props}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						New SuperHero has been Added to the DB would you like to add More?
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<div className="modalBtn">
						<Button onClick={props.onHide}>Yes</Button>
						<Link to="/">
							<Button className="text-center" variant="danger">
								No
							</Button>
						</Link>
					</div>
				</Modal.Footer>
			</Modal>
		);
	}

	return (
		<>
			<Container>
				<MyVerticallyCenteredModal
					show={modalShow}
					onHide={() => setModalShow(false)}
				/>

				<div className="form" onSubmit={createSuperhero}>
					<form>
						<input
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							placeholder="Full Name"
							type="text"
							required
						/>

						<input
							value={alterEgo}
							onChange={(e) => setAlterEgo(e.target.value)}
							placeholder="Alter Ego"
							type="text"
							required
						/>
						<input
							value={creator}
							onChange={(e) => setCreator(e.target.value)}
							placeholder="Creator"
							type="text"
							required
						/>

						<div className="formBtn">
							<Button variant="dark" type="submit">
								{' '}
								Save{' '}
							</Button>

							<Link to="/">
								<Button variant="secondary">Cancel</Button>
							</Link>
						</div>
					</form>
				</div>
			</Container>
		</>
	);
};

export default NewItemView;
