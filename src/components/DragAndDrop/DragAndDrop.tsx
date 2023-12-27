import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import {
  arrayMove,
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle
} from 'react-sortable-hoc'

interface ISortableHandleElement {
  children: React.ReactNode
  className?: string
  as?: keyof HTMLElementTagNameMap
}

interface ISortableItem extends SortableElementProps {
  children: React.ReactNode
  className?: string
  as?: keyof HTMLElementTagNameMap
}

interface ISortableContainer extends SortableContainerProps {
  children: React.ReactNode
  className?: string
  as?: keyof HTMLElementTagNameMap
}

export const DndTrigger: React.ComponentClass<ISortableHandleElement, any> = SortableHandle(
  ({ children, className, as }: { children: React.ReactNode; className: string; as?: keyof HTMLElementTagNameMap }) => {
    const Element = as || 'div'
    return <Element className={className || ''}>{children}</Element>
  }
)

export const DndItem: React.ComponentClass<ISortableItem, any> = SortableElement(
  ({ children, className, as }: { children: React.ReactNode; className: string; as?: keyof HTMLElementTagNameMap }) => {
    const Element = as || 'div'
    return <Element className={className || ''}>{children}</Element>
  }
)

export const DndList: React.ComponentClass<ISortableContainer, any> = SortableContainer(
  ({ children, className, as }: { children: React.ReactNode; className: string; as?: keyof HTMLElementTagNameMap }) => {
    const Element = as || 'div'
    return <Element className={className || ''}>{children}</Element>
  }
)

function Example() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'])

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setItems((prevItems) => arrayMove(prevItems, oldIndex, newIndex))
  }

  return (
    <DndList lockAxis='y' lockToContainerEdges={true} useDragHandle onSortEnd={onSortEnd}>
      {items.map((value: any, index: number) => (
        <DndItem key={`item-${index}`} index={index} className='group flex items-center'>
          <DndTrigger className=''>
            <FaBars />
          </DndTrigger>
          <div>{value}</div>
        </DndItem>
      ))}
    </DndList>
  )
}
