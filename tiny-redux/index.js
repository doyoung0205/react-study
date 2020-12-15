import { createStore } from './redux.js'

const COUNTER = 'count';

const middleware1 = (store) => (dispatch) => (action) => {
  console.log('mid1');
  if (action.type === 'fetch') {
    setTimeout(() => {
      dispatch({
        type: 'fetch-response',
        payload: [
          1, 2, 3
        ]
      })
    }, 2000);
  } else {
    dispatch(action);
  }
  
}

function reducer (state, action){
  state = action; // 값의 참조가 아니라 복사가 일어난다.

  if(action.type === COUNTER) {
    return {...state, counter: action.payload.counter}
  }

  if(action.type === 'fetch-response') {
    return {...state, response: action.payload}
  }

  return state;
}

function listener() {
  console.log(store.getState());
}

function acitionCreator(type, payload) {
  return {
    type,
    payload
  }
}

const store = createStore(reducer, [middleware1, middleware2]);

store.subscribe(listener);


function counter(data) {
  store.dispatch(acitionCreator(COUNTER, data));
}

counter({counter: 1});

store.dispatch(acitionCreator('fetch'))

