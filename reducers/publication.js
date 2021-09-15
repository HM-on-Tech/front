
import { toast } from 'react-toastify';
import produce from '../util/produce';
import Router from 'next/router';


// =============================================================
export const initialState = {
  publicationList: []
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
    case REMOVE_PUBLICATION_REQUEST:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('publication successfully removed')
      break;
    case REMOVE_PUBLICATION_SUCCESS:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('edit success')
      break;
    case REMOVE_PUBLICATION_FAILURE:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('edit success')
      break;
    case ADD_PUBLICATION_REQUEST:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('edit success')
      break;
    case ADD_PUBLICATION_SUCCESS:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('edit success')
      break;
    case ADD_PUBLICATION_FAILURE:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('edit success')
      break;
    case LOAD_PUBLICATION_FAILURE:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('edit success')
      break;
    case LOAD_PUBLICATION_FAILURE:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('edit success')
      break;
    case LOAD_PUBLICATION_FAILURE:
      Router.push('/admin/list')
      console.log(draft)
      toast.success('edit success')
      break;
    default:
      break;
  }
});

export default reducer;
