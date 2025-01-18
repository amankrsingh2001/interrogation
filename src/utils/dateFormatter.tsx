export const DateFrmatter = (date:string):string=>{
    const currDate:Date = new Date(date)
    const dd = String(currDate.getDate()).padStart(2,'0')
    const mm = String(currDate.getMonth()).padStart(2,'0')
    const yy = String(currDate.getFullYear()).slice(2)

    const formatDate = `${dd}-${mm}-${yy}`
    return formatDate
}