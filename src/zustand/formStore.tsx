import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Define the store state interface
interface FormState {
  formState: number
  increaseFormState: () => void
  decreaseFormState: () => void
}



const formStateStore = (set: any) => ({
  formState: 0,
  increaseFormState: () => 
    set((state: FormState) => ({ 
      formState: state.formState + 1 
    })),
  decreaseFormState: () => 
    set((state: FormState) => ({ 
      formState: state.formState - 1 
    })),
})


const useFormStateStore = create<FormState>()(
  devtools(
    persist(formStateStore, {
      name: "form-state",
      version: 1, 
    })
  )
)



export default useFormStateStore

