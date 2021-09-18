
import { toast } from 'react-toastify';
import produce from '../util/produce';
import Router from 'next/router';


// =============================================================
export const initialState = {
  publicationList: [],
  loadPublicationDone: false,
  loadPublicationError: null,
  addPublicationDone: false,
  addPublicationError: null,
  removePublicationDone: false,
  removePublicationError: null,
};

// =============================================================
//  Action Define
export const REMOVE_PUBLICATION_REQUEST = 'REMOVE_PUBLICATION_REQUEST';
export const REMOVE_PUBLICATION_SUCCESS = 'REMOVE_PUBLICATION_SUCCESS';
export const REMOVE_PUBLICATION_FAILURE = 'REMOVE_PUBLICATION_FAILURE';
export const ADD_PUBLICATION_REQUEST = 'ADD_PUBLICATION_REQUEST';
export const ADD_PUBLICATION_SUCCESS = 'ADD_PUBLICATION_SUCCESS';
export const ADD_PUBLICATION_FAILURE = 'ADD_PUBLICATION_FAILURE';
export const LOAD_PUBLICATION_REQUEST = 'LOAD_PUBLICATION_REQUEST';
export const LOAD_PUBLICATION_SUCCESS = 'LOAD_PUBLICATION_SUCCESS';
export const LOAD_PUBLICATION_FAILURE = 'LOAD_PUBLICATION_FAILURE';


const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case REMOVE_PUBLICATION_SUCCESS:
      draft.removePublicationDone = true;
      let filterCandidate = action.data?.id.map( (x)=> parseInt(x) )
      draft.publicationList = draft.publicationList.filter( (v) => !filterCandidate?.includes(v.id))
      break;
    case REMOVE_PUBLICATION_FAILURE:
      toast.error('Failed to Delete Publication')
      break;
    case ADD_PUBLICATION_REQUEST:
      draft.addPublicationDone = false;
      draft.addPublicationError = null;
      break;
    case ADD_PUBLICATION_SUCCESS:
      Router.push('/admin/publication')
      if ( action.data == null) {
        toast.warning('Publication already exist')
      } else {
        toast.success('Publication Added')
        draft.publicationList = [action.data, ...draft.publicationList]
      }
      break;
    case ADD_PUBLICATION_FAILURE:
      toast.error('Failed to Add Publication')
      draft.addPublicationError = action.error
      break;
    case LOAD_PUBLICATION_REQUEST:
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_PUBLICATION_FAILURE:
      draft.loadPostsError = action.error;
      break;
    case LOAD_PUBLICATION_SUCCESS:
      draft.loadPostDone = false;
      draft.loadPostError = null;
      draft.publicationList = action.data
      break;
    default:
      break;
  }
});

export default reducer;
