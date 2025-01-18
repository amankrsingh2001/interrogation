import axios from "axios";

export const langUse = async(url:string, username:string, reponame:string):Promise<string[]>=>{
    const languages:string[] = [];

    const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/languages`)
    console.log(response,"lang res")
    const {data} = response
    for(let key in data){
        languages.push(key)
    }

    return languages
}