const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id, title, tags, body, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess){
    const response = h.response({
      status: 'success',
      message: 'Note added successfully',
      data: {
        noteId:id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Failed to add note',
  });
  response.code(500);
  return response;

};

const getAllNotesHandler = () =>({
  status:'success',
  data:{
    notes,
  },
});

const getNotesByIdHandler =(request, h)=>{

  const note = notes.find((note) => note.id === request.params.id);
  if (note !== undefined){
    return {
      status:'success',
      data:{
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found',
  });

  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) =>{
  const noteIndex = notes.findIndex((note) => note.id === request.params.id);

  if (noteIndex!== -1){
    const { title, tags, body } = request.payload;

    const updatedNote = {
      ...notes[noteIndex],
      title,
      tags,
      body,
      updatedAt: new Date().toISOString(),
    };

    notes[noteIndex] = updatedNote;

    const response= h.response({
      status:'success',
      message: 'Note updated successfully',
      data: {
        noteId:request.params.id,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found',
  });

  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const noteIndex = notes.findIndex((note) => note.id === request.params.id);

  if (noteIndex!== -1){
    notes.splice(noteIndex, 1);

    const response = h.response({
      status:'success',
      message: 'Note deleted successfully',
      data: {
        noteId:request.params.id,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found',
  });

  response.code(404);
  return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNotesByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };