import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addmovie,
  deletemovie,
  updatemovie,
} from "./features/Movies/movieSlice";

const Movie = () => {
  const [movie, setMovie] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [edit, setEdit] = useState(false);
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (movie.trim() === "") return;
    dispatch(addmovie(movie));
    setMovie("");
  };

  const handleDelete = (id) => {
    dispatch(deletemovie(id));
  };

  const handleEdit = (id, name) => {
    setEdit(true);
    setEditingId(id);
    setEditedName(name);
  };

  const handleupdate = (id, newmovie) => {
    if (newmovie.trim() === "") return;
    dispatch(updatemovie({ id, name: newmovie }));
    setEditingId(null);
    setEditedName("");
    setEdit(false);
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-8">
      {/* Input Section */}
      
        <div className="flex gap-4">
          <input
            onChange={edit ? (e) => setEditedName(e.target.value): (e) => setMovie(e.target.value)}
            value={edit ? editedName: movie }
            className="border-2 border-gray-400 p-2 rounded-md"
            type="text"
            placeholder="Enter movie name"
            required
          />
          <button
            className="px-8 py-2 bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-white rounded-xl"
            onClick={edit ? () => handleupdate(editingId, editedName) : handleSubmit}
          >
            {edit ? <span>Save</span>:<span>Submit</span>}
          </button>
        </div>
    

      {/* Movies List */}
      {movies.length > 0 && (
        <div className="border-2 border-gray-400 p-6 rounded-xl w-sm">
          {movies.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-1 text-lg"
            >
              <div className="flex gap-2">
                <p>{item.id}.</p>
                <p>{item.name}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(item.id, item.name)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movie;
