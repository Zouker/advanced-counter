import {
    counterReducer,
    CounterStateType,
    incValueAC, isPreviewAC,
    resetValueAC, setCountValueAC,
    setMaxValueAC,
    setStartValueAC
} from './counter-reducer';


test('start value should be increment by one', () => {
    const initialState: CounterStateType = {
        startValue: 0,
        maxValue: 5,
        count: 0,
        isPreview: true,
    }

    const endState = counterReducer(initialState, incValueAC())

    expect(initialState.count).toBe(0)
    expect(endState.count).toBe(1)
})

test('value should be reset to start value', () => {
    const initialState: CounterStateType = {
        startValue: 0,
        maxValue: 5,
        count: 0,
        isPreview: true,
    }

    const endState = counterReducer(initialState, resetValueAC())

    expect(initialState.startValue).toBe(0)
    expect(endState.startValue).toBe(0)

})

test('start value should be changed', () => {
    const initialState: CounterStateType = {
        startValue: 0,
        maxValue: 5,
        count: 0,
        isPreview: true,
    }

    const endState = counterReducer(initialState, setStartValueAC(7))

    expect(initialState.startValue).toBe(0)
    expect(endState.startValue).toBe(7)
})

test('max value should be changed', ()=> {
    const initialState: CounterStateType = {
        startValue: 0,
        maxValue: 5,
        count: 0,
        isPreview: true,
    }

    const endState = counterReducer(initialState, setMaxValueAC(10))

    expect(initialState.maxValue).toBe(5)
    expect(endState.maxValue).toBe(10)

})

test('count value should be changed', ()=> {
    const initialState: CounterStateType = {
        startValue: 0,
        maxValue: 5,
        count: 0,
        isPreview: true,
    }

    const endState = counterReducer(initialState, setCountValueAC(10))

    expect(initialState.count).toBe(0)
    expect(endState.count).toBe(10)

})

test('isPreview should be changed to display count instead of text', ()=> {
    const initialState: CounterStateType = {
        startValue: 0,
        maxValue: 5,
        count: 0,
        isPreview: true,
    }

    const endState = counterReducer(initialState, isPreviewAC(false))

    expect(initialState.isPreview).toBe(true)
    expect(endState.isPreview).toBe(false)
})