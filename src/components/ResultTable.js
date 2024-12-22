import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'

const ResultTable = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    const serverHostname = process.env.REACT_APP_SERVER_HOSTNAME || "http://localhost:5000";
    getServerData(`${serverHostname}/api/result`, (res) => {
      setData(res);
    });
  }, []);
  return (
    <div>
      <table>
        <thead className='table-header'>
          <tr className='table-row'>
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No Data Found </div>}
          {
            data.map((v, i) => (
              <tr className='table-body' key={i}>
              <td>{v?.username || ''}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points |  0}</td>
              <td>{v?.achived || ""}</td>
            </tr>
            ))
          }
            
          </tbody>
      </table>
    </div>
  )
}

export default ResultTable