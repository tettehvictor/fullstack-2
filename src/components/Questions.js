import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Custom Hook */
import { useFetchQestion } from '../hooks/FetchQuestions';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
    const [checked, setChecked] = useState(undefined);
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, serverError }] = useFetchQestion();

    const questions = useSelector(state => state.questions.queue[state.questions.trace]);
    const dispatch = useDispatch();

    // Update result if checked is not undefined
    useEffect(() => {
        if (checked !== undefined) {
            dispatch(updateResult({ trace, checked }));
        }
    }, [checked, dispatch, trace]);

    // Select option handler
    function onSelect(i) {
        onChecked(i);  // Pass the selected index to the parent component
        setChecked(i);  // Update the checked state locally
        dispatch(updateResult({ trace, checked: i })); // Update the global result
    }

    // Loading and error handling
    if (isLoading) return <h3 className='text-light'>Loading questions...</h3>;
    if (serverError) return <h3 className='text-light'>{serverError.message || "Unknown Error"}</h3>;

    // Ensure questions are available before rendering
    if (!questions) return <h3 className='text-light'>No questions available.</h3>;

    return (
        <div className='questions'>
        <h2 className='text-light'>{questions?.question}</h2>

        <ul key={questions?.id}>
            {
                questions?.options.map((q, i) => (
                    <li key={i}>
                        <input 
                            type="radio"
                            value={false}
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
