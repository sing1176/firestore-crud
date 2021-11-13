import { Button, Container, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase';

const ListView = ({ data, setData }) => {
	const [id, setId] = useState('');

	const [editing, setEditing] = useState(false);
	const [editFullName, setEditFullName] = useState('');
	const [editCreator, setEditCreator] = useState('');
	const [editAlterEgo, setEditAlterEgo] = useState('');
	const [modalShow, setModalShow] = useState(false);

	const showModal = (e) => {
		setModalShow(true);
		setId(e.target.name);
	};

	const deleteItem = async () => {
		setModalShow(false);
		const singleDoc = doc(db, 'Superheros', id);
		await deleteDoc(singleDoc);
	};

	let editedObj = {
		fullName: editFullName,
		creator: editCreator,
		alterEgo: editAlterEgo,
	};

	function startEdit(e) {
		e.preventDefault();
		setEditing(true);
		setId(e.target.name);
		console.log(id);
	}

	const saveEdit = async () => {
		const singleDoc = doc(db, 'Superheros', id);
		await updateDoc(singleDoc, editedObj);
		setEditing(false);
	};

	function cancelEdit() {
		setEditing(false);
	}

	//Modal

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
						Delete this item?
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<div className="modalBtn">
						<Button
							className="text-center"
							variant="danger"
							onClick={deleteItem}
						>
							Yes
						</Button>
						<Button onClick={props.onHide}>No</Button>
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

				{/* Check if there is no Data then Display Message */}

				{data.length <= 0 ? (
					<h1>Please add New SuperHeros</h1>
				) : // Else Check if you are editing
				// and If you are editing
				editing ? (
					data.map((item) => (
						<div key={item.id}>
							{/* Check if Item id is same as edit Id then replace that card with the form */}
							{item.id === id ? (
								<div className="card-deck">
									<div className="editForm">
										<form onSubmit={saveEdit}>
											<input
												value={editFullName}
												onChange={(e) => setEditFullName(e.target.value)}
												placeholder={item.fullName}
												type="text"
												required
											/>
											<input
												value={editAlterEgo}
												onChange={(e) => setEditAlterEgo(e.target.value)}
												placeholder={item.alterEgo}
												type="text"
												required
											/>
											<input
												value={editCreator}
												onChange={(e) => setEditCreator(e.target.value)}
												placeholder={item.creator}
												type="text"
												required
											/>
											<Button variant="dark" type="submit">
												Save
											</Button>
											<Button variant="secondary" onClick={cancelEdit}>
												Cancel
											</Button>
										</form>
									</div>
								</div>
							) : (
								// Otherwise Build card-deck Normally
								<div className="card-deck">
									<div className="card">
										<div className="card-info">
											<h2> Name : {item.fullName}</h2>
											<p> AlterEgo : {item.alterEgo}</p>
											<p>Creator : {item.creator}</p>
										</div>
										<div className="card-buttons">
											<Button variant="dark" name={item.id} onClick={startEdit}> Edit
											</Button>
											<Button
												variant="secondary"
												name={item.id}
												onClick={showModal}
											>
												Delete
											</Button>
										</div>
									</div>
								</div>
							)}
						</div>
					))
				) : (
					// Else Build card-deck
					data.map((item) => (
						<div key={item.id} className="card-deck">
							<div className="card">
								<div className="card-info">
									<h2> Name : {item.fullName}</h2>
									<p> AlterEgo : {item.alterEgo}</p>
									<p>Creator : {item.creator}</p>
								</div>
								<div className="card-buttons">
									<Button variant="dark" name={item.id} onClick={startEdit}>
										Edit
									</Button>
									<Button
										variant="secondary"
										name={item.id}
										onClick={showModal}
									>
										Delete
									</Button>
								</div>
							</div>
						</div>
					))
				)}
			</Container>
		</>
	);
};

export default ListView;
