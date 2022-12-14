import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr); 
`

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  `
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px; 10px;
  background-color: ${props => props.theme.cardColor}
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = ({destination, source}:DropResult) => {
        
  };
  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(provided) => 
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((toDo, index) =><Draggable key={index} draggableId={toDo} index={index}>
                  {(provided) => 
                    <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {toDo} 
                    </Card>
                  }
                </Draggable>)}
                {/* 끝나는 부분에 placeholder를 적용해서 아이템을 밖으로 움직여도 보드의 크기가 줄어들지 않도록 함  */}
                {provided.placeholder} 
              </Board>
            }
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App;
