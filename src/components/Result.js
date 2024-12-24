import React from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

// Import actions
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';

const Result = () => {
   const dispatch = useDispatch();
   const queue = useSelector(state => state.questions.queue);
const answers = useSelector(state => state.questions.answers);
const result = useSelector(state => state.result.result);
const userId = useSelector(state => state.result.userId);


   const totalPoints = queue.length * 10;
   const attempts = attempts_Number(result);
   const earnPoints = earnPoints_Number(result, answers, 10);
   const flag = flagResult(totalPoints, earnPoints);

   // Use the usePublishResult hook here at the top level
   usePublishResult({
      result, username: userId, 
      attempts, points: earnPoints, 
      achived: flag ? "Passed" : "Failed"
   });

   function onRestart() {
      dispatch(resetAllAction());
      dispatch(resetResultAction());
   }

   return (
      <div className='container'>
         <h1 className='title text-light'>Quiz Application</h1>

         <div className='result flex-center'>
            <div className='flex'>
               <span>Username</span>
               <span className='bold'>{userId}</span>
            </div>
            <div className='flex'>
               <span>Total Quiz points : </span>
               <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
               <span>Total Questions : </span>
               <span className='bold'>{queue.length || 0}</span>
            </div>
            <div className='flex'>
               <span>Total Attemps : </span>
               <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
               <span>Total Earn points : </span>
               <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
               <span>Quiz Result</span>
               <span style={{ color: `${flag ? "#2aff95" : "#ff2a66" }`}} className='bold'>
                  {flag ? "Passed" : "Failed"}
               </span>
            </div>
         </div>

         <div className='start'>
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
         </div>

         <div className='container'>
            {/* Result table */}
            <ResultTable />
         </div>
      </div>
   );
};

export default Result;
