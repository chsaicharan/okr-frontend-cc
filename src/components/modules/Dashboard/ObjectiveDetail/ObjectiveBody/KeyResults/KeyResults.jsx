import React from 'react'
import './KeyResults.css'

export default function KeyResults(props) {
    const { currentObjective } = props
  return (
    <div className='key-results'>
        <div className="key-result-title">
          <p className="title-header">Key Results</p>
          <p className="title-confidence">Confidence</p>
          {/* <p className="title-progress">Progress</p> */}
        </div>
        { currentObjective.keyResults && currentObjective.keyResults.map((datum, index) => (
             <li
             key={index}
             className={
               (index + 1) % 2 === 0
                 ? "even-content"
                 : "key-result-body-content"
             }
           >
             <p className="key-result-content">
               {index + 1}
               {".  "}
               {datum.keyResult}
             </p>
             <p className="key-result-confidence">{datum.confidence}/10</p>
             {/* <p className="key-result-confidence progress-kr">
               {datum.progress}%
             </p> */}
           </li>
        ))} 
    </div>
  )
}
