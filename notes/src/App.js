import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Note from './components/Note';
import NoteForm from './components/NoteForm';

class App extends Component {
  dummyText = 'Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phasellus diam metus, blandit ac purus a, efficitur mollis.';
  state = {
    notes: [
      {
        id: 0,
        title: 'Note title',
        text: this.dummyText
      },
      {
        id: 1,
        title: 'Note title',
        text: this.dummyText
      },
      {
        id: 2,
        title: 'Note title',
        text: this.dummyText
      }
    ],
    title: '',
    text: ''
  };

  storeNote = (note) => {
    this.setState({ note });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNote = e => {
    e.preventDefault();
    const { notes, title, text } = this.state;
    this.setState({
      notes: [...notes, {
        id: notes.length,
        title,
        text
      }],
      title: '',
      text: ''
    });
  };

  editNote = e => {
    e.preventDefault();
    const { notes, title, text, note } = this.state;
    this.setState({
      notes: notes.map(n => n.id === note.id ? {...n, title, text} : n),
      title: '',
      text: ''
    });
  };

  render() {
    return (
      <div className="App">
        <Link to="/">Home</Link>
        {/* <Route
          path="/create"
          render={() => (
            <div>
              <h2>Create New Note:</h2>
              <AddNote 
                onChange={this.onChange} 
                onSubmit={this.addNote} 
                title={this.state.title} 
                text={this.state.text} 
              />
            </div>
          )}
        /> */}
        <h2>Create New Note:</h2>
        <NoteForm
          onChange={this.onChange} 
          onSubmit={this.addNote} 
          title={this.state.title} 
          text={this.state.text} 
          formText="Save"
        />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <h2>Your Notes:</h2>
              {this.state.notes.map(note => (
                <Link 
                  key={note.id} 
                  onClick={() => this.storeNote(note)} 
                  to={`/notes/${note.id}`}
                >
                  <Note note={note} />
                </Link>
              ))}
            </div>
          )}
        />
        <Route
          path="/notes/:id"
          render={() => (
            <div>
              <Link to={`/notes/${this.state.note.id}/edit`}>edit</Link>
              <Note note={this.state.note} />
            </div>
          )}
        />
        <Route
          path="/notes/:id/edit"
          render={() => (
            <div>
              <h2>Edit Note:</h2>
              <NoteForm
                onChange={this.onChange} 
                onSubmit={this.editNote} 
                title={this.state.title} 
                text={this.state.text} 
                formText="Update"
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
