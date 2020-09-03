import React from  'react';
import GetQuestions from '../Questions/get_questions';
import CreateBounty from './bhCreate';

type TokenProp = {
    token: string,
    bhName: string,
    setName: any,
}


const BhParent = ({token, bhName, setName}: TokenProp) =>{

    return(
        <div>
        {bhName ? <GetQuestions bhName={bhName}/> : <CreateBounty token={token} setName={setName} />}
        </div>
    )
}

export default BhParent;