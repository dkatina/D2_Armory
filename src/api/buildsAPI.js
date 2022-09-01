import { dbNoAuth } from "./destinyAPIClient";

export const getBuilds = async (characterId, cancelToken ) =>{
    let error
    let builds 

    const response = await dbNoAuth(cancelToken).get(`/build/${characterId}`)
    if (response.ok){
        builds = response.data.builds
    }else if (response.status === 401){
        error = "No Builds Found"
    }else{
        error = "No Builds Found"
    }
    return{
        error,
        builds
    }
}

export const createBuild = async (build, cancelToken) =>{
    let message
    console.log('within wrapper', build)
    const response = await dbNoAuth(cancelToken).post('/build', build)
    if (response.ok){
        message = response
    }
    return{
        message
    }
}

export const editBuild = async (buildId, buildEdits, cancelToken) =>{
    let error
    let message

    const response = await dbNoAuth(cancelToken).put(`/build/${buildId}`, buildEdits)
    if (response.ok){
        message = response
    }else{
        error = "Could not Edit Build"
    }
    return{
        error,
        message
    }
}

export const deleteBuild = async (buildId, cancelToken) =>{

    const response = await dbNoAuth(cancelToken).delete(`/build/${buildId}`)
  
    return{
        response
    }
}



