/* import React, { useRef } from 'react';
import { 
	Box, 
	Grid, 
	Card, 
	CardMedia, 
	CardContent,
	IconButton,
	TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { NetworkWifiOutlined } from '@mui/icons-material';

const Videos = ({ videos, setVideos, isEditing, handleUpload, handleDelete }) => {
	const fileInputRef = useRef(null);

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const reorderedVideos = Array.from(videos);
		const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
		reorderedVideos.splice(result.destination.index, 0, movedVideo);

		// Update order, principal and cabecera flags: only first video gets principal and cabecera
		const updatedVideos = reorderedVideos.map((video, index) => ({
			...video, 
			order: index,
			principal: index === 0 ? 1 : 0,
			cabecera: index === 0 ? 1 : 0,
		}));

		setVideos(updatedVideos);
		updateAllVideos(updatedVideos);
	};

	const updateAllVideos = async (updatedVideos) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/videos/update-all`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedVideos),
			});

			if (!response.ok) {
				throw new Error('Failed to update videos');
			}

			console.log('Successfully updated all videos');
		} catch (error) {
			console.error('Error updating videos:', error);
		}
	};

	// Add useEffect: if only one video exists, mark it as principal and cabecera.
	React.useEffect(() => {
		if (videos.length === 1 && videos[0].principal !== 1) {
			const updatedVideos = videos.map((video, index) => ({
				...video,
				order: index,
				principal: index === 0 ? 1 : 0,
				cabecera: index === 0 ? 1 : 0,
			}));
			setVideos(updatedVideos);
			updateAllVideos(updatedVideos);
		}
	}, [videos, setVideos]);

	const handleTitleChange = (index, newTitle) => {
		const updatedVideos = videos.map((video, i) =>
			i === index ? { ...video, videotitle: newTitle
			} : video
		);
		setVideos(updatedVideos);
	};

	// When not editing, only render the video marked as principal
	const displayedVideos = isEditing ? videos : videos.filter(video => video.principal === 1);

	return (
		<Box position={'relative'}>
			<DragDropContext onDragEnd={isEditing ? handleDragEnd : () => {}}>
				<Droppable droppableId="videos" direction="horizontal">
					{(provided) => (
						<Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
							{displayedVideos.map((video, index) => (
								<Draggable 
									key={video.id} 
									draggableId={video.id.toString()} 
									index={index}
									isDragDisabled={!isEditing}
								>
									{(provided) => (
										<Grid item xs={12} sm={6} md={4} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											<Card sx={{position: 'relative'}}>
												<CardMedia
													component="video"
													height="200"
													src={`${video.url}?timestamp=${Date.now()}`}
													controls
													// alt attribute not used for videos
												/>
												<CardContent sx={{ display: 'flex', alignItems: 'center' }}>
													<TextField
														label="Titulo"
														value={video.videotitle || ''}
														onChange={(e) => handleTitleChange(index, e.target.value)}
														fullWidth
														disabled={!isEditing}
													/>
													<Box sx={{ ml: 2 }}>
														<IconButton 
															color="primary" 
															onClick={() => {
																console.log(`Delete clicked for video ID: ${video.id}`);
																handleDelete(video.id);
															}}
															disabled={!isEditing}
														>
															<DeleteIcon />
														</IconButton>
													</Box>
												</CardContent>
											</Card>
										</Grid>
									)}
								</Draggable>
							))}
							{isEditing && (
								<Grid item xs={12} sm={6} md={4}>
									<Box sx={{ width: '100%', mb: 2 }}>
										<Box
											sx={{
												width: '100%',
												height: '300px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												border: '2px dashed #ddd',
												borderRadius: '4px',
												cursor: 'pointer',
											}}
											onClick={() => fileInputRef.current.click()}
										>
											<AddIcon sx={{ fontSize: 40, color: '#ddd' }} />
										</Box>
										<input
											type="file"
											ref={fileInputRef}
											hidden
											onChange={handleUpload}
										/>
									</Box>
								</Grid>
							)}
							{provided.placeholder}
						</Grid>
					)}
				</Droppable>
			</DragDropContext>
		</Box>
	);
};

export default Videos;


 */