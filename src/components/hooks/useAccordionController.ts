import React from 'react'


type Props = {
  initialState: AccordionControllerState
}
type AccordionState = {
  canToggle?: boolean | undefined
  disabled?: boolean | undefined
  expanded: boolean | undefined
  state: 'active' | 'completed' | 'pending'
  title: string
}

type AccordionControllerState = Record<string, AccordionState>

function useAccordionController({ initialState }: Props) {
  const [state, setState] = React.useState<AccordionControllerState>(initialState)

  const toggleAccordion = (id: string, isExpanded: boolean) => {
    const nextState = { ...state }
    if (id in nextState) nextState[id].expanded = isExpanded
    setState(nextState)
  }

  const collapseAll = () => {
    const nextState = { ...state }
    Object.keys(nextState).forEach((k) => {
      nextState[k].expanded = false
    })
    setState(nextState)
  }

  const expandAll = () => {
    const nextState = { ...state }
    Object.keys(nextState).forEach((k) => {
      nextState[k].expanded = true
    })
    setState(nextState)
  }

  return {
    collapseAll,
    expandAll,
    state,
    toggleAccordion,
  }
}

export default useAccordionController
