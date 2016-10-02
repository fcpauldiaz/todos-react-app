import { visibilityFilter } from './visibility';
import { colors } from './colors';
//single version
const note = (state = {}, action ) => {
  switch(action.type) {
    case 'ADD_NOTE':
      return {
        ...action.payload,
        saved: false,
        archived: false,
        show_color: false,
        creation_date: new Date()
      };
    case 'EDIT_NOTE_TITLE':
      if (state.id === action.payload.id) {
        return {
          ...state,
          title: action.payload.title,
          modification_date: new Date()
        }
      }
    case 'EDIT_NOTE_CONTENT':
      if (state.id === action.payload.id) {
        return {
          ...state,
          content: action.payload.content,
          modification_date: new Date()
        }
      }
     case 'CHANGE_COLOR_NOTE':
      if (state.id === action.payload.id) {
        return {
          ...state,
          color: action.payload.color
        }
      }
     case 'ARCHIVE_NOTE':
      if (state.id === action.payload.id) {
        return {
          ...state,
          archived: true
        }
      }
    case 'SHOW_COLOR_NOTE':
      if (state.id === action.payload.id) {
        return {
          ...state,
          show_color: colors(state.show_color,action)
        }
      }
    default:
      return state;
  }
}

//array version
const listNotes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        note(undefined, action)
      ];
    case 'EDIT_NOTE_TITLE':
      return state.map(l => note(l, action));
    case 'EDIT_NOTE_CONTENT':
      return state.map(l => note(l, action));
    case 'CHANGE_COLOR_NOTE':
      return state.map(l => note(l, action));
    case 'SHOW_COLOR_NOTE':
      return state.map(l => note(l, action));
    case 'DELETE_NOTE':
      return state.filter(l => l.id !== action.payload.id);
    case 'ARCHIVE_NOTE':
      return state.map(l => note(l, action));
    case 'SET_VISIBILITY_FILTER_NOTE':
      return state.map(t => note(t, action));
    default:
      return state;
  }
}

export { listNotes };