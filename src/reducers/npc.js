import woundedUncle from '../assets/images/sprites/Links-Uncle-Wounded-Sprite.png';

const initializeNpcs = () => {
  const npcArray = [
    { // uncle
      id: 1,
      type: 'npc',
      image: woundedUncle,
      pixelsWidth: 30,
      pixelsHeight: 30,
      coordinates: {
        x: 270,
        y: 170,
      },
      item: true
    }
  ]

  return npcArray;
}

export const NpcReducer = (state = initializeNpcs(), action) => {
  switch (action.type) {
    case 'INITIALIZE_NPCS':
      return action.npcs;
    case 'CELEBRATE_ITEM':
      if (action.itemHolder.type === 'npc') {
        let changedNpc = {...action.itemHolder};  // copy of NPC object
        changedNpc.item = false;
        let npcIndex = state.findIndex(npc => npc.id === action.itemHolder.id)
        return [...state.slice(0, npcIndex), changedNpc, ...state.slice(npcIndex + 1)]
      } else {
        return action.npcs;
      }


    default:
      return state
  }
}
