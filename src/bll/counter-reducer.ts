const initialState = {
    startValue: 0,
    maxValue: 5,
    count: 0,
    isPreview: true,
}

export type CounterStateType = {
    startValue: number,
    maxValue: number,
    count: number,
    isPreview: boolean,
}

export const counterReducer = (state: CounterStateType = initialState, action: ActionType): CounterStateType => {
    switch (action.type) {
        case 'INC-VALUE': {
            return {
                ...state, count: state.count + 1
            }
        }
        case 'RESET-VALUE': {
            return {
                ...state, startValue: state.startValue
            }
        }
        case 'SET-START-VALUE': {
            return {
                ...state, startValue: action.startValue
            }
        }
        case 'SET-MAX-VALUE': {
            return {
                ...state, maxValue: action.maxValue
            }
        }
        case 'SET-COUNT-VALUE': {
            return {
                ...state, count: action.count
            }
        }
        case 'SET-PREVIEW-VALUE': {
            return {
                ...state, isPreview: action.isPreview
            }
        }
        default:
            return state
    }
}

type ActionType =
    ReturnType<typeof incValueAC>
    | ReturnType<typeof resetValueAC>
    | ReturnType<typeof setStartValueAC>
    | ReturnType<typeof setMaxValueAC>
    | ReturnType<typeof isPreviewAC>
    | ReturnType<typeof setCountValueAC>

export const incValueAC = () => ({type: 'INC-VALUE'}) as const
export const resetValueAC = () => ({type: 'RESET-VALUE'}) as const
export const setStartValueAC = (startValue: number) => ({type: 'SET-START-VALUE', startValue}) as const
export const setMaxValueAC = (maxValue: number) => ({type: 'SET-MAX-VALUE', maxValue}) as const
export const setCountValueAC = (count: number) => ({type: 'SET-COUNT-VALUE', count}) as const
export const isPreviewAC = (isPreview: boolean) => ({type: 'SET-PREVIEW-VALUE', isPreview}) as const
