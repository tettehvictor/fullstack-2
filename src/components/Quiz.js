import React, { useState } from 'react';
import Questions from './Questions';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions';
import { PushAnswer } from '../hooks/setResult';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Quiz = () => {
  const [check, setChecked] = useState(undefined);
  const result = useSelector(state => state.result.result);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch();

  function onNext() {
    if (check === undefined) {
      alert('Please select an answer before moving to the next question');
      return;
    }

    if (trace < queue.length - 1) {
      dispatch(MoveNextQuestion());
      if (result[trace] === undefined) {
        dispatch(PushAnswer(check));
      }
    }
    setChecked(undefined);
  }

  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    setChecked(check);
  }

  if (result.length && result.length >= queue.length) {
    return (
      <div>
        <h2 className="text-light">Quiz Finished!</h2>
        <Navigate to={'/result'} replace={true} />
      </div>
    );
  }

  if (!queue || !Array.isArray(queue)) {
    return <div className="text-light">Loading questions...</div>;
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <Questions onChecked={onChecked} />
      <div className='grid'>
        {trace > 0 && <button className='btn prev' onClick={onPrev}>Prev</button>}
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default Quiz;
