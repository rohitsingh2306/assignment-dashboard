import { mockData } from "../data/mockData"
import { setData } from "../redux/slices/filterSlice"
import { useDispatch } from "react-redux"
export const useUserChange = ()=>{
const dispatch = useDispatch()
    const handleUserChange = (id:any)=>{
        try {
            const helper = mockData?.find((item)=>item.id === id)
            dispatch(setData(helper?.data))
        } catch (error) {
            console.log("error",error)
            dispatch(setData([]))
        }
    }
    return{
        handleUserChange
    }
}