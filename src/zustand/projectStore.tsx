import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Define the store state interface
interface FormState {
  formState: number
  increaseFormState: () => void
  decreaseFormState: () => void
}

// Create the store with proper typing
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

// Create the store with middleware
const useFormStateStore = create<FormState>()(
  devtools(
    persist(formStateStore, {
      name: "form-state",
      version: 1, // Add version for future migrations
    })
  )
)

export default useFormStateStore

// Example usage:
// const formState = useFormStateStore((state) => state.formState)
// const { increaseFormState, decreaseFormState, resetFormState, setFormState } = useFormStateStore()