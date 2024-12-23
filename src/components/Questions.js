import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFetchQestion } from '../hooks/FetchQuestions';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQestion();

  const questions = useSelector(state => state.questions.queue[state.questions.trace]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checked !== undefined) {
      dispatch(updateResult({ trace, checked }));
    }
  }, [checked, trace, dispatch]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked: i }));
  }

  if (isLoading) return <h3 className='text-light'>Loading...</h3>;
  if (!questions) return <h3 className='text-light'>No questions available</h3>;
  if (serverError) {
    return (
      <div className='text-light'>
        {serverError.message ? `Error: ${serverError.message}` : "Unknown Error"}
      </div>
    );
  }

  return (
    <div className='questions'>
      <h2 className='text-light'>{questions?.question}</h2>

      <ul key={questions?.id}>
        {
          questions?.options.map((q, i) => (
            <li key={i}>
              <input
                type="radio"
                name="options"
                id={`q${i}-option`}
                onChange={() => onSelect(i)}
              />
              <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
              <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
